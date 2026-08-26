import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "../ContactForm";
import content from "../contact-content.json";

export const metadata: Metadata = content.metadata;

export default function ContactPage() {
  return (
    <main className="consult-page">
      <section className="consult-section" aria-labelledby="consult-title">
        <div className="consult-shell">
          <aside className="consult-intro">
            <a className="consult-wordmark" href="/" aria-label="JUSToC トップへ">
              <Image src="/justoc-wordmark.png" alt="JUSToC" width={430} height={105} priority />
            </a>
            <p className="consult-kicker">{content.intro.kicker}</p>
            <p className="consult-form-label">{content.intro.formLabel}</p>
            <h1 id="consult-title">{content.intro.titleBefore}<br /><em>{content.intro.titleAccent}</em>{content.intro.titleAfter}</h1>
            {content.intro.paragraphs.map((paragraph) => <p className="consult-lead" key={paragraph}>{paragraph}</p>)}
            <div className="consult-services" aria-label="対応サービス">
              {content.intro.services.map((service) => (
                <article key={service.title}><span aria-hidden="true">{service.icon}</span><div><h2>{service.title}</h2><p>{service.description}</p></div></article>
              ))}
            </div>
          </aside>
          <div className="consult-panel">
            <div className="consult-panel-heading"><p>{content.form.title}</p><span>{content.form.timeEstimate}</span></div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
