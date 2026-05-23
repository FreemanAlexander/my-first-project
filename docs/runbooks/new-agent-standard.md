# New Agent Standard

Use this runbook when creating a new AgentOS / Claude Code agent.

## Principle

Do not build every new agent from scratch.

Use the existing working pattern from Homer, Marketer, Edith and Coordinator.

## Required workspace pattern

For every new agent create:

- /home/agentos/.claude-lab/<agent>/
- /home/agentos/.claude-lab/<agent>/.claude/
- .claude/CLAUDE.md
- .claude/core/
- .claude/settings.json
- .claude/.claude/settings.local.json
- .claude/.mcp.json
- .claude/skills symlink to /home/agentos/.claude-lab/shared/skills
- secrets/gbrain.token
- optional Telegram bot token

## New agent steps

1. Create workspace folders.
2. Create role-specific CLAUDE.md.
3. Add only useful core files.
4. Link shared skills.
5. Copy safe settings.json pattern.
6. Issue a dedicated gbrain token.
7. Never reuse another agent token.
8. Build .mcp.json with the new token.
9. Add .claude/.claude/settings.local.json with enabled MCP servers.
10. Run claude mcp list.
11. Run direct Claude Code smoke.
12. Run gbrain smoke with allowedTools.
13. If Telegram is needed, create a dedicated Telegram bot token.
14. Backup gateway config.
15. Add the agent to agentos-gateway/config.json.
16. Restart gateway only after explicit approval.
17. Run Telegram text smoke.
18. Run Telegram voice smoke if needed.
19. Update Coordinator CLAUDE.md active/planned routing.
20. Update other agents only if their workflow changes.
21. Create snapshot, commit and push.

## Required gbrain scopes for normal agents

- 10-tasks
- 20-daily
- 30-decisions
- 50-external
- 50-knowledge
- 70-runbooks
- 80-error-patterns
- 90-inbox

## Required MCP local settings

File:

/home/agentos/.claude-lab/<agent>/.claude/.claude/settings.local.json

Required enabled servers:

- gbrain-swarm
- gbrain-memory
- gbrain-recall
- gbrain-tasks

## Non-interactive smoke

For claude -p, pass MCP tools through allowedTools.

Common tool names:

- mcp__gbrain-tasks__agent_heartbeat
- mcp__gbrain-tasks__agent_status
- mcp__gbrain-memory__create_decision_note
- mcp__gbrain-memory__create_handoff
- mcp__gbrain-recall__recent
- mcp__gbrain-recall__recall

## Safety

Do not print raw tokens.
Do not touch /home/edgelab/claude-gateway.
Do not modify gateway config without backup.
Do not restart services without explicit approval.
Do not create extra registry files unless CLAUDE.md becomes too large.
