const requests = new Map<string, { count: number; resetAt: number }>();

function isText(value: unknown, max: number) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max;
}

function isOptionalText(value: unknown, max: number) {
  return value === null || value === undefined || (typeof value === "string" && value.length <= max);
}

export async function POST(request: Request) {
  if (process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED !== "true") return Response.json({ error: "フォームは準備中です。" }, { status: 503 });

  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  const now = Date.now();
  const current = requests.get(ip);
  if (current && current.resetAt > now && current.count >= 5) return Response.json({ error: "送信回数が上限に達しました。" }, { status: 429 });
  requests.set(ip, current && current.resetAt > now ? { ...current, count: current.count + 1 } : { count: 1, resetAt: now + 3_600_000 });

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return Response.json({ error: "入力内容を確認してください。" }, { status: 400 }); }
  if (body.website) return Response.json({ ok: true });
  const concerns = typeof body.concerns === "string" ? [body.concerns] : Array.isArray(body.concerns) ? body.concerns.filter((value): value is string => typeof value === "string") : [];
  if (!isText(body.name, 100) || !isText(body.email, 254) || concerns.length !== 1 || body.consent !== "on") return Response.json({ error: "必須項目を確認してください。" }, { status: 400 });
  if (!isOptionalText(body.company, 150) || !isOptionalText(body.industry, 100) || !isOptionalText(body.message, 4000) || !isOptionalText(body.requests, 2000)) return Response.json({ error: "入力できる文字数を超えています。" }, { status: 400 });

  const email = String(body.email).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: "メールアドレスを確認してください。" }, { status: 400 });
  const gasWebAppUrl = process.env.GAS_WEB_APP_URL;
  const sharedSecret = process.env.GAS_SHARED_SECRET;
  if (!gasWebAppUrl || !sharedSecret) return Response.json({ error: "送信設定が未完了です。" }, { status: 503 });

  const safe = (value: unknown) => String(value ?? "").replace(/[<>]/g, "");
  const response = await fetch(gasWebAppUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    redirect: "follow",
    body: JSON.stringify({
      secret: sharedSecret,
      name: safe(body.name),
      company: safe(body.company),
      email,
      industry: safe(body.industry),
      concerns: concerns.map(safe),
      message: safe(body.message),
      requests: safe(body.requests),
    }),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.ok) return Response.json({ error: "送信に失敗しました。" }, { status: 502 });
  return Response.json({ ok: true });
}
