# Marketer — Instagram skill connected

Дата: 2026-05-21

## Итог

Marketer получил доступ к `instagram-superpower` через shared skills.

Symlink:

`/home/agentos/.claude-lab/shared/skills/instagram-superpower -> /home/agentos/gbrain-readonly/skills/instagram-superpower`

Marketer видит skill через:

`/home/agentos/.claude-lab/marketer/.claude/skills/instagram-superpower`

## HikerAPI

Secret file существует:

`/home/agentos/.secrets/hikerapi/api-key`

Raw key не выводился.

## Direct smoke

Команда:

`bash skills/instagram-superpower/scripts/analyze.sh freemanlifelab 5 30`

Результат:

- account: `@freemanlifelab`
- full name: `Александр Фриман`
- followers: `6,414`
- following: `941`
- posts: `184`
- reels in last 30 days: `0`
- HikerAPI balance: `$1.96`
- requests left: `96`

## Gateway smoke

Marketer проверил Instagram skill через Telegram / agentos-gateway.

Результат:

- agent: `marketer`
- status: `completed`
- duration_ms: `28885`
- accounting записан в `runs.jsonl`

## Статус

Instagram / HikerAPI skill для Marketer подключён и проверен.

## Next

Следующий social-skill блок:

1. YouTube transcript / YouTube API.
2. Telegram research / watchlist.
3. X / Twitter позже, после решения по API и бюджету.
