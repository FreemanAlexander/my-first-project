# AgentOS Day 5 — Sentinel workspace and gbrain

Date: 2026-05-23  
Status: completed

## Result

Sentinel v1 workspace is created and connected to gbrain.

Sentinel replaces the planned Richard concept as the active TechOps / System Auditor / Health Guardian agent.

Legacy Richard remains only as a reference safety-net service.

## Sentinel identity

Workspace:

- /home/agentos/.claude-lab/sentinel
- /home/agentos/.claude-lab/sentinel/.claude

Role:

- TechOps Auditor
- Health Guardian
- system guardian
- infrastructure auditor

Russian role:

- системный страж
- технический аудитор
- хранитель здоровья системы

## Created files

- .claude/CLAUDE.md
- .claude/core/USER.md
- .claude/core/rules.md
- .claude/core/SYSTEM_HEALTH.md
- .claude/core/WATCHDOG_POLICY.md
- .claude/core/MEMORY.md
- .claude/core/LEARNINGS.md
- .claude/settings.json
- .claude/.mcp.json
- .claude/.claude/settings.local.json
- secrets/gbrain.token

Shared skills:

- .claude/skills -> /home/agentos/.claude-lab/shared/skills

## Operating modes

Sentinel has four explicit modes:

- L0 — read-only audit
- L1 — safe smoke checks
- L2 — approved repair
- L3 — dangerous repair only by separate explicit instruction

Default mode is L0.

## Legacy Richard audit

Legacy Richard was found:

- service: claude-richard.service
- status: active/running
- workdir: /opt/richard
- user: edgelab
- package: claude-code-telegram
- purpose: safety-net Claude Telegram bot

Important rule:

- do not modify /opt/richard without explicit approval
- do not modify /home/edgelab/claude-gateway without explicit approval

Sentinel may use Richard only as an architectural reference.

## gbrain setup

Sentinel received a dedicated gbrain token.

Scopes:

- 10-tasks
- 20-daily
- 30-decisions
- 50-external
- 50-knowledge
- 70-runbooks
- 80-error-patterns
- 90-inbox

MCP servers connected:

- gbrain-swarm
- gbrain-memory
- gbrain-recall
- gbrain-tasks

Important fix:

- .mcp.json was copied from Coordinator
- Authorization headers were explicitly rewritten to Sentinel's dedicated token
- verification showed all servers use Sentinel token and not Coordinator token

## Smoke tests

Sentinel identity smoke passed.

Sentinel correctly explained:

- its role
- difference from Coordinator, Homer, Marketer, Edith
- L0-L3 operating modes
- forbidden actions without approval

gbrain smoke passed:

- agent_heartbeat sentinel online
- agent_status sentinel
- create_decision_note
- create_handoff to Coordinator
- recall
- recent 30-decisions
- recent 90-inbox

Created in gbrain:

- 30-decisions/2026-05-23-sentinel-gbrain-smoke-passed.md
- 90-inbox/sentinel-to-coordinator-2026-05-23.md

## Coordinator update

Coordinator CLAUDE.md was updated:

- Sentinel added to Active agents
- Richard removed from Planned agents
- system health / gateway / logs / bots / cron / smoke checks route to Sentinel
- legacy Richard described as reference only

Coordinator routing smoke passed:

- active agents: Edith, Marketer, Homer, Sentinel
- system health routes to Sentinel
- legacy Richard must not be touched without approval

## Current state

Sentinel v1 is ready as an AgentOS workspace and gbrain-connected TechOps auditor.

Telegram/gateway connection for Sentinel is not yet done.

Separate watchdog service is not yet created.

## Next recommended steps

1. Create Telegram bot for Sentinel.
2. Add Sentinel to agentos-gateway.
3. Run Telegram text smoke.
4. Run Telegram voice smoke if supported.
5. Decide later whether to create sentinel-watchdog.service as a separate safety-net layer.
