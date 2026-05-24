# AgentOS Day 5 — Codex Reviewer setup

Date: 2026-05-24  
Status: partially completed, usable v1

## Result

Codex CLI was installed under user `agentos` and connected through ChatGPT login.

Codex Reviewer is not a normal Claude Code / Telegram agent.

It is an external engineering review layer next to Claude Code.

## Installed

Codex CLI:

- path: /home/agentos/.npm-global/bin/codex
- version: codex-cli 0.133.0
- login: ChatGPT account
- user: agentos

Node/npm were already available:

- node: v22.22.2
- npm: 10.9.7

## Instructions

Global Codex instructions:

- /home/agentos/.codex/AGENTS.md

Repo-level Codex instructions:

- /home/agentos/my-first-project/AGENTS.md

Review output folder:

- docs/reviews/

Context bridge folder:

- docs/codex-context/

## Role

Codex Reviewer role:

- independent engineering reviewer
- architecture critic
- security thinker
- test strategy designer
- migration/refactoring planner
- second opinion for Homer / Claude Code

Default mode:

- review-first
- read-only unless explicitly asked to edit
- no deploy
- no commit
- no secrets
- no production service changes
- no systemd changes unless explicitly requested

## Intended workflow

Claude Code / Homer:

- writes implementation

Codex Reviewer:

- reviews plan, diff, architecture, tests, security, edge cases

Coordinator:

- routes large code changes / migrations / refactors / security-sensitive code to Codex Reviewer when needed

Sentinel:

- handles system health and operational checks

## Sandbox issue

Initial Codex read-only smoke failed because Linux sandbox could not run bubblewrap:

- bwrap: loopback: Failed RTM_NEWADDR: Operation not permitted

`bubblewrap` was installed but the issue persisted because Ubuntu 24.04 AppArmor restricted unprivileged user namespaces.

Fix applied:

- installed apparmor-profiles
- installed apparmor-utils
- loaded bwrap-userns-restrict profile

Verification:

- bwrap / unpriv_bwrap visible in aa-status
- codex sandbox linux /bin/true returned OK

## Smoke tests

First read-only smoke:

- model: gpt-5.5
- result: partial fail
- Codex launched and wrote report
- Codex understood role
- Codex could not inspect repo because sandbox failed
- tokens used: 73,730

Tiny sandbox smoke before AppArmor fix:

- model: gpt-5.4-mini
- result: fail
- same bwrap / loopback error
- tokens used: 34,511

Tiny smoke after AppArmor fix:

- model: gpt-5.4-mini
- result: success
- Codex saw AGENTS.md
- sandbox error: no
- Codex confirmed ready for read-only review
- tokens used: 34,081

## Cost/usage note

Even tiny Codex runs used many tokens.

Current rule:

- do not use Codex for tiny checks
- use Codex only for meaningful code review, architecture review, migration planning, security review, or test strategy
- use short prompts
- prefer mini model for smoke/simple checks
- use gpt-5.5 only for substantial review/architecture work

## Current state

Codex Reviewer v1 is usable as:

- local terminal Codex CLI
- repo-aware reviewer through AGENTS.md
- read-only sandboxed reviewer
- filesystem-based review layer

Not yet done:

- no gbrain direct connection
- no Coordinator wrapper
- no automatic Homer → Codex → Homer loop
- no Telegram interface
- no codex-review.sh wrapper yet

## Next recommended steps

1. Commit AGENTS.md, docs/codex-context, and smoke review artifacts.
2. Later create scripts/codex-review.sh wrapper.
3. Later create export/import bridge between gbrain context and Codex files.
4. Later update Coordinator routing to use Codex Reviewer for large engineering tasks.
5. Later test one real review on a small diff.
