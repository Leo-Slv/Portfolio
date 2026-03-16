import type { Metadata } from "next";
import { TranslationProvider } from "@/lib/i18n";
import "./globals.css";

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
    <html lang="en" className="bg-page" style={{ colorScheme: "dark" }}>
      <body className="min-h-screen antialiased bg-page text-white/95">
        <TranslationProvider>{children}</TranslationProvider>
      </body>
    </html>
  );
}
