import Link from "next/link";
import { Flame } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/ui/logo";
import { SocialMediaLinks } from "@/components/ui/social-media-links";
import { SearchField } from "@/components/ui/search-field";
import { MAIN_MENU, SOCIAL_LINKS } from "@/lib/constants";

interface DesktopHeaderProps {
  locale: string;
}

export async function DesktopHeader({ locale }: DesktopHeaderProps) {
  const tNav = await getTranslations("nav");
  const tLayout = await getTranslations("layout");

  return (
    <header className="hidden bg-white text-brand-blue-dark md:block">
      <div className="mx-auto flex max-w-[var(--page-width)] items-center justify-between gap-10 px-6 py-2">
        {/* Logo */}
        <Logo height={80} locale={locale} />

        {/* Main Navigation */}
        <nav className="flex-1">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
            {MAIN_MENU.map((item) => (
              <li key={item.href}>
                <Link
                  href={`/${locale}${item.href}`}
                  className="text-xs font-semibold uppercase tracking-wider transition-opacity hover:opacity-70"
                >
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side: Search, News, Social */}
        <div className="flex items-center gap-2">
          <SearchField variant="icon" />
          <Link
            href={`/${locale}/noticias`}
            className="flex h-11 w-11 items-center justify-center rounded-full transition-opacity hover:opacity-70"
            aria-label={tLayout("latest_news")}
          >
            <Flame className="h-5 w-5" />
          </Link>
          <SocialMediaLinks links={SOCIAL_LINKS} />
        </div>
      </div>
    </header>
  );
}
