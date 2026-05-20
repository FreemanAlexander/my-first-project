# AgentOS Day 3 — gap review / memory architecture

Дата: 2026-05-20

## Что уже закрыто

Рабочая MVP-цепочка Second Brain готова:

`Telegram → inbox-bot → save-to-raw.sh → memory-mcp → gbrain`

Подтверждено:

- `gbrain-vps` работает
- MCP-сервисы `memory`, `recall`, `swarm` активны
- MCP-порты закрыты наружу и доступны через SSH tunnel
- `inbox-agent` пишет raw-файлы локально
- `save-to-raw.sh` пишет external notes в gbrain
- Telegram-бот создан на техническом Telegram-аккаунте
- allowlist расширен на два аккаунта:
  - главный Telegram: `370621610`
  - технический Telegram: `8892233735`
- Telegram E2E smoke прошёл
- `bot.log` очищен, token URL не светится

## Главное архитектурное решение

Главная общая память новой системы агентов:

`gbrain`

Каноническая база знаний проекта:

`wiki / markdown knowledge base`

Быстрый вход данных:

`inbox-agent`

Инструкции и характер агентов:

`CLAUDE.md + core memory layers`

Старые Jarvis / Richard:

`legacy / prototype контур`

Их сейчас не трогаем, не удаляем и не переносим вслепую. Позже нужен отдельный аудит: что в них есть, что полезно, что перенести, какие роли дать.

OpenViking сейчас не внедряем как второй центральный мозг. Сначала строим новую систему вокруг `gbrain`, чтобы не получить несколько несвязанных слоёв памяти.

## Почему мы отличаемся от гайда

В гайде описан универсальный путь. В нашей реальной установке были отличия:

- вместо `/opt/public-gbrain-agentos` используется `/opt/gbrain`
- `systemctl --user` не подошёл для SSH tunnel, поэтому создан system-level service `gbrain-tunnel.service`
- MCP endpoints работают как `/mcp` на разных портах:
  - `8767` memory
  - `8768` recall
  - `8766` swarm
- стандартный `save-to-raw.sh` не работал без MCP session id
- hook пропатчен на session-based MCP flow
- для `gbrain-memory-mcp` включён `GBRAIN_TOOLS=all`
- `bot.py` расширен с одного `PRINCE_CHAT_ID` до `PRINCE_CHAT_IDS`

## Что ещё НЕ закрыто по полноценному inbox

Текущий inbox-agent — MVP. Позже обязательно доделать:

- голосовые → транскрибация
- скриншоты → OCR / agent-browser
- web articles → markdown-new
- YouTube / видео → transcript
- compile cron
- daily digest
- recall-проверка после ingest

## Что ещё НЕ закрыто по CLAUDE.md / агентам

Нужно отдельно спроектировать и настроить:

- `CLAUDE.md`
- `SOUL`
- `RULES`
- `MEMORY`
- `core/USER.md`
- `core/rules.md`
- `core/warm/decisions.md`
- `core/hot/handoff.md`
- hooks:
  - `SessionStart`
  - `Stop`
  - `PreCompact`
  - `PostToolUse`
- skills для нужных каналов

## Что НЕ делаем сейчас

Сейчас не делаем:

- не ставим OpenViking
- не трогаем Jarvis / Richard
- не создаём новых агентов без архитектуры ролей
- не тащим старую память вслепую
- не включаем Telegram MTProto / telegram-chip без необходимости

## Что переносим в День 4

В День 4 переходит создание реальной команды агентов:

- inbox-agent как полноценный агент с именем и CLAUDE.md
- координатор / Chief of Staff
- маркетолог
- контент-агент
- технический агент
- CRM / аналитический агент

Имена агентов будут свои, не обязательно `Arthas`, `Silvana`, `Kaelthas`.

## Следующий технический шаг

Перед Днём 4 нужно сделать ревизию:

1. какие skills реально есть в репозитории
2. какие scripts/cron реально есть на `gbrain-vps`
3. что из skills ставим сейчас
4. что откладываем
5. нужен ли формальный workspace для inbox-agent до Дня 4

