---
title: "AI engineering without getting out of touch"
description: "Add this to your AGENTS.md to keep the architecture in your mind"
pubDate: 2026-10-12
draft: false
tags: ['ai', 'engineering', 'agents']
---

![Stone building corner viewed from below](./cornerstone.jpg)

You know using Claude Code can make you lose track of your architecture? It can be disconcerting to need to work without AI.

Here's a trick I developed to address this problem. Put this in your context:

```
I want to understand the architecture. Leave changes that establish or alter architecture to me. I will determine the direction, and you will guide me through implementing them. You may extend existing patterns.

Example: I create `main.py` for a new production process; you may add a controller alongside existing controllers
```

I call this *cornerstone-driven development*. You're laying the cornerstones and letting the AI fill in the finer detais.