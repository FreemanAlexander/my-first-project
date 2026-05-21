# Marketer — YouTube transcript skill

Дата: 2026-05-21

## Итог

Marketer получил рабочий режим YouTube single-video transcript.

## Skill

Marketer видит skill:

`/home/agentos/.claude-lab/marketer/.claude/skills/youtube-transcript`

Skill source:

`/home/agentos/.claude-lab/shared/skills/youtube-transcript`

## TranscriptAPI key

Shared key file создан:

`/home/agentos/.claude-lab/shared/secrets/transcript-api-key`

Raw key не выводился.

## Wrapper

Создан wrapper:

`/home/agentos/.claude-lab/marketer/.claude/scripts/youtube-transcript-fetch.py`

Назначение:

- принять YouTube URL или video id;
- вызвать TranscriptAPI;
- вернуть JSON summary;
- не печатать API key.

## Direct smoke

Команда с видео `https://www.youtube.com/watch?v=dQw4w9WgXcQ` прошла.

Результат:

- video_id: `dQw4w9WgXcQ`
- language: `en`
- title: `Rick Astley - Never Gonna Give You Up (Official Video) (4K Remaster)`
- author: `Rick Astley`
- transcript_chars: `2657`

## Gateway smoke

Marketer через Telegram / agentos-gateway выполнил YouTube transcript smoke.

Результат:

- agent: `marketer`
- status: `completed`
- duration_ms: `19211`
- accounting записан в `runs.jsonl`

## Статус

YouTube single-video transcript mode для Marketer работает.

## Next

Следующий слой:

YouTube channel research mode:

- принять канал / автора / handle;
- найти видео;
- выбрать top-N;
- проанализировать заголовки, темы, хуки;
- при необходимости получить transcript выбранных видео;
- выдать идеи для PML / Reels / Shorts / Telegram.
