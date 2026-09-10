import Image from "next/image";
import siteContent from "./site-content.json";

const iconCharacters: Record<string, string> = {
  upload: "⇧",
  ai: "✦",
  document: "▤",
  chat: "…",
  edit: "✎",
  code: "‹/›",
  support: "✓",
};

function ScreenGallery({ examples }: { examples: Array<{ src: string; alt: string }> }) {
  return (
    <div className="service-screen-gallery" aria-label="勤怠管理システムの画面例">
      {examples.map((example) => (
        <figure key={example.src} tabIndex={0}>
          <Image src={example.src} alt={example.alt} width={1280} height={920} unoptimized />
        </figure>
      ))}
    </div>
  );
}

function SystemImageGallery({ images, title }: { images: Array<{ src: string; alt: string }>; title: string }) {
  if (!images.length) return null;

  return (
    <div className={`system-image-gallery system-image-gallery--${images.length}`} aria-label={`${title}の画面例`}>
      {images.map((image, index) => (
        <figure key={`${image.src}-${index}`} tabIndex={0}>
          <Image src={image.src} alt={image.alt} width={960} height={720} unoptimized />
        </figure>
      ))}
    </div>
  );
}

export default function ServiceSection() {
  const service = siteContent.service;

  return (
    <section className="service-section" id="service" aria-labelledby="service-title">
      <header className="service-hero">
        <span className="service-background-label" aria-hidden="true">SERVICE</span>
        <h2 id="service-title">{service.title}</h2>
        <p>{service.description.map((line) => <span key={line}>{line}</span>)}</p>
      </header>

      <div className="service-inner">
        <div className="service-systems">
          <header className="service-section-heading">
            <p>{service.systemsKicker}</p>
            <h3>{service.systemsTitle}</h3>
          </header>

          <article className="service-featured service-featured--examples">
            <ScreenGallery examples={service.featured.examples} />
            <div className="service-featured-copy">
              <h4>{service.featured.title}</h4>
              <p className="service-description">{service.featured.description.map((line) => <span key={line}>{line}</span>)}</p>
              <div className="service-features">
                {service.featured.features.map((feature) => (
                  <div key={feature.title}>
                    <span className="service-icon" aria-hidden="true">{iconCharacters[feature.icon]}</span>
                    <p><strong>{feature.title}</strong><small>{feature.description.map((line) => <span key={line}>{line}</span>)}</small></p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <div className="service-card-grid">
            {service.cards.map((card) => (
              <article className={`service-card service-card--${card.layout}`} key={card.title}>
                <h4>{card.title}</h4>
                <div className="service-card-body">
                  <p className="service-description">{card.description.map((line) => <span key={line}>{line}</span>)}</p>
                  <SystemImageGallery images={card.images} title={card.title} />
                </div>
              </article>
            ))}
          </div>
        </div>

        <section className="service-flow" aria-labelledby="flow-title">
          <h3 id="flow-title">{service.flow.title}</h3>
          <div className="service-flow-grid">
            {service.flow.steps.map((step) => (
              <article key={step.number}>
                <span className="service-flow-icon" aria-hidden="true">{iconCharacters[step.icon]}</span>
                <div>
                  <h4><b>{step.number}</b> {step.title}</h4>
                  <p>
                    {Array.isArray(step.description)
                      ? step.description.map((line) => <span className="service-flow-description-line" key={line}>{line}</span>)
                      : step.description}
                    {"note" in step && (
                      <button className="service-flow-note" type="button" aria-label="月額の運用・改善サポートについて">
                        ※ サポート内容
                        <span className="service-flow-note-tooltip" role="tooltip">
                          <strong>{step.note}</strong>
                          <span>{step.noteDetails}</span>
                        </span>
                      </button>
                    )}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="service-cta" aria-label="無料相談">
          <div>
            <h3>{service.cta.headline}</h3>
            <p>{service.cta.description}</p>
          </div>
          <div className="service-cta-action">
            <span className="service-cta-icon" aria-hidden="true"><i>•••</i></span>
            <div><p>{service.cta.prompt}</p><a href={service.cta.href}>{service.cta.label}</a></div>
          </div>
        </aside>

        <section className="service-other-services" aria-labelledby="other-services-title">
          <h3 id="other-services-title">{service.otherServices.title}</h3>
          <p>{service.otherServices.description}</p>
          <ul>
            {service.otherServices.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
      </div>
    </section>
  );
}
