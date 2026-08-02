---
title: 'Port Zero: TODO — name the engineering problem, not the product'
description: 'TODO — one sentence: the problem, the shape of the solution, and one concrete outcome.'
project: 'Port Zero'
pubDate: 2026-08-02
draft: true
---

<!--
  Every section below is a prompt, not copy. Replace each comment with your own
  writing. The through-line that makes this staff-engineer evidence: at every
  step, show a DECISION with alternatives you rejected and why, and show how
  you bounded the risk of being wrong. Reviewers skim for judgment, not code.
-->

## The problem

<!--
  Start one level above "port conflicts are annoying." The real framing:
  agentic/worktree-based development means running many branches of many
  services concurrently on one machine, and the port-number namespace is the
  bottleneck. Name who hits this, how often, and what they do today
  (docker-compose port arithmetic, /etc/hosts hacks, .env juggling, "kill
  whatever's on 3000"). A staff signal is choosing a problem whose importance
  is growing, and saying why now.
-->

## Constraints and non-goals

<!--
  What you refused to require of users: no code changes, no config files per
  service, works for processes AND containers, any TCP protocol (not just
  HTTP), works offline. Explicit non-goals (e.g., not a service mesh, not a
  deploy tool). Stating non-goals is itself staff evidence — it shows you
  scoped deliberately rather than accreted features.
-->

## The core design decision

<!--
  The `PZ_TUNNEL` env var + port 0 as the entire user-facing contract. Explain
  why an environment variable is the right interface: it's the one channel
  that already flows through every process manager, shell, docker run, and CI
  runner unchanged — so discovery is passive (daemon scans for it) and the
  integration cost is zero. Then the local mechanism: virtual NIC → virtual IP
  per process → virtual DNS record → port forward.

  CRITICALLY: list the alternatives you rejected and the concrete reason each
  one lost — reverse proxy on a well-known port (breaks non-HTTP TCP),
  /etc/hosts + fixed ports (still a shared namespace), mDNS (flaky
  cross-platform, no per-branch templating), a docker-compose plugin (excludes
  bare processes). One honest paragraph per rejected option beats ten
  paragraphs about the winner.
-->

## Living with root: the threat model

<!--
  The daemon creates network interfaces and answers DNS on the user's machine.
  Walk the threat model like you'd defend it in a security review: what
  privileges it holds, what it will and won't intercept, how portzero.local
  resolution is scoped so you're not a general DNS hijack, what the blast
  radius of a daemon bug is and how you bounded it. If you made any decision
  specifically to reduce what a compromised daemon could do, tell it here.
  This section alone can carry the staff signal — most portfolio projects
  never mention risk at all.
-->

## Proving it works on machines you don't own

<!--
  The vmkit story: why unit tests were insufficient (the product's whole job
  is OS-level side effects — NICs, DNS, privileged install paths), so you
  built a VM harness that runs the REAL installers on pristine golden-snapshot
  VMs in CI, with an offline provisioning cache. Include the failure that
  motivated it if there was one. Also the single-source versioning design:
  one workspace version, set-version.sh rewrites everything at release, and
  `portzero doctor` cross-checks daemon/CLI/tray/app versions at runtime —
  a small design that eliminates an entire class of skew bugs. Staff signal:
  test strategy proportional to actual risk, not coverage theater.
-->

## Cross-platform reality

<!--
  The unglamorous 40%: macOS vs Linux network stacks, Gatekeeper/quarantine on
  unsigned builds and what you shipped instead of waiting for notarization,
  Homebrew tap vs curl-installer trade-offs, tray + Tauri desktop app.
  Pick the two or three gnarliest platform problems and show your reasoning;
  skip the rest.
-->

## Local vs Cloud: drawing the commercial line

<!--
  Why the split lands where it does: single-machine traffic is free & open
  source, LAN/Internet tunneling is paid. Explain it as an architecture
  decision (what genuinely requires hosted infrastructure) and a product
  decision (open core that's complete on its own, not crippleware). Staff
  engineers get asked to draw exactly this kind of line.
-->

## How it was built

<!--
  Be specific and honest about AI-assisted development: what you delegated,
  what you kept (architecture, interfaces, the threat model, release
  policy), and what verification gates made high AI assistance safe (the VM
  e2e suite, doctor checks). Numbers help: ~49k lines of Rust across an
  8-crate workspace, solo, over N months. This turns the "high AI assistance"
  badge from a liability into a demonstration of directing leverage — which
  is the actual staff job.
-->

## Results

<!--
  Only claims you can back: N branches of a real app running concurrently
  (link a demo or the full-example repo), install-to-first-tunnel time,
  platforms supported, CI e2e runtime, users/installs if you have them. If
  adoption is early, say so plainly and lean on the technical results —
  honesty here makes every other claim in the page more credible.
-->

## What I'd do differently

<!--
  Two or three real regrets with reasoning — a decision that looked right and
  wasn't, something you over- or under-built. This section is disproportionate
  evidence of seniority; write it last but don't skip it.
-->
