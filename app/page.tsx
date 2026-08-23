import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "JUSToC｜富山のAI導入・業務効率化支援",
  description:
    "富山県の個人事業主・中小企業向けに、AI導入と業務効率化システムの企画・開発・改善を支援します。",
};

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="JUSToC トップへ">
          <Image src="/justoc-logo-light.png" alt="JUSToC" width={1600} height={269} priority />
        </a>
        <nav aria-label="メインナビゲーション">
          <a href="#services">できること</a>
          <a href="#works">開発例</a>
          <a href="#flow">ご相談の流れ</a>
        </nav>
        <a className="header-cta" href="#contact">相談してみる</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>その仕事、<br /><em>もっとシンプルに。</em></h1>
            <p className="hero-lead">
              紙や表計算ソフトへの転記、写真整理、在庫確認、勤怠集計。
              毎日の手間を、AIと使いやすいシステムで減らします。
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">まずは相談してみる <span>→</span></a>
              <a className="button button-secondary" href="#works">開発例を見る</a>
            </div>
            <p className="hero-note">まだ構想がまとまっていなくても大丈夫です。</p>
          </div>
          <div className="hero-visual" aria-label="業務の悩みを整理し、使いやすい仕組みに変えるイメージ">
            <div className="visual-panel">
              <p>YOUR WORKFLOW</p>
              <div className="visual-line"><span>手作業・転記</span><i>01</i></div>
              <div className="visual-line"><span>情報の散在</span><i>02</i></div>
              <div className="visual-line active"><span>JUST FIT SYSTEM</span><i>03</i></div>
            </div>
            <div className="visual-badge"><b>AI</b><span>×</span><b>現場</b></div>
          </div>
        </div>
        <div className="hero-bottom">
          <span>AI CONSULTING</span><span>WORKFLOW DESIGN</span><span>WEB SYSTEM</span><span>TOYAMA</span>
        </div>
      </section>

      <section className="section problems" aria-labelledby="problems-title">
        <div className="section-inner">
          <div className="section-heading split-heading">
            <div>
              <p className="section-kicker">COMMON CHALLENGES</p>
              <h2 id="problems-title">こんな「ちょっと面倒」、<br />ありませんか？</h2>
            </div>
            <p>日々の小さな手間は、積み重なると大きな負担になります。今の仕事の流れを丁寧に聞き、無理なく使える形から整えます。</p>
          </div>
          <div className="problem-grid">
            {[
              ["01", "紙と表計算ソフトに二重入力", "同じ内容を何度も入力し、確認にも時間がかかる。"],
              ["02", "写真や書類が見つからない", "担当者や保存場所ごとに情報が散らばっている。"],
              ["03", "状況がすぐ分からない", "在庫や勤怠を集計するまで、今の状態が見えない。"],
              ["04", "AIの始め方が分からない", "興味はあるけれど、何に使えるのか判断できない。"],
              ["05", "既製品が現場に合わない", "機能が多すぎたり、仕事の流れを変える必要がある。"],
            ].map(([number, title, text]) => (
              <article className="problem-card" key={number}>
                <span>{number}</span><h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section services" id="services" aria-labelledby="services-title">
        <div className="section-inner">
          <div className="section-heading split-heading light">
            <div><p className="section-kicker">WHAT WE DO</p><h2 id="services-title">仕事に合わせて、<br />必要な仕組みを。</h2></div>
            <p>最初から大きなシステムを作るのではなく、困りごとを整理し、効果が見えやすいところから一緒に進めます。</p>
          </div>
          <div className="service-list">
            {[
              ["01", "AI導入・活用相談", "AIで何ができるかを、実際の業務に置き換えて整理します。使うこと自体を目的にせず、役立つ場面を見つけます。"],
              ["02", "業務フローの整理と改善提案", "現場の流れを聞き、重複作業や属人化している部分を見える化。無理なく続けられる改善案を考えます。"],
              ["03", "業務効率化Webシステム", "勤怠、在庫、写真整理など、既製品では合わない業務に合わせた使いやすい仕組みを設計・開発します。"],
              ["04", "導入後の改善・運用支援", "実際に使って分かったことをもとに、機能や画面を調整。現場に馴染むまで継続して改善できます。"],
            ].map(([number, title, text]) => (
              <article className="service-row" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><i aria-hidden="true">↗</i></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section works" id="works" aria-labelledby="works-title">
        <div className="section-inner">
          <div className="section-heading"><p className="section-kicker">DEVELOPMENT EXAMPLES</p><h2 id="works-title">こんな仕組みを作れます。</h2><p>現在制作している開発例・デモです。お客様の業務に合わせて、必要な機能や画面を調整できます。</p></div>
          <div className="work-grid">
            {[
              ["01", "勤怠管理システム", "出退勤の打刻から、管理者による確認・修正、給与概算、CSV・PDF出力までをひとつに。", ["出退勤打刻", "給与概算", "CSV・PDF"]],
              ["02", "業種別在庫管理システム", "品目、在庫状況、発注アラートを見える化。業種や現場ごとの運用に合わせて調整します。", ["在庫状況", "発注アラート", "業種別対応"]],
              ["03", "AI工事写真整理システム", "現場写真の黒板情報をAIで読み取り、編集して写真台帳・工程表・Excelへまとめます。", ["AI黒板読取", "写真台帳", "Excel出力"]],
            ].map(([number, title, text, tags]) => (
              <article className="work-card" key={number as string}>
                <div className="work-preview" aria-label={`${title}のスクリーンショット差し替え枠`}>
                  <div className="preview-bar"><i /><i /><i /></div>
                  <div className="preview-body"><span>{number as string}</span><b>SCREEN PREVIEW</b><small>開発画面を掲載予定</small></div>
                </div>
                <div className="work-content"><span className="work-number">EXAMPLE {number as string}</span><h3>{title as string}</h3><p>{text as string}</p><div className="tags">{(tags as string[]).map(tag => <span key={tag}>{tag}</span>)}</div></div>
              </article>
            ))}
          </div>
          <div className="support-note"><span>＋</span><div><b>必要に応じて、周辺業務もご相談いただけます。</b><p>動画編集・撮影、YouTube・SNS運用、SNSデザイン、LINE構築など。</p></div></div>
        </div>
      </section>

      <section className="section flow" id="flow" aria-labelledby="flow-title">
        <div className="section-inner">
          <div className="section-heading centered"><p className="section-kicker">HOW IT WORKS</p><h2 id="flow-title">ご相談から導入まで。</h2><p>内容が固まっていなくても構いません。まずは今の状況を聞かせてください。</p></div>
          <ol className="flow-list">
            {[
              ["01", "お問い合わせ", "フォームから、分かる範囲でお送りください。"],
              ["02", "ヒアリング", "今の流れや困りごとを丁寧に伺います。"],
              ["03", "改善案のご提案", "必要な仕組みと進め方を整理してご提案します。"],
              ["04", "制作・導入", "内容にご納得いただいてから制作を進めます。"],
              ["05", "運用・改善", "使いながら、必要に応じて調整していきます。"],
            ].map(([number, title, text]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}
          </ol>
        </div>
      </section>

      <section className="section about" aria-labelledby="about-title">
        <div className="section-inner about-grid">
          <div className="about-brand"><Image src="/justoc-logo-light.png" alt="JUSToC" width={1600} height={269} /></div>
          <div className="about-copy"><p className="section-kicker">ABOUT JUSToC</p><h2 id="about-title">近くで話せる、<br />仕組みづくりの相談相手。</h2><p>JUSToCは、富山県滑川市を拠点に、個人事業主・中小企業のAI活用と業務効率化をお手伝いしています。現場のやり方を大切にしながら、ちょうどよく使える仕組みを一緒に考えます。</p><dl><div><dt>屋号</dt><dd>JUSToC（ジャストシー）</dd></div><div><dt>代表</dt><dd>高橋 利宗</dd></div><div><dt>拠点</dt><dd>富山県滑川市</dd></div><div><dt>対応地域</dt><dd>富山県内を中心に対応</dd></div></dl></div>
        </div>
      </section>

      <section className="section contact" id="contact" aria-labelledby="contact-title">
        <div className="section-inner contact-grid">
          <div className="contact-copy"><p className="section-kicker">CONTACT</p><h2 id="contact-title">まずは、今の困りごとを<br />聞かせてください。</h2><p>「AIで何かできないか」「この作業を楽にしたい」といった段階からで大丈夫です。内容を確認し、折り返しご連絡します。</p><div className="contact-promise"><span>01</span><p><b>内容が未整理でも大丈夫</b><br />ヒアリングしながら一緒に整理します。</p></div><div className="contact-promise"><span>02</span><p><b>電話番号の入力は不要</b><br />まずはメールでご連絡します。</p></div></div>
          <ContactForm />
        </div>
      </section>

      <footer><div className="footer-inner"><a className="brand footer-brand" href="#top"><Image src="/justoc-logo-light.png" alt="JUSToC" width={1600} height={269} /></a><p>富山県滑川市｜AI導入・業務効率化支援</p><a href="mailto:contact@justoc.jp">contact@justoc.jp</a><small>© {new Date().getFullYear()} JUSToC</small></div></footer>
    </main>
  );
}
