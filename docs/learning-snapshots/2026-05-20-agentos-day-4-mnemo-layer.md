# AgentOS Day 4 — Mnemo layer

Дата: 2026-05-20

## Что сделали

Оформили текущий `inbox-agent` как agent-level workspace для будущего агента `mnemo`.

Физическая папка пока остаётся:

`/home/agentos/.claude-lab/inbox-agent`

Агентская личность:

`mnemo`

## Почему не переименовывали папку

Папку `inbox-agent` пока не переименовывали, чтобы не сломать:

- `cron`
- `inbox-bot.service`
- `.env`
- `secrets`
- `raw`
- `compiled`
- `logs`
- `save-to-raw.sh`
- `compile.sh`
- `daily-digest.sh`

## Созданные файлы

Создан agent-level файл:

- `/home/agentos/.claude-lab/inbox-agent/.claude/CLAUDE.md`

Созданы core memory файлы:

- `/home/agentos/.claude-lab/inbox-agent/core/USER.md`
- `/home/agentos/.claude-lab/inbox-agent/core/rules.md`
- `/home/agentos/.claude-lab/inbox-agent/core/warm/decisions.md`
- `/home/agentos/.claude-lab/inbox-agent/core/hot/handoff.md`

Создана wiki/output структура:

- `/home/agentos/.claude-lab/inbox-agent/wiki/index.md`
- `/home/agentos/.claude-lab/inbox-agent/wiki/log.md`
- `/home/agentos/.claude-lab/inbox-agent/wiki/sources/`
- `/home/agentos/.claude-lab/inbox-agent/wiki/entities/`
- `/home/agentos/.claude-lab/inbox-agent/wiki/concepts/`
- `/home/agentos/.claude-lab/inbox-agent/wiki/synthesis/`
- `/home/agentos/.claude-lab/inbox-agent/output/.gitkeep`

## Что зафиксировано в Mnemo CLAUDE.md

- роль: Second Brain / inbox / monitoring
- owner: Александр Фриман
- основной проект: «Психология масштаба личности» / PML
- текущие runtime paths
- scripts: `save-to-raw.sh`, `compile.sh`, `daily-digest.sh`
- cron: compile каждые 15 минут, digest в 12:00 Thailand
- memory architecture:
  - local long-term store
  - gbrain shared memory
- workflows:
  - SAVE
  - COMPILE
  - OUT
- safety rules
- autonomy zones
- reporting format
- includes:
  - `core/USER.md`
  - `core/rules.md`
  - `core/warm/decisions.md`
  - `core/hot/handoff.md`

## Важное решение

`mnemo` теперь считается первым полноценным agent-level контуром.

Это не новый бот и не новая папка, а агентская идентичность поверх уже работающего `inbox-agent`.

## Следующий шаг

Дальше нужно сделать skills inventory:

- какие skills уже есть в `gbrain-readonly/skills`
- какие skills установлены глобально
- какие skills нужны именно Mnemo
- что ставим первым:
  - `markdown-new`
  - `transcript`
  - `groq-voice`
  - `agent-browser`
