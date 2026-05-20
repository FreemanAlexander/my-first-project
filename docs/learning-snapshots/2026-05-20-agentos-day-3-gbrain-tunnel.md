# AgentOS Day 3 — gbrain SSH tunnel

Дата: 2026-05-20

## Что сделали

Настроили постоянный SSH-туннель с `jarvis-server` на `gbrain-vps`.

Локальные порты на `jarvis-server`:

- `127.0.0.1:8766` → `gbrain-vps:127.0.0.1:8766`
- `127.0.0.1:8767` → `gbrain-vps:127.0.0.1:8767`
- `127.0.0.1:8768` → `gbrain-vps:127.0.0.1:8768`

## Проверка

Ручной SSH-туннель сработал.

Потом установлен `autossh`:

- `/usr/bin/autossh`
- version: `1.4g`

`systemctl --user` не подошёл из-за ошибки:

- `Failed to connect to bus: No medium found`

Поэтому создан system-level unit:

- `/etc/systemd/system/gbrain-tunnel.service`

Сервис запускается от пользователя `agentos`.

## Текущее состояние

Проверено:

- `gbrain-tunnel.service` active
- после restart остаётся active
- `127.0.0.1:8766` reachable
- `127.0.0.1:8767` reachable
- `127.0.0.1:8768` reachable

## Важное

На `jarvis-server` есть pending kernel upgrade. Reboot пока не делали, чтобы не ломать настройку.

После будущего reboot нужно проверить:

- `sudo systemctl is-active gbrain-tunnel.service`
- `ss -tlnp | grep -E '8766|8767|8768'`

## Следующий шаг

Дальше: bearer-token для inbox-agent, установка inbox-agent, BotFather, E2E smoke test.
