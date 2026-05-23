# AgentOS Day 5 — Coordinator workspace + gbrain layer

Date: 2026-05-23  
Status: completed  
Scope: Coordinator workspace, Claude Code config, shared skills, gbrain token, MCP, smoke tests.

## Result

Created new agent workspace:

- `/home/agentos/.claude-lab/coordinator`
- `/home/agentos/.claude-lab/coordinator/.claude`
- `/home/agentos/.claude-lab/coordinator/.claude/CLAUDE.md`
- `/home/agentos/.claude-lab/coordinator/.claude/core/*`
- `/home/agentos/.claude-lab/coordinator/secrets`

Coordinator role:

- Chief of Staff / Planner.
- Main entrypoint for complex tasks.
- Routes tasks to active agents.
- Tracks planned agents but does not route work to them until smoke-tested.

## Active agents in Coordinator CLAUDE.md

- Edith — Second Brain, inbox, memory, knowledge, digest.
- Marketer — marketing, content, social/social research, Instagram, YouTube, Telegram research.
- Homer — coding, architecture, development, repo work, debugging, deploy support.

## Planned agents in Coordinator CLAUDE.md

- Richard — TechOps / System Auditor / Health Guardian.
- Productologist — PML methodology, diagnostics, intensives, product quality.
- CFO — finances, subscriptions, expenses, agent/API economy.
- CRM Analyst — CRM, bot events, funnel analytics, dashboards.
- Codex Reviewer — independent code reviewer.
- Sales Agent — sales/lead handling after CRM and safety rules.

## Files created

- `.claude/CLAUDE.md`
- `.claude/core/USER.md`
- `.claude/core/rules.md`
- `.claude/core/MEMORY.md`
- `.claude/core/LEARNINGS.md`
- `.claude/core/COORDINATION_WORKFLOW.md`
- `.claude/settings.json`
- `.claude/.claude/settings.local.json`
- `.claude/.mcp.json`
- `.claude/skills -> /home/agentos/.claude-lab/shared/skills`
- `secrets/gbrain.token`

No `TEAM.md`, `AGENTS.md`, `SKILLS_REGISTRY.md`, or `CHANGE_PROTOCOL.md` were created. Decision: keep Coordinator compact and put active/planned routing directly in `CLAUDE.md`.

## gbrain

Issued a dedicated gbrain token for `coordinator`.

Final write scopes:

- `10-tasks`
- `20-daily`
- `30-decisions`
- `50-external`
- `50-knowledge`
- `70-runbooks`
- `80-error-patterns`
- `90-inbox`

Important: raw token was not printed in chat. Token file permissions:

- `coordinator/secrets/gbrain.token` — `600`

MCP servers connected:

- `gbrain-swarm` — `127.0.0.1:8766`
- `gbrain-memory` — `127.0.0.1:8767`
- `gbrain-recall` — `127.0.0.1:8768`
- `gbrain-tasks` — `127.0.0.1:8769`

`coordinator/.claude/.claude/settings.local.json` enables project MCP servers.

## Smoke tests

Direct Claude Code smoke passed:

- Coordinator identifies itself correctly.
- Active agents: Edith, Marketer, Homer.
- Planned agents are not treated as active.

gbrain smoke passed:

- `agent_heartbeat` coordinator → online.
- `agent_status` coordinator → online.
- `create_decision_note` OK.
- `create_handoff` to Edith OK.
- `recent(30-decisions)` OK.
- `recent(90-inbox)` OK.
- `recall` OK.

Created gbrain notes:

- `30-decisions/2026-05-23-coordinator-gbrain-smoke-passed.md`
- `90-inbox/coordinator-to-edith-2026-05-23.md`

## Important learning

For new agent workspaces:

1. `.mcp.json` alone is not enough.
2. `.claude/.claude/settings.local.json` must enable project MCP servers.
3. For non-interactive `claude -p` MCP smoke, pass tools through `--allowedTools`.
4. `10-tasks` scope is required for heartbeat/status.
5. Do not reuse another agent's gbrain token.

## Pending

- Telegram bot token for Coordinator.
- Add Coordinator to `/home/agentos/.claude-lab/agentos-gateway/config.json`.
- Restart/smoke gateway after explicit approval.
- Telegram text smoke.
- Telegram voice smoke if Coordinator should accept voice.
- Update Coordinator status after gateway smoke.
