-- 001_init.sql — начальная миграция MVP.
-- Источник: db/schema.md (таблицы admins, leads, audit_log + индексы + триггер updated_at).
-- Прогон: docker exec -i pml-pg psql -U $POSTGRES_USER -d $POSTGRES_DB < db/migrations/001_init.sql

BEGIN;

-- gen_random_uuid() для UUID v4 в leads.id
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------- admins ----------
-- Справочник админов. Источник прав — env ADMIN_IDS, эта таблица — мирор
-- для отображения и FK из audit_log. Удаление = снятие is_active, не DELETE.
CREATE TABLE admins (
    telegram_id   bigint        PRIMARY KEY,
    username      text,
    display_name  text,
    is_active     boolean       NOT NULL DEFAULT true,
    created_at    timestamptz   NOT NULL DEFAULT now()
);

-- ---------- leads ----------
-- Заявки с лендинга. consent_* поля — архитектурное требование 152-ФЗ,
-- не отложенный TODO. Запись без согласия в принципе не создаётся.
CREATE TABLE leads (
    id                       uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
    name                     text          NOT NULL,
    contact                  text          NOT NULL,
    message                  text,
    source                   text,
    status                   text          NOT NULL DEFAULT 'new',
    created_at               timestamptz   NOT NULL DEFAULT now(),
    updated_at               timestamptz   NOT NULL DEFAULT now(),
    notified_at              timestamptz,
    accepted_at              timestamptz,
    done_at                  timestamptz,
    accepted_by              bigint        REFERENCES admins(telegram_id) ON DELETE SET NULL,
    done_by                  bigint        REFERENCES admins(telegram_id) ON DELETE SET NULL,
    consent_personal_data    boolean       NOT NULL,
    consent_policy_version   text          NOT NULL,
    consent_given_at         timestamptz   NOT NULL DEFAULT now(),
    consent_ip               inet,
    consent_user_agent       text,
    CONSTRAINT leads_name_len_chk        CHECK (char_length(name) BETWEEN 2 AND 80),
    CONSTRAINT leads_contact_len_chk     CHECK (char_length(contact) BETWEEN 3 AND 120),
    CONSTRAINT leads_message_len_chk     CHECK (message IS NULL OR char_length(message) <= 2000),
    CONSTRAINT leads_status_chk          CHECK (status IN ('new', 'in_progress', 'done', 'rejected')),
    CONSTRAINT leads_consent_true_chk    CHECK (consent_personal_data = true),
    CONSTRAINT leads_consent_ver_len_chk CHECK (char_length(consent_policy_version) BETWEEN 1 AND 64)
);

CREATE INDEX leads_status_created_at_idx ON leads (status, created_at DESC);
CREATE INDEX leads_created_at_idx        ON leads (created_at DESC);

-- ---------- audit_log ----------
-- Журнал намеренных действий админов. Удаление заявки сохраняет запись
-- с lead_id = NULL, чтобы история не пропадала молча.
CREATE TABLE audit_log (
    id                  bigserial     PRIMARY KEY,
    admin_telegram_id   bigint        NOT NULL REFERENCES admins(telegram_id) ON DELETE RESTRICT,
    action              text          NOT NULL,
    lead_id             uuid          REFERENCES leads(id) ON DELETE SET NULL,
    payload             jsonb,
    created_at          timestamptz   NOT NULL DEFAULT now(),
    CONSTRAINT audit_log_action_format_chk CHECK (action ~ '^[a-z_]+\.[a-z_]+$')
);

CREATE INDEX audit_log_lead_id_created_at_idx ON audit_log (lead_id, created_at DESC);
CREATE INDEX audit_log_admin_created_at_idx   ON audit_log (admin_telegram_id, created_at DESC);

-- ---------- updated_at trigger ----------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at := now();
    RETURN NEW;
END;
$$;

CREATE TRIGGER leads_set_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

COMMIT;
