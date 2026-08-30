import Image from "next/image";
import AboutSection from "./AboutSection";
import ServiceSection from "./ServiceSection";
import siteContent from "./site-content.json";

export default function Home() {
  return (
    <main className="fv-page">
      <section className="fv" id="top" aria-labelledby="fv-title">
        <div className="fv-canvas">
          <Image className="fv-art" src={siteContent.hero.image} alt="" width={1672} height={941} priority unoptimized />
          <a className="fv-logo" href="#top" aria-label={siteContent.hero.logoLabel}>
            <Image src="/justoc-logo-light.png" alt="JUSToC" width={1600} height={269} priority unoptimized />
          </a>
          <nav className="fv-nav" aria-label="メインナビゲーション">
            {siteContent.hero.navigation.map((item) => (
              <a key={item.id} href={item.href}>{item.label}</a>
            ))}
          </nav>
          <div className="fv-copy">
            <h1 id="fv-title"><span>AIとクリエイティブで、</span><span>ビジネスを前へ。</span></h1>
            <p>〜 Just for your results 〜</p>
            <div className="fv-actions">
              <a className="fv-consult" href={siteContent.hero.consult.href}>{siteContent.hero.consult.label}</a>
              <a className="fv-view-service" href={siteContent.hero.viewService.href}>{siteContent.hero.viewService.label}<span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
      </section>
      <AboutSection />
      <ServiceSection />
    </main>
  );
}
