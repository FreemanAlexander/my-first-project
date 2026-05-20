# AgentOS Day 4 — gbrain connect + Edith alignment

Дата: 2026-05-20
Контекст: Lesson 3 / Agents with gbrain, возврат к каноническому пути урока.

## Итог

Канонический multi-agent контур доведён до рабочего состояния:

- Homer — coder / architect.
- Edith — Second Brain / inbox / monitoring.
- Marketer — marketing / content creator.
- gbrain подключён ко всем трём агентам.
- memory / recall / swarm / tasks доступны через MCP.
- task heartbeat работает.
- swarm `list_my_pending` восстановлен через `GBRAIN_TOOLS=all`.

## Agents

### Homer

- Workspace: `/home/agentos/.claude-lab/homer/.claude`
- canonical `coder.md` применён.
- placeholders заменены.
- `settings.json` поправлен: global Bash blocker удалён.
- `.mcp.json` добавлен.
- gbrain token создан как agent `homer`.
- Smoke passed: recall, swarm.list_my_pending, task_list, agent_heartbeat.

### Edith

- Workspace/runtime: `/home/agentos/.claude-lab/inbox-agent`
- Canonical agent name: `Edith`.
- Agent personality: `edith`.
- Technical runtime / gbrain agent id: `inbox-agent`.
- Старое имя `Mnemo` считается legacy name.
- Физически `inbox-agent` не переименовывается без отдельной migration plan и явного OK Александра.

Guardrail добавлен в:

`/home/agentos/.claude-lab/inbox-agent/.claude/CLAUDE.md`

Нельзя физически переименовывать без миграции:

- `/home/agentos/.claude-lab/inbox-agent`
- `inbox-bot.service`
- cron entries with `INBOX_AGENT_HOME`
- `raw/`, `compiled/`, `wiki/`, `output/`, `logs/`, `secrets/`
- gbrain token identity `inbox-agent`
- Telegram bot runtime paths

Smoke passed:

- Edith корректно называет себя Edith.
- `gbrain-swarm.list_my_pending` OK.
- `gbrain-tasks.task_list` OK.
- `gbrain-tasks.agent_heartbeat` OK.
- `gbrain-recall.recall` OK, память нашла релевантные записи.

### Marketer

- Workspace: `/home/agentos/.claude-lab/marketer/.claude`
- canonical `marketer.md` применён.
- placeholders заменены.
- `core/TONE_OF_VOICE.md` создан.
- `settings.json` поправлен: global Bash blocker удалён.
- `.mcp.json` добавлен.
- gbrain token создан как agent `marketer`.
- Smoke passed: recall, swarm.list_my_pending, task_list, agent_heartbeat.
- Marketer подтвердил локальный TOV fallback и запрет публикации без OK Александра.

## gbrain infrastructure

Фактический gbrain расположен на отдельном сервере `gbrain-vps`.

Путь:

`/opt/gbrain`

До работ были active:

- `gbrain-memory-mcp.service`
- `gbrain-recall-mcp.service`
- `gbrain-swarm-mcp.service`
- `gbrain-ingest-worker.service`
- `gbrain-swarm-worker.service`

Был найден, но не работал:

- `gbrain-task-mcp.service`

Сделано:

- `gbrain-task-mcp.service` включён и запущен.
- порт `8769` начал слушать.
- task MCP tools/list smoke passed.
- на `jarvis-server` в `gbrain-tunnel.service` добавлен проброс `8769`.
- локально доступны `8766`, `8767`, `8768`, `8769`.
- в `gbrain-swarm-mcp.service` добавлено `Environment=GBRAIN_TOOLS=all`.
- после restart появился `list_my_pending`.

## Tokens / scopes

Новые tokens созданы без вывода raw token в чат:

- `homer`
- `marketer`

Token files:

- `/home/agentos/.claude-lab/homer/secrets/gbrain.token`
- `/home/agentos/.claude-lab/marketer/secrets/gbrain.token`

Existing gbrain identities после настройки:

- `admin`
- `homer`
- `inbox-agent`
- `marketer`

`inbox-agent` получил дополнительные scopes: `10-tasks`, `10-events`, `20-daily`, `90-inbox`, сохранил `50-external`.

## MCP configs

Обновлены `.mcp.json` у трёх агентов:

- `/home/agentos/.claude-lab/homer/.claude/.mcp.json`
- `/home/agentos/.claude-lab/marketer/.claude/.mcp.json`
- `/home/agentos/.claude-lab/inbox-agent/.claude/.mcp.json`

У всех 4 MCP:

- `gbrain-swarm` → `http://127.0.0.1:8766/mcp`
- `gbrain-memory` → `http://127.0.0.1:8767/mcp`
- `gbrain-recall` → `http://127.0.0.1:8768/mcp`
- `gbrain-tasks` → `http://127.0.0.1:8769/mcp`

## Lesson status

- `03-create-coder.md` — DONE через Homer.
- `04-create-edith.md` — DONE через Edith поверх existing `inbox-agent`.
- `05-create-marketer.md` — DONE через Marketer.
- `06-setup-gbrain.md` — DONE/PRACTICAL: gbrain уже существовал на `gbrain-vps`, task MCP был дозапущен.
- `07-connect-agents.md` — DONE: Homer, Edith/inbox-agent, Marketer подключены к gbrain.

## Важные решения

1. Не переименовывать физически `inbox-agent`.
2. Каноническое имя для урока — Edith.
3. Technical runtime / gbrain identity остаётся `inbox-agent`.
4. Mnemo — legacy name, осталось только в backup-файлах и исторических snapshots.
5. `GBRAIN_TOOLS=all` нужен для канонического `swarm.list_my_pending`.
6. Task MCP обязателен для task board / heartbeat, поэтому он был поднят, а не пропущен.

## Следующий шаг

Продолжить Lesson 3 после `07-connect-agents.md` и проверить следующие markdown-файлы урока.

Команда:

```bash
cd /home/agentos/agentos-skills
find lessons/lesson-3-agents-with-gbrain -maxdepth 1 -type f -name "*.md" -print | sort
```
