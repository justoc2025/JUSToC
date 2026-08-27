import Image from "next/image";
import AboutSection from "./AboutSection";
import ServiceSection from "./ServiceSection";
import siteContent from "./site-content.json";

export default function Home() {
  return (
    <main className="fv-page">
      <section className="fv" id="top" aria-labelledby="fv-title">
        <h1 id="fv-title" className="sr-only">{siteContent.hero.heading}</h1>
        <div className="fv-canvas">
          <Image className="fv-art" src={siteContent.hero.image} alt={siteContent.hero.imageAlt} width={1672} height={941} priority unoptimized />
          <a className="hotspot hotspot-logo" href="#top" aria-label={siteContent.hero.logoLabel} />
          <nav aria-label="メインナビゲーション">
            {siteContent.hero.navigation.map((item) => (
              <a key={item.id} className={`hotspot hotspot-nav hotspot-${item.id}`} href={item.href}>{item.label}</a>
            ))}
          </nav>
          <a className="hotspot hotspot-consult" href={siteContent.hero.consult.href}><span>{siteContent.hero.consult.label}</span></a>
          <a className="hotspot hotspot-view-service" href={siteContent.hero.viewService.href} aria-label={siteContent.hero.viewService.label} />
        </div>
      </section>
      <AboutSection />
      <ServiceSection />
    </main>
  );
}
