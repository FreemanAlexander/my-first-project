# Yandex Cloud / RU-hosted PostgreSQL — production setup checklist

Этот документ — **checklist для будущего production-подключения**, не runbook и не инструкция к немедленному выполнению. Шаги, отмеченные `[RED]`, требуют явного OK перед выполнением (см. `.claude/CLAUDE.md`, раздел Boundaries → Autonomy).

Связанные документы:

- `docs/backend-decision.md` — почему production = Yandex Cloud / RU-hosted PostgreSQL.
- `db/schema.md` — схема, которая поедет в prod-кластер.
- `api.md` — контракт и `CONSENT_REQUIRED`.
- `docs/bot-flows.md` — что бот делает с реальными заявками.
- `.env.example` — канонический набор переменных.
- `tasks/todo.md`, раздел «8. Compliance / 152-ФЗ (pre-production checklist)» — юр-пакет.

**Текущий статус:** не начато. Production-кластер не создан, реальные ПДн не принимаются. До закрытия всех пунктов ниже **запрещено** переключать `DATABASE_URL` приложения на RU-инстанс и поднимать `DB_MODE=production`.

---

## 0. Предусловия

До запуска любого пункта ниже:

- [ ] Архитектура зафиксирована (sandbox vs production) — закрыто, см. `docs/backend-decision.md`.
- [ ] Схема БД стабилизирована — закрыто, см. `db/schema.md`. Поля `consent_*` в `leads` уже есть.
- [ ] Выбран инструмент миграций (Drizzle / Prisma / Alembic / голый SQL) — открыто, этап 5 в `tasks/todo.md`.
- [ ] Готов хотя бы черновик Privacy Policy / текста согласия (юридическая проработка — отдельно).
- [ ] Хостинг бота определён (VPS в РФ / Fly в РФ-регионе) — открыто.

Без `[x]` по этому списку **не начинаем** создавать кластер.

---

## 1. Yandex Cloud аккаунт, organization, folder

Цель: завести изолированное окружение для production.

- [ ] Зарегистрировать / войти в Yandex ID учётной записи плательщика.
- [ ] Создать organization (если её нет) в Yandex Cloud Console.
- [ ] Создать cloud (например, `pml-cloud`). Указать корректного плательщика.
- [ ] Внутри cloud создать **отдельный folder** `pml-prod`. Не смешивать prod и sandbox в одном folder.
- [ ] Настроить IAM: минимум `editor` для тех, кто будет создавать ресурсы. Для приложения создаётся отдельный service account c узким набором ролей (см. шаги ниже).
- [ ] Установить `yc` CLI локально (по желанию), `yc init`, `yc config set folder-id <FOLDER_ID>`.

**Что не делаем:** не выдаём `admin`-роль приложению, не создаём API-ключи на личный Yandex ID — только на service account.

---

## 2. Managed Service for PostgreSQL — кластер

Цель: получить production-кластер Postgres в РФ-регионе.

- [ ] Service: **Managed Service for PostgreSQL**.
- [ ] Version: 16 (или актуальный LTS, поддерживаемый Yandex Cloud).
- [ ] Регион: только **`ru-central1`** (или другой регион, физически расположенный в РФ). Это требование 152-ФЗ ст. 18 ч. 5.
- [ ] Зона: 1 зона на старте достаточно, при росте — переход на HA с 3 зонами.
- [ ] Класс хоста: минимальный (`s2.micro` / `b2.medium` — на этапе MVP достаточно).
- [ ] Диск: `network-ssd`, 16 GB на старте, autoscaling по необходимости.
- [ ] **Public IP — disabled.** Приложение ходит в кластер через приватную сеть / NAT, не через интернет напрямую. (Если Vercel не может в private network — см. шаг 4 про доступ.)
- [ ] **TLS — обязательно.** Включить SSL, `sslmode` на стороне клиента — `verify-full`.
- [ ] Бэкапы: автоматические, retention ≥ 7 дней. Окно бэкапа — ночь МСК.
- [ ] Maintenance window: ночь МСК.
- [ ] Включить logging и monitoring (cloud-native, без сторонних агентов на старте).

**Reference-команда (НЕ выполнять автоматически):**

```bash
# reference only — выполнять вручную, после явного OK
yc managed-postgresql cluster create \
  --name pml-prod \
  --environment production \
  --network-name <NETWORK_NAME> \
  --host zone-id=ru-central1-a,subnet-id=<SUBNET_ID>,assign-public-ip=false \
  --resource-preset s2.micro \
  --disk-type network-ssd \
  --disk-size 16 \
  --postgresql-version 16
```

---

## 3. БД и пользователи

Цель: одна prod-база, отдельный application-пользователь с минимальными правами.

