# AgentOS Day 4 — coordination smoke

Дата: 2026-05-20
Контекст: Lesson 3 / 08-test-coordination.md

## Итог

Финальный coordination smoke между Homer, Edith/inbox-agent и Marketer пройден.

Статус урока:

- `08-test-coordination.md` — DONE/PARTIAL.
- DONE по gbrain / swarm / tasks / recall / ack.
- PARTIAL только по Telegram report leg из dual-report rule, потому что Jarvis-style Telegram gateway для отдельных агентов ещё не подключён.

## Проверенные агенты

- Homer — coder / architect.
- Edith — Second Brain / inbox / monitoring.
- Marketer — marketing / content creator.

Edith technical runtime / gbrain agent id остаётся `inbox-agent`.

## Step 1–4: Homer ↔ Marketer

### Homer → Marketer

- Homer отправил Marketer задачу через `gbrain-swarm.notify`.
- task_id: `homer::marketer::a8c178a2d7001faa`
- status: `pending`

### Marketer read inbox

- Marketer увидел сообщение через `gbrain-swarm.list_my_pending`.
- payload прочитан корректно.

### Marketer → Homer + ack

- Marketer отправил ответ Homer.
- reply task_id: `marketer::homer::4ae54dd327f095c7`
- Marketer ack исходной задачи: `acked=true`.

### Homer read reply + ack

- Homer увидел ответ от Marketer.
- Homer ack ответа: `acked=true`.

## Step 5: Marketer → Edith

- Marketer отправил задачу Edith через technical id `inbox-agent`.
- task_id: `marketer::inbox-agent::758df45a7aa04a02`
- Edith увидела задачу через `list_my_pending`.
- Edith создала файл:

`/home/agentos/.claude-lab/inbox-agent/wiki/concepts/tov-feature-x.md`

- Edith создала gbrain external_note:

`50-external/lesson-3-step-08-coordination-smoke/2026-05-20-tov-feature-x.md`

- Edith ack задачи: `acked=true`.

## Step 6: Edith → Homer

- Edith отправила Homer ссылку на review.
- task_id: `inbox-agent::homer::6f5a5a76e6f3f84c`
- Homer увидел сообщение.
- Homer сделал review MCP Python SDK.
- Решение Homer: `yes`, использовать официальный MCP Python SDK как дефолт для новых MCP-серверов.
- Homer ответил Edith.
- reply task_id: `homer::inbox-agent::98590dd3cf91f266`
- Homer ack исходного сообщения: `acked=true`.
- Edith увидела ответ и ack: `acked=true`.

## Step 7: Recall test

Homer создал decision note:

- title: `Стек для нового лендинга`
- body: `Next.js 15 + Tailwind v4 + Supabase. Хостинг — Vercel free tier на старте.`
- result path: `30-decisions/2026-05-20-.md`

Первый recall у Marketer вернул пусто, потому что у Marketer не было read-scope `30-decisions`.

Fix:

- Marketer read-scopes расширены на `30-decisions`.

После fix Marketer нашёл decision через shared gbrain recall:

- path: `30-decisions/2026-05-20-.md`
- stack: `Next.js 15 + Tailwind v4 + Supabase`
- hosting: `Vercel free tier`

Итог: shared brain работает — Homer записал, Marketer нашёл.

## Step 8: Dual-report rule

Edith отправила coordinator report Homer:

- task_id: `inbox-agent::homer::a22d1632fa1562e2`
- origin task: `marketer::inbox-agent::758df45a7aa04a02`
- telegram_report_status: `deferred_until_agent_gateway`

Homer увидел coordinator report и ack:

- acked: `true`

Telegram report leg deferred до отдельного этапа Jarvis-style Telegram gateway для агентов.

## Step 9: Final check

`gbrain-tasks.agent_list`:

- `homer` — online
- `inbox-agent` — online
- `marketer` — online

`gbrain-swarm.stats`:

- `acked`: 6
- `pending`: 0
- `failed`: 0

delivery_outbox чистый.

## Backlog

1. Подключить Jarvis-style Telegram gateway UX для отдельных агентов.
2. Доработать dual-report Telegram leg после gateway.
3. Проверить slug generation у `create_decision_note`: русский title создал path `30-decisions/2026-05-20-.md` с пустым slug.
4. Позже решить, нужно ли расширять read-scopes Marketer ещё на другие shared scopes.

## Lesson status

- `08-test-coordination.md` — DONE/PARTIAL.
- Следующий файл: `09-troubleshooting.md`.
