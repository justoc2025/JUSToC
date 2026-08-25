import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "JUSToC｜AIとクリエイティブで、ビジネスを前へ。";
const description = "AIとクリエイティブで、ビジネスを前へ。Just for your results — JUSToC。";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    title, description,
    icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
    openGraph: { title, description, type: "website", locale: "ja_JP", images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "JUSToC｜AIとクリエイティブで、ビジネスを前へ。" }] },
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
