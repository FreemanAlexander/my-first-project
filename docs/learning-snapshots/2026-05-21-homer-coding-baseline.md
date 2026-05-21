# Homer — coding baseline

Дата: 2026-05-21

## Итог

Homer получил базовый coder / architect workflow.

## Contract

Создан файл:

`/home/agentos/.claude-lab/homer/.claude/core/CODING_WORKFLOW.md`

Назначение:

- coding;
- debugging;
- refactoring;
- tests;
- architecture;
- repo analysis;
- deployment scripts;
- CLI tools;
- config changes;
- code review.

## CLAUDE.md

В `CLAUDE.md` добавлен блок:

`Homer coding auto-routing`

Правило:

- для coding/debug/refactor/test/architecture/repo/config задач автоматически читать `core/CODING_WORKFLOW.md`;
- использовать `superpowers` workflow when applicable;
- проверять результат перед `done`;
- отчитываться файлами, командами, результатами и git status.

## Skills

Homer видит shared skills:

- `superpowers`
- `markdown-new`
- `excalidraw`
- `groq-voice`
- другие shared skills

Ключевые для Homer:

- `superpowers` — TDD, debugging, planning, verification, code review;
- `markdown-new` — clean docs/web extraction;
- `excalidraw` — architecture schemas / flowcharts / mindmaps;
- `groq-voice` — voice input through shared Groq key.

## Smoke

Homer был проверен через Telegram / agentos-gateway.

Результат:

- agent: `homer`
- status: `completed`
- duration_ms: `27856`
- accounting записан в `runs.jsonl`

## Safety

Homer settings разрешают:

- git
- gh
- npm
- npx
- python3
- Read / Glob / Grep

Запрещают:

- sudo
- `curl * | bash`
- `rm -rf /`

## Status

Homer готов к coder / architect задачам v1.
