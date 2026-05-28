# Alexander Freeman AgentOS Workspace

Рабочий production-like v1 workspace для обучения AgentOS / Claude Code и постепенной сборки реальной системы агентов Александра Фримана.

Это уже не просто тестовый проект. Это базовая инфраструктура, которую можно расширять модулями без полной переделки.

## Identity

- Пользователь — Александр Фриман.
- Основной язык общения — русский.
- Объясняй простым человеческим языком: что делаем, зачем, что уже сделано, какой следующий шаг.
- Перед новым крупным шагом показывай примерный прогресс по текущему дню/уроку.
- Не выдавай огромные инструкции без необходимости. Двигайся поэтапно.
- Пользователь учится, но система строится сразу как рабочая production-like v1 основа, а не как одноразовый MVP.

## Main project context

Главный проект пользователя:

- «Психология масштаба личности» / PML.
- Задача проекта: помочь людям выйти на свой масштаб, пройти внутренние ограничения, вернуть опору, проявленность, энергию, доход и самореализацию.
- Alexander Freeman LifeLab — вспомогательная Telegram-страница / поле прогрева, не главный бренд.
- Главный бренд и смысловое ядро — «Психология масштаба личности».

Внешним людям и в публичных технических сообщениях не раскрывать лишние продуктовые детали. Для технических примеров использовать нейтральные формулировки.

## Workspace purpose

Этот workspace используется для:

- обучения AgentOS / Claude Code;
- ведения GitHub-истории и learning snapshots;
- разработки сайта / лендинга / Telegram-ботов;
- настройки gbrain / Second Brain;
- создания production-like v1 системы агентов;
- будущей инфраструктуры PML: CRM, контент, аналитика, боты, agents.

## Current architecture

### Core repo

- Основной репозиторий: `/home/agentos/pml-project`
- GitHub: `FreemanAlexander/pml-project`
- Ветка по умолчанию: `main`
- Learning snapshots: `docs/learning-snapshots/`

### gbrain

Главная общая память новой системы агентов:

- Сервер памяти: `gbrain-vps`
- Установка: `/opt/gbrain`
- MCP endpoints через SSH tunnel на `jarvis-server`:
  - memory: `http://127.0.0.1:8767/mcp`
  - recall: `http://127.0.0.1:8768/mcp`
  - swarm: `http://127.0.0.1:8766/mcp`

gbrain = shared memory / semantic store / inter-agent coordination layer.

OpenViking пока не внедрять как второй центральный мозг.

Jarvis / Richard = legacy / prototype контур. Не трогать без отдельного аудита.

### inbox-agent / Mnemo foundation

Текущий рабочий inbox-agent:

- path: `/home/agentos/.claude-lab/inbox-agent`
- Telegram bot: Freeman Inbox
- принимает сообщения от двух Telegram-аккаунтов через allowlist:
  - главный аккаунт: `370621610`
  - технический аккаунт: `8892233735`
- пишет raw-файлы локально;
- пишет external notes в gbrain;
- compile cron каждые 15 минут;
- daily digest каждый день в `05:00 UTC = 08:00 MSK = 12:00 Thailand`.

Текущий inbox-agent позже оформляется как полноценный агент `mnemo`.

## Agent naming direction

Рабочие имена агентов:

- `mnemo` — Second Brain / inbox / monitoring
- `prometheus` — marketing / content / traffic
- `daedalus` — coder / architect / technical fixes
- `atlas` — coordinator / chief of staff, later
- `argus` — monitoring / intelligence, later

Имена можно поменять до финального внедрения. Не создавать новых агентов без подтверждения роли и назначения.

## Instruction hierarchy

Используй иерархию:

1. Global Claude settings / user-level rules
2. Project CLAUDE.md — этот файл
3. Agent CLAUDE.md — личность и обязанности конкретного агента
4. gbrain shared memory
5. Local memory агента

Если agent-level правила конфликтуют с project-level правилами — сначала безопасность, потом project-level, потом agent-level.

## Core principles

