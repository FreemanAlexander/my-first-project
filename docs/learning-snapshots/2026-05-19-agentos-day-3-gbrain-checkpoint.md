# AgentOS Day 3 — gbrain checkpoint

Дата: 2026-05-19  
Проект: `/home/agentos/my-first-project`  
VPS: `gbrain-agentos`

## Что проверено

Проверили учебный проект и gbrain VPS после установки Second Brain.

Git-состояние проекта:

- ветка: `main`
- синхронизация: `main` = `origin/main`
- working tree: clean
- последний коммит: `6fcf692 Зафиксировал rebind MCP gbrain на loopback`

## VPS

SSH alias:

- `gbrain-vps`

Hostname:

- `gbrain-agentos`

Ресурсы на момент проверки:

- RAM: 7.6 GiB total, 5.3 GiB available
- Swap: 4.0 GiB total, 0 used
- Disk: 150G total, 11G used, 133G available
- Load average: 0.00 / 0.00 / 0.00

## gbrain services

Проверены 5 systemd-сервисов:

- `gbrain-memory-mcp` — active
- `gbrain-recall-mcp` — active
- `gbrain-swarm-mcp` — active
- `gbrain-swarm-worker` — active
- `gbrain-ingest-worker` — active

## Ports and firewall

MCP-сервисы слушают только loopback:

- `127.0.0.1:8766` — swarm-mcp
- `127.0.0.1:8767` — memory-mcp
- `127.0.0.1:8768` — recall-mcp

Внешний bind на `0.0.0.0` отсутствует.

UFW активен:

- `22/tcp` — allow
- `8766/tcp` — deny
- `8767/tcp` — deny
- `8768/tcp` — deny
- v6 для `8766/8767/8768` — deny

Итог: SSH открыт, MCP-порты закрыты firewall'ом и дополнительно привязаны к `127.0.0.1`.

## Secrets

Admin token существует на VPS:

- `/opt/gbrain/secrets/admin.token`

Проверено без вывода значения:

- owner: `gbrain:gbrain`
- permissions: `0600`
- size: `44`

Правило:

- не делать `cat /opt/gbrain/secrets/admin.token`
- не выводить токены в чат
- не коммитить секреты в Git

## Важные замечания

- Первый admin-token ранее был случайно засвечен и затем отозван.
- Новый admin-token перевыпущен и хранится на сервере и в менеджере паролей.
- MCP-сервисы переведены с `0.0.0.0` на `127.0.0.1` как defense-in-depth.
- UFW продолжает закрывать порты `8766/8767/8768` снаружи.
- Warning recall-mcp про HF-cache считается upstream-особенностью и не относится к loopback rebind.

## Следующий шаг

Ближайший технический этап:

- SSH-tunnel `jarvis-server` → `gbrain-vps`
- `autossh` + systemd-user-unit
- проброс `127.0.0.1:8766/8767/8768`

После этого:

1. выпустить bearer-token для inbox-agent;
2. установить inbox-agent на `jarvis-server`;
3. создать Telegram-бота через BotFather;
4. подключить bot-token и bearer-token без вывода секретов в чат;
5. сделать E2E smoke test: Telegram forward → inbox-agent → memory-mcp → gbrain → recall.

## Статус

Серверная часть gbrain проверена и стабильна.

Day 3 ещё не закрыт полностью, но базовый Second Brain VPS готов к подключению клиента / inbox-agent.
