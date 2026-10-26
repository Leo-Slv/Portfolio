import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { TranslationProvider } from "@/lib/i18n";
import "./globals.css";

const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem("portfolio-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}`;

const SITE_URL = "https://leonardo-irineu-dev.vercel.app";
const TITLE = "Leonardo Irineu | Desenvolvedor Full Stack Júnior (.NET e Next.js)";
const DESCRIPTION =
  "Portfólio de Leonardo da Silva Irineu, Desenvolvedor Full Stack Júnior em São José dos Campos, SP. APIs em C#/ASP.NET Core e interfaces em Next.js/React.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Leonardo Irineu",
    title: TITLE,
    description: DESCRIPTION,
    locale: "pt_BR",
    alternateLocale: ["en_US"],
    images: [{ url: "/assets/eu.jpeg", alt: "Leonardo da Silva Irineu" }],
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/assets/eu.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="bg-page" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen antialiased bg-page text-ink">
        <TranslationProvider>{children}</TranslationProvider>
        <Analytics />
      </body>
    </html>
  );
}
