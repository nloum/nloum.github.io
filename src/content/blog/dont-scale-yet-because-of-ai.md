---
title: "Don't scale yet, because of AI"
description: "AI makes behavior-preserving rewrites cheap. That changes the arithmetic behind the infamous tagline: do things that don't scale."
pubDate: 2026-08-02
draft: false
tags: ['ai', 'scaling', 'testing']
---

Like most software engineers, I've been involved in a lot of codebase rewrites. Rewrites have always been very expensive, multi-month efforts, but this is changing with the advent of AI. In fact, rewriting while keeping existing behavior requires much less human intervention for AI than rapidly building out new features. The proof is in the data:

- Amazon found that AI made [Java upgrades 98% faster](https://www.linkedin.com/posts/andy-jassy-8b1615_one-of-the-most-tedious-but-critical-tasks-activity-7232374162185461760-AdSz/) (estimated against historical data; August 2024)
- Google found that AI made [int32-int64 migrations across the 500M-line Ads codebase 50% faster](https://arxiv.org/abs/2501.06972) (estimated; January 2025)
- Airbnb found that AI made [test migrations 92% faster](https://medium.com/airbnb-engineering/accelerating-large-scale-test-migration-with-llms-9565c208023b) (estimated; March 2025)

By contrast:

- METR found that AI made [general feature development 19% slower](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) (July 2025; [likely narrowed since then](https://metr.org/blog/2026-02-24-uplift-update/))
- Dubach's synthesis of several analyses found that AI adoption at an organizational level made [general feature development 10% faster](https://philippdubach.com/posts/93-of-developers-use-ai-coding-tools.-productivity-hasnt-moved./) (June 2026)

The contrast between these two could not be more stark, but it still undersells the simplicity that AI brings to migrations, because rewrites and code migrations that take a long time have compounding problems:

- Rewriting takes so long that new feature development *can't* be paused, meaning the rewrite isn't *just* a rewrite and takes even longer
- Rewriting *iteratively* while fundamentally changing the architecture and tech stack is at least twice as hard as doing it in one fell swoop
- Rewrites are so expensive that people often add additional sweeping changes that they've been waiting to do, like full site redesigns, meaning you're combining two unrelated surgeries into one big surgery, and thus are more likely to fail at both

Because rewrites and migrations in the AI coding era are cheap compared to feature development, the history of your codebase should be a series of alternating feature development and scaling/migration/rewrite phases. And a new primary output of the feature development phases is that you can Trust the Tests.

## Feature development mode

When a codebase is in feature development mode:

- PRs should always contain relevant adjustments to system tests.
- Always maintain the minimum non-domain complexity possible in the codebase. For example, building to handle 10x scale of your current load is probably excessive complexity that slows down feature development.
- System tests should be independent of each other and highly parallelizable. Being able to Trust the Tests is now a primary outcome of software development in the AI era. System tests must be designed to not flake from the very beginning.

## Scaling mode

When a codebase is in scaling mode:

- Ensure there is no feature development in flight
- Minimize PRs that change the system tests; such PRs should be carefully scrutinized to ensure they are not hiding regressions or otherwise enabling behavior changes (LLMs sometimes [cheat tests when they can](https://www.lesswrong.com/posts/qJYMbrabcQqCZ7iqm/impossiblebench-measuring-reward-hacking-in-llm-coding-1) by hard-coding expected values or editing the tests themselves)
- No PRs should change the database schema (unless the migrations are necessary for scaling), especially when moving the database between cloud providers, e.g. from Heroku PostgreSQL to AWS RDS

---

Using these modes allows us to not have to think about scaling and cloud infrastructure more than necessary while adding/adjusting features. This lets you (the developer) and the AI to think more about the domain you're in and the essential complexity that comes with it.

## Setting yourself up for success

There are a few choices you can make up front that make thinking about scaling much easier later on:

- Always prefer Platform as a Service hosting instead of using hand-assembled cloud primitives such as AWS Lambda, SQS, etc.
- Carefully design and build a comprehensive system test framework that is not tied to your tech stack and does not flake
- Use event sourcing or other architectural patterns that are friendly to database replication, e.g. when moving between cloud providers

Build your codebase, polish it shiny with system tests, and hand it on a platter to the AI that will make it scale--but only when the time comes.