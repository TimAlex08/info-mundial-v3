import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/ui/logo";
import { SocialMediaLinks } from "@/components/ui/social-media-links";
import { SearchField } from "@/components/ui/search-field";
import { BackToTop } from "./back-to-top";
import { FOOTER_MENU, SOCIAL_LINKS } from "@/lib/constants";

interface FooterProps {
  locale: string;
}

export async function Footer({ locale }: FooterProps) {
  const tNav = await getTranslations("nav");
  const tLayout = await getTranslations("layout");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-red text-white">
      <div className="mx-auto max-w-[var(--page-width)] px-6 py-10 md:py-16">
        {/* 3-column grid on desktop, stacked on mobile */}
        <div className="grid gap-10 md:grid-cols-3 md:gap-6">
          {/* Column 1: Menu links */}
          <nav>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER_MENU.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="text-sm transition-opacity hover:opacity-70"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 2: Logo */}
          <div className="flex justify-center">
            <Logo
              height={136}
              variant="footer"
              locale={locale}
            />
          </div>

          {/* Column 3: Social Media */}
          <SocialMediaLinks
            links={SOCIAL_LINKS}
            heading={tLayout("follow_social")}
            className="md:items-end"
          />
        </div>

        {/* Bottom: Legal + BackToTop + Search */}
        <div className="mt-10 flex flex-col gap-6 border-t border-white/20 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm opacity-80">
            &copy; {year} {tLayout("copyright")}
          </p>
          <BackToTop label={tLayout("back_to_top")} />
          <div className="w-full md:max-w-xs">
            <SearchField variant="field" placeholder={tLayout("search_placeholder")} />
          </div>
        </div>
      </div>
    </footer>
  );
}
