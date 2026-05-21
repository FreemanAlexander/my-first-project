# AgentOS Lesson 3 — complete

Дата: 2026-05-21

## Итог

Lesson 3 / Agents with gbrain закрыт.

## Agents

- Homer — coder / architect.
- Marketer — marketing / content creator.
- Edith — Second Brain / inbox / monitoring.

Финальные runtime paths:

- Homer: `/home/agentos/.claude-lab/homer`
- Marketer: `/home/agentos/.claude-lab/marketer`
- Edith: `/home/agentos/.claude-lab/edith`
- Legacy symlink: `/home/agentos/.claude-lab/inbox-agent -> /home/agentos/.claude-lab/edith`

## gbrain

Все 3 агента подключены к gbrain через 4 MCP:

- `gbrain-swarm`
- `gbrain-memory`
- `gbrain-recall`
- `gbrain-tasks`

Проверено:

- `.mcp.json` валиден у Homer / Marketer / Edith.
- gbrain token hashes разные.
- Edith heartbeat проходит как `agent_name=edith`.
- recall / swarm / tasks работают.

## Telegram

Созданы и проверены Telegram bots:

- Edith: `@Freeman_Edith_Bot`, id `8873953446`
- Homer: `@Freeman_Homer_Bot`, id `8798110974`
- Marketer: `@Freeman_Marketer_Bot`, id `8935023370`

Все `getMe` smoke прошли.

## Edith migration

Edith приведена к единому стандарту:

- canonical folder: `/home/agentos/.claude-lab/edith`
- gbrain agent id: `edith`
- Telegram bot: `@Freeman_Edith_Bot`
- service: `edith-bot.service`

Legacy `inbox-agent` оставлен только как symlink для совместимости.

Service state:

- `edith-bot.service` — enabled / active
- `inbox-bot.service` — disabled / inactive

Cron:

- compile каждые 15 минут через `run-compile-cron.sh`
- daily digest в 05:00 UTC / 12:00 Thailand

## Coordination smoke

`08-test-coordination.md` закрыт как DONE/PARTIAL:

DONE:

- Homer ↔ Marketer swarm flow.
- Marketer → Edith task flow.
- Edith → Homer review flow.
- Homer → Marketer shared recall test.
- coordinator report through swarm.
- all swarm messages acked.
- final stats: `acked=6`, pending/failed не было.

PARTIAL:

- Telegram report leg deferred до Jarvis-style Telegram Gateway для отдельных агентов.

## Troubleshooting check

`09-troubleshooting.md` использован как финальный чек-лист.

Проверено:

- agent folders OK.
- MCP JSON syntax OK.
- distinct gbrain token hashes OK.
- services OK.
- cron OK.
- Telegram tokens OK.
- Edith scripts syntax OK.
- snapshot repo clean.

## Commits during this block

- `fe04c2f` — gbrain connect + Edith alignment.
- `1087857` — coordination smoke.
- `b98eb3e` — Telegram bots snapshot formatting fix.
- `056642a` — Edith runtime migration.

## Backlog

1. Jarvis-style Telegram Gateway для Homer / Marketer / Edith.
2. Dual-report Telegram leg после Gateway.
3. Cosmetic cleanup: внутренние строки `inbox-bot` в `bot.py` / logs.
4. Slug bug: `create_decision_note` для русского title создал `30-decisions/2026-05-20-.md`.
5. Scopes policy для shared brain.
