# AgentOS Day 3 — inbox-agent hook smoke

Дата: 2026-05-20

## Что сделано

Подготовлен локальный inbox-agent workspace на `jarvis-server`.
Bearer-token для `inbox-agent` выпущен на `gbrain-vps` и перенесён локально без вывода значения в чат.

Локальные файлы:
- `~/.claude-lab/inbox-agent/secrets/inbox-agent.token`
- `~/.claude-lab/inbox-agent/.claude/.mcp.json`
- `~/.claude-lab/inbox-agent/.env`

## Token / scopes

- agent: `inbox-agent`
- token_id / sha256 prefix: `0fa03b33d3ff`
- write scopes: `{50-external}`
- read scopes: `{*}`
- raw token не выводить в чат

## MCP endpoints

- memory: `http://127.0.0.1:8767/mcp`
- recall: `http://127.0.0.1:8768/mcp`
- swarm: `http://127.0.0.1:8766/mcp`
- hook env: `MCP_URL=http://127.0.0.1:8767/mcp`

## Важные правки

Для `gbrain-memory-mcp` включён `GBRAIN_TOOLS=all`, потому что в режиме `core` tool `create_external_note` не появляется в `tools/list`.

Создан override:
- `/etc/systemd/system/gbrain-memory-mcp.service.d/override.conf`

Локальный hook `save-to-raw.sh` пропатчен на session-based MCP flow:
1. `initialize`
2. получить `mcp-session-id`
3. отправить `notifications/initialized`
4. вызвать `tools/call create_external_note`

Backup hook:
- `~/.claude-lab/inbox-agent/hooks/save-to-raw.sh.bak.20260520-session`

## Smoke result

Проверка прошла:
- `local write ok`
- `gbrain write ok`

Создан remote file:
- `/opt/gbrain/vault/50-external/text/2026-05-20-agentos-patched-hook-smoke-test-from-inbox-agent-on-2026-05-.md`

## Следующий шаг

Telegram BotFather → сохранить bot token → задать `PRINCE_CHAT_ID` → запустить `bot.py` → E2E smoke через Telegram.
