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

## 1. Give the assistant durable project knowledge

A root instruction file such as `AGENTS.md` is a place for facts the assistant would otherwise rediscover wrong. [The format itself](https://agents.md/) is plain Markdown, with no required fields. The project site says the filename appears in over 60,000 open-source repositories. That number is the site's own claim, not a finding that the files improve correctness.

Precedence is not part of the format. The site's FAQ says the closest file to the edited path wins, and an explicit chat prompt overrides the file. That is the FAQ. Codex documents a different merge: it concatenates files from the project root downward, and a later file overrides an earlier one. [Cursor's docs](https://cursor.com/docs/rules), which are the ones I run, say nested `AGENTS.md` files are combined with their parents and the more specific file wins that conflict. Team rules, project rules, and user rules are separate layers, and the docs put project rules ahead of user rules. When this chat and the file disagree, I review the diff against the instruction I gave for the task. I do not assume the tool resolved the clash for me.

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

A stock adjustment and a copy change do not need the same packet. For a new read of `stock_movements` in ubuteco, the packet that matters is the tenant rule, the role rule, the error shape, and the test directory. The search cluster, the cable server, and the currency ADR are noise on that task. A buried constraint is easier to miss, so the packet stays small and the invariant sits where it will actually be read.

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

The sequence is requirement, acceptance criteria, plan, change, verification. Each step ends when a check passes.

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

An architecture decision record, in the form [Michael Nygard described in 2011](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions), is a short note: the context, the decision, the status, and the consequences. Use one when the decision is easy to “improve” away. The note makes the closed choice visible. It does not, by itself, make an assistant follow it.

ubuteco’s ADR 001 is that kind of decision. The product serves many restaurant organizations. The accepted design is one PostgreSQL schema, `organization_id` on tenant-owned tables, and `Current.organization` for the request. Schema-per-tenant was considered and rejected, because migrations and CI stay ordinary Rails, with the explicit cost that every query and ability must scope the tenant. A later reader, human or assistant, who proposes the Apartment gem is not filling a gap. They are reopening a closed decision. The ADR is what makes that visible. The model will not infer a rejection from the absence of a second schema.

ADR 006 is the consequence the code hides. `Current` is `ActiveSupport::CurrentAttributes`, set in `SetCurrentTenant` and cleared after the request. Sidekiq has no tenant. Jobs either pass `organization_id` or set `Current` and call `Current.reset` in `ensure`. The pitfall file says agents assume `Current.organization` is simply available in background code.

`ReindexJob` is the implemented form of that rule. ADR 006 names it. A full-class reindex is refused. The organization path takes `organization_id`, assigns `Current.organization` from that id, and `Current.reset` runs in `ensure`. The spec calls `perform` without setting `Current` first, expects the reindex to use the id argument, and expects `Current.organization` to be nil afterward.

The shape the pitfall list is there to stop reads the tenant from whatever the thread still holds:

```ruby
def perform(model_name)
  model_name.constantize.reindex_for_organization(Current.organization.id)
end
```

After the request that enqueued the job, `Current.organization` is nil, so this raises. If a previous job set `Current` and skipped `reset`, the same method would reindex that leftover tenant. The version in the repo does not do that:

```ruby
def perform(model_name, record_id = nil, organization_id = nil)
  model = model_name.constantize
  if organization_id.present?
    Current.organization = Organization.find_by(id: organization_id)
    model.reindex_for_organization(organization_id)
  end
ensure
  Current.reset
end
```

That block is shortened. The file also refuses a call with neither id, and the organization branch handles `Organization` itself. I am not quoting a production incident. I am quoting the assumption ADR 006 already wrote down, and the job and spec that lock the correction. A spec that only stubs `reindex`, and never checks the id or the reset, would let the first version through.

A useful record has five parts, and only those:

- The problem, including the constraint that forced a choice.
- The decision, in one or two sentences a diff can be checked against.
- The alternatives that were rejected, so they do not come back as fresh ideas.
- The consequences, including the extra tests or the operational rule.
- The status. A superseded ADR that still reads as accepted is a trap.

Paste the record into the task when the change can violate it. Do not paste the whole `docs/decisions/` directory into a copy edit. An ADR that nobody opens, or that contradicts the code, is a second source of truth. Prefer the code, and fix or delete the note.

## 5. Implement in slices a person can review

On the stock-movements plan, a reviewable slice looks like this.

1. Ask for the plan first if the assistant has not been given one. Correct the plan before any file changes. A wrong plan executed cleanly is still the wrong change.
2. Implement step 1 only. The service and its spec. Review the diff for `organization_id` from params, for a `default_scope` that hides the tenant instead of an explicit scope, and for edits outside inventory.
3. Run the spec named in the plan. Read the failure. Do not let the assistant widen the assertion until the example passes.
4. Implement the request and the cross-tenant spec. Review status codes and roles before talking about JSON polish.
5. Update the contract. Run the drift check.
6. If a step reveals that movements are not indexed the way the plan assumed, stop. Revise the plan. Do not let the assistant “also” rewrite reindexing while it is in there.

Keep the work on one branch, `feature/<slug>`, which is already the rule in that repo. Use a separate worktree when the assistant should not touch your working copy, and delete it when the spike is over.

The assistant will state assumptions as facts. “All products are stockable.” “`Current` is set in jobs.” “404 leaks tenant existence, so return an empty list.” Each of those contradicts a written rule. The review is there to catch the sentence, not only the Ruby.

## 6. Verification is part of done

On ubuteco_api the checks before a pull request are the ones `bin/ci` runs: RuboCop, RSpec, Brakeman, bundler-audit, `openapi:drift_check`, and `bin/plans_drift_check`. A cross-tenant example lives in `spec/security/cross_tenant/` and uses two organizations. A request spec that only ever authenticates a user from the factory’s default org will not fail an IDOR.

Tests the assistant writes are not the acceptance criteria you wrote first. If the model implements “return [] for another tenant” and then asserts `eq([])`, the test reproduces the bug. Write the example you care about before the implementation, or take it from a plan line the assistant did not author: another org’s product id returns 404, and the response body contains no foreign rows. A test that stubs the scope and asserts the stub was called does not test isolation.

Rails Capacity Lab is a mountable engine that still lives only on my machine. There is no public remote, so you cannot open the initializer or the specs. The decision I will state without asking you to trust a path is ADR-0020: the sample app does not store a throughput or capacity figure, because a number from one laptop would read as a result. Committing a k6 summary to “finish” the sample violates that decision. For behavior you can read, use [ubuteco_api](https://github.com/Sartori-RIA/ubuteco_api) and [Facebook Activity Cleaner](https://github.com/Sartori-RIA/facebook_activity_cleaner).

On the cleaner, `npm test` uses `tests/fixtures/activity-log.html`. A passing run that was achieved by adding a switch to turn protection off is a failed change. Look for `disableProtection`, `--no-respect-protection`, and any path that marks an activity deleted without an observation. Live `--execute` against a real account is not a test.

If CI is red and the assistant says the failure is unrelated, done has moved back to the assistant’s summary.

## 7. Keep standing context true, and keep plans temporary

Standing instructions and ADRs describe rules that are still in force. They change in the same commit as the code, or they are deleted. ubuteco keeps domain notes in `docs/context/` and decisions in `docs/decisions/`. The pitfall file is the log of agent mistakes worth telling the next session. A line that is no longer true is worse than no line.

Plans in `docs/plans/` are temporary. When the work ships, the plan is done. The mismatch the repo recorded is the plan index status disagreeing with the `Status:` header inside the plan file. `docs/context/common-ai-pitfalls.md` names that row, and `bin/plans_drift_check` is the remedy. `bin/ci` runs it. RSpec does not. I do not know whether the check reduces agent mistakes.

If the root file, the ADR, and a comment in `Current` disagree, the assistant will follow one of them. Pick the code as the behavior and one document as the decision.

A structure that has stayed small enough to keep current:

```text
AGENTS.md                 # invariants, forbidden commands, how to run checks
docs/decisions/           # accepted choices and rejected alternatives
docs/context/             # domain behavior the code does not explain by itself
docs/plans/               # in-progress work, retired when the branch merges
```

Add a directory when a real split appears. Do not add a process document that tells you how to write the other documents.

## 8. Match the process to the risk

The aim is enough structure for the risk you are taking. A one-line copy change in `config/locales` does not need ADR 001, a plan file, or a reread of the inventory note. Paste the string, the file, and the spec or screen that shows the old text. If that “typo” starts changing who can call the endpoint, it has left the small row. Stop and name the invariant before the assistant keeps going.

Maximum process is a tax on the changes that were never going to violate an invariant.

```text
Change            What you load                         Plan              Done
----------------  -------------------------------------  ----------------  ------------------------------
Small, low risk   The task and the code beside it       None              The existing spec, and the diff
Medium            The domain note and the one invariant Short, with checks Targeted specs, then CI
High risk         The ADR, the invariant, the threat    Staged steps      Specs, security tools, a human
```

**Small.** A bug in one method, a rename the type checker covers, a copy change. Give the assistant the failing example and the file. Skip the architecture tour. Read the diff for drive-by edits. If the fix spreads to a second subsystem, stop treating it as small.

**Medium.** A feature across a few files that stays inside one boundary. The stock-movements read is this category: one resource, one tenant rule, one contract update. Load the inventory note and ADR 001, not the whole `docs/` tree. Write the short plan from section 3. Require the cross-tenant spec because the bug you care about is an IDOR, which a single-org request spec misses.

**High risk.** Authentication, authorization, tenant isolation, payments, destructive deletion, and migrations that rewrite data. Load the ADR and the invariant in the prompt, not as optional reading. Stage the work. Run the security scanner you already have. Read the diff yourself before it merges. On the activity cleaner, this category includes any change to eligibility, confirmation phrases, or protection. On ubuteco, it includes a change to `SetCurrentTenant`, abilities, or a job that touches tenant rows.

[Barke, James, and Polikarpova](https://doi.org/10.1145/3586030) watched 20 programmers using Copilot and described two modes: acceleration, when the person already knows the next step, and exploration, when they do not. The distinction offers a useful way to think about the table: familiar, bounded work can benefit from a lighter process, while unfamiliar or high-risk work calls for more explicit constraints and review. That is my application of the distinction, not a result tested by the study.

If you cannot name the invariant the change might break, you are not in the small row yet. Spend five minutes finding it. That is the process.

## 9. What research can tell you

These studies did not measure the workflow in this article. They measured different tools, on different tasks, usually without the review loop in section 5. I have not run a controlled comparison of my own.

Completion research does not point one way. A [controlled GitHub Copilot experiment](https://arxiv.org/abs/2302.06590), run in 2022 and reported in a 2023 preprint, found that people who finished a new JavaScript server were substantially faster. The authors did not measure code quality. That result is about those finishers and that task, not about development work in general. [Three company field experiments](https://doi.org/10.1287/mnsc.2025.00535) later found more completed weekly tasks where Copilot was used, with a wide error bar, and larger gains for less experienced developers. That treatment is inline completion during ordinary work. A [2022 lab study](https://doi.org/10.1145/3491101.3519665) found no significant gain in time or success, and most participants still preferred the tool. In early 2025, [experienced open-source maintainers](https://arxiv.org/abs/2507.09089) were slower with AI tools allowed, and they believed they had been faster. In February 2026 the [same group](https://metr.org/blog/2026-02-24-uplift-update/) said a later run is not a reliable update. Developers were declining tasks that disallowed AI, the pay was lower, and time was hard to record when several agents ran together. METR treats that run as a weak signal. It does not replace the early-2025 slowdown, and it is not a measurement of this workflow.

Security research is more consistent, and it is still not a 2026 agent on a mature codebase. In one [user study](https://doi.org/10.1145/3576915.3623157), people with an assistant wrote less secure solutions and were more likely to believe the code was secure. In another, a large share of [Copilot completions](https://doi.org/10.1109/SP46214.2022.9833571) for risky prompts were vulnerable. That is why the high-risk row includes a person reading the diff.

Context-file research, all of it on autonomous agents, disagrees with itself. On small pull requests, [one preprint](https://arxiv.org/abs/2601.20404) found lower runtime and fewer output tokens when `AGENTS.md` was present, and did not score correctness. [Another](https://arxiv.org/abs/2602.11988), checked on 28 October 2026, found no general gain in task success and higher inference cost. Developer-written files beat model-generated ones, and were not a clear improvement on having no file. A repository overview did not help the agent find the right code. A [small workshop study](https://aclanthology.org/2026.realm-1.5.pdf) found no detectable correctness effect. A [rules preprint](https://arxiv.org/abs/2604.11088) saw bundles ahead of a no-rule baseline, random rules matching curated ones, and negative constraints looking better than style instructions when tested one at a time. The closest contrast against the no-rule baseline did not clear the usual significance line. I use that last result only as a reason to write the prohibition the code will not show. I do not use it as proof that an instruction file makes a model behave.

```text
Evidence                         Supports                         Does not support
-------------------------------  -------------------------------  ---------------------------------
Completion, new or daily work    Speed and task counts vary       Quality, or this review loop
Experienced maintainers, 2025    They were slower, and felt fast  A claim about current models
Security labs                    Review the sensitive diff        Today's agent on a Rails app
Context files, agents only       Mixed cost and weak correctness A human using a plan and an ADR
```

The useful limit is the last column. `AGENTS.md` and ADRs are how I keep a constraint visible. They are not a productivity result.

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

A verified change is the acceptance criteria, the constraints the architecture already chose, a diff you can explain, and checks that were not written to flatter the implementation.

How much of the workflow you use depends on the blast radius, on the tests you already have, and on the model in front of you. A locale string stays a locale string. Tenant isolation, deletion, payments, and migrations get the invariant in the prompt and a person on the diff. A current note, opened because this change can break it, is the note that earns its place.

I will keep writing those invariants down, planning the changes that can fail in more than one way, and reading the command output before I trust a green transcript.

## References

The references below include peer-reviewed studies and preprints. Findings from preprints are identified as such; results should be interpreted in the context of each study's design and limitations.

- Peng, Kalliamvakou, Cihon, and Demirer. [The Impact of AI on Developer Productivity: Evidence from GitHub Copilot](https://arxiv.org/abs/2302.06590). arXiv preprint, 2023. The experiment ran in 2022. People who finished a new JavaScript server were faster. Code quality was not measured.
- Cui, Demirer, Jaffe, Musolff, Peng, and Salz. [The Effects of Generative AI on High-Skilled Work](https://doi.org/10.1287/mnsc.2025.00535). Management Science, 27 February 2026. More completed tasks where Copilot was used. The estimate is noisy, and less experienced developers gained more. Inline completion, not a planned agent workflow.
- Vaithilingam, Zhang, and Glassman. [Expectation vs. Experience](https://doi.org/10.1145/3491101.3519665). CHI EA 2022. No significant gain in time or success. Most participants still preferred Copilot.
- Becker, Rush, Barnes, and Rein. [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://arxiv.org/abs/2507.09089). arXiv preprint, 2025. Experienced maintainers were slower with early-2025 tools and believed they had been faster. A [February 2026 note](https://metr.org/blog/2026-02-24-uplift-update/) from the same group says a later run is too affected by selection to replace that result.
- Perry, Srivastava, Kumar, and Boneh. [Do Users Write More Insecure Code with AI Assistants?](https://doi.org/10.1145/3576915.3623157). CCS 2023. Less secure solutions, and more confidence that the code was secure.
- Pearce, Ahmad, Tan, Dolan-Gavitt, and Karri. [Asleep at the Keyboard?](https://doi.org/10.1109/SP46214.2022.9833571). IEEE S&P 2022. A large share of Copilot completions for risky prompts were judged vulnerable. Completions, not a user study.
- Lulla, Mohsenimofidi, Galster, Zhang, Baltes, and Treude. [On the Impact of AGENTS.md Files on the Efficiency of AI Coding Agents](https://arxiv.org/abs/2601.20404). arXiv preprint, 2026. Found lower median runtime and output-token use in a limited set of pull requests; correctness was not evaluated.
- Gloaguen, Mündler-Sasahara, Müller, Raychev, and Vechev. [Evaluating AGENTS.md](https://arxiv.org/abs/2602.11988). arXiv preprint. No general gain in task success, and higher inference cost. Developer-written files beat model-generated ones, without a clear gain over having no file. An earlier PDF of this preprint used different point estimates. Cite the arXiv version linked here, checked on 28 October 2026.
- Khatri. [Do Context Files Help Coding Agents?](https://aclanthology.org/2026.realm-1.5.pdf). REALM 2026 workshop paper. No detectable correctness effect. Too small to rule out a modest one.
- Zhang, Wang, Cui, Qiu, Li, Zhu, and He. [Do Agent Rules Shape or Distort?](https://arxiv.org/abs/2604.11088). arXiv preprint. Rule bundles beat a no-rule baseline, and random rules matched curated ones. The closest contrast against the baseline was not significant. Agent runs, not an interactive editing study.
- Barke, James, and Polikarpova. [Grounded Copilot](https://doi.org/10.1145/3586030). OOPSLA 2023. Programmers using Copilot either accelerate work they already understand or explore work they do not.
- Nygard. [Documenting Architecture Decisions](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions). 15 November 2011. A documentation practice, not an AI study.
- [AGENTS.md](https://agents.md/). Format description, not an efficacy study. The site's adoption count is its own claim. Checked 28 October 2026.
- Anthropic. [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents). 29 September 2025. Vendor guidance, not an empirical study.

An assistant helped draft this page and check those sources. I am responsible for what it claims.
