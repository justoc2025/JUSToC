import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "JUSToC｜AIとクリエイティブで、ビジネスを前へ。",
  description: "AIとクリエイティブで、ビジネスを前へ。JUSToCの公式Webサイトです。",
};

export default function Home() {
  return (
    <main className="fv-page">
      <section className="fv" id="top" aria-labelledby="fv-title">
        <div className="fv-pattern" aria-hidden="true" />
        <Image className="fv-art" src="/justoc-hero-art.png" alt="JUSToCの立体的な矢印シンボル" width={732} height={780} priority unoptimized />

        <header className="fv-header">
          <a className="fv-logo" href="#top" aria-label="JUSToC トップへ">
            <Image src="/justoc-wordmark.png" alt="JUSToC" width={566} height={95} priority unoptimized />
          </a>
          <nav className="fv-nav" aria-label="メインナビゲーション">
            <a href="#service">Service</a>
            <a href="#about">About</a>
            <a href="mailto:contact@justoc.jp">Contact</a>
          </nav>
        </header>

        <div className="fv-content">
          <h1 id="fv-title"><span>A Iとクリエイティブで、</span><span>ビジネスを前へ。</span></h1>
          <p className="fv-subcopy">~ Just for your results ~</p>
          <div className="fv-actions">
            <a className="fv-button" href="mailto:contact@justoc.jp?subject=無料相談のお問い合わせ">無料相談</a>
            <a className="fv-text-link" href="#service">サービスを見る <span aria-hidden="true">→</span></a>
          </div>
        </div>

        <div id="service" className="anchor-target" aria-hidden="true" />
        <div id="about" className="anchor-target" aria-hidden="true" />
      </section>
    </main>
  );
}
