const SPREADSHEET_ID = "1g1d1lE2ADK9wh0UUxGbOFMVw_xlw29x6-IJKFDet8go";
const SHEET_NAME = "フォームの回答 1";
const AUTO_REPLY_SETTINGS_SHEET = "自動返信設定";
const NOTIFY_TO = "contact@justoc.jp";

/**
 * Apps Script の「スクリプト プロパティ」に CONTACT_SHARED_SECRET を登録してから、
 * ウェブアプリとしてデプロイしてください。
 */
function doPost(e) {
  let sheet = null;
  let responseRow = null;

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

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    sheet = spreadsheet.getSheetByName(SHEET_NAME);
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
      "",
      "",
      "処理中",
      "",
    ]);
    responseRow = sheet.getLastRow();

    MailApp.sendEmail({
      to: NOTIFY_TO,
      replyTo: inquiry.email,
      subject: "【JUSToC無料相談】" + inquiry.name + "様からお問い合わせ",
      body: buildNotification_(inquiry),
    });

    const autoReply = getAutoReplySettings_(spreadsheet);
    if (!autoReply.enabled) {
      sheet.getRange(responseRow, 11, 1, 2).setValues([["自動返信OFF", ""]]);
      return jsonResponse_({ ok: true, autoReply: false });
    }

    try {
      MailApp.sendEmail({
        to: inquiry.email,
        replyTo: autoReply.replyTo || NOTIFY_TO,
        name: "JUSToC",
        subject: renderTemplate_(autoReply.subject, inquiry),
        body: renderTemplate_(autoReply.body, inquiry),
      });
      sheet.getRange(responseRow, 11, 1, 2).setValues([["送信済み", new Date()]]);
    } catch (autoReplyError) {
      console.error(autoReplyError);
      sheet.getRange(responseRow, 11, 1, 2).setValues([["送信失敗", ""]]);
      return jsonResponse_({ ok: true, autoReply: false });
    }

    return jsonResponse_({ ok: true, autoReply: true });
  } catch (error) {
    console.error(error);
    if (sheet && responseRow) {
      sheet.getRange(responseRow, 11, 1, 2).setValues([["送信失敗", ""]]);
    }
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

function getAutoReplySettings_(spreadsheet) {
  const settingsSheet = spreadsheet.getSheetByName(AUTO_REPLY_SETTINGS_SHEET);
  if (!settingsSheet) throw new Error("自動返信設定シートが見つかりません。");

  const values = settingsSheet.getRange("B2:B6").getDisplayValues().map(function(row) {
    return clean_(row[0]);
  });

  return {
    enabled: values[0] === "有効",
    subject: values[1],
    body: values[2],
    replyTo: values[4] || NOTIFY_TO,
  };
}

function renderTemplate_(template, inquiry) {
  const replacements = {
    "{{お名前}}": inquiry.name,
    "{{会社名・屋号}}": inquiry.company || "未入力",
    "{{メールアドレス}}": inquiry.email,
    "{{業種}}": inquiry.industry || "未入力",
    "{{相談項目}}": inquiry.concerns || "未入力",
    "{{相談内容}}": inquiry.message || "未入力",
    "{{その他・ご要望}}": inquiry.requests || "未入力",
  };

  return Object.keys(replacements).reduce(function(result, key) {
    return result.split(key).join(replacements[key]);
  }, template);
}

function clean_(value) {
  return String(value || "").replace(/[<>]/g, "").trim();
}

function jsonResponse_(body) {
  return ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
