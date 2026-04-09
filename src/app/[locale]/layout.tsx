import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { LayoutStateProvider } from "@/components/layout/layout-state-provider";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { DesktopHeader } from "@/components/layout/desktop-header";
import { MobileHeader } from "@/components/layout/mobile-header";
import { MegaMenuDrawer } from "@/components/layout/mega-menu-drawer";
import { Footer } from "@/components/layout/footer";
import { Flyout } from "@/components/layout/flyout";
import { SearchModal } from "@/components/layout/search-modal";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
  );
}
