# AgentOS Day 3 — compile/digest smoke

Дата: 2026-05-20

## Что проверили

Проверили локальный inbox-agent processing на `jarvis-server`:

`raw → compiled → daily digest → Telegram`

## Compile smoke

`compile.sh` запущен вручную с переменными:

- `CLAUDE_BIN=/usr/bin/claude`
- `INBOX_AGENT_HOME=/home/agentos/.claude-lab/inbox-agent`

Результат:

- `processed=5`
- `failed=0`
- compiled-файлы созданы в `/home/agentos/.claude-lab/inbox-agent/compiled/text/`
- raw-файлы переключились с `compiled: false` на `compiled: true`

## Daily digest smoke

`daily-digest.sh` запущен вручную с переменными:

- `PRINCE_CHAT_ID=370621610`
- `CLAUDE_BIN=/usr/bin/claude`
- `INBOX_AGENT_HOME=/home/agentos/.claude-lab/inbox-agent`
- `TG_BOT_TOKEN_FILE=/home/agentos/.claude-lab/inbox-agent/secrets/telegram-bot-token`

Результат:

- digest отправлен в Telegram
- `digest sent (items=5)`
- бот: `Freeman Inbox`
- username: `freeman_agents_inbox_bot`

## Prompt fix

Первый digest пришёл внутри markdown code fence.

После этого `prompts/digest.prompt.md` усилен правилами:

- never wrap the answer in triple backticks
- never output markdown code block
- output raw Telegram HTML only
- if source text is mostly Russian, write in Russian

Повторная проверка прошла успешно: digest пришёл без тройных backticks.

Backup prompt:

- `/home/agentos/.claude-lab/inbox-agent/prompts/digest.prompt.md.bak.20260520`

## Cron status

Cron пока не включён.

Причины:

- сначала проверили ручной smoke
- `daily-digest.sh` ждёт один `PRINCE_CHAT_ID`, а текущий bot allowlist использует `PRINCE_CHAT_IDS`
- нужно отдельно решить: digest отправляем только на главный аккаунт или дорабатываем под несколько ID
- нужно решить частоту compile: 15 минут или реже

## Текущий статус

День 3 дополнительно закрыт по локальной обработке inbox:

`Telegram → raw → compiled → daily digest → Telegram`

