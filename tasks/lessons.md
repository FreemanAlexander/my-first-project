# Lessons

Формат: **что не так / как правильно / правило на будущее**.
Дата (UTC), контекст, ссылки на коммиты/файлы — обязательно, чтобы запись была проверяема позже.

---

## 2026-05-19 — sanitize-check падает в upstream public-gbrain-agentos (осознанное отклонение)

**Что не так.**
Запустили `bash scripts/sanitize-check.sh` в `~/gbrain-readonly` (Step 0 из `docs/setup.md`).
Скрипт упал с exit 1: нашёл «запрещённые» кодовые имена агентов (`silvana`, `kaelthas`, `thrall`, `illidan`, `tyrande`) в:
- `tests/test_hmac_review_fixes.py`, `tests/test_recall_mcp.py`, `tests/test_hmac_auth.py`, `tests/test_swarm_worker_hmac.py`, `tests/test_gbrain_doctor.py`, `tests/test_hmac_format_parity.py`
- `docs/INTER-AGENT-WEBHOOKS.md`
- `DEVIATIONS.md`
- `.env.example`

В `services/` (боевой код MCP-сервисов) совпадений нет.

Гайд требует: «If sanitize-check exits 0, the repo is clean. If not, re-clone and try again. Do not edit by hand to make it pass.» (`docs/setup.md:22`).

**Диагностика (read-only).**
- `git remote -v` → `origin = https://github.com/qwwiwi/public-gbrain-agentos.git` (правильный публичный репо).
- `git branch --show-current` → `main`.
- `git log --oneline -5` → `HEAD = 6d252ab (grafted, HEAD -> main, origin/main, origin/HEAD)`.
- `git status --short` → пусто, локальных правок нет.
- Клон shallow (`grafted`), но содержимое = upstream `main`.

Вывод: это **не наш битый клон**, а рассинхронизация в самом upstream public repo: автор не прогнал свой же publish-gate перед коммитом `6d252ab`, либо забыл выкосить кодовые имена из tests/docs.

**Как правильно по букве guide.**
Re-clone не поможет (мы и так на `origin/main`). Самый чистый путь — issue в `qwwiwi/public-gbrain-agentos` и ждать фикс. Руками править файлы public-репо или sanitize-check **запрещено** гайдом и нашими правилами (`.claude/CLAUDE.md` → Security: ничего не патчим в чужих репах под себя).

**Что решили (осознанное отклонение).**
Продолжаем установку, **не правя ни одного файла** в `~/gbrain-readonly` и не модифицируя `sanitize-check.sh`. Основание: все совпадения в тестах/документации/примерах, сервисный код чист, функциональный риск отсутствует. Отклонение зафиксировано здесь.

**Правило на будущее.**
1. Если документированный preflight-гейт падает, но HEAD == origin и локальных правок нет — проблема в upstream, не в клоне. Re-clone в этом случае бессмыслен.
2. Любой отказ от шага из guide фиксируется в `tasks/lessons.md` с коммитом/источником, до того как двинуться дальше.
3. Чужие репозитории (особенно read-only зеркала вроде `~/gbrain-readonly`) **не правим**, даже чтобы прогнать их же проверку. Лучше задокументированное отклонение, чем тихий патч.
