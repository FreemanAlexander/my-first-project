# Marketer — YouTube channel map

Дата: 2026-05-21

## Итог

Marketer получил технический слой YouTube channel research.

Создан wrapper:

`/home/agentos/.claude-lab/marketer/.claude/scripts/youtube-channel-map.py`

## Что умеет wrapper

- принять YouTube handle / query;
- найти channel_id;
- получить channel stats;
- получить список видео;
- вернуть JSON-карту видео.

## Direct smoke

Команда:

`python3 scripts/youtube-channel-map.py "@GoogleDevelopers" 5`

Результат:

- channel: `Google for Developers`
- channel_id: `UC_x5XG1OV2P6uZZ5FSM9Ttw`
- subscribers: `2,630,000`
- videoCount: `6425`
- videos returned: `5`

## Gateway smoke

Marketer проверил wrapper через Telegram / agentos-gateway.

Результат:

- agent: `marketer`
- status: `completed`
- duration_ms: `28645`
- accounting записан в `runs.jsonl`

## Важное ограничение

Текущий smoke использовал recent-выборку.

Это не полноценный анализ канала.

Для полноценного YouTube Research Mode нужен следующий слой:

- выборка по views;
- выборка по теме;
- выборка по периоду;
- выборка по комментариям;
- transcript только для выбранных видео.
