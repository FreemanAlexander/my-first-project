# Runbook — Skill connection standard

Дата: 2026-05-21

## Цель

Любой новый skill подключать не только физически, но и поведенчески.

Skill должен быть не просто доступен в `.claude/skills`, а встроен в работу конкретного агента.

## Standard flow

1. Skill layer
   - skill доступен физически;
   - symlink или установка проверены;
   - `SKILL.md` читается.

2. Secrets
   - API key / token лежит в secrets;
   - raw key не выводится;
   - права 600.

3. Permissions
   - разрешены только нужные команды;
   - не открывать широкий доступ без необходимости;
   - опасные действия оставить denied.

4. Direct smoke
   - проверить skill из терминала;
   - убедиться, что API / script работает.

5. Agent smoke
   - проверить через Claude Code или Telegram gateway;
   - убедиться, что агент реально применяет skill.

6. CLAUDE.md / core contract
   - решить, нужен ли auto-routing;
   - если да, добавить правило в CLAUDE.md;
   - подробную логику вынести в `core/<SKILL_MODE>.md`.

7. Auto-routing
   - пользователь не должен вручную писать "прочитай core/...";
   - агент сам выбирает skill по типу входа.

8. Safety
   - read-only по умолчанию;
   - публикация / отправка / изменение только по явной команде.

9. Snapshot
   - создать learning snapshot;
   - commit / push.

## Rule

After every skill connection ask:

Does this skill require agent behavior update?

If yes, update:

- CLAUDE.md
- core contract
- permissions
- smoke checklist
