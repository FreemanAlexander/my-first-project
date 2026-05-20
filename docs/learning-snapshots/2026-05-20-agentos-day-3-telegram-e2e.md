# AgentOS Day 3 — Telegram E2E smoke

Дата: 2026-05-20

## Итог

Финальная цепочка работает:

`Telegram → inbox-bot → save-to-raw.sh → memory-mcp → gbrain`

## Telegram architecture

- Новый inbox-бот создан на отдельном техническом Telegram-аккаунте.
- Старый бот с главного аккаунта удалён.
- Новый bot token сохранён в `~/.claude-lab/inbox-agent/secrets/telegram-bot-token`.
- Token не выводить в чат и не коммитить.

## Allowlist

Бот принимает сообщения от двух Telegram-аккаунтов:

- главный аккаунт: `370621610`
- технический аккаунт: `8892233735`

В `bot.py` добавлена поддержка `PRINCE_CHAT_IDS`.

Systemd override:
- `/etc/systemd/system/inbox-bot.service.d/override.conf`

Env:
- `PRINCE_CHAT_IDS=370621610,8892233735`

## Service

- service: `inbox-bot.service`
- status: `active`
- запускается от пользователя `agentos`

## Smoke result

Telegram E2E smoke прошёл успешно.

В `save-to-raw.log` были свежие успешные строки:
- `local write ok`
- `gbrain write ok`

На `gbrain-vps` появился файл:
- `/opt/gbrain/vault/50-external/text/2026-05-20-agentos-two-account-e2e-smoke-test-2026-05-20.md`

## Log cleanup

Старый `bot.log`, где был засвечен старый Telegram token URL, очищен через `sudo truncate`.

Проверка после restart:
- `inbox-bot.service` active
- `OK: no Telegram token URLs in bot.log`

## Текущий статус

Day 3 / Second Brain / inbox-agent Telegram E2E закрыт.
