import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";
import { LayoutStateProvider } from "@/components/layout/layout-state-provider";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { DesktopHeader } from "@/components/layout/desktop-header";
import { MobileHeader } from "@/components/layout/mobile-header";
import { Footer } from "@/components/layout/footer";

const MegaMenuDrawer = dynamic(
  () => import("@/components/layout/mega-menu-drawer").then((m) => m.MegaMenuDrawer),
);
const Flyout = dynamic(
  () => import("@/components/layout/flyout").then((m) => m.Flyout),
);
const SearchModal = dynamic(
  () => import("@/components/layout/search-modal").then((m) => m.SearchModal),
);

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-base",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#1f3359",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${SITE_URL}/${loc}`;
  }
  languages["x-default"] = `${SITE_URL}/${routing.defaultLocale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: `%s | ${SITE_NAME}`,
      default: SITE_NAME,
    },
    description: SITE_DESCRIPTION,
    keywords: [
      "FIFA 2026",
      "Mundial 2026",
      "Monterrey",
      "Copa del Mundo",
      "World Cup",
      "Estadio BBVA",
      "sede mundialista",
      "turismo Monterrey",
    ],
    authors: [{ name: "Gobierno de Monterrey" }],
    creator: "Gobierno de Monterrey",
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: `${SITE_URL}/${locale}`,
      locale: locale === "es" ? "es_MX" : locale,
      alternateLocale: ["es_MX", "en_US", "fr_FR", "de_DE", "it_IT"],
      images: [
        {
          url: "/logos/logo-el-mundial-mty.png",
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      images: ["/logos/logo-el-mundial-mty.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/logos/logo-circle.png",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      id="top"
      lang={locale}
      className={`${montserrat.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-base)]">
        <NextIntlClientProvider>
          <LayoutStateProvider>
            <AnnouncementBar />
            <DesktopHeader locale={locale} />
            <MobileHeader locale={locale} />
            <MegaMenuDrawer locale={locale} />
            <main className="flex-1">{children}</main>
            <Footer locale={locale} />
            <Flyout />
            <SearchModal />
          </LayoutStateProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
