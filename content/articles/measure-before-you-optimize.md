---
title: "Measure Before You Optimize"
description: "Why profiling and metrics should come before any performance fix — lessons from production Rails systems."
date: "2025-06-01"
tags: ["rails", "performance", "backend"]
published: true
---

Most performance work fails for one reason: the team optimizes what *feels* slow instead of what *is* slow.

In production Rails apps — especially legacy, multi-tenant systems — the bottleneck is rarely where you expect. A dashboard that "feels heavy" might be fine. A background job that runs quietly might be hammering the database.

## What I do first

1. **Reproduce with real data** — staging with production-like volume, not three seed records.
2. **Profile before changing code** — `rack-mini-profiler`, SQL logs, APM traces, or `EXPLAIN ANALYZE`.
3. **Pick one metric** — p95 response time, queries per request, job duration. Fix against that number.

## Common surprises

- **N+1 queries** hiding behind eager-loading assumptions
- **Missing indexes** on columns used in `WHERE` and `ORDER BY`
- **Over-fetching** — loading full objects when only two fields are needed
- **Synchronous work in request cycle** that belongs in a job

## The rule I follow

> If you can't show the before and after number, you didn't optimize — you just refactored.

This mindset has saved more time than any caching layer. Measure, fix the real bottleneck, measure again.
