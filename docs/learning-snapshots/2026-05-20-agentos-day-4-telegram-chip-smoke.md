# AgentOS Day 4 — Telegram-chip research smoke

Дата: 2026-05-20

## Решение

Главный Telegram-аккаунт сейчас НЕ подключается.

`telegram-chip` проверяется только на втором / research-аккаунте.

Режим:

- read-only
- без автоответов
- без отправки сообщений
- без массового сбора личных переписок
- без подключения главного аккаунта

## Runtime

Создан отдельный runtime:

`/home/agentos/.claude-lab/telegram-chip-research`

Это копия skill `telegram-chip`, вынесенная отдельно от `inbox-agent`.

## Secrets

Создан `.env` внутри runtime.

В `.env` есть:

- `TELEGRAM_API_ID`
- `TELEGRAM_API_HASH`
- `TELEGRAM_SESSION_STRING`
- `TELEGRAM_SESSION_NAME=telegram_chip_research`

Session string не выводился в чат и был замаскирован в проверках.

## Safety patch

В runtime-копии пропатчены выводы:

- `generate-session.sh`
- `session_string_generator.py`

Цель:

не печатать `TELEGRAM_SESSION_STRING` в терминал.

## Smoke result

Telegram-chip API был запущен вручную:

`nohup .venv/bin/python api.py`

Health check:

`{"status":"ok","telegram_connected":true}`

Read-only smoke:

- `/chats/list?limit=5` вернул `success: true`
- найдено 5 диалогов
- найден channel
- чтение сообщений канала прошло успешно
- ответ содержал:
  - message id
  - date
  - views
  - forwards
  - reactions
  - message text

Тестовый канал Эда Халилова использовался только как smoke/test source.

Он не является реальным целевым источником watchlist.

## Watchlist

Создана инфраструктура:

`/home/agentos/.claude-lab/telegram-chip-research/config/watchlist.json`

Текущий watchlist пустой:

`sources: []`

Создан пример:

`/home/agentos/.claude-lab/telegram-chip-research/config/watchlist.example.json`

Реальные источники будут добавляться позже через агента или Cursor.

## Future workflow

Правильный рабочий сценарий:

- research-аккаунт добавляется в нужные Telegram-каналы/группы
- реальные источники вносятся в watchlist
- collector обходит все источники пакетно
- Mnemo сохраняет данные в gbrain
- Prometheus анализирует темы, боли, хуки, формулировки и идеи для PML

## Backlog

`AGENTOS-004` можно считать закрытым по smoke/infrastructure.

Отдельно позже нужна задача на наполнение real Telegram research watchlist.

