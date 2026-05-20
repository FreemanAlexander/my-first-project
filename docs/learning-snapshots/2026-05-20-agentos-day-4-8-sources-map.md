# AgentOS Day 4 — Mnemo 8 sources map

Дата: 2026-05-20

## Что уточнили

По материалу `8 каналов сбора — карта скиллов для пополнения базы` Mnemo / Second Brain должен покрывать все 8 источников:

- Telegram
- Instagram
- YouTube / video
- Twitter / X
- Web articles
- Voice notes
- Browser / screenshots
- Research queries

## Что было сделано

К Mnemo per-agent подключены недостающие skills:

- `telegram-chip`
- `instagram-superpower`
- `twitter`
- `perplexity-research`

Теперь в `/home/agentos/.claude-lab/inbox-agent/.claude/skills/` есть:

- `agent-browser`
- `groq-voice`
- `instagram-superpower`
- `markdown-new`
- `perplexity-research`
- `telegram-chip`
- `transcript`
- `twitter`

## Текущий статус источников

- Telegram bot / inbox-agent — работает
- markdown-new — smoke passed
- groq-voice — smoke passed
- transcript — smoke passed
- agent-browser — smoke passed
- telegram-chip — installed, not activated; user-account risk
- instagram-superpower — installed, HikerAPI key pending
- twitter — installed, free FxTwitter smoke pending
- perplexity-research — installed, Perplexity API key pending

## Важное решение

Mnemo = владелец ingestion / Second Brain source map.

Prometheus / Daedalus / Atlas могут использовать те же skills в своих ролях, но это не отменяет того, что Mnemo должен знать карту всех источников.

## Backlog

Добавлены задачи:

- AGENTOS-004 — Telegram-chip decision / user-account access
- AGENTOS-005 — Instagram-superpower setup
- AGENTOS-006 — Twitter/X skill smoke
- AGENTOS-007 — Perplexity research setup

## Следующий шаг

Безопасный следующий шаг — закрыть `AGENTOS-006`: проверить бесплатный Twitter/X smoke через FxTwitter.

