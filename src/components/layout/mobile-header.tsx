"use client";

import Link from "next/link";
import { Search, Flame } from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/logo";
import { useLayoutState } from "./layout-state-provider";

interface MobileHeaderProps {
  locale: string;
}

export function MobileHeader({ locale }: MobileHeaderProps) {
  const { setMenuOpen, setSearchOpen } = useLayoutState();
  const tLayout = useTranslations("layout");

  return (
    <header className="sticky top-0 z-20 bg-white text-[#f83552] md:hidden">
      <div className="flex items-center justify-between py-1 pl-4 pr-2.5">
        {/* Left: Burger + Search */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={tLayout("open_menu")}
            className="flex h-11 w-11 items-center justify-center"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={tLayout("search")}
            onClick={() => setSearchOpen(true)}
            className="flex h-11 w-11 items-center justify-center transition-opacity hover:opacity-70"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Center: Logo */}
        <Logo height={80} locale={locale} />

        {/* Right: News */}
        <div className="flex items-center gap-1">
          <Link
            href={`/${locale}/noticias`}
            className="flex h-11 w-11 items-center justify-center transition-opacity hover:opacity-70"
            aria-label={tLayout("news")}
          >
            <Flame className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
