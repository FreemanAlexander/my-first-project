# AgentOS Day 3 — inbox-agent cron enabled

Дата: 2026-05-20

## Что включили

Включён рабочий production-like v1 режим обработки inbox-agent через cron на `jarvis-server` под пользователем `agentos`.

## Crontab

Текущий режим:

- каждые 15 минут: `raw → compiled` через `compile.sh`
- каждый день в `05:00 UTC`: daily digest в Telegram через `daily-digest.sh`

Время digest:

- `05:00 UTC`
- `08:00 MSK`
- `12:00 Thailand`

## Compile cron

Команда:

`INBOX_AGENT_HOME=/home/agentos/.claude-lab/inbox-agent CLAUDE_BIN=/usr/bin/claude bash /home/agentos/.claude-lab/inbox-agent/scripts/compile.sh`

Лог cron stdout/stderr:

`/home/agentos/.claude-lab/inbox-agent/logs/compile.cron.log`

Основной лог самого скрипта:

`/home/agentos/.claude-lab/inbox-agent/logs/compile.log`

## Daily digest cron

Digest отправляется на главный Telegram аккаунт:

`PRINCE_CHAT_ID=370621610`

Команда использует:

- `INBOX_AGENT_HOME=/home/agentos/.claude-lab/inbox-agent`
- `CLAUDE_BIN=/usr/bin/claude`
- `TG_BOT_TOKEN_FILE=/home/agentos/.claude-lab/inbox-agent/secrets/telegram-bot-token`

Лог cron stdout/stderr:

`/home/agentos/.claude-lab/inbox-agent/logs/digest.cron.log`

Основной лог самого скрипта:

`/home/agentos/.claude-lab/inbox-agent/logs/digest.log`

## Проверка

Проверено:

- `crontab -l` содержит только две актуальные задачи
- старый комментарий про `16:00 Thailand` удалён
- `cron.service` active/running
- inbox-agent logs directory существует

## Решение

Это не тестовый MVP, а рабочая production-like v1-основа.

Дальше система расширяется модулями, а не переделывается:

- voice → `groq-voice`
- web links → `markdown-new`
- YouTube/video → `transcript`
- screenshots/browser → `agent-browser`
- полноценные agents → `CLAUDE.md`, roles, scopes, skills

