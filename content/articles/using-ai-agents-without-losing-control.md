---
title: "Using AI Agents Without Losing Control"
description: "How I use AI to accelerate delivery while keeping architecture decisions and code quality in human hands."
date: "2025-06-10"
tags: ["ai", "workflow", "engineering"]
published: true
---

AI agents are great at speed. They're bad at accountability.

That's not a reason to avoid them — it's a reason to **use them deliberately**.

## Where AI helps me

- **Boilerplate and scaffolding** — repetitive CRUD, test stubs, migration drafts
- **Exploration** — spike solutions, compare approaches, read unfamiliar code faster
- **Documentation** — ADR drafts, API docs, inline comments for complex logic

## Where I stay in control

- **Architecture decisions** — AI suggests; humans write the ADR and own the trade-off
- **Security-sensitive code** — auth, payments, data access always get human review
- **Production changes** — agents propose diffs; CI, tests, and code review gate the merge

## A simple workflow

1. Define the outcome and constraints upfront
2. Let the agent generate a first pass
3. Review like you'd review a junior dev's PR — line by line
4. Run tests, check edge cases, verify business logic

The goal isn't to write less code. It's to **spend human time on the parts that matter**.
