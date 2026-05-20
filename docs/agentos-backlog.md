# AgentOS Backlog

Живой список задач, которые нельзя потерять.

## Правило

Если задача откладывается словами «потом», «позже», «можно улучшить», она должна попасть сюда.

Формат:

- статус: `open`, `doing`, `done`, `blocked`
- priority: `P0`, `P1`, `P2`, `P3`
- owner/agent: кто должен делать
- context: почему задача появилась
- next action: конкретный следующий шаг

---

## Open tasks

### AGENTOS-001 — Улучшить типизацию Telegram voice в save-to-raw

status: `open`  
priority: `P1`  
owner/agent: `mnemo` / later `daedalus`  
area: `inbox-agent`, `save-to-raw.sh`, `raw taxonomy`

Context:

Voice E2E уже работает:

Telegram voice → `.ogg` → Groq Whisper → transcript → `save-to-raw.sh` → raw → gbrain.

Текущий нюанс:

voice transcript сохраняется в `raw/2026-05/text/` как `type=text`, но с `source_tag=telegram-voice`.

Почему это важно:

- для будущей аналитики входящих нужно отличать text / voice / web / youtube;
- для wiki и digest лучше иметь корректный тип источника;
- для будущего поиска важно понимать, что это был голос, а не обычный текст.

Почему не делаем сразу:

- текущая цепочка voice E2E уже работает;
- изменение `save-to-raw.sh` затрагивает общий входной pipeline;
- лучше сделать отдельным безопасным шагом с backup + smoke test.

Next action:

1. Сделать backup `hooks/save-to-raw.sh`.
2. Проверить текущую классификацию `source_tag=telegram-voice`.
3. Добавить отдельный тип/path для voice:
   - `raw/YYYY-MM/voice/...`
   - `type: voice`
   - `source: telegram-voice`
4. Прогнать E2E:
   - Telegram voice
   - local raw voice path
   - gbrain write ok
   - compile не ломается
5. Зафиксировать snapshot.

### AGENTOS-002 — Telegram Agent Gateway UX / Jarvis-style status

status: `open`  
priority: `P1`  
owner/agent: `atlas` / `daedalus` later  
area: `telegram gateway`, `agent UX`

Context:

Jarvis Gateway уже умеет:

- 👀 reaction через `setMessageReaction`
- live status window через `sendMessage` + `editMessageText`
- elapsed timer `working -- Ns`
- thinking / tool calls / todos / dispatches
- throttle 2 sec
- delete status on final

Почему не делаем сразу:

- это реализовано в отдельном кастомном `/home/edgelab/claude-gateway/gateway.py`;
- gateway завязан на Claude Agent SDK stream events;
- текущий Mnemo `bot.py` — простой рабочий inbox/voice bot;
- нельзя смешивать voice E2E и gateway architecture в один рискованный шаг.

Next action:

1. Не трогать `/home/edgelab/claude-gateway/` без отдельного плана.
2. Спроектировать общий Telegram Agent UX Standard для Mnemo / Prometheus / Daedalus / Atlas.
3. Решить: добавляем агентов как slots в существующий Jarvis Gateway или делаем отдельный gateway.
4. Только после этого внедрять 👀 / status / elapsed.

### AGENTOS-003 — Подключить transcript skill

status: `open`  
priority: `P1`  
owner/agent: `mnemo`  
area: `skills`, `youtube`, `transcript`

Context:

Skill `transcript` установлен per-agent у Mnemo, но ждёт `TRANSCRIPT_API_KEY`.

Next action:

1. Получить `TRANSCRIPT_API_KEY`.
2. Сохранить в secrets без вывода в чат.
3. Прогнать YouTube transcript smoke.
4. Обновить Mnemo CLAUDE.md.
5. Зафиксировать snapshot.

