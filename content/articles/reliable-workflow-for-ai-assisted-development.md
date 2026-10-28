---
title: "Beyond Prompt Engineering: A Practical Workflow for AI-Assisted Development"
description: "How to give a coding assistant durable constraints, a bounded task, and a real definition of done, and when that extra structure is wasted."
date: "2026-10-28"
tags: ["ai", "workflow", "engineering"]
published: true
---

A coding assistant can produce a plausible Rails controller in a minute. The pull request can still be wrong.

On a multi-tenant API, the usual shape of that wrongness is specific. The new action reads `organization_id` from the request body. The error payload is a bare array of strings, while the rest of the API returns `{ errors: [{ code, field, message }] }`. A follow-up Sidekiq job calls `Current.organization` and finds nothing, because that value exists only for the HTTP request that enqueued the job. The suite the assistant ran was green, because the new spec signed in as the same organization it created.

None of that is a prompting trick. The model saw a task, wrote code that type-checks and often passes a happy-path test, and missed constraints that live in the architecture. The engineer’s job is to make those constraints visible, to cut the work into pieces that can fail a check, and to refuse a definition of done that stops when the assistant says it is finished.

The question this article examines: how do you make that more predictable without wrapping every one-line fix in a process?

I do not have a controlled measurement of this workflow against ordinary assistant use. Where a study exists, I say what it measured. Where I am describing a practice, it is the practice, not a result.

## 1. Give the assistant durable project knowledge

