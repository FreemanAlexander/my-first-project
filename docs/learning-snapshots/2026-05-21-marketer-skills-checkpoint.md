# Marketer skills checkpoint

Дата: 2026-05-21

## Итог

Marketer получил базовый skills-layer и первые рабочие social/research skills.

## Готово

### Superpowers

Marketer видит `superpowers` через shared skills:

`/home/agentos/.claude-lab/shared/skills/superpowers`

### Instagram / HikerAPI

Статус: DONE

Готово:

- `instagram-superpower` подключён через shared skills;
- HikerAPI key работает;
- direct smoke прошёл;
- Telegram/Gateway smoke прошёл;
- `runs.jsonl` пишет accounting.

### YouTube single-video transcript

Статус: DONE

Готово:

- `youtube-transcript` доступен;
- TranscriptAPI key вынесен в shared secrets;
- wrapper `scripts/youtube-transcript-fetch.py` создан;
- direct smoke прошёл;
- Telegram/Gateway smoke прошёл.

### YouTube channel research

Статус: DONE / v1

Готово:

- YouTube Data API key сохранён в shared secrets;
- wrapper `scripts/youtube-channel-map.py` создан;
- режимы `recent`, `top`, `search` работают;
- top локально сортируется по просмотрам;
- YouTube Research Mode создан в `core/YOUTUBE_RESEARCH.md`;
- CLAUDE.md получил auto-routing;
- natural smoke прошёл без ручной команды читать core.

## Auto-routing

Пользователь не должен вручную писать:

`прочитай core/YOUTUBE_RESEARCH.md`

Marketer сам включает YouTube Research Mode при YouTube video/channel/@handle/playlist/author/content-pattern запросах.

## Standard

Создан общий стандарт подключения skills:

`docs/runbooks/skill-connection-standard.md`

## Next

Следующий блок:

Telegram research / watchlist для Marketer.

Цель:

- Telegram channel/group как корпус материалов;
- read-only research;
- хуки, темы, паттерны, идеи;
- watchlist конкурентов и референсов.
