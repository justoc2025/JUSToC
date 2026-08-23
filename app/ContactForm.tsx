"use client";

import { useState } from "react";

export default function ContactForm() {
  const enabled = process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === "true";
  const [notice, setNotice] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled) return;
    setSending(true);
    setNotice("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("send failed");
      form.reset();
      setNotice("お問い合わせを受け付けました。内容を確認のうえご連絡します。");
    } catch {
      setNotice("送信できませんでした。時間をおいて再度お試しいただくか、メールをご利用ください。");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className={`form-status ${enabled ? "ready" : ""}`}><span /> {enabled ? "お問い合わせ受付中" : "フォーム準備中"}</div>
      <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="field-row"><label>お名前 <b>必須</b><input name="name" autoComplete="name" required /></label><label>会社名・屋号 <small>任意</small><input name="company" autoComplete="organization" /></label></div>
      <label>メールアドレス <b>必須</b><input type="email" name="email" autoComplete="email" required /></label>
      <label>相談したい内容 <b>必須</b><select name="category" required defaultValue=""><option value="" disabled>選択してください</option><option>AI活用相談</option><option>業務効率化・システム開発</option><option>既存業務の改善相談</option><option>その他</option></select></label>
      <label>お問い合わせ内容 <b>必須</b><textarea name="message" rows={6} required placeholder="現在のお困りごとや、実現したいことをご記入ください。" /></label>
      <label className="consent"><input type="checkbox" name="consent" required /><span>入力した情報をお問い合わせへの対応に利用することに同意します。</span></label>
      <button type="submit" disabled={!enabled || sending}>{sending ? "送信しています…" : enabled ? "この内容で送信する" : "公開時に受付を開始します"}<span>→</span></button>
      {notice && <p className="form-notice" role="status">{notice}</p>}
      <p className="form-fallback">{enabled ? "送信できない場合は" : "公開前のため、現在フォームは送信されません。"} <a href="mailto:contact@justoc.jp">メールで問い合わせる</a></p>
    </form>
  );
}
