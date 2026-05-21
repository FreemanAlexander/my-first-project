# AgentOS Gateway — Homer and Marketer smoke

Дата: 2026-05-21

## Итог

Создан отдельный `agentos-gateway` под user `agentos`.

Причина:

- рабочий Jarvis Gateway живёт под user `edgelab`;
- `edgelab` не имеет доступа к `/home/agentos`;
- давать `edgelab` доступ к agentos-секретам нежелательно;
- поэтому для AgentOS-команды создан отдельный gateway.

## Runtime

- path: `/home/agentos/.claude-lab/agentos-gateway`
- service: `agentos-gateway.service`
- user: `agentos`
- status: enabled / active

Jarvis Gateway не трогали.

## Connected agents

На первом этапе подключены:

- Homer — `@Freeman_Homer_Bot`
- Marketer — `@Freeman_Marketer_Bot`

Edith пока не подключена к `agentos-gateway`, потому что она уже обслуживается отдельным `edith-bot.service`. Это защищает от double polling одного Telegram bot token.

## Smoke results

### Homer

- gateway получил сообщение;
- Claude Code запустился;
- ответ отправлен;
- heartbeat status: `completed`;
- duration: `5993ms`.

### Marketer

- gateway получил сообщение;
- Claude Code запустился;
- ответ отправлен;
- heartbeat status: `completed`;
- duration: `3016ms`.

## Accounting

Добавлен безопасный accounting log:

`/home/agentos/.claude-lab/agentos-gateway/logs/runs.jsonl`

Схема события:

- `ts`
- `gateway`
- `agent`
- `chat_id`
- `status`
- `duration_ms`
- `started_at_ms`
- `schema: agent_run_v1`

Примеры уже записаны для:

- `homer`
- `marketer`

Это базовый слой для будущей экономики агентов: кто сколько запускался, сколько длилась задача, какой статус.

## Current architecture

- `claude-gateway.service` / Jarvis — остаётся под `edgelab`, не изменялся.
- `agentos-gateway.service` — новый gateway для AgentOS-команды под `agentos`.
- `edith-bot.service` — пока отдельный Edith runtime.

## Backlog

1. Подключить Edith к `agentos-gateway` после решения, когда отключать отдельный `edith-bot.service`.
2. Добавить будущих агентов как новые config slots.
3. Расширить accounting: task_type, model, tool_calls_count, estimated_cost_usd.
4. Сделать daily/weekly отчёт по `runs.jsonl`.
5. Зафиксировать gateway config template для новых агентов.