1. Plan Mode — для задач из 3+ шагов сначала краткий план.
2. Verification Before Done — никогда не говорить «готово» без проверки.
3. Demand Elegance — для нетривиального решения спросить: можно ли проще и чище.
4. Autonomous Bug Fixing — баг → логи → диагностика → фикс.
5. Production-like v1 — не строить одноразовые костыли, но и не overengineer.
6. Agent Native — агенты должны работать через API / MCP / tools, а не через ручные UI-клики.
7. gbrain first — перед нетривиальным решением проверять, нет ли уже зафиксированного контекста / решения / error-pattern.

## Autonomy boundaries

GREEN — можно делать без отдельного подтверждения:

- чтение файлов;
- диагностика;
- безопасная проверка статуса;
- создание документации;
- форматирование;
- non-destructive edits;
- git status / log / diff;
- локальные smoke checks.

YELLOW — можно предлагать, но кратко объяснить:

- изменение CLAUDE.md;
- изменение cron;
- изменение hooks;
- изменение systemd unit;
- изменение agent settings;
- добавление новых scripts / skills.

RED — только после явного OK:

- удаление данных;
- rm -rf;
- DROP TABLE;
- production deploy;
- изменение секретов;
- вывод токенов;
- push --force;
- отключение firewall / security;
- перенос Jarvis / Richard;
- внедрение OpenViking как нового слоя памяти.

## Security

- Никогда не выводить токены, пароли, API-ключи в чат, stdout, логи или скриншоты.
- Не коммитить `.env`, `.env.*`, `*.key`, `*.pem`, `secrets/`.
- `.mcp.json` не открывать полностью в чат, потому что там могут быть Bearer tokens.
- Перед любым действием с токенами: сохранить в файл секретов, права `600`, владелец правильный.
- Если токен случайно засветился — сразу очистить лог / ротировать токен / зафиксировать incident.

## Git rules

- Коммиты — на русском: «Добавил ...», «Исправил ...», «Обновил ...», «Зафиксировал ...».
- НИКОГДА `push --force`.
- НИКОГДА удалять ветки без OK.
- Перед коммитом: `git status --short`.
- После push: `git status` и `git log --oneline -N`.
- Learning snapshots фиксировать в `docs/learning-snapshots/`.

## Current completed checkpoints

Day 2 закрыт:

- сайт → форма заявки → API → Postgres → Telegram notify.

Day 3 закрыт production-like v1:

- gbrain VPS;
- SSH tunnel;
- inbox-agent token;
- patched `save-to-raw.sh`;
- Telegram E2E;
- two-account allowlist;
- compile smoke;
- daily digest smoke;
- cron enabled;
- final commit: `2ef2919 Зафиксировал cron inbox-agent`.

## Day 4 direction

Day 4 начинается с проектирования команды агентов.

Порядок:

1. привести project CLAUDE.md в production-like v1 состояние;
2. создать / оформить `mnemo` как полноценного Second Brain агента;
3. потом `prometheus` как маркетолога;
4. потом `daedalus` как кодера / архитектора;
5. только потом Telegram-chip, Instagram API, YouTube/X integrations, Hermes и дополнительные скиллы.

## Style

- Пиши по-русски.
- Без воды.
- Объясняй причину отличий от гайда.
- Не называй рабочую систему «тестовый MVP», если речь о фундаменте, который будет использоваться дальше.
- Если что-то является временным решением — прямо помечай как temporary.
- Если действие обратимое — говори это.
- Если действие рискованное — сначала объясни риск.

## Code style

- TypeScript: strict mode, не использовать `any` без крайней необходимости.
- Python: type hints для функций.
- Комментарии в коде — только если они реально помогают.
- Не плодить абстракции «на будущее».
- Файл > 400 строк — подумать о разбиении.
- Функция > 60 строк — подумать о разбиении.

## Do not touch without explicit plan

- `/home/edgelab`
- legacy Jarvis / Richard
- OpenViking
- production personal data
- real client CRM data
- real payment data
- Telegram user-account / telegram-chip
- Instagram / X / YouTube API keys