- [ ] Создать БД `pml_prod`.
- [ ] Создать application-пользователя `pml_app` с правами `CONNECT`, `USAGE`, `SELECT/INSERT/UPDATE/DELETE` только на нужные таблицы. **Не давать `SUPERUSER`, `CREATEDB`, `CREATEROLE`.**
- [ ] Пароль — случайная строка ≥ 32 символа. Сгенерировать в менеджере паролей, не в чате.
- [ ] Опционально: read-only пользователь `pml_readonly` для аналитики/бэкапов.
- [ ] Зафиксировать ID пользователя и БД в Yandex Cloud Console; passwords хранить только в secrets хостинга.

**Reference-команда:**

```bash
# reference only
yc managed-postgresql user create pml_app \
  --cluster-name pml-prod \
  --password <APP_PASSWORD>

yc managed-postgresql database create pml_prod \
  --cluster-name pml-prod \
  --owner pml_app
```

---

## 4. Сеть и доступы

Цель: к кластеру могут достучаться только нужные сервисы.

- [ ] Создать или использовать существующий VPC `pml-network` в `ru-central1`.
- [ ] Subnet — приватный, без public IP у БД.
- [ ] Security groups: разрешить входящие соединения на порт `6432` (pooler) только от:
  - egress-IP лендинга на Vercel (если фиксированные), либо
  - проксирующий backend в РФ, который сам ходит в БД,
  - хост бота (VPS / Fly в РФ): отдельная white-list запись.
- [ ] Если Vercel не имеет фиксированных egress IP — рассмотреть вариант **прокси-сервиса** на VPS в РФ, через который ходит Next.js, либо переехать API-роуты в РФ-инстанс.
- [ ] Скачать корневой CA-сертификат Yandex Cloud (`yandex-managed-services-CA.crt`). Положить в secrets хостинга (Vercel: env-переменная или файл; бот: `/etc/ssl/...`). **В репозиторий не коммитить.**

---

## 5. DATABASE_URL и сертификаты

Цель: собрать строку подключения для приложения.

Формат строки (для приложения):

```text
postgres://<USER>:<PASSWORD>@<HOST>.mdb.yandexcloud.net:6432/<DB>?sslmode=verify-full&sslrootcert=<PATH_TO_CA_CERT>
```

- `<HOST>` — endpoint кластера из консоли.
- Порт `6432` — connection pooler (рекомендуется). `5432` — прямое подключение, использовать только если pooler не подходит.
- `sslmode=verify-full` — обязательно для prod.
- `<PATH_TO_CA_CERT>` — путь к скачанному CA-сертификату на сервере приложения.

В `.env.example` уже есть переменные:

- `DATABASE_URL=` — сюда едет полная строка выше.
- (Опционально, если приложение читает CA отдельно) — отдельная переменная `DATABASE_SSL_ROOT_CERT_PATH` появится в `.env.example`, когда выберем ORM/драйвер. Пока в строке самой `DATABASE_URL` параметром.

---

## 6. Где хранить секреты

- **Лендинг (Vercel):** Project Settings → Environment Variables → Production. Прописать `DATABASE_URL`, `BOT_TOKEN` (если Vercel шлёт уведомления напрямую), `INTERNAL_BOT_NOTIFY_SECRET`, `CONSENT_POLICY_VERSION`, `WEB_BASE_URL`, `APP_ENV=production`, `DB_MODE=production`, `PD_STORAGE_REGION=ru`. Vercel шифрует значения и отдаёт их только на сервере.
- **Бот (VPS / Fly в РФ):** env-переменные через `systemd EnvironmentFile=` или `fly secrets set` (если Fly в РФ-регионе). Файл с переменными — `chmod 600`, owner — service-юзер.
- **Centralized vault (опционально):** Yandex Lockbox — если несколько сервисов читают одни и те же секреты. На MVP можно без него.
- **Локально (dev):** только в `.env` (gitignored), с **sandbox**-значениями. Production-секреты на dev-машину **не выкладываем**.
- **Никогда:** репозиторий (включая private), скриншоты, переписка в чатах (Slack/Telegram/ChatGPT/Claude), pastebin, gists, документация.

---

## 7. Что нельзя коммитить

Жёсткий список того, что не попадает в git ни при каких условиях:

- `DATABASE_URL` с паролем.
- Любые `*.pem`, `*.key`, `*.crt` с приватной частью.
- CA-сертификаты — формально публичные, но всё равно держим в secrets хостинга, не в репо.
- `BOT_TOKEN` (включая sandbox-токен).
- `INTERNAL_BOT_NOTIFY_SECRET`.
- `ADMIN_IDS`, если они реальные prod-id.
- `<FOLDER_ID>`, `<NETWORK_ID>`, `<CLUSTER_ID>` Yandex Cloud — формально не секрет, но и не нужны в репо.
- `.env`, `.env.local`, `.env.production`, `.env.preview` — уже в `.gitignore`.

