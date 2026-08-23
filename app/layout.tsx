import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "JUSToC｜富山のAI導入・業務効率化支援";
const description = "富山県の個人事業主・中小企業向けに、AI導入と業務効率化システムの企画・開発・改善を支援します。";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    title, description,
    icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
    openGraph: { title, description, type: "website", locale: "ja_JP", images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "JUSToC｜その仕事、もっとシンプルに。" }] },
    twitter: { card: "summary_large_image", title, description, images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org", "@type": "ProfessionalService", name: "JUSToC", description,
    areaServed: { "@type": "AdministrativeArea", name: "富山県" },
    address: { "@type": "PostalAddress", addressLocality: "滑川市", addressRegion: "富山県", addressCountry: "JP" },
    email: "contact@justoc.jp",
  };
  return <html lang="ja"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{children}</body></html>;
}
