---
title: 'What happens when you bolt 40-year-old algorithms onto a language model'
description: 'Testing FFT blocks as a replacement for neurons produced an honest negative result; the mixture-of-algorithms detour cut 5.5% off a trained model''s compression of Wikipedia, for free. All on one 4GB consumer GPU.'
project: 'newtrain'
pubDate: 2026-08-05
draft: true
---

I started with a naive question: **transformers spend most of their parameters
on dense matrix multiplies — what if some of those banks of neurons were FFTs,
convolutions, and deconvolutions instead?**

The answer turned out to be "worse, consistently, and here is exactly how much"
— but the apparatus built to answer it produced a second result I did not
expect, and that one is genuinely useful: **gating a trained language model
with non-neural algorithm experts cut its bits-per-character on Wikipedia by
5.5% at zero training cost.**

Everything below ran on a GTX 1650 Super — 4 GB of VRAM, shared with my
desktop.

## The setup

Five architecturally distinct language models, parameter-matched to within 5%,
sharing one training loop so the only variable is the block internals:

| variant | token mixer | channel FFN |
|---|---|---|
| `baseline` | causal self-attention | 4× GELU MLP |
| `spectral_ffn` | causal self-attention | rFFT → complex filter → irFFT |
| `conv_ffn` | causal self-attention | causal Conv1d ↓2 → GELU → ConvTranspose1d ↑2 |
| `fft_mix` | causal long convolution via FFT | 4× GELU MLP |
| `full_spectral` | FFT long convolution | spectral FFN |

One correctness decision worth naming, because it is the kind of thing that
silently invalidates a result: FNet-style FFT token mixing **leaks future
tokens** and cannot do causal language modelling. Mixing across the sequence
with a plain FFT lets position 3 see position 10. The FFT mixer here computes
a causal long convolution instead — zero-pad to 2T, multiply in the frequency
domain, truncate — which is the causal way to use the same machinery. A unit
test perturbs future tokens and asserts past logits are unchanged, for every
variant, on every commit. Without that test I would have shipped a model that
cheats and called it a win.

## The negative result, and why I trust it

At 49M tokens on TinyStories, learning rate tuned per variant:

| variant | val loss |
|---|---|
| baseline | **1.977** |
| spectral_ffn | 2.026 |
| fft_mix | 2.069 (≈10% faster per token) |
| conv_ffn | 2.84 |

Then the same comparison on a completely different corpus — byte-level enwik8
(100MB of Wikipedia) — reproduced the ordering: baseline **1.402 bpc**,
fft_mix **1.489 bpc**. Attention earns its cost at this scale, on stories and
on markup alike.

![validation loss curves for three architecture variants at 49M tokens](/case-studies/architecture-curves.png)

Two methodological findings mattered more to me than the ranking:

**Short runs actively mislead.** At 12M tokens the ranking was
baseline → fft_mix → spectral_ffn. At 49M tokens spectral_ffn had overtaken
fft_mix. Same models, same data order, different conclusion. Any comparison I
had stopped early would have published the wrong ordering with a straight face.

**Everything was under-tuned in the same direction.** My first sweep used the
learning rate I had inherited from nanoGPT. Testing 3e-4 / 6e-4 / 1.2e-3 showed
1.2e-3 was better for *every* variant — the "architecture differences" I had
been measuring were partly a shared hyperparameter deficit. Comparisons before
per-variant tuning are comparisons of tuning effort.

## The detour that worked

If a trained network is a lossy compressor of its training data, then anything
that predicts the next token is an expert we could consult — including
algorithms that predate deep learning. So I gave the trained model three
non-neural colleagues and a small gate to arbitrate:

