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

status: `done`  
priority: `P1`  
owner/agent: `mnemo`  
area: `skills`, `youtube`, `transcript`

Context:

Skill `transcript` установлен per-agent у Mnemo, но ждёт `TRANSCRIPT_API_KEY`.

Done result:

- `TRANSCRIPT_API_KEY` получен через TranscriptAPI email + OTP flow.
- ключ сохранён в `/home/agentos/.claude-lab/inbox-agent/secrets/transcript-api-key`
- права файла: `600`
- временный `transcript-session-token` удалён
- smoke test прошёл на YouTube URL
- HTTP code: `200`
- video_id: `OGielMpTED8`
- language: `ru`
- transcript_chars: `21966`
- Mnemo CLAUDE.md обновлён


### AGENTOS-004 — Telegram-chip decision / user-account access

status: `doing`  
priority: `P1`  
owner/agent: `mnemo` / later `atlas`  
area: `telegram-chip`, `Telethon`, `Telegram user-account`

Context:

`telegram-chip` подключён как skill к Mnemo, но не активирован.

Это Telegram user-account / MTProto слой, не обычный bot API. Сейчас основной inbox уже работает через Telegram bot API.

Why not now:

- user-account automation = higher risk;
- нужен API_ID / API_HASH / session string;
- session string равен доступу к Telegram-аккаунту;
- нельзя запускать несколько Telethon-процессов на одну session string.

Decision 2026-05-20:

- главный Telegram-аккаунт НЕ подключать сейчас;
- telegram-chip проверять только на втором / research-аккаунте;
- режим первого smoke: read-only;
- автоответы, отправка сообщений и массовый сбор личных переписок запрещены;
- главный аккаунт, клан и личные переписки вынести в отдельную Telegram Access Policy позже;
- возможно позже завести третий Telegram-аккаунт для отдельного разделения личной/операционной переписки.

Next action:

1. Подготовить отдельный runtime для telegram-chip research account.
2. Если нужен — подготовить план безопасности.
3. Только потом получать API_ID / API_HASH и запускать telegram-chip.

### AGENTOS-005 — Instagram-superpower setup

status: `done`  
priority: `P2`  
owner/agent: `mnemo` / `prometheus`  
area: `instagram`, `HikerAPI`, `content research`

Context:

`instagram-superpower` подключён как skill к Mnemo, но требует HikerAPI key.

Done result:

- HikerAPI key получен и сохранён в `~/.secrets/hikerapi/api-key`
- balance check прошёл
- balance: `$2.00`
- remaining requests: `98`
- smoke выполнен через `scripts/analyze.sh freemanlifelab 5 30`
- аккаунт найден: `@freemanlifelab`
- full name: `Александр Фриман`
- followers: `6,414`
- posts: `184`
- найдено `0 reels in last 30 days`, но API/profile smoke прошёл успешно
- Mnemo CLAUDE.md обновлён

### AGENTOS-006 — Twitter/X skill smoke

status: `done`  
priority: `P2`  
owner/agent: `mnemo`  
area: `twitter`, `x`, `fxtwitter`, `socialdata`

Context:

`twitter` подключён как skill к Mnemo.

Free path через FxTwitter может работать без ключа для одиночных tweets/profiles. SocialData key нужен для расширенных задач.

Done result:

- free FxTwitter smoke прошёл на публичном X-профиле
- profile URL: `https://x.com/BarackObama`
- endpoint: `https://api.fxtwitter.com/BarackObama`
- code: `200`
- name: `Barack Obama`
- screen_name: `BarackObama`
- SocialData API key пока не нужен; оставить для расширенных задач

### AGENTOS-007 — Perplexity research setup

status: `blocked`  
priority: `P2`  
owner/agent: `mnemo` / `prometheus` / `daedalus`  
area: `research`, `perplexity`, `sonar`

Context:

`perplexity-research` подключён как skill к Mnemo, но требует Perplexity API key.

Blocked reason:

Perplexity API сейчас просит пополнить баланс / credits. Минимальный практический порог для Tier 1 — около `$50+ credits purchased`.

Решение на 2026-05-20:

- не оплачивать Perplexity сейчас;
- не блокировать Day 4 из-за research API;
- использовать уже рабочие каналы Mnemo;
- вернуться к Perplexity позже, когда будет понятна реальная частота research-задач.

Next action later:

1. Оценить, сколько research-запросов реально нужно в неделю.
2. Решить, нужен ли Perplexity именно Mnemo или лучше Atlas/Prometheus.
3. Если ROI понятен — купить credits, сохранить ключ и прогнать smoke.
