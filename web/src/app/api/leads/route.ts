import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { notifyAdminsAboutLead } from "@/lib/telegram";

export const runtime = "nodejs";

const CURRENT_POLICY_VERSION = "2026-05-18-v1";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  contact: z.string().trim().min(3).max(120),
  message: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .transform((value) => (value && value.length > 0 ? value : null)),
  consent_personal_data: z.literal(true),
});

function getClientIp(request: NextRequest): string | null {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return null;
}

export async function POST(request: NextRequest) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation_failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { name, contact, message, consent_personal_data } = parsed.data;
  const consentIp = getClientIp(request);
  const consentUserAgent = request.headers.get("user-agent");

  let leadId: string;
  try {
    const insert = await db.query<{ id: string }>(
      `INSERT INTO leads (
        name, contact, message, source,
        consent_personal_data, consent_policy_version,
        consent_ip, consent_user_agent
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id`,
      [
        name,
        contact,
        message,
        "landing",
        consent_personal_data,
        CURRENT_POLICY_VERSION,
        consentIp,
        consentUserAgent,
      ],
    );
    leadId = insert.rows[0].id;
  } catch (error) {
    console.error("leads_insert_failed", {
      code: (error as { code?: string })?.code ?? null,
    });
    return NextResponse.json(
      { ok: false, error: "db_insert_failed" },
      { status: 500 },
    );
  }

  const notify = await notifyAdminsAboutLead({
    leadId,
    name,
    contact,
    message,
  });

  if (notify.sent) {
    try {
      await db.query(`UPDATE leads SET notified_at = now() WHERE id = $1`, [
        leadId,
      ]);
    } catch (error) {
      console.error("leads_notified_at_update_failed", {
        code: (error as { code?: string })?.code ?? null,
      });
    }
  }

  return NextResponse.json(
    { ok: true, id: leadId, notifySkipped: notify.skipped },
    { status: 201 },
  );
}
