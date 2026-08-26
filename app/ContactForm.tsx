"use client";

import { useState } from "react";
import content from "./contact-content.json";

type Question = {
  number: string;
  name: string;
  type: "text" | "email" | "textarea" | "checkbox" | "select";
  title: string;
  required: boolean;
  description?: string;
  placeholder?: string;
  maxLength?: number;
  autoComplete?: string;
  rows?: number;
  options?: string[];
};

const formContent = content.form;
const questions = formContent.questions as Question[];

type FieldProps = {
  number: string;
  title: string;
  required?: boolean;
  description?: string;
  children: React.ReactNode;
};

function Field({ number, title, required = false, description, children }: FieldProps) {
  return (
    <fieldset className="consult-field">
      <legend className="sr-only">{title}{required ? "（必須）" : "（任意）"}</legend>
      <div className="consult-field-title">
        <span className="consult-number">{number}</span>
        <span>{title}</span>
        <em className={required ? "is-required" : "is-optional"}>{required ? "必須" : "任意"}</em>
      </div>
      {description && <p className="consult-field-description">{description}</p>}
      {children}
    </fieldset>
  );
}

export default function ContactForm() {
  const enabled = process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === "true";
  const [notice, setNotice] = useState("");
  const [sending, setSending] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || sending) return;
    setSending(true);
    setNotice("");
    const form = event.currentTarget;
    const data = new FormData(form);
    if (!data.get("concerns")) {
      setSucceeded(false);
      setNotice("「どのようなことにお困りですか？」を1つ以上選択してください。");
      setSending(false);
      form.querySelector<HTMLInputElement>('input[name="concerns"]')?.focus();
      return;
    }
    const payload = {
      name: data.get("name"),
      company: data.get("company"),
      email: data.get("email"),
      industry: data.get("industry"),
      concerns: data.getAll("concerns"),
      message: data.get("message"),
      requests: data.get("requests"),
      consent: data.get("consent"),
      website: data.get("website"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "送信に失敗しました。");
      form.reset();
      setSucceeded(true);
      setNotice(formContent.confirmationMessage);
    } catch (error) {
      setSucceeded(false);
      setNotice(error instanceof Error ? error.message : "送信できませんでした。時間をおいて再度お試しください。");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="consult-form" onSubmit={handleSubmit}>
      <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className={`consult-status ${enabled ? "is-ready" : ""}`}><span /> {enabled ? "無料相談受付中" : "フォーム準備中"}</div>

      {questions.map((question) => (
        <Field key={question.name} number={question.number} title={question.title} required={question.required} description={question.description}>
          {question.type === "checkbox" ? (
            <div className="consult-checkbox-grid">
              {question.options?.map((option) => (
                <label key={option} className="consult-checkbox"><input type="checkbox" name={question.name} value={option} /><span>{option}</span></label>
              ))}
            </div>
          ) : question.type === "select" ? (
            <select name={question.name} required={question.required} defaultValue="">
              <option value="" disabled>{question.placeholder || "選択してください"}</option>
              {question.options?.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          ) : question.type === "textarea" ? (
            <textarea name={question.name} rows={question.rows} maxLength={question.maxLength} required={question.required} placeholder={question.placeholder} />
          ) : (
            <input type={question.type} name={question.name} autoComplete={question.autoComplete} required={question.required} maxLength={question.maxLength} placeholder={question.placeholder} />
          )}
        </Field>
      ))}

      <label className="consult-consent">
        <input type="checkbox" name="consent" required />
        <span>{formContent.consent}</span>
      </label>
      <div className="consult-assurance">
        <span aria-hidden="true">✓</span>
        <p><strong>{formContent.assuranceTitle}</strong>{formContent.assuranceText}</p>
      </div>
      <button className="consult-submit" type="submit" disabled={!enabled || sending}>
        {sending ? "送信しています…" : enabled ? formContent.submitLabel : "ただいま準備中です"}<span aria-hidden="true">→</span>
      </button>
      {notice && <p className={`consult-notice ${succeeded ? "is-success" : "is-error"}`} role="status">{notice}</p>}
      <p className="consult-privacy">🔒 {formContent.privacy}</p>
      <p className="consult-fallback">送信できない場合は <a href="mailto:contact@justoc.jp">contact@justoc.jp</a> までご連絡ください。</p>
    </form>
  );
}
