# AgentOS Day 4 — Mnemo voice E2E

Дата: 2026-05-20

## Что сделали

Подключили голосовые сообщения Telegram для Mnemo.

Теперь текущий `inbox-agent` умеет принимать Telegram voice, скачивать `.ogg`, расшифровывать через `groq-voice` / Groq Whisper и сохранять transcript через `save-to-raw.sh`.

## Изменения

Файл:

`/home/agentos/.claude-lab/inbox-agent/bot.py`

Backup:

`/home/agentos/.claude-lab/inbox-agent/bot.py.bak.voice-20260520`

Добавлено:

- `MEDIA_DIR`
- `GROQ_KEY_FILE`
- `GROQ_TRANSCRIBE`
- `_run_groq_transcribe(...)`
- `on_voice(...)`
- `MessageHandler(filters.VOICE, on_voice)`

## Groq key

Groq key сохранён безопасно:

`/home/agentos/.claude-lab/inbox-agent/secrets/groq-api-key`

Права:

`600`

Ключ в чат не выводился.

## E2E result

Telegram voice test прошёл успешно.

Создан voice-файл:

`/home/agentos/.claude-lab/inbox-agent/media/voice/2026-05/voice-12-1779252415.ogg`

Создан raw-файл:

`/home/agentos/.claude-lab/inbox-agent/raw/2026-05/text/text-1779252416.md`

Логи:

- `local write ok`
- `gbrain write ok`

Raw содержит блок:

`[voice transcript]`

И transcript текста голосового сообщения.

## Текущий нюанс

Voice transcript пока сохраняется в `raw/2026-05/text/`, потому что `save-to-raw.sh` классифицирует вход как text.

Но `source_tag` уже корректный:

`telegram-voice`

Позже можно улучшить `save-to-raw.sh`, чтобы voice сохранялся как отдельный type/path.

## Telegram UX note

UX уровня Jarvis — реакция 👀, live status window, elapsed timer, tool calls / todos / dispatches — сейчас НЕ внедряли.

По аудиту Jarvis это реализовано в отдельном кастомном `/home/edgelab/claude-gateway/gateway.py` и завязано на Claude Agent SDK stream events.

Решение:

- текущий Mnemo `bot.py` оставляем простым рабочим inbox/voice bot;
- Jarvis Gateway / Telegram Agent UX выносим в отдельный архитектурный этап;
- `/home/edgelab/claude-gateway/`, `gateway.py`, config и secrets не трогать без отдельного плана.

## Skills status

В `Mnemo CLAUDE.md` обновлён статус:

`groq-voice — smoke passed on 2026-05-20 via Telegram voice → Groq Whisper → raw/gbrain`

## Следующий шаг

Остался pending skill:

- `transcript` — нужен `TRANSCRIPT_API_KEY`

