# Backend decision — MVP

Документ фиксирует выбор backend-платформы для учебного проекта AgentOS (продающий лендинг + Telegram-бот с админкой).

Источник правил: `.claude/CLAUDE.md`. Связанные документы: `docs/architecture.md`, `api.md`, `db/schema.md` (появится позже).

## Решение

**Supabase** — основная backend-платформа MVP.

- Хранилище данных: Supabase Postgres.
- Серверная логика лендинга: Next.js Route Handlers (`web/app/api/*`) на Vercel.
- Бизнес-логика бота и админка: Telegram-бот на Python/aiogram, подключается к тому же Supabase Postgres напрямую.
- Доступ к БД с лендинга — только через серверные роуты Next.js с `SUPABASE_SERVICE_ROLE_KEY`. Из браузера сервисный ключ не выходит.

## Почему Supabase

1. **Соответствие уже зафиксированному стеку.** В `.claude/CLAUDE.md` и `docs/architecture.md` Supabase Postgres уже указан как единое хранилище — это не новый выбор, а формализация.
2. **Реляционная модель.** Сущности `users`, `leads`, `broadcasts`, `audit_log` имеют связи (заявка ↔ пользователь, рассылка ↔ сегмент, audit ↔ admin). Postgres сюда ложится естественно.
3. **Минимум DevOps на старте.** Managed Postgres, не нужно поднимать сервер, настраивать бэкапы и сеть. Это учебный проект, а не платформенная задача.
4. **Совместимость с Vercel.** Vercel + Supabase — стандартная пара под Next.js MVP, есть готовая интеграция и документация.
5. **Учебная ценность.** Будут затронуты: SQL, миграции, RLS (Row Level Security), serverless edge-функции (опционально), сервисные ключи vs anon ключи.
6. **Доступ из Python-бота.** Supabase Postgres — обычный Postgres с TLS-подключением. aiogram-бот подключится через `asyncpg` / SQLAlchemy и `DATABASE_URL`.

## Почему не другие варианты

### Yandex Cloud — отложено

- Плюсы: РФ-инфраструктура, нет рисков с географией, managed Postgres (`Managed Service for PostgreSQL`), Cloud Functions.
- Минусы: больше overhead на старте (IAM, биллинг, сети, security groups), кривая обучения круче. Для учебного MVP избыточно.
- Когда вернуться к этому варианту: если потребуется размещение в РФ-юрисдикции или есть жёсткие требования по latency для российских пользователей.

### Firebase — не подходит

- Firestore — документная NoSQL-база. Реляции `lead → user → broadcast → audit_log` придётся эмулировать через дублирование данных и cloud functions.
- Auth и Realtime — сильные стороны Firebase, но в нашем MVP они не критичны: админ логинится через Telegram, форма заявки не требует realtime.
- Когда оправдано: realtime-чат, мобильное приложение с offline-режимом, простая схема без сильных связей.

### VPS + SQLite — слишком много ручной работы

- Плюсы: полный контроль, минимальная стоимость, простая модель.
- Минусы:
  - SQLite ограничен по конкурентным записям (бот + лендинг = два процесса пишут в БД).
  - Бэкапы, миграции, restart-логика, TLS — всё руками.
  - На VPS отдельно нужно держать сервис, мониторинг, healthcheck.
- Когда оправдано: однопроцессные инструменты, локальные утилиты, прототип без сети.

## Что фиксируется этим решением

- БД для лендинга и бота — общая, Supabase Postgres.
- Сервисный ключ Supabase живёт только на сервере (Next.js Route Handlers и Python-бот). В браузер не попадает.
- Доступ из лендинга к БД — **через Next.js API**, не через клиентский Supabase SDK. Это упрощает контроль над тем, что пишется в БД, и даёт единый контракт `api.md`.
- Доступ бота к БД — напрямую через `DATABASE_URL` (Postgres connection string), без HTTP-слоя.

## Что НЕ фиксируется этим решением

- Конкретный ORM/DB-layer (Drizzle vs Prisma на web, SQLAlchemy vs asyncpg в боте) — выбор отложен до этапа 5 (Database) в `tasks/todo.md`.
- Edge Functions / RLS-политики — добавляются по мере необходимости, когда появится конкретный сценарий.
- Платформа для хостинга бота (VPS / Fly.io) — выбор отложен до этапа 7 (Deploy).
- Аутентификация админа в боте — реализуется через whitelist `ADMIN_IDS`, отдельный Supabase Auth не используется в MVP.

## Переменные окружения (план)

Реальные значения в репозиторий не попадают. В `.env.example` отражаются только имена ключей:

```text
# Web (Next.js, на Vercel)
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=    # только серверные роуты, никогда в браузер

# Bot (Python/aiogram)
TELEGRAM_BOT_TOKEN=
DATABASE_URL=                  # Postgres connection string из Supabase
ADMIN_IDS=                     # whitelist через запятую

# Связь web ↔ bot (если понадобится webhook со стороны лендинга в бот)
WEB_BASE_URL=
BOT_WEBHOOK_SECRET=
```

Сейчас секреты НЕ заводим: проект Supabase ещё не создан. Это шаг отдельного этапа.

## Дальнейшие шаги

- [ ] Создать `api.md` — контракт между лендингом и backend (этот шаг идёт сразу за решением).
- [ ] Описать схему БД в `db/schema.md` на этапе 5.
- [ ] Создать проект в Supabase и завести `.env` локально на этапе 5.
- [ ] Выбрать ORM/DB-layer перед этапом 5.
