# AgentOS Day 4 — Mnemo Instagram smoke

Дата: 2026-05-20

## Что проверили

Проверили `instagram-superpower` skill у Mnemo через HikerAPI.

Skill подключён per-agent:

`/home/agentos/.claude-lab/inbox-agent/.claude/skills/instagram-superpower`

Real path:

`/home/agentos/gbrain-readonly/skills/instagram-superpower`

## Key setup

HikerAPI key сохранён безопасно:

`~/.secrets/hikerapi/api-key`

Ключ в чат не выводился.

## Balance check

HikerAPI balance response:

- amount: `$2.00`
- requests: `100`
- remaining requests shown by script: `98`

## Smoke command

Команда:

`bash .claude/skills/instagram-superpower/scripts/analyze.sh freemanlifelab 5 30`

## Result

Smoke успешный:

- account: `@freemanlifelab`
- full name: `Александр Фриман`
- followers: `6,414`
- following: `941`
- posts: `184`
- bio: `Психология масштаба личности`
- found reels in last 30 days: `0`

Важно:

`0 reels` — это не ошибка smoke. API key работает, account lookup работает, profile stats получены, script завершился успешно.

## Mnemo CLAUDE.md

Статус обновлён:

`instagram-superpower — installed, smoke passed on 2026-05-20 via HikerAPI analyze.sh`

## Backlog

`AGENTOS-005 — Instagram-superpower setup` переведён в status `done`.

