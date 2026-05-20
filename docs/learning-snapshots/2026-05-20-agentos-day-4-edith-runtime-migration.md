# AgentOS Day 4 — Edith runtime migration

Дата: 2026-05-20

## Итог

Edith приведена к единому стандарту агентов.

Финальное состояние:

- canonical folder: `/home/agentos/.claude-lab/edith`
- legacy symlink: `/home/agentos/.claude-lab/inbox-agent -> /home/agentos/.claude-lab/edith`
- gbrain agent id: `edith`
- Telegram bot: `@Freeman_Edith_Bot`
- service: `edith-bot.service`

## Telegram

Создан новый Telegram bot:

- id: `8873953446`
- first_name: `Edith`
- username: `Freeman_Edith_Bot`

Token заменён в runtime:

`/home/agentos/.claude-lab/edith/secrets/telegram-bot-token`

Старый token сохранён backup-файлом:

`telegram-bot-token.bak.before-freeman-edith`

## Folder migration

Выполнена мягкая миграция:

- старая реальная папка `inbox-agent` переименована в `edith`
- старый путь `inbox-agent` оставлен как symlink на `edith`

Это сохраняет совместимость со старыми логами, путями и legacy-инструкциями.

## gbrain

Создан новый gbrain token / agent identity:

- agent: `edith`
- write scopes: `10-tasks`, `10-events`, `20-daily`, `50-external`, `90-inbox`
- read scopes: `*`

`.mcp.json` Edith обновлён на новый `edith` token.

Smoke в Claude Code прошёл:

- `gbrain-swarm.list_my_pending` OK
- `gbrain-tasks.task_list(assignee=edith)` OK
- `gbrain-tasks.agent_heartbeat(status=online)` OK
- `gbrain-recall.recall` OK

## CLAUDE.md

Identity block обновлён:

- canonical folder: `/home/agentos/.claude-lab/edith`
- technical runtime / gbrain agent id: `edith`
- Telegram bot: `@Freeman_Edith_Bot`
- legacy inbox-agent path описан как compatibility symlink

Edith smoke ответил правильно:

- canonical folder: `/home/agentos/.claude-lab/edith`
- technical runtime / gbrain agent id: `edith`
- Telegram bot: `@Freeman_Edith_Bot`
- legacy inbox-agent path — symlink

## Service migration

Создан новый service:

`edith-bot.service`

Статус:

- `edith-bot.service` — enabled / active
- `inbox-bot.service` — disabled / inactive

Process path:

`/home/agentos/.claude-lab/edith/.venv/bin/python /home/agentos/.claude-lab/edith/bot.py`

Legacy service не удалён, но отключён.

## Cron

Crontab переведён на Edith:

- compile каждые 15 минут
- daily digest в 05:00 UTC / 12:00 Thailand

Compile cron теперь запускается через wrapper:

`/home/agentos/.claude-lab/edith/scripts/run-compile-cron.sh`

Wrapper пишет лог в:

`/home/agentos/.claude-lab/edith/logs/compile.cron.log`

Это сделано, чтобы убрать проблему с редиректом `compile.cron.log2>&1`.

## Final smoke

Проверено:

- `edith-bot.service` enabled / active
- `inbox-bot.service` disabled / inactive
- Telegram getMe active token OK
- username: `Freeman_Edith_Bot`
- path `/home/agentos/.claude-lab/edith` exists
- symlink `/home/agentos/.claude-lab/inbox-agent` resolves to `/home/agentos/.claude-lab/edith`
- `run-compile-cron.sh` syntax OK
- `compile.sh` syntax OK
- `daily-digest.sh` syntax OK

## Backlog

1. Позже можно переименовать внутренние строки `inbox-bot` в `bot.py` / logs, если понадобится косметическая чистота.
2. Проверить live Telegram E2E через новый `@Freeman_Edith_Bot`.
3. Продолжить Jarvis-style Telegram Gateway для Homer / Marketer / Edith.
