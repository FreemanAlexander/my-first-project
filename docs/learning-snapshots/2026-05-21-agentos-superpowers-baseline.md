# AgentOS — superpowers baseline

Дата: 2026-05-21

## Итог

Базовый skill `superpowers` доступен у всех трёх агентов:

- Homer
- Marketer
- Edith

## Проверка

### Homer

`/home/agentos/.claude-lab/homer/.claude/skills/superpowers`

Резолвится в:

`/home/agentos/.claude-lab/shared/skills/superpowers`

### Marketer

`/home/agentos/.claude-lab/marketer/.claude/skills/superpowers`

Резолвится в:

`/home/agentos/.claude-lab/shared/skills/superpowers`

### Edith

Добавлен symlink:

`/home/agentos/.claude-lab/edith/.claude/skills/superpowers`

Резолвится в:

`/home/agentos/.claude-lab/shared/skills/superpowers`

## Важно

Homer и Marketer используют общий shared skills слой.

Edith сохраняет свой отдельный набор skills и дополнительно получила symlink на общий `superpowers`.

## Следующий блок

Marketer social skills:

1. Instagram / HikerAPI.
2. YouTube transcript / YouTube API.
3. Telegram research / watchlist.
4. X / Twitter позже, после решения по API и бюджету.
