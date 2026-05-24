# Loop Coding — Claude Code ↔ Codex workflow

Status: v1 draft  
Owner: Александр Фриман  
Project: AgentOS / Claude Code learning project

## Purpose

Loop Coding is the workflow for large or risky engineering tasks.

Use it for:

- migrations
- refactoring
- new features around 500+ lines
- gateway changes
- auth/security changes
- payment/CRM/personal data changes
- production-impacting infrastructure changes

Do not use it for:

- tiny one-line fixes
- text-only docs edits
- low-risk snapshots
- simple file renames

## Role split

Homer / Claude Code:

- main implementer
- writes code
- applies fixes
- does not self-review alone on risky tasks

Codex Reviewer:

- independent engineering reviewer
- architecture critic
- security thinker
- test strategy designer
- migration/refactoring planner
- does not write production code in v1
- does not deploy
- does not commit

Coordinator:

- decides when loop-coding is required
- creates task framing
- collects final result

Sentinel:

- checks health, services, logs, system safety
- involved before/after deploy-like changes

## Approval gate

Before starting Loop Coding, the agent must explicitly warn Alexander.

The agent must say:

- why Loop Coding is recommended
- which risk triggered it
- which phases will run
- whether Codex will be used
- whether this may spend additional tokens
- what the first artifact will be

The agent must ask for explicit approval before:

- Phase 2 Codex Plan
- Phase 3 Homer Implement
- Phase 4 Codex Review
- Phase 6 Ship

Allowed without approval:

- Phase 0 Context Gather if it uses only local shell/grep and no LLM
- explaining that Loop Coding is recommended

Required confirmation phrase:

- “Запускать Loop Coding? Да/нет?”

If Alexander does not approve, do not start the loop.

## Phase 0 — Context Gather

Goal: collect local context without LLM when possible.

Inputs:

- current task
- git status
- relevant files
- docs/runbooks
- docs/learning-snapshots
- previous reviews
- known constraints

Output:

- docs/plans/CONTEXT-YYYY-MM-DD-HHMMSS.md

No LLM required by default.

## Phase 1.5 — Web Research, optional

Use only if the task touches fresh external information:

- new library version
- current API behavior
- recent docs
- cloud/provider changes
- security advisory

Output:

- docs/plans/RESEARCH-YYYY-MM-DD-HHMMSS.md

Skip if task is local and already understood.

## Phase 2 — Codex Plan

Use Codex for architecture / critique / implementation strategy.

Default model:

- gpt-5.4-mini for normal planning
- gpt-5.5 only for substantial architecture/security decisions

Output:

- docs/plans/PLAN-codex-YYYY-MM-DD-HHMMSS.md

Codex must not edit files in this phase.

## Phase 3 — Homer Implement

Homer / Claude Code implements based on plan.

Rules:

- small atomic commits when appropriate
- no production secrets
- no blind deploy
- keep diffs understandable
- update docs/tests when needed

Output:

- code changes
- implementation notes if needed

## Phase 4 — Parallel Review

Codex review:

- run scripts/codex-review.sh
- output docs/reviews/REVIEW-codex-YYYY-MM-DD-HHMMSS.md

Opus/Homer self-review:

- Homer reviews its own implementation separately
- output docs/reviews/REVIEW-opus-YYYY-MM-DD-HHMMSS.md if needed

Combined review:

- Coordinator or Homer consolidates into docs/reviews/REVIEW-YYYY-MM-DD-HHMMSS.md for large tasks

## Phase 5 — Fix Loop

Homer fixes review findings.

Maximum:

- 3 iterations

Stop and escalate to Alexander if:

- the same issue repeats
- tests do not converge
- review finds unclear architecture
- production risk remains high
- secrets/data safety risk appears

## Phase 6 — Ship

Staging/safe checks first.

Production only with explicit approval from Alexander.

Before production-impacting changes:

- backup plan
- rollback plan
- Sentinel health check
- logs checked
- clear deploy command
- explicit OK

## Required artifacts for big tasks

At minimum:

- CONTEXT file
- PLAN-codex file
- REVIEW-codex file
- final summary

For production-risk tasks also:

- SHIP-CHECKLIST file
- rollback notes
- Sentinel check notes

## Cost rule

Codex is not for tiny checks.

Use Codex when the cost is justified by risk:

- architecture risk
- security risk
- data risk
- production risk
- large diff
- complex migration

Keep Codex prompts short and task-specific.
