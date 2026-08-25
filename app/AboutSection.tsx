"use client";

import Image from "next/image";
import { useState } from "react";

const values = [
  { en: "Credibility", ja: "信頼", text: "誠実な仕事と積み重ねによって、信頼される存在であり続ける。" },
  { en: "Commitment", ja: "献身", text: "目の前の相手に真摯に向き合い、成果のために力を尽くす。" },
  { en: "Creativity", ja: "創造", text: "既成概念にとらわれず、新しい発想と技術で価値を生み出す。" },
  { en: "Connection", ja: "つながり", text: "人と人、企業とお客様、想いと未来をつなぐ。" },
  { en: "Contribution", ja: "貢献", text: "私たちの仕事を通して、人と企業の成長に貢献する。" },
];

export default function AboutSection() {
  const [active, setActive] = useState<number | null>(null);
  const selected = active === null ? null : values[active];

  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-inner">
        <header className="about-heading">
          <p className="about-kicker">About JUSToC</p>
          <h2 id="about-title">JUSToCに込めた、<em>5つのC</em></h2>
          <span className="about-heading-line" aria-hidden="true" />
        </header>

        <div className="value-tabs" role="tablist" aria-label="JUSToCの5つの価値観" onMouseLeave={() => setActive(null)}>
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
              <Image src="/justoc-wordmark.png" alt="JUSToC" width={566} height={95} unoptimized />
              <p>Credibility · Commitment · Creativity · Connection · Contribution</p>
            </div>
          )}
        </div>

        <div className="value-summary" aria-label="5つのCのまとめ">
          <p>信頼を起点に、人と企業の成長に貢献する。</p>
        </div>
      </div>
    </section>
  );
}
