import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { TranslationProvider } from "@/lib/i18n";
import "./globals.css";

const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem("portfolio-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}`;

export const metadata: Metadata = {
  title: "Portfolio | Leonardo",
  description: "Full-Stack Developer Portfolio",
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
