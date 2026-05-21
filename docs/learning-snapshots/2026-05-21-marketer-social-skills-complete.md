# Marketer social skills — complete checkpoint

Дата: 2026-05-21

## Итог

Marketer получил рабочий social/research skills layer.

## Готово

### Instagram / HikerAPI

- `instagram-superpower` подключён через shared skills.
- HikerAPI key работает.
- Direct smoke прошёл.
- Telegram/Gateway smoke прошёл.
- Accounting пишется в `runs.jsonl`.

### YouTube

Готово:

- `youtube-transcript` подключён.
- TranscriptAPI key вынесен в shared secrets.
- `scripts/youtube-transcript-fetch.py` работает.
- YouTube Data API key подключён.
- `scripts/youtube-channel-map.py` работает.
- Режимы `recent`, `top`, `search` работают.
- `top` сортируется по просмотрам.
- `core/YOUTUBE_RESEARCH.md` создан.
- CLAUDE.md auto-routing добавлен.
- Natural smoke прошёл без ручной команды читать core.

### Telegram / telegram-chip

Готово:

- `telegram-chip` подключён через shared skills.
- `core/TELEGRAM_RESEARCH.md` создан.
- CLAUDE.md auto-routing добавлен.
- telegram-chip research runtime проверен read-only.
- `/chats/list` OK.
- `/chats/{chat_id}/messages` OK.
- Marketer сделал read-only анализ Telegram source.
- main Telegram account не подключался.
- ничего не публиковалось.
- manual API после smoke остановлен.

## Safety

Все social skills работают read-only по умолчанию.

Публикация, отправка, редактирование, удаление, лайки, подписки и любые действия от аккаунта — только по отдельной явной команде.

## Standard

Создан общий стандарт подключения skills:

`docs/runbooks/skill-connection-standard.md`

## Current status

Marketer готов к research задачам по:

- Instagram account research;
- YouTube video/channel/corpus research;
- Telegram channel/group/watchlist research.

## Backlog

1. X / Twitter — позже, после решения по API/бюджету.
2. Telegram watchlist — позже наполнить реальными источниками.
3. telegram-chip API — решить: systemd service или on-demand запуск.
4. YouTube corpus upgrade — date filters, diversity mode, comments mode.
