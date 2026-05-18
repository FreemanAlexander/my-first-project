type NotifyPayload = {
  leadId: string;
  name: string;
  contact: string;
  message: string | null;
};

type NotifyResult = {
  sent: boolean;
  skipped: boolean;
};

function parseAdminIds(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}

function formatMessage(payload: NotifyPayload): string {
  const lines = [
    "Новая заявка с лендинга",
    `Имя: ${payload.name}`,
    `Контакт: ${payload.contact}`,
  ];
  if (payload.message) {
    lines.push(`Сообщение: ${payload.message}`);
  }
  lines.push(`ID: ${payload.leadId}`);
  return lines.join("\n");
}

export async function notifyAdminsAboutLead(
  payload: NotifyPayload,
): Promise<NotifyResult> {
  const token = process.env.BOT_TOKEN?.trim();
  const adminIds = parseAdminIds(process.env.ADMIN_IDS);

  if (!token || adminIds.length === 0) {
    return { sent: false, skipped: true };
  }

  const text = formatMessage(payload);
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const results = await Promise.all(
    adminIds.map(async (chatId) => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text }),
        });
        return response.ok;
      } catch {
        return false;
      }
    }),
  );

  return { sent: results.some((ok) => ok), skipped: false };
}
