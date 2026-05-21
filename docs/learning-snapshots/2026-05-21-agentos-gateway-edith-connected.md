# AgentOS Gateway — Edith connected

Дата: 2026-05-21

## Итог

Edith подключена к общему `agentos-gateway`.

Теперь через `agentos-gateway.service` работают:

- Homer
- Marketer
- Edith

## Почему Edith подключали отдельно

До этого Edith обслуживалась отдельным сервисом:

`edith-bot.service`

Чтобы избежать double polling одного Telegram bot token, сначала отдельный сервис Edith был остановлен и отключён.

## Service state

`agentos-gateway.service`:

- active
- enabled

`edith-bot.service`:

- inactive
- disabled

## Gateway config

В `agentos-gateway/config.json` добавлен agent slot:

`edith`

Workspace:

`/home/agentos/.claude-lab/edith/.claude`

Telegram token file:

`/home/agentos/.claude-lab/edith/secrets/telegram-bot-token`

Telegram bot:

`@Freeman_Edith_Bot`

## Smoke

Edith smoke прошёл успешно.

Лог показал:

- `[edith] consumer thread started`
- `[edith] producer thread started`
- message received
- heartbeat status `completed`
- reply sent

Accounting записан в:

`/home/agentos/.claude-lab/agentos-gateway/logs/runs.jsonl`

Edith run:

- agent: `edith`
- status: `completed`
- duration_ms: `6553`

## Текущая архитектура

Один общий AgentOS Gateway:

- `homer`
- `marketer`
- `edith`

Каждый агент имеет:

- отдельный Telegram bot;
- отдельный workspace;
- отдельный gbrain identity;
- общий gateway UX;
- общий accounting log.

## Backlog

1. Держать `edith-bot.service` как rollback, но не включать параллельно с gateway.
2. Для новых агентов использовать runbook `docs/runbooks/agentos-gateway-add-agent.md`.
3. Расширить accounting: model, task_type, tool_calls_count, estimated_cost_usd.
