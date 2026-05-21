# Marketer — Telegram research mode

Дата: 2026-05-21

## Итог

Marketer получил Telegram Research Mode через `telegram-chip`.

## Skill

`telegram-chip` подключён в shared skills:

`/home/agentos/.claude-lab/shared/skills/telegram-chip -> /home/agentos/gbrain-readonly/skills/telegram-chip`

Marketer видит skill:

`/home/agentos/.claude-lab/marketer/.claude/skills/telegram-chip`

## Runtime

Используется отдельный research runtime:

`/home/agentos/.claude-lab/telegram-chip-research`

Правила:

- main Telegram account: do not connect
- account: research_account_only
- mode: read_only
- manual_replies: false
- auto_replies: false
- private_messages_collection: false

## Contract

Создан файл:

`/home/agentos/.claude-lab/marketer/.claude/core/TELEGRAM_RESEARCH.md`

## Auto-routing

В `CLAUDE.md` добавлено правило:

Telegram channel/group/watchlist/competitor/reference research requests автоматически используют:

`core/TELEGRAM_RESEARCH.md`

и `telegram-chip` read-only mode.

Пользователь не должен вручную писать:

`прочитай core/TELEGRAM_RESEARCH.md`

## Smoke

API был временно поднят вручную:

`127.0.0.1:8080`

Проверено:

- `/chats/list` OK
- `/chats/{chat_id}/messages` OK
- Marketer сделал read-only анализ доступного Telegram source как корпуса постов

## Safety

Ничего не публиковалось.

Не использовались:

- send
- edit
- delete
- forward
- archive
- mute/unmute
- contacts/admin/group actions

## Ограничение

Доступный smoke corpus был узкий:

- один тестовый канал
- последние сообщения
- travel-arc / Nepal / Everest

Канал Эда Халилова использовался только как test/smoke source, не как реальный watchlist.

## Next

1. Остановить manual telegram-chip API после smoke.
2. Позже решить: держать telegram-chip API как systemd service или запускать on-demand.
3. Наполнить watchlist реальными Telegram sources отдельной задачей.
