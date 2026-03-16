import type { Metadata } from "next";
import { TranslationProvider } from "@/lib/translation-context";
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
    <html lang="en" className="bg-[#16161a]">
      <body className="min-h-screen antialiased">
        <TranslationProvider>{children}</TranslationProvider>
      </body>
    </html>
  );
}
