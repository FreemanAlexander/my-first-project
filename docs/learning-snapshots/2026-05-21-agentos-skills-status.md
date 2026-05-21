# AgentOS — skills status

Дата: 2026-05-21

## Итог

Сформирован базовый skills-layer для текущей AgentOS-команды.

## Gateway

`agentos-gateway.service` active / enabled.

Через gateway работают:

- Homer
- Marketer
- Edith

Voice transcription работает через shared Groq key.

## Shared skills

Shared skills path:

`/home/agentos/.claude-lab/shared/skills`

В shared доступны:

- `superpowers`
- `markdown-new`
- `groq-voice`
- `youtube-transcript`
- `instagram-superpower`
- `telegram-chip`
- `excalidraw`
- `datawrapper`
- `gws`
- `quick-reminders`
- `perplexity-research`
- `twitter`

## Homer

Статус: coder / architect baseline готов.

Готово:

- видит shared skills;
- создан `core/CODING_WORKFLOW.md`;
- добавлен `Homer coding auto-routing` в `CLAUDE.md`;
- smoke через Telegram/Gateway прошёл.

Ключевые skills:

- `superpowers`
- `markdown-new`
- `excalidraw`
- `groq-voice`

## Marketer

Статус: social/research skills complete.

Готово:

- Instagram / HikerAPI;
- YouTube transcript;
- YouTube channel/corpus research;
- YouTube auto-routing;
- Telegram research / telegram-chip;
- Telegram auto-routing;
- shared skills видны.

Ключевые skills:

- `instagram-superpower`
- `youtube-transcript`
- `telegram-chip`
- `groq-voice`
- `superpowers`

## Edith

Статус: Second Brain / inbox / monitoring baseline готов.

Готово:

- работает через `agentos-gateway`;
- legacy `inbox-agent` оставлен symlink;
- voice работает через shared Groq key;
- compile/digest cron переведён на Edith.

Ключевые skills:

- `groq-voice`
- `transcript`
- `agent-browser`
- `markdown-new`
- `telegram-chip`
- `instagram-superpower`
- `superpowers`

## Skill connection standard

Создан runbook:

`docs/runbooks/skill-connection-standard.md`

Стандарт:

- physical skill access;
- secrets;
- permissions;
- direct smoke;
- agent/gateway smoke;
- CLAUDE.md/core contract;
- auto-routing;
- safety;
- snapshot/commit.

## Backlog

1. Новый урок по skills: определить, какие skills ставить каким агентам.
2. Homer: возможно добавить `agent-browser` в shared skills.
3. Marketer: X/Twitter позже после API/бюджета.
4. Telegram watchlist: позже наполнить реальными sources.
5. agent usage accounting v2.