- a **suffix array** over the training corpus, returning the empirical
  continuation distribution of the longest exact match (this is
  infini-gram's mechanism);
- the same at **shorter match lengths** — a fuzzified backoff, so the gate can
  prefer a 6-token match seen 400 times over an 11-token match seen once;
- an **in-context copy** expert (longest repeat inside the prompt itself).

A 16-unit MLP arbitrates from confidence features — match length, occurrence
count, distribution entropy. It has about a thousand parameters and trains in
seconds.

**On enwik8's standard test split: 1.402 → 1.317 bits per character, a 6.8%
reduction, with no retraining of the model.**

Most of that came from the experts; the last chunk came from asking a better
question of the gate. The first version saw only summary statistics — match
length, occurrence count, entropy — so it could not tell whether the experts
*agreed*, and it hedged. Adding candidate-aware features (does the suffix
expert's top pick match the model's? how much probability mass does the model
put on it?) moved 1.325 → 1.317. Small, but it points at where the remaining
value is: the per-token oracle sits at **0.874 bpc**, so on many bytes some
expert already knows the answer and the arbitrator fails to pick it. The
bottleneck is no longer the experts.

For scale, here is where that lands among systems measured on the identical
bytes, with published numbers for context:

| system | bits/char | machinery |
|---|---|---|
| gzip -9 | 2.815 | ~100 KB |
| xz -9e | 2.171 | ~1 MB |
| this model, 30M params | 1.402 | 120 MB |
| **+ algorithm experts** | **1.317** | 120 MB + 450 MB index |
| cmix v19 | 1.180 | ~32 GB RAM |
| Transformer-XL 277M | 0.990 | ~1.1 GB |

![enwik8 compression ladder and the resource-vs-performance plane](/case-studies/enwik8-ladder.png)

The right-hand panel is the one I would defend in a design review: it plots
bits-per-character against *bytes of machinery*, so adding the experts reads
as a deliberate move along a resource frontier — 450 MB of index buys 5.5% —
rather than a place on a leaderboard.

## The finding I did not expect

On TinyStories the same mixture gained **21%** on one validation slice and
**2.4%** on another. That inconsistency was the interesting part. The
difference: 56% of tokens in the first slice sat inside ≥8-token passages that
also appear verbatim in the training corpus; in the second slice, 26%.

The gain tracks train/test duplication almost linearly. Which means **the
mixture's advantage is a live measurement of how much of your evaluation set
your training set already contains** — a benchmark-contamination meter that
falls out of the architecture for free. And it never hurt: in every bucket I
sliced, the gated mixture was at worst equal to the model alone, because the
gate learns to defer when exact recall is unreliable.

## Things I tried that did not work

**Fuzzy recall.** If exact match helps, near-match should help more. I built
two versions: suffix matching over semantically quantized tokens (so "cat"
matches "dog"), and an ensemble of eight suffix arrays over deliberately
corrupted copies of the corpus, summing their votes — which turns out to be a
finite-sample estimate of exactly what denoising score matching learns, i.e.
the machinery under diffusion models, rebuilt from the retrieval side.

It works standalone (−1.3% versus the model alone) and adds **nothing** on top
of exact recall plus the network. The diagnosis is the useful part: *the
network is already the fuzzifier*. Fuzzy retrieval gets squeezed from both
sides — verbatim text goes to the exact expert, semantic neighbourhoods go to
the network — and the middle is thin.

**A learned router.** With 64 topical corpus shards, I compared a softmax
classifier gate against a learned diffusion-style map over shard positions.
The learned map exactly *tied* the unlearned nearest-centroid baseline, and the
reason is a design error worth remembering: I built the shards by clustering
the same embedding space the router queries, so competence and proximity were
identical by construction. There was nothing left for the router to learn. A
learned router only earns its parameters when the competence geometry differs
from the query geometry.

The same experiment did produce one clean result. Sixteen shards were added
*after* the routers were trained. The softmax classifier scored **0.000**
recall on them — new experts are not in its output space, structurally — while
both map-based routers absorbed them at ~0.48 recall@8. If you expect your
expert set to grow, that property outranks closed-set accuracy.

## What I built to keep myself honest

Three habits, all now enforced by code rather than intention:

**Exact-resume checkpointing.** Overnight runs on a shared consumer GPU get
killed — by the desktop needing VRAM, by session restarts, by me. Every run
saves full state (model, optimizer, RNG) atomically each eval interval, and
resumes bit-identically; I verified this by SIGKILLing a run mid-training and
diffing the resumed curve against an uninterrupted one. The wrapper also waits
for VRAM headroom rather than crashing into it.

**Certified visualizations.** I built a 3-D tool for looking at what the
experts do — energy deposited over the model's own embedding space, sliced out
of 8 dimensions, animated across generation steps. Then I made it prove
itself: each scene's math is declared as a small computation graph, and a
*deterministic generator* emits ~50 lines of naive numpy from that same graph,
with every equation and citation in the docstring, plus golden values it
asserts against. `just verify` runs them; a failure means the picture and its
stated equations have diverged. I tamper-tested it by dropping one factor of 2
from a kernel — the certificate fails loudly. Building it caught a real
broadcasting bug in the renderer on day one.

**A prediction ledger.** Before running a measurement, I write down what I
expect from reading a visualization, and commit it with a timestamp. The first
entry was falsified within twelve hours — I predicted a product-of-experts
gate would beat a mixture where experts agreed, and it lost. The diagnosis
became a concrete defect report against the visualization: it showed *support
overlap* and I read it as agreement, but the tails still disagreed. A ledger
with only confirmations in it would be evidence of nothing.

## What I would do next

The loudest number in the project is the per-token oracle: if you could always
pick the best expert, enwik8 drops to **0.874 bpc** versus the gate's 1.317.
Candidate-aware features closed a sliver of that; a gate that actually
compares candidate distributions — rather than summarizing them — is the next
real experiment, and it needs no new experts and no retraining.

The scaling question is open too, and priced: a 124M-parameter comparison on
FineWeb is about $50–100 of rented H100 time, which the repo's cost model
computes from measured throughput rather than guesses.

## Honest positioning

The components here are not new, and pretending otherwise would be the fastest
way to lose a reader who knows the field. FFT-based sequence mixing is the
Hyena/H3/SPECTRE lineage. Retrieval-augmented prediction is kNN-LM,
infini-gram, and DeepMind's semiparametric language models. Mixing many hard
algorithms under a learned gate is what PAQ and cmix have done in compression
for two decades — and they remain state of the art there.

What I have not found published: that fine-grained many-algorithm mixture run
as a *generative* language model rather than a compressor; the corrupted-corpus
suffix arrays as an explicit finite-sample denoising-score estimator; and the
gate's weights read as a contamination meter. Those are the parts I would
defend, and the parts I would most like to be told are wrong.

**Repository:** github.com/nloum/newtrain — `just dev` runs the visualization,
`just verify` checks the certificates, `just test` runs the causality tests.
