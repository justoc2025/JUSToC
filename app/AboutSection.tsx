"use client";

import Image from "next/image";
import { useState } from "react";
import siteContent from "./site-content.json";

const values = siteContent.about.values;

export default function AboutSection() {
  const [active, setActive] = useState<number | null>(null);
  const selected = active === null ? null : values[active];

  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-inner">
        <header className="about-heading">
          <p className="about-kicker">{siteContent.about.kicker}</p>
          <h2 id="about-title">{siteContent.about.title}<em>{siteContent.about.titleAccent}</em></h2>
          <span className="about-heading-line" aria-hidden="true" />
        </header>

        <div className="value-tabs" role="tablist" aria-label={siteContent.about.tabLabel} onMouseLeave={() => setActive(null)}>
          {values.map((value, index) => (
            <button
              key={value.en}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls="value-detail"
              className={active === index ? "value-tab is-active" : "value-tab"}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(active === index ? null : index)}
            >
              {value.en}
            </button>
          ))}
        </div>

        <div className={selected ? "value-detail has-value" : "value-detail"} id="value-detail" role="tabpanel" aria-live="polite">
          {selected ? (
            <div className="value-copy" key={selected.en}>
              <p className="value-en">{selected.en}</p>
              <h3>{selected.ja}</h3>
              <span aria-hidden="true" />
              <p>{selected.text}</p>
            </div>
          ) : (
            <div className="value-logo">
              <Image src={siteContent.about.logo} alt={siteContent.about.logoAlt} width={566} height={95} unoptimized />
              <p>{siteContent.about.logoCaption}</p>
            </div>
          )}
        </div>

        <div className="value-summary" aria-label="5つのCのまとめ">
          <p>{siteContent.about.summary}</p>
        </div>
      </div>
    </section>
  );
}
