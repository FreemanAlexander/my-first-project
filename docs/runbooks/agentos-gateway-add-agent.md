# Runbook — add agent to agentos-gateway

Дата: 2026-05-21

## Цель

Подключить нового агента к единому `agentos-gateway`.

Gateway:

/home/agentos/.claude-lab/agentos-gateway

Service:

agentos-gateway.service

Accounting:

/home/agentos/.claude-lab/agentos-gateway/logs/runs.jsonl

## Принцип

Один gateway обслуживает много agent slots.

Не создаём отдельный gateway на каждого агента.

Каждый агент должен иметь:

- workspace;
- Telegram bot token;
- .mcp.json;
- gbrain identity;
- config slot в agentos-gateway/config.json.

## Важно

Нельзя подключать один Telegram bot token к двум процессам одновременно.

Edith сейчас обслуживается отдельным edith-bot.service.

Перед подключением Edith к agentos-gateway нужно сначала отключить edith-bot.service.

## Smoke нового агента

1. Проверить token через getMe.
2. Добавить agent slot в config.json.
3. Перезапустить agentos-gateway.service.
4. Написать агенту в Telegram.
5. Проверить gateway.log.
6. Проверить runs.jsonl.

## Backlog

- сделать config template для новых агентов;
- расширить accounting: model, task_type, tool_calls_count, estimated_cost_usd;
- сделать daily/weekly отчёт по runs.jsonl.
