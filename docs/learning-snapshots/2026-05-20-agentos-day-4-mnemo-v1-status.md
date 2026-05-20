# AgentOS Day 4 — Mnemo v1 status

Дата: 2026-05-20

## Итог

Mnemo v1 собран как production-like Second Brain / inbox / monitoring агент поверх существующего workspace:

`/home/agentos/.claude-lab/inbox-agent`

Физическая папка пока остаётся `inbox-agent`, агентская идентичность — `mnemo`.

## Проверка runtime

Финальная ревизия показала:

- user: `agentos`
- path: `/home/agentos/.claude-lab/inbox-agent`
- service: `inbox-bot.service` active
- cron: enabled
- compile: каждые 15 минут
- daily digest: `05:00 UTC = 08:00 MSK = 12:00 Thailand`

## Secrets

Проверены только имена и права, без вывода ключей:

- `secrets/groq-api-key`
- `secrets/transcript-api-key`
- `secrets/telegram-bot-token`
- `secrets/inbox-agent.token`
- `~/.secrets/hikerapi/api-key`

Все ключевые secrets имеют права `600`.

## Source map

Mnemo отвечает за карту источников Second Brain.

Текущий статус:

- Telegram bot / inbox-agent — работает
- markdown-new — smoke passed
- groq-voice — smoke passed via Telegram voice E2E
- transcript — smoke passed via TranscriptAPI YouTube transcript request
- agent-browser — smoke passed via `npx --yes agent-browser` + Chrome runtime
- twitter — free FxTwitter profile smoke passed
- instagram-superpower — HikerAPI smoke passed
- perplexity-research — installed, deferred/blocked because paid API credits decision pending
- telegram-chip — installed, not activated; separate Telegram user-account risk discussion required

## Logs

Последние рабочие события подтверждают:

- `local write ok`
- `gbrain write ok`
- voice raw saved
- compiled files exist

Старый warning `memory-mcp Missing session ID` был в самом начале, после него gbrain writes проходят успешно.

## Backlog still open / blocked

Остаются отдельными задачами:

- `AGENTOS-001` — улучшить типизацию Telegram voice в `save-to-raw.sh`
- `AGENTOS-002` — Telegram Agent Gateway UX / Jarvis-style status
- `AGENTOS-004` — Telegram-chip decision / user-account access
- `AGENTOS-007` — Perplexity research setup, blocked by paid API decision

## Решение

Mnemo v1 можно считать рабочей основой.

Дальше не нужно пересобирать Mnemo с нуля. Его нужно развивать отдельными безопасными задачами из backlog.

## Следующий крупный шаг

После Mnemo v1 можно переходить к следующему агенту Day 4 или отдельно разобрать `telegram-chip`.

