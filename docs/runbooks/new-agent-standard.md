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

## Lessons from Sentinel

These lessons are mandatory for all new agents after Sentinel.

### gbrain token issue

Do not issue new gbrain tokens directly on jarvis-server with the local readonly checkout.

Correct pattern:

- connect to gbrain-vps
- run the token issuer inside /opt/gbrain
- run it as Unix user gbrain
- redirect stdout into the local agent secrets file
- never print the raw token in chat or terminal output

Pattern:

- ssh gbrain-vps
- cd /opt/gbrain
- sudo -u gbrain bash -lc ". .venv/bin/activate && python scripts/issue-agent-token.py ..."

Reason:

- Postgres uses peer authentication for user gbrain
- running the issuer as the wrong Unix user causes Peer authentication failed for user "gbrain"

### MCP config after copying

If .mcp.json is copied from Coordinator or another agent, do not assume it uses a token file path.

After copying, explicitly rewrite all Authorization headers to the new agent's dedicated gbrain token.

Verify:

- all MCP servers use the new agent token
- no MCP server uses Coordinator token
- gbrain-swarm, gbrain-memory, gbrain-recall, gbrain-tasks are Connected

Required verification output should prove:

- all_use_new_agent: True
- any_use_coordinator: False

### Sentinel-specific architecture lesson

Sentinel replaced the planned Richard concept as the active TechOps / System Auditor / Health Guardian.

Legacy Richard is not a normal .claude-lab workspace.

Legacy Richard exists as a separate safety-net service:

- service: claude-richard.service
- workdir: /opt/richard
- user: edgelab

Do not copy Richard blindly.

Do not modify /opt/richard without explicit approval.

Do not modify /home/edgelab/claude-gateway without explicit approval.

For Sentinel-like agents, split the design into two layers:

- normal AgentOS workspace first
- optional separate watchdog service later
