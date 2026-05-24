# Edith Wiki memory setup — 2026-05-24

## Goal

Set up Wiki memory for Edith as the primary inbox / Second Brain / memory librarian.

## Decision

Wiki is stored on the main AgentOS server, not on the gbrain server.

Main Wiki path:

/home/agentos/.claude-lab/shared/wiki/pml-knowledge/

Reason:

- wiki-skills work with local markdown files;
- Edith and the agents run on the main server;
- gbrain remains operational team memory;
- Wiki is long-term structured project knowledge.

## Installed wiki-skills

Repository:

/home/agentos/.claude-lab/_external/wiki-skills

Commit:

7d0287f fix: correct plugin install command and add uninstall instructions

Edith has symlinks to all 6 skills:

- wiki-init
- wiki-ingest
- wiki-query
- wiki-update
- wiki-lint
- wiki-audit

Edith skills path:

/home/agentos/.claude-lab/edith/.claude/skills/

## Wiki structure

Created shared Wiki root:

/home/agentos/.claude-lab/shared/wiki/pml-knowledge/

Created:

- SCHEMA.md
- raw/
- assets/
- wiki/index.md
- wiki/overview.md
- wiki/log.md
- wiki/pages/
- wiki/pages/memory-architecture.md

## Edith contract

Created:

/home/agentos/.claude-lab/edith/core/WIKI.md

Connected in:

/home/agentos/.claude-lab/edith/.claude/CLAUDE.md

Import line:

@core/WIKI.md

## Memory model

gbrain = operational team memory:

- decisions
- handoffs
- current state
- agent heartbeats
- short recall records

Wiki = long-term structured project knowledge:

- PML methodology
- products and offers
- agent architecture
- workflows and protocols
- stable rules
- glossary
- source-based pages

Edith = primary memory librarian and Wiki maintainer.

Other agents = read-first / read-only by default.

## Smoke tests

Edith CLI smoke passed.

Edith correctly answered:

- shared Wiki path;
- who can write;
- Wiki vs gbrain difference;
- available wiki-skills.

Edith wiki-query smoke passed.

Edith read:

/home/agentos/.claude-lab/shared/wiki/pml-knowledge/wiki/pages/memory-architecture.md

and answered correctly based on the page.

## Important boundary

Agent delegation / cross-agent task handoff policy was discussed but NOT written to Wiki.

Reason:

This is a technical agent orchestration policy, not stable project knowledge for the PML Wiki.

It should later be designed separately for Coordinator / runbook / agent core contracts.

## Current status

Edith Wiki memory layer: READY.

Next steps:

1. Edith gbrain/local memory smoke.
2. Edith Telegram text smoke.
3. Edith Telegram voice smoke.
4. Gateway/accounting log check.
5. Then continue Agent Readiness Protocol.
