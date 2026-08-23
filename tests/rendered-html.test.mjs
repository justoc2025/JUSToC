import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("JUSToCの公開候補ページをサーバー描画する", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<html lang="ja">/);
  assert.match(html, /JUSToC/);
  assert.match(html, /その仕事、/);
  assert.match(html, /もっとシンプルに。/);
  assert.match(html, /AI導入・活用相談/);
  assert.match(html, /勤怠管理システム/);
  assert.match(html, /AI工事写真整理システム/);
  assert.match(html, /フォーム準備中/);
  assert.match(html, /公開時に受付を開始します/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
});

test("秘密情報と問い合わせフォームの初期状態を安全に保つ", async () => {
  const [envExample, gitignore, form, route] = await Promise.all([
    readFile(new URL("../.env.example", import.meta.url), "utf8"),
    readFile(new URL("../.gitignore", import.meta.url), "utf8"),
    readFile(new URL("../app/ContactForm.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/contact/route.ts", import.meta.url), "utf8"),
  ]);
  assert.match(envExample, /NEXT_PUBLIC_CONTACT_FORM_ENABLED=false/);
  assert.match(envExample, /RESEND_API_KEY=\s*$/m);
  assert.match(envExample, /CONTACT_TO=\s*$/m);
  assert.match(gitignore, /^\.env\*$/m);
  assert.match(gitignore, /^!\.env\.example$/m);
  assert.match(form, /disabled=\{!enabled \|\| sending\}/);
  assert.match(route, /cf-connecting-ip/);
  assert.match(route, /status: 429/);
  assert.match(route, /process\.env\.RESEND_API_KEY/);
  assert.doesNotMatch(envExample, /re_[A-Za-z0-9]{16,}/);
});
