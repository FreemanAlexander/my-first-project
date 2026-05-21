# AgentOS — shared Groq voice

Дата: 2026-05-21

## Итог

Голосовые сообщения заработали у агентов через общий Groq key.

## Что сделано

Groq API key вынесен в shared secrets:

`/home/agentos/.claude-lab/shared/secrets/groq-api-key`

Raw key не выводился.

Права:

`600`

## Gateway

`agentos-gateway/config.json` обновлён:

- Homer использует shared Groq key
- Marketer использует shared Groq key
- Edith использует shared Groq key

Gateway перезапущен.

Статус:

- `agentos-gateway.service` — active / enabled

## Skills

`groq-voice` виден агентам:

- Homer
- Marketer
- Edith

## Live smoke

Пользователь проверил голосовые вживую.

Результат:

- голосовые работают у всех проверенных агентов
- transcription больше не падает на отсутствии Groq key

## Architecture decision

Сейчас один shared Groq key для всех агентов — нормально.

Экономику агентов считать не через разные API keys, а через accounting:

- agent
- provider
- operation
- status
- duration
- estimated_cost
- key_alias

## Backlog

1. Agent usage accounting v2.
2. Добавить provider / operation / key_alias / estimated_cost в логи.
3. Разделять Groq keys по агентам только при реальной необходимости.
