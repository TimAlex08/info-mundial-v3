import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-base",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Monterrey FIFA 2026",
    default: "Monterrey FIFA 2026",
  },
  description:
    "Portal informativo de Monterrey como sede del Mundial FIFA 2026",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html id="top" className={`${montserrat.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-base)]">
        {children}
      </body>
    </html>
  );
}
