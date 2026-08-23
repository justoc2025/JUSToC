const requests = new Map<string, { count: number; resetAt: number }>();

function isText(value: unknown, max: number) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max;
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
  if (!isText(body.name, 100) || !isText(body.email, 254) || !isText(body.category, 100) || !isText(body.message, 4000) || body.consent !== "on") return Response.json({ error: "必須項目を確認してください。" }, { status: 400 });

  const email = String(body.email).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: "メールアドレスを確認してください。" }, { status: 400 });
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !to) return Response.json({ error: "送信設定が未完了です。" }, { status: 503 });

  const safe = (value: unknown) => String(value ?? "").replace(/[<>]/g, "");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: "JUSToC Website <onboarding@resend.dev>", to: [to], reply_to: email,
      subject: `【JUSToCお問い合わせ】${safe(body.category)}`,
      text: `お名前: ${safe(body.name)}\n会社名・屋号: ${safe(body.company)}\nメール: ${email}\n相談内容: ${safe(body.category)}\n\n${safe(body.message)}`,
    }),
  });
  if (!response.ok) return Response.json({ error: "メール送信に失敗しました。" }, { status: 502 });
  return Response.json({ ok: true });
}
