"use client";

import { useState, type FormEvent } from "react";

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; notifySkipped: boolean }
  | { kind: "error"; message: string };

export function LeadForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<SubmitState>({ kind: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.kind === "submitting") return;
    if (!consent) {
      setState({
        kind: "error",
        message: "Нужно согласие на обработку персональных данных.",
      });
      return;
    }

    setState({ kind: "submitting" });
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          message,
          consent_personal_data: consent,
        }),
      });
      const data: unknown = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorText =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof (data as { error: unknown }).error === "string"
            ? (data as { error: string }).error
            : "submission_failed";
        setState({
          kind: "error",
          message: `Не удалось отправить заявку (${errorText}).`,
        });
        return;
      }

      const notifySkipped =
        typeof data === "object" &&
        data !== null &&
        "notifySkipped" in data &&
        (data as { notifySkipped: unknown }).notifySkipped === true;

      setState({ kind: "success", notifySkipped });
      setName("");
      setContact("");
      setMessage("");
      setConsent(false);
    } catch {
      setState({
        kind: "error",
        message: "Сбой сети. Попробуйте ещё раз.",
      });
    }
  }

  const isSubmitting = state.kind === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-[var(--space-8)] grid gap-[var(--space-5)]"
      noValidate
    >
      <label className="grid gap-[var(--space-2)]">
        <span className="font-ui text-[13px] font-medium uppercase leading-5 tracking-[0.04em] text-[color:var(--text-muted)]">
          Имя
        </span>
        <input
          type="text"
          name="name"
          required
          minLength={2}
          maxLength={80}
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="h-11 rounded-s border border-[color:var(--border-strong)] bg-ivory-light px-[var(--space-4)] font-body text-[15px] leading-[24px] text-graphite outline-none focus:border-bronze-deep"
        />
      </label>

      <label className="grid gap-[var(--space-2)]">
        <span className="font-ui text-[13px] font-medium uppercase leading-5 tracking-[0.04em] text-[color:var(--text-muted)]">
          Контакт (Telegram, email или телефон)
        </span>
        <input
          type="text"
          name="contact"
          required
          minLength={3}
          maxLength={120}
          value={contact}
          onChange={(event) => setContact(event.target.value)}
          className="h-11 rounded-s border border-[color:var(--border-strong)] bg-ivory-light px-[var(--space-4)] font-body text-[15px] leading-[24px] text-graphite outline-none focus:border-bronze-deep"
        />
      </label>

      <label className="grid gap-[var(--space-2)]">
        <span className="font-ui text-[13px] font-medium uppercase leading-5 tracking-[0.04em] text-[color:var(--text-muted)]">
          Пара слов о запросе (необязательно)
        </span>
        <textarea
          name="message"
          maxLength={2000}
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="rounded-s border border-[color:var(--border-strong)] bg-ivory-light px-[var(--space-4)] py-[var(--space-3)] font-body text-[15px] leading-[24px] text-graphite outline-none focus:border-bronze-deep"
        />
      </label>

      <label className="flex items-start gap-[var(--space-3)] font-body text-[13px] leading-5 text-[color:var(--text-secondary)]">
        <input
          type="checkbox"
          name="consent_personal_data"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1 h-4 w-4 accent-bronze-deep"
        />
        <span>
          Я согласен на обработку персональных данных в объёме, необходимом для
          связи и записи на встречу.
        </span>
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-11 items-center justify-center rounded-s bg-bronze-deep px-[var(--space-5)] font-ui text-[15px] font-medium leading-[22px] text-ivory-light transition-colors hover:bg-[#6f4b2a] disabled:opacity-60"
      >
        {isSubmitting ? "Отправляем…" : "Отправить заявку"}
      </button>

      {state.kind === "success" && (
        <p
          role="status"
          className="font-body text-[15px] leading-[24px] text-[color:var(--text-primary)]"
        >
          Заявка отправлена. Мы свяжемся с вами в течение рабочего дня.
          {state.notifySkipped
            ? " (Telegram-уведомление пока выключено.)"
            : ""}
        </p>
      )}

      {state.kind === "error" && (
        <p
          role="alert"
          className="font-body text-[15px] leading-[24px] text-[color:var(--text-primary)]"
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
