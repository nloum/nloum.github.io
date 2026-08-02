---
title: "Don't scale yet, because of AI"
description: "AI makes behavior-preserving rewrites cheap. That changes the arithmetic behind the infamous tagline: do things that don't scale."
pubDate: 2026-08-02
draft: false
tags: ['ai', 'scaling', 'testing']
---

Like most software engineers, I've been involved in a lot of codebase rewrites. Rewrites have always been very expensive, multi-year efforts, but this is changing with the advent of AI. In fact, rewriting while keeping existing behavior requires much less human intervention for AI than rapidly building out new features. The proof is in the data:

- Amazon found that [Java upgrades were 98% faster when LLM-unassisted](https://www.linkedin.com/posts/andy-jassy-8b1615_one-of-the-most-tedious-but-critical-tasks-activity-7232374162185461760-AdSz/) (August 2024)
- Google found that [LLM-assisted int32-int64 migrations across the 500M-line Ads codebase were 50% faster than LLM-unassisted upgrades](https://arxiv.org/abs/2501.06972) (January 2025)
- Airbnb found that [LLM-assisted test migrations were 92% faster than LLM-unassisted migrations](https://medium.com/airbnb-engineering/accelerating-large-scale-test-migration-with-llms-9565c208023b) (March 2025)

By contrast:

- METR found that [general feature development was 19% slower when assisted by an LLM](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) (July 2025; [likely narrowed](https://metr.org/blog/2026-02-24-uplift-update/))
- Dubach's synthesis of several analyses found that [general feature development across an organization was 10% faster when after adoption of LLM assistance](https://philippdubach.com/posts/93-of-developers-use-ai-coding-tools.-productivity-hasnt-moved./) (June 2026)

This stark contrast fundamentally changes the arithmetic behind the infamous tagline "Do things that don't scale."

Let's say you are a web developer in charge of a fully functional web app with real users. This app is written in Ruby on Rails and running on Heroku. Let's also say the app is finally hitting scaling problems; the product usage just skyrocketed. So let's think about porting your backend to AWS with Terraform. Once upon a time this was a very complex operation:

- Rewriting takes so long that new feature development *can't* be paused, meaning the rewrite isn't *just* a rewrite and takes even longer
- Rewriting *iteratively* while fundamentally changing the architecture and tech stack is at least twice as hard as doing it in one fell swoop
- Rewrites are so expensive that people often add additional sweeping changes that they've been waiting to do, like full site redesigns, meaning you're combining two unrelated surgeries into one big surgery, and thus are more likely to fail at both

In the AI coding era, the history of your codebase should be a series of alternating feature development / scaling phases. And a new primary output of the feature development phase is that you can Trust the Tests™.

## Feature development mode

When a codebase is in feature development mode:

- PRs should always contain relevant adjustments to system tests
- System tests should be independent of each other and highly parallelizable. Being able to Trust the Tests™ is a primary outcome of software development in the AI era ([Simon Willison makes the same argument](https://simonwillison.net/2025/Oct/7/vibe-engineering/): the test suite is what determines how autonomously an agent can work). System tests must not flake and we must design accordingly from the very beginning.
- System tests should be comprehensible to users (e.g. "When I click X, Y should happen") or to operators (i.e. they can enforce non-functional requirements like performance)

## Scaling mode

When a codebase is in scaling mode:

- Ensure there is no feature development in flight
- Minimize PRs that change the system tests; such PRs should be carefully scrutinized to ensure they are not hiding regressions or otherwise enabling behavior changes (LLM agents [measurably cheat tests when they can](https://www.lesswrong.com/posts/qJYMbrabcQqCZ7iqm/impossiblebench-measuring-reward-hacking-in-llm-coding-1) — hard-coding expected values or editing the tests themselves — so test-touching PRs are exactly where the scrutiny belongs)
- No PRs should change the database schema (unless the migrations are necessary for scaling), especially when moving the database between cloud providers, e.g. from Heroku PostgreSQL to AWS RDS

---

Using these modes allows us to not have to think about scaling and cloud infrastructure more than necessary while adding/adjusting features. This lets you (and the AI) think more about the domain you're in and the essential complexity that comes with it.

## Setting yourself up for success

But there are a few choices you can make up front that make thinking about scaling much easier later on, and these choices save so much time later:

- Carefully design and build a comprehensive system test framework that is not tied to your tech stack and does not flake
- Use event sourcing or other architectural patterns that are friendly to database replication, e.g. when moving between cloud providers

- Never add infrastructure complexity that will only be useful once we hit a large scale
- Always prefer Platform as a Service hosting instead of using hand-assembled cloud primitives such as AWS Lambda, SQS, etc.

Build your codebase, polish it shiny with system tests, and hand it on a platter to the AI that will make it scale--but only when the time comes.