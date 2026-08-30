const SPREADSHEET_ID = "1g1d1lE2ADK9wh0UUxGbOFMVw_xlw29x6-IJKFDet8go";
const SHEET_NAME = "フォームの回答 1";
const NOTIFY_TO = "contact@justoc.jp";

/**
 * Apps Script の「スクリプト プロパティ」に CONTACT_SHARED_SECRET を登録してから、
 * ウェブアプリとしてデプロイしてください。
 */
function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const expectedSecret = PropertiesService.getScriptProperties().getProperty("CONTACT_SHARED_SECRET");

    if (!expectedSecret || payload.secret !== expectedSecret) {
      return jsonResponse_({ ok: false, error: "Unauthorized" });
    }

    const concerns = Array.isArray(payload.concerns) ? payload.concerns.map(clean_) : [];
    const inquiry = {
      name: clean_(payload.name),
      company: clean_(payload.company),
      email: clean_(payload.email),
      industry: clean_(payload.industry),
      concerns: concerns.join("、"),
      message: clean_(payload.message),
      requests: clean_(payload.requests),
    };

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error("保存先シートが見つかりません。");

    sheet.appendRow([
      new Date(),
      inquiry.name,
      inquiry.company,
      inquiry.email,
      inquiry.industry,
      inquiry.concerns,
      inquiry.message,
      inquiry.requests,
    ]);

    MailApp.sendEmail({
      to: NOTIFY_TO,
      replyTo: inquiry.email,
      subject: "【JUSToC無料相談】" + inquiry.name + "様からお問い合わせ",
      body: buildNotification_(inquiry),
    });

    return jsonResponse_({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, error: "送信を完了できませんでした。" });
  }
}

function buildNotification_(inquiry) {
  return [
    "Webサイトから無料相談のお問い合わせが届きました。",
    "",
    "お名前: " + inquiry.name,
    "会社名・屋号: " + inquiry.company,
    "メールアドレス: " + inquiry.email,
    "業種: " + inquiry.industry,
    "",
    "どのようなことにお困りですか？",
    inquiry.concerns,
    "",
    "現在のお困りごと・実現したいこと:",
    inquiry.message,
    "",
    "その他・ご要望:",
    inquiry.requests,
  ].join(String.fromCharCode(10));
}

function clean_(value) {
  return String(value || "").replace(/[<>]/g, "").trim();
}

function jsonResponse_(body) {
  return ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
