# AgentOS Day 4 — Mnemo skills

Дата: 2026-05-20

## Что сделали

Подключили per-agent skills для Mnemo внутри существующего workspace:

`/home/agentos/.claude-lab/inbox-agent`

Skills установлены symlink-ами в:

`/home/agentos/.claude-lab/inbox-agent/.claude/skills/`

## Подключённые skills

- `markdown-new`
- `transcript`
- `groq-voice`
- `agent-browser`

Все 4 symlink проверены:

- target существует
- `SKILL.md` найден

## Skills map в Mnemo CLAUDE.md

В файл:

`/home/agentos/.claude-lab/inbox-agent/.claude/CLAUDE.md`

добавлен блок `Skills map`.

Зафиксированные правила:

- обычный текст → сохранять напрямую
- web links → `markdown-new`
- YouTube links → `transcript`
- voice/audio → `groq-voice`
- fallback extraction → `agent-browser`
- не считать skill рабочим, пока не прошёл smoke test

## Smoke status

- `markdown-new` — installed, smoke pending
- `transcript` — installed, API key pending
- `groq-voice` — installed, API key pending
- `agent-browser` — installed as skill, CLI/browser smoke pending

## Backup

Перед изменением создан backup:

`/home/agentos/.claude-lab/inbox-agent/.claude/CLAUDE.md.bak.skills-20260520-041040`

## Следующий шаг

Первым smoke test проверяем `markdown-new`, потому что он не требует API key.

