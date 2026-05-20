# AgentOS Day 4 — Telegram bots for Homer and Marketer

Дата: 2026-05-20

## Итог

Созданы и сохранены Telegram bot tokens для отдельных агентских интерфейсов Homer и Marketer.

Важно: raw tokens в snapshot не записываются.

## Token files

- Homer: `/home/agentos/.claude-lab/homer/secrets/telegram-bot-token`
- Marketer: `/home/agentos/.claude-lab/marketer/secrets/telegram-bot-token`

Права файлов:

- `600`

## Telegram getMe smoke

### Homer

- status: OK
- bot id: `8798110974`
- username: `Freeman_Homer_Bot`
- first_name: `Homer`

### Marketer

- status: OK
- bot id: `8935023370`
- username: `Freeman_Marketer_Bot`
- first_name: `Marketer`

## Текущее состояние

Подготовительный этап закрыт:

- Telegram bot tokens для Homer и Marketer существуют.
- Telegram API принимает оба токена.
- Токены сохранены в RED-zone secret-файлах.

## Следующий этап

Подключить Homer и Marketer к Jarvis-style Telegram Gateway / agent Telegram UX.

Важно:

- Не трогать рабочий Jarvis gateway config без отдельного плана.
- Не печатать токены в чат или logs.
- Сначала изучить текущий `/home/edgelab/claude-gateway/` и безопасно спланировать подключение.
- Цель: отдельные Telegram-окна для Homer и Marketer + единый Jarvis-style UX.

## Связанный backlog

- Jarvis-style Telegram Gateway для отдельных агентов.
- Dual-report Telegram leg.
- Единый UX: reaction, status window, elapsed time, tool calls, final report.