A root instruction file such as `AGENTS.md` is a place for facts the assistant would otherwise rediscover wrong. [The format itself](https://agents.md/) is plain Markdown. It has no required fields. The nearest file in the directory tree wins, and a direct instruction in the chat overrides the file. The project site says the filename appears in over 60,000 open-source repositories. That number is the site's own claim, not a finding that the files improve correctness.

What belongs in the root file is short:

- Boundaries the code does not make obvious, including decisions you have already rejected.
- Commands for tests, lint, and security checks.
- Invariants that a green local spec can still violate.
- Pointers to domain notes, plans, and decision records.
- Actions the assistant must not take on its own.

What does not belong there is a tour of the repository, a style guide the linter already enforces, a copy of every ADR, and a history of last quarter’s incidents. A long file is not a thorough file. The assistant has to find the one line that matters, and a repository overview often does not help it do that. More on the evidence in section 9. The practical consequence is to write the rule the code cannot show, and to let the tool read the code for everything else.

This is a reduced picture of the root file I keep on [ubuteco_api](https://github.com/Sartori-RIA/ubuteco_api), a Rails API for a multi-restaurant product. The real file also points at plans and domain notes. The lines below are the ones that exist because an assistant will violate them if they are left implicit.

```markdown
# AGENTS.md — ubuteco_api (the part that prevents repeat mistakes)

## Invariants
- Tenant on create comes from Current.organization, never from client organization_id.
- Current is request-scoped. A Sidekiq job passes organization_id or sets Current and resets it in ensure.
- New API errors use ApiErrorRenderable. Do not add errors.full_messages arrays.
- An org-scoped resource needs a spec in spec/security/cross_tenant/.

## Rejected
- Schema-per-tenant. Shared schema and organization_id. See ADR 001.
- The Angular app. The active UI is ubuteco-react.

## Do not run unless asked
- db:migrate, db:drop, force-push.

## Checks before a PR
- bin/rubocop, bundle exec rspec, bin/brakeman, bin/bundler-audit.
- openapi:drift_check when the response contract changes.
```

Each block exists for a reason. The invariants are the failures recorded in `docs/context/common-ai-pitfalls.md` in that repo. The rejected section stops a second architecture from being proposed as if it were still open. The command list is there so the assistant does not invent `rake test` or run a migration because the plan mentioned one. None of this guarantees the model will comply. It gives you a written rule to point at when the diff breaks it, and it gives the next session the same rule without you retyping it.

Instructions rot. A file that still describes the abandoned frontend, or that documents `Current` as a global, is worse than a short file, because the assistant will treat it as authority. When a decision changes, the root file and the ADR have to change in the same commit as the code, or the text has to be deleted.

[Facebook Activity Cleaner](https://github.com/Sartori-RIA/facebook_activity_cleaner) is the other end of the same idea. It is a local tool that can delete the user’s own Facebook history. The root instructions forbid a flag that disables family protection, forbid inventing CSS selectors and marking them validated, and forbid a destructive test against a real account. Those lines are not style. They are the product. An assistant that “simplifies” the tool by adding `--no-respect-protection` has failed, even if the tests it wrote are green.

## 2. Engineer the context for this task

The root file is the standing context. The task message is the context for one change. They should not be copies of each other.

A stock adjustment and a copy change do not need the same packet. For a new read of `stock_movements` in ubuteco, the packet that matters is the tenant rule, the role rule, the error shape, and the test directory. The search cluster, the cable server, and the currency ADR are noise on that task. Noise has a cost: the model spends steps on it, and a buried constraint is easier to miss. [Liu and colleagues](https://doi.org/10.1162/tacl_a_00638) showed, on question-answering and a synthetic retrieval task, that models use the start and end of a long prompt more reliably than the middle. That is not a Rails study. It is a reason to keep the task packet small and to put the invariant in a place the model will actually read.

[Anthropic’s engineering note of 29 September 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) gives the same advice from the vendor side: keep the smallest set of high-signal tokens. Treat that as practitioner guidance, not as a trial on product teams.

When the written summary and the code can diverge, send the assistant to the code. “Tenant isolation works like the note from March” is a stale summary. `app/models/current.rb`, `SetCurrentTenant`, and a cross-tenant spec are the implementation. The note earns its place when it records a decision the code does not shout, such as “do not introduce schema-per-tenant” or “do not trust the client’s `organization_id`.”

A task packet I would actually paste, for a change that follows rules already in the repo:

```text
Task: GET a stockable product's stock_movements for the current organization.
Acceptance:
- ADMIN and CASH_REGISTER can read movements for a product in their org.
- A user in another org gets 404, not an empty list of someone else's rows.
- Response errors use ApiErrorRenderable, not errors.full_messages.
- Dish is not stockable. A dish id does not hit this endpoint.
Constraints:
- Set organization from Current. Ignore organization_id in params.
- Follow Inventory::RecordMovement and StockMovement. Do not put the query in the controller.
- Add spec/security/cross_tenant coverage. Do not run db:migrate.
Read first:
- docs/decisions/001-shared-schema-multi-tenant.md
- docs/context/inventory-stock.md
- app/services/inventory/record_movement.rb
Out of scope: low-stock thresholds, reindex, OpenSearch.
```

That packet names the files to open, the behavior that must hold, and the work that is out of scope. It does not paste the architecture document.

## 3. Plan before implementing, when the change can fail in more than one way

A plan is worth writing when the change has an order, a dependency, or a check that is not obvious from the ticket. A null-check in one method does not need a plan. A new endpoint that touches authorization, a polymorphic product, and the public error contract does.

The sequence is requirement, acceptance criteria, plan, change, verification. The plan is not a list of files for the assistant to edit. Each step ends when a check passes.

This is an illustrative plan for the read endpoint above. I have not shipped that endpoint. `stock_movements` already exist, written by `Inventory::RecordMovement`, and the manual adjustment route is `PATCH /api/v1/{beers|wines|drinks|foods}/:id/stock` for `ADMIN` and `CASH_REGISTER`. The plan uses those facts, including those roles, so the steps match the repository rather than a generic CRUD sketch.

```text
Plan: list stock movements for one product
Status: example only
Branch: feature/stock-movements-index

Out of scope: pagination design beyond a sane default, CSV export, backfill.

Step 1. Query
- Add a scoped lookup: movements for this product and Current.organization, newest first.
- Dish and unknown ids never reach the query.
Done when: a model or service spec covers same-org rows, other-org rows, and a dish.

Step 2. HTTP
- GET on the existing product routes, ADMIN and CASH_REGISTER only.
- 404 when the product is missing or belongs to another org.
- Errors through ApiErrorRenderable.
Done when: a request spec and spec/security/cross_tenant/ pass.

Step 3. Contract
- rswag example and openapi:drift_check.
Done when: drift check passes. Do not run migrations.
```

The dependency is deliberate. The query spec can fail before any controller exists, so a wrong scope is caught without a debate about JSON shape. The cross-tenant spec is a step of its own because a request spec that builds one organization will not catch an IDOR. The contract update is last because generating OpenAPI from a handler that still returns the wrong status code freezes the mistake.

Edge cases belong in the acceptance lines, not in a brainstorm the assistant is free to drop: another tenant’s product id, a dish, a product with zero movements, a role that can adjust stock versus a role that cannot. Files likely to change are the service, the routes, one controller, the request spec, the cross-tenant spec, and the OpenAPI artifact. If the assistant starts editing Searchkick or `Current`, the plan is no longer the plan. Stop and put the work back in scope or out of it.

For a one-line fix, the same discipline is the ticket plus the spec that should fail first. Writing a three-step plan around a typo is how structure becomes slower than the change.

## 4. Use decision records to preserve a choice the code will not repeat for you

An architecture decision record, in the form [Michael Nygard described in 2011](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions), is a short note: the context, the decision, the status, and the consequences. I have not found a controlled study that shows these notes make a coding assistant obey an architecture. Use one when the decision is easy to “improve” away.

ubuteco’s ADR 001 is that kind of decision. The product serves many restaurant organizations. The accepted design is one PostgreSQL schema, `organization_id` on tenant-owned tables, and `Current.organization` for the request. Schema-per-tenant was considered and rejected, because migrations and CI stay ordinary Rails, with the explicit cost that every query and ability must scope the tenant. A later reader, human or assistant, who proposes the Apartment gem is not filling a gap. They are reopening a closed decision. The ADR is what makes that visible. The model will not infer a rejection from the absence of a second schema.

ADR 006 is the consequence the code hides. `Current` is `ActiveSupport::CurrentAttributes`, set in `SetCurrentTenant` and cleared after the request. Sidekiq has no tenant. Jobs either pass `organization_id` or set `Current` and call `Current.reset` in `ensure`. The pitfall file says agents assume `Current.organization` is simply available in background code. The ADR exists so the next job does not ship that assumption.

A useful record has five parts, and only those:

- The problem, including the constraint that forced a choice.
- The decision, in one or two sentences a diff can be checked against.
- The alternatives that were rejected, so they do not come back as fresh ideas.
- The consequences, including the extra tests or the operational rule.
- The status. A superseded ADR that still reads as accepted is a trap.

Paste the record into the task when the change can violate it. Do not paste the whole `docs/decisions/` directory into a copy edit. An ADR that nobody opens, or that contradicts the code, is a second source of truth. Prefer the code, and fix or delete the note.

## 5. Implement in slices a person can review

Oversight is not the moment at the end where you skim a thousand-line diff and click merge. It is the decision, after each coherent slice, that the slice matches the step you asked for.

On the stock-movements plan, that looks like this.

1. Ask for the plan first if the assistant has not been given one. Correct the plan before any file changes. A wrong plan executed cleanly is still the wrong change.
2. Implement step 1 only. The service and its spec. Review the diff for `organization_id` from params, for a `default_scope` that hides the tenant instead of an explicit scope, and for edits outside inventory.
3. Run the spec named in the plan. Read the failure. Do not let the assistant widen the assertion until the example passes.
4. Implement the request and the cross-tenant spec. Review status codes and roles before talking about JSON polish.
5. Update the contract. Run the drift check.
6. If a step reveals that movements are not indexed the way the plan assumed, stop. Revise the plan. Do not let the assistant “also” rewrite reindexing while it is in there.

Unrelated refactoring is the usual way a small task becomes unreviewable. A drive-by rename, a new abstraction around `Current`, or a formatting pass on an untouched file hides the behavior change. The instruction is simple: do not edit files the step does not need. When the assistant does it anyway, revert that hunk and continue. Accepting it because the tests are green teaches the next session that the extra edit was part of the task.

Keep the work on one branch, `feature/<slug>`, which is already the rule in that repo. Use a separate worktree when the assistant should not touch your working copy, and delete it when the spike is over.

The assistant will state assumptions as facts. “All products are stockable.” “`Current` is set in jobs.” “404 leaks tenant existence, so return an empty list.” Each of those contradicts a written rule. The review is there to catch the sentence, not only the Ruby. If you cannot explain why the diff is shaped the way it is, you do not understand it well enough to merge it. That is the oversight. Approval of an unread patch is not.

## 6. Verification is part of done

“It compiles” and “the assistant reports success” are the same claim. Neither is done.

On ubuteco_api the checks I expect before a pull request are the ones in the root file: RuboCop, RSpec, Brakeman, bundler-audit, and `openapi:drift_check` when the contract changes. `bin/ci` runs that set. A cross-tenant example lives in `spec/security/cross_tenant/` and uses two organizations. A request spec that only ever authenticates a user from the factory’s default org will not fail an IDOR.

Tests the assistant writes are not the same thing as acceptance criteria you wrote first. If the model implements “return [] for another tenant” and then asserts `eq([])`, the test reproduces the bug. Write the example you care about before the implementation, or take it from a plan line the assistant did not author: another org’s product id returns 404, and the response body contains no foreign rows. When you do let the assistant add coverage, read the expectations. A test that stubs the scope and asserts the stub was called does not test isolation.

For a migration, done includes a reversible change, the absence of a table rewrite you did not intend, and the rule that the assistant does not run `db:migrate` against a shared database unless you asked. For authorization, done includes the role that must be rejected, not only the role that must succeed. For a deletion tool, done includes the case the product must refuse.

Rails Capacity Lab is a mountable engine I am building for bounded load tests. It is not published. Its defaults are closed: the dashboard returns 403 until the host sets an authorization callback, load tests stay off, and production targets need a second flag. ADR-0020 records that the sample app does not store a throughput or capacity figure, because a number from one laptop would read as a result. An assistant that “finishes” the sample by committing a k6 summary has violated the decision, even though the JSON is well formed. The check is “no capacity number in the diff,” and a unit test will not invent that check for you.

On Facebook Activity Cleaner, `npm test` is necessary and not sufficient. The suite uses `tests/fixtures/activity-log.html`. A passing run that was achieved by adding a switch to turn protection off is a failed change. The diff has to be read for `disableProtection`, `--no-respect-protection`, and any path that marks an activity deleted without an observation. Live `--execute` against a real account is not a test.

CI is the same commands, on a clean machine, for the pull request. If it only runs on your laptop, you do not have a reproducible check. If it runs and you merge a red pipeline because the assistant said the failure is unrelated, you have switched the definition of done back to the assistant’s summary.

## 7. Keep standing context true, and keep plans temporary

Three kinds of writing get mixed together, and only one of them should be durable.

Standing instructions and ADRs describe rules that are still in force. They are updated in the commit that changes the rule, or they are deleted. ubuteco keeps domain notes in `docs/context/` and decisions in `docs/decisions/`. The pitfall file is the log of agent mistakes worth telling the next session. That file is useful only while each line is still true.

Plans in `docs/plans/` are temporary. They have a status, checkboxes, and a definition of done. When the work ships, the plan is done. It is not a second architecture document. Leaving a finished plan’s half-updated checkboxes as if they were the API contract is how drift starts. The repo has `bin/plans_drift_check` because the plan header and the index were already getting out of sync.

Discoveries that will matter later move out of the plan and into the durable place: a new invariant into the ADR or the root file, a repeated agent mistake into the pitfall list. A one-off workaround stays in the pull request. Not every change deserves a documentation edit. A copy fix does not get an ADR. A new tenant rule does.

Duplicate sources of truth are the failure mode. If the root file, the ADR, and a comment in `Current` disagree, the assistant will follow one of them at random. Pick the code as the behavior, pick one document as the decision, and make the other a pointer.

A structure that has stayed small enough to keep current:

```text
AGENTS.md                 # invariants, forbidden commands, how to run checks
docs/decisions/           # accepted choices and rejected alternatives
docs/context/             # domain behavior the code does not explain by itself
docs/plans/               # in-progress work, retired when the branch merges
```

Add a directory when a real split appears. Do not add a process document that tells you how to write the other documents.

## 8. Match the process to the risk

The aim is enough structure for the risk you are taking. Maximum process is a tax on the changes that were never going to violate an invariant.

```text
Change            What you load                         Plan              Done
----------------  -------------------------------------  ----------------  ------------------------------
Small, low risk   The task and the code beside it       None              The existing spec, and the diff
Medium            The domain note and the one invariant Short, with checks Targeted specs, then CI
High risk         The ADR, the invariant, the threat    Staged steps      Specs, security tools, a human
```

**Small.** A bug in one method, a rename the type checker covers, a copy change. Give the assistant the failing example and the file. Skip the architecture tour. Read the diff for drive-by edits. If the fix spreads to a second subsystem, stop treating it as small.

**Medium.** A feature across a few files that stays inside one boundary. The stock-movements read is this category: one resource, one tenant rule, one contract update. Load the inventory note and ADR 001, not the whole `docs/` tree. Write the short plan from section 3. Require the cross-tenant spec because the bug you care about is an IDOR, which a single-org request spec misses.

**High risk.** Authentication, authorization, tenant isolation, payments, destructive deletion, and migrations that rewrite data. Load the ADR and the invariant in the prompt, not as optional reading. Stage the work. Run the security scanner you already have. Read the diff yourself before it merges. On the activity cleaner, this category includes any change to eligibility, confirmation phrases, or protection. On Rails Capacity Lab, it includes allowlists, production opt-in, and anything that would send source or secrets to a model. On ubuteco, it includes a change to `SetCurrentTenant`, abilities, or a job that touches tenant rows.

[Barke, James, and Polikarpova](https://doi.org/10.1145/3586030) watched 20 programmers using Copilot and described two modes: acceleration, when the person already knows the next step, and exploration, when they do not. The table matches that split. Acceleration, the small row, suffers when you make the assistant read a manual. Exploration and high-risk work suffer when you hand over a sentence and accept the first diff.

If you cannot name the invariant the change might break, you are not in the small row yet. Spend five minutes finding it. That is the process.

## 9. What the evidence supports, and where it stops

These studies do not measure the workflow above. They measured different tools, on different tasks, often with no human review. I am not going to pretend they sum to a productivity percentage for this practice.

**Code completion during ordinary or assigned work.** [Peng, Kalliamvakou, Cihon, and Demirer](https://arxiv.org/abs/2302.06590) asked freelancers in 2022 to build a JavaScript HTTP server. Ninety-five developers were randomized. The paper says thirty-five from both the Copilot group and the control group finished. Among those who finished, mean time was 71.17 minutes with Copilot and 160.89 without, 55.8% faster, with a 95% interval of 21% to 89%. The authors say they did not measure code quality. The task was a new program, not a change to a system you already run.

[Cui, Demirer, Jaffe, Musolff, Peng, and Salz](https://doi.org/10.1287/mnsc.2025.00535), in Management Science on 27 February 2026, report three company field experiments, 4,867 developers, with randomized access to Copilot. Their preferred estimate is that usage raised completed weekly tasks by 26.08% (standard error 10.3%). The experiments are noisy one by one. Less experienced developers adopted the tool more and gained more. Several authors are at Microsoft Research. The treatment is completion inside normal work, not a repository agent following a plan.

[Vaithilingam, Zhang, and Glassman](https://doi.org/10.1145/3491101.3519665) found no significant gain in time or success among 24 participants, and 19 of them still preferred Copilot.

**Experienced maintainers, early 2025.** [Becker, Rush, Barnes, and Rein](https://arxiv.org/abs/2507.09089) randomized 246 real issues across 16 maintainers. With early-2025 tools allowed, mostly Cursor and Claude 3.5 or 3.7 Sonnet, tasks took 19% longer. Beforehand the developers expected to be 24% faster. Afterward they still believed they had been 20% faster. On [24 February 2026](https://metr.org/blog/2026-02-24-uplift-update/) the same group said a follow-up was too biased to interpret, because people refused work that disallowed AI. That 19% belongs to that period and those maintainers.

**Security.** [Perry, Srivastava, Kumar, and Boneh](https://doi.org/10.1145/3576915.3623157) found that 47 participants with `codex-davinci-002` wrote less secure solutions on four of five tasks and were more likely to believe the code was secure. [Pearce, Ahmad, Tan, Dolan-Gavitt, and Karri](https://doi.org/10.1109/SP46214.2022.9833571) prompted Copilot itself on 89 scenarios and judged about 40% of 1,689 programs vulnerable. One study is about people. The other is about completions. Both are reasons the high-risk row in section 8 includes a human reading the diff. Neither is a 2026 agent on a mature Rails app.

**Instruction files for autonomous agents.** These papers disagree, and none of them includes the review loop in section 5.

- [Lulla and colleagues](https://arxiv.org/abs/2601.20404), a preprint, ran Codex on 124 merged pull requests, each at most 100 lines and five files. With `AGENTS.md` present, median runtime fell 28.64% and median output tokens fell 16.58%. They did not evaluate correctness.
- [Gloaguen and colleagues](https://arxiv.org/abs/2602.11988), a preprint I checked on 28 October 2026, did not find a general gain in task success from context files, and reported inference cost up by more than 20% on average. Developer-written files beat model-generated files by about 7% on average. Agents followed instructions. A repository overview did not help them locate the relevant code. An earlier PDF of the same work used different point estimates. Cite the current arXiv text.
- [Khatri](https://aclanthology.org/2026.realm-1.5.pdf), a REALM 2026 workshop paper, found no detectable correctness effect of context injection across 17 tasks. The study is too small to rule out a modest effect. Failures looked like implementation mistakes, not missing facts a context file would have supplied.
- [Zhang and colleagues](https://arxiv.org/abs/2604.11088), a preprint, saw rule bundles 7 to 14 percentage points above a no-rule baseline on SWE-bench Verified, but random rules matched curated rules, and the closest pairwise test was p = 0.077. Taken one at a time, negative constraints helped and positive style instructions hurt. That is suggestive for the “write the prohibition” advice in section 1. It is not a settled result, and it is not a study of interactive editing.

**Perception.** [Ziegler and colleagues](https://doi.org/10.1145/3520312.3534864) found that suggestion acceptance rate best tracked how productive 2,631 Copilot users felt (correlation 0.24). [Forsgren and colleagues](https://queue.acm.org/detail.cfm?id=3454124) argued in 2021 that no single activity metric is productivity. Feeling fast is not a verified change.

What nobody has published, that I can cite, is a controlled comparison of a human using an ordinary assistant session against the same human using a context packet, a plan, the relevant ADR, review checkpoints, and tests. Agent benchmarks do not establish that comparison. My repositories do not establish it either. They are where the rules came from, not a scoreboard.

## 10. A workflow you can use on the next feature

1. Write the task and the acceptance criteria, including the case that must fail.
2. Load the standing rules and the one domain note this change can violate. Leave the rest on disk.
3. Have the assistant read the implementation and the existing tests before it edits. Correct any assumption that contradicts them.
4. Decide the row in section 8. A plan or an ADR is for the medium and high-risk rows, and only the ADR that this change can break.
5. Split the work so each step has a check that can fail on its own.
6. Implement one step. Read the diff. Revert unrelated edits.
7. Run the checks from section 6. Do not accept “tests passed” from the transcript without the command and the output.
8. Update `AGENTS.md` or an ADR only when the decision changed. Mark the plan done. Do not copy the plan into the durable docs.
9. If the assistant hit a mistake you will see again, add one line to the pitfall list. If you will not see it again, leave it in the pull request.

Checklist before you send a medium or high-risk task:

- [ ] Acceptance criteria include the negative case.
- [ ] The invariant is in the prompt, not only in a doc you hope will be opened.
- [ ] Out of scope is explicit.
- [ ] The first check does not depend on the assistant’s own test.
- [ ] Migrations, production data, and destructive commands are called out as manual.
- [ ] You know which diff hunks you intend to read yourself.

The stock-movements packet in section 2 is the minimal brief. For a high-risk change, add the ADR excerpt and the exact command that must stay forbidden. Then stop writing and let the tool look at the code.

## Closing

Generating code is the easy part to see. A verified change is the acceptance criteria, the constraints the architecture already chose, a diff you can explain, and checks that were not written to flatter the implementation.

How much of the workflow you use depends on the blast radius, on the tests you already have, and on the model in front of you. A small, local fix should stay small. Tenant isolation, deletion, payments, and migrations should not. Extra documents do not buy safety. Current documents, consulted for the task that can violate them, are the part that earns their keep.

I will keep writing the invariants down, planning the changes that can fail in more than one way, and treating a green transcript as a claim to verify. I will not pretend that ritual is a measured speedup. The studies we have point in different directions, and the workflow in this article is still an engineering judgment.

## References

- Peng, Kalliamvakou, Cihon, and Demirer. [The Impact of AI on Developer Productivity: Evidence from GitHub Copilot](https://arxiv.org/abs/2302.06590). arXiv:2302.06590, 2023.
- Cui, Demirer, Jaffe, Musolff, Peng, and Salz. [The Effects of Generative AI on High-Skilled Work](https://doi.org/10.1287/mnsc.2025.00535). Management Science, 27 February 2026.
- Becker, Rush, Barnes, and Rein. [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://arxiv.org/abs/2507.09089). arXiv:2507.09089, 2025. Follow-up note, [24 February 2026](https://metr.org/blog/2026-02-24-uplift-update/).
- Vaithilingam, Zhang, and Glassman. [Expectation vs. Experience](https://doi.org/10.1145/3491101.3519665). CHI EA 2022.
- Perry, Srivastava, Kumar, and Boneh. [Do Users Write More Insecure Code with AI Assistants?](https://doi.org/10.1145/3576915.3623157). CCS 2023.
- Pearce, Ahmad, Tan, Dolan-Gavitt, and Karri. [Asleep at the Keyboard?](https://doi.org/10.1109/SP46214.2022.9833571). IEEE S&P 2022.
- Lulla, Mohsenimofidi, Galster, Zhang, Baltes, and Treude. [On the Impact of AGENTS.md Files](https://arxiv.org/abs/2601.20404). arXiv:2601.20404, preprint, 2026.
- Gloaguen, Mündler, Müller, Raychev, and Vechev. [Evaluating AGENTS.md](https://arxiv.org/abs/2602.11988). arXiv:2602.11988, preprint. Text checked 28 October 2026.
- Khatri. [Do Context Files Help Coding Agents?](https://aclanthology.org/2026.realm-1.5.pdf). REALM 2026.
- Zhang, Wang, Cui, Qiu, Li, Zhu, and He. [Do Agent Rules Shape or Distort?](https://arxiv.org/abs/2604.11088). arXiv:2604.11088, preprint.
- Ziegler and colleagues. [Productivity Assessment of Neural Code Completion](https://doi.org/10.1145/3520312.3534864). MAPS 2022.
- Forsgren, Storey, Maddila, Zimmermann, Houck, and Butler. [The SPACE of Developer Productivity](https://queue.acm.org/detail.cfm?id=3454124). ACM Queue, 2021.
- Barke, James, and Polikarpova. [Grounded Copilot](https://doi.org/10.1145/3586030). OOPSLA 2023.
- Liu, Lin, Hewitt, Paranjape, Bevilacqua, Petroni, and Liang. [Lost in the Middle](https://doi.org/10.1162/tacl_a_00638). TACL 2024.
- Nygard. [Documenting Architecture Decisions](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions). 15 November 2011.
- [AGENTS.md](https://agents.md/). Format description, checked 28 October 2026.
- Anthropic. [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents). 29 September 2025.

An assistant helped draft this page and check those sources. I am responsible for what it claims.
