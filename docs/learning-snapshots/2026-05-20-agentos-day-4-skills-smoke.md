# AgentOS Day 4 — Mnemo skills smoke

Дата: 2026-05-20

## Что проверили

Проверили smoke-status per-agent skills у Mnemo.

Workspace:

`/home/agentos/.claude-lab/inbox-agent`

Skills path:

`/home/agentos/.claude-lab/inbox-agent/.claude/skills/`

## Итоговый статус

- `markdown-new` — installed, smoke passed
- `agent-browser` — installed, smoke passed через `npx --yes agent-browser` + Chrome runtime
- `transcript` — installed, `TRANSCRIPT_API_KEY` pending
- `groq-voice` — installed, `GROQ_API_KEY` pending

## markdown-new smoke

Команда:

`curl -fsSL "https://markdown.new/https://example.com" -o /tmp/mnemo-markdown-new-smoke.md`

Результат:

- файл создан
- размер: `241 bytes`
- получен clean Markdown
- внутри есть `Title: Example Domain`
- внутри есть `# Example Domain`

## agent-browser smoke

Сначала `agent-browser` через `npx` был доступен, но Chrome runtime отсутствовал.

Потом установлен Chrome runtime:

`npx --yes agent-browser install`

После этого потребовались системные зависимости Chrome:

`npx --yes agent-browser install --with-deps`

Итоговый smoke:

- `open exit code: 0`
- `snapshot exit code: 0`
- snapshot увидел:
  - heading `Example Domain`
  - link `Learn more`

Примечание:

- была строка `--args ignored: daemon already running`
- это не помешало smoke, потому что open/snapshot завершились успешно

## Pending

Остались ключи:

- `TRANSCRIPT_API_KEY` для `transcript`
- `GROQ_API_KEY` для `groq-voice`

## Mnemo CLAUDE.md

В `Mnemo CLAUDE.md` обновлён блок `Skills map` / `Smoke status`.

