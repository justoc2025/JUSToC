import Image from "next/image";
import AboutSection from "./AboutSection";

export default function Home() {
  return (
    <main className="fv-page">
      <section className="fv" id="top" aria-labelledby="fv-title">
        <h1 id="fv-title" className="sr-only">A Iとクリエイティブで、ビジネスを前へ。</h1>
        <div className="fv-canvas">
          <Image className="fv-art" src="/justoc-object-band-smoothed.png" alt="JUSToC。A Iとクリエイティブで、ビジネスを前へ。" width={1672} height={941} priority unoptimized />
          <a className="hotspot hotspot-logo" href="#top" aria-label="JUSToC トップへ" />
          <nav aria-label="メインナビゲーション">
            <a className="hotspot hotspot-nav hotspot-service" href="#service">Service</a>
            <a className="hotspot hotspot-nav hotspot-about" href="#about">About</a>
            <a className="hotspot hotspot-nav hotspot-contact" href="mailto:contact@justoc.jp?subject=お問い合わせ">Contact</a>
          </nav>
          <a className="hotspot hotspot-consult" href="mailto:contact@justoc.jp?subject=無料相談のお問い合わせ"><span>無料相談</span></a>
          <a className="hotspot hotspot-view-service" href="#service">サービスを見る <span aria-hidden="true">→</span></a>
        </div>
        <div id="service" className="anchor-target" aria-hidden="true" />
      </section>
      <AboutSection />
    </main>
  );
}
