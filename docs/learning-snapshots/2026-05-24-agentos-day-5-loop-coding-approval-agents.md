# AgentOS Day 5 — Loop Coding approval gate for Coordinator and Homer

Date: 2026-05-24  
Status: completed

## Result

Loop Coding approval gate was added to Coordinator and Homer.

This prevents agents from silently starting expensive or risky multi-phase engineering workflows.

## Updated agents

Coordinator:

- /home/agentos/.claude-lab/coordinator/.claude/CLAUDE.md

Homer:

- /home/agentos/.claude-lab/homer/.claude/CLAUDE.md

Backups were created before edits.

## Approval rule

For large or risky engineering tasks, including:

- migrations
- refactors
- gateway changes
- auth changes
- CRM changes
- payment changes
- personal data changes
- production-impacting infrastructure changes

agents must not silently start Loop Coding.

Before starting, they must explain:

- why Loop Coding is recommended
- which phases may run
- whether Codex will be used
- token/cost risk

Then they must ask exactly:

“Запускать Loop Coding? Да/нет?”

## Allowed without approval

Only local Phase 0 context gather is allowed without approval if it uses:

- local shell
- grep/find
- git status/log
- no LLM
- no Codex
- no implementation

## Requires explicit approval

The following require explicit approval from Alexander:

- Codex Plan
- Homer Implement
- Codex Review
- Ship
- deploy-like actions
- production-impacting changes

## Smoke results

Coordinator smoke passed.

Coordinator answered that before Loop Coding it must:

- explain why Loop Coding is recommended
- list phases
- say whether Codex will be used
- mention token/cost risk
- ask: “Запускать Loop Coding? Да/нет?”

Homer smoke passed.

Homer answered that it cannot immediately start large implementation and must ask:

“Запускать Loop Coding? Да/нет?”

Homer also confirmed that without approval it may only do local no-LLM context gather.

## Line count note

After adding the approval gate:

- Coordinator CLAUDE.md: 225 lines
- Homer CLAUDE.md: 211 lines

This is above the new preferred 150–200 line standard.

Later task:

- compress Coordinator and Homer CLAUDE.md
- move detailed rules into core files/runbooks
- keep only thin routing/behavior contract in CLAUDE.md

## Related commits

Existing project commits:

- abea5c2 — Добавил runbook Loop Coding
- 9f9647e — Добавил approval gate для Loop Coding
- b8d162c — Добавил wrapper Codex Reviewer