Если случайно закоммитили — **rotate the secret** (перевыпустить токен/пароль), не «удалили из истории и забыли».

---

## 8. Какие переменные из `.env.example` нужны для production

Полный список (см. `.env.example` — каноническая версия с комментариями):

| Переменная                     | Production-значение                                       |
|--------------------------------|-----------------------------------------------------------|
| `BOT_TOKEN`                    | реальный prod-токен от @BotFather, отдельный от sandbox   |
| `ADMIN_IDS`                    | реальные `telegram_id` админов, через запятую             |
| `DATABASE_URL`                 | строка к Yandex Cloud Managed PostgreSQL (см. шаг 5)      |
| `WEB_BASE_URL`                 | `https://<домен>` — прод-домен лендинга                   |
| `APP_ENV`                      | `production`                                              |
| `DB_MODE`                      | `production`                                              |
| `PD_STORAGE_REGION`            | `ru` (иначе приложение не должно стартовать)              |
| `CONSENT_POLICY_VERSION`       | актуальная версия текста согласия, например `2026-05-18`  |
| `INTERNAL_BOT_NOTIFY_SECRET`   | случайная строка ≥ 32 символов, **отдельная от sandbox**  |

Sandbox- и prod-секреты — **разные**. Не переиспользуем.

---

## 9. Что проверить перед приёмом реальных ПДн (Pre-prod smoke)

- [ ] Все миграции из `db/schema.md` прогнаны на prod-кластере без ошибок.
- [ ] В приложении реализован safety-check на старте: если `DB_MODE=production` и `PD_STORAGE_REGION!=ru` — процесс падает с понятной ошибкой.
- [ ] В `DATABASE_URL` prod-приложения **нет** упоминаний `supabase.co`. В prod-secrets хостинга `SUPABASE_*` ключей нет.
- [ ] Privacy Policy / текст согласия опубликован по постоянному URL (Vercel route). Версия URL совпадает с `CONSENT_POLICY_VERSION` в env.
- [ ] Форма заявки на проде показывает чекбокс согласия + ссылку на Privacy Policy. Без чекбокса — `submit` заблокирован на клиенте; на сервере — `400 CONSENT_REQUIRED`.
- [ ] Логи не содержат plaintext PII (имя/контакт/IP/UA). Проверка — на свежем подаче тестовой заявки с синтетическими данными.
- [ ] Бэкапы PG включены, retention ≥ 7 дней, тестовый restore выполнен в отдельный кластер.
- [ ] Мониторинг: алерты на error rate `> 1%`, free disk `< 20%`, connections `> 80%` лимита.
- [ ] End-to-end smoke: форма → `/api/leads` → запись в `leads` (с `consent_*`) → уведомление админу в Telegram → нажатие `[Принять в работу]` → запись в `audit_log`. На синтетических данных, не реальных клиентах.
- [ ] Rollback-план: что делаем, если кластер недоступен (страница «временно недоступно», очередь заявок в Sentry/Slack-нотификация, ручное восстановление).

Пока хотя бы один пункт `[ ]` — реальные ПДн не принимаем.

---

## 10. Что требует отдельной юридической проверки (152-ФЗ)

Эти пункты **не закрываются техническим setup** Yandex Cloud. Они висят отдельным разделом в `tasks/todo.md` → «8. Compliance / 152-ФЗ (pre-production checklist)»:

- Юридическая валидность текста Privacy Policy и согласия на ОПД.
- Статус оператора ПДн (ФИО/ИП/ООО, ИНН, контактный email).
- Назначение ответственного за организацию обработки ПДн.
- Уведомление в Роскомнадзор как оператор (или обоснованное исключение).
- Регламент реагирования на инциденты (утечка / несанкционированный доступ).
- Точные сроки хранения по каждой цели обработки.
- Процедура запросов субъекта ПДн: доступ, копия, удаление, блокировка.
- Любая трансграничная передача (аналитика, ESP, CRM) — отдельный пункт согласия и уведомление РКН.

Yandex Cloud Managed PostgreSQL **сам по себе** не делает проект compliant. Он закрывает только **архитектурное** требование локализации первичной обработки ПДн в РФ.

---

## 11. Дальнейшие шаги

- [ ] **[RED]** Поднять prod-кластер по шагам 1–5. Только после explicit OK.
- [ ] **[RED]** Залить prod-secrets в Vercel и хост бота (шаг 6).
- [ ] **[RED]** Прогнать миграции из `db/schema.md` на prod-кластере.
- [ ] **[RED]** Переключить production `DATABASE_URL` приложения на RU-инстанс.
- [ ] Закрыть юр-пакет 152-ФЗ из `tasks/todo.md` (раздел 8).
- [ ] Зафиксировать факт перехода в `tasks/lessons.md`: что сработало, что переделать.
