"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Search, Flame } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { SocialMediaLinks } from "@/components/ui/social-media-links";
import { useLayoutState } from "./layout-state-provider";
import { MAIN_MENU, SOCIAL_LINKS, SITE_NAME } from "@/lib/constants";

interface DesktopHeaderProps {
  locale: string;
}

export function DesktopHeader({ locale }: DesktopHeaderProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const tNav = useTranslations("nav");
  const tLayout = useTranslations("layout");
  const { setSearchOpen } = useLayoutState();

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  function toggleMenu(key: string) {
    setOpenMenu((prev) => (prev === key ? null : key));
  }

  return (
    <header className="hidden border-b border-gray-200 bg-white text-brand-blue-dark md:block">
      <div className="mx-auto flex max-w-[var(--page-width)] items-center justify-between gap-6 px-6 py-2">
        {/* Logo */}
        <Link href={`/${locale}`} aria-label={SITE_NAME} className="shrink-0">
          <Image
            src="/logos/logo-el-mundial-mty.png"
            alt={SITE_NAME}
            width={72}
            height={72}
            priority
          />
        </Link>

        {/* Main Navigation */}
        <nav ref={navRef} className="flex-1">
          <ul className="flex items-center justify-center gap-x-5">
            {MAIN_MENU.map((item) => (
              <li key={item.key} className="relative">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleMenu(item.key)}
                      className={cn(
                        "flex items-center gap-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors",
                        openMenu === item.key
                          ? "text-brand-red"
                          : "hover:text-brand-red"
                      )}
                    >
                      {tNav(item.key)}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          openMenu === item.key && "rotate-180"
                        )}
                      />
                    </button>

                    {/* Dropdown */}
                    {openMenu === item.key && (
                      <div className="absolute left-1/2 top-full z-30 min-w-[220px] -translate-x-1/2 rounded-md bg-white py-2 shadow-xl ring-1 ring-black/10">
                        {item.children.map((child) => {
                          const isExternal = child.href.startsWith("http");
                          const className =
                            "block px-5 py-2.5 text-sm font-medium text-brand-blue-dark transition-colors hover:bg-gray-50 hover:text-brand-red";

                          if (isExternal) {
                            return (
                              <a
                                key={child.key}
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setOpenMenu(null)}
                                className={className}
                              >
                                {tNav(child.key)}
                              </a>
                            );
                          }

                          return (
                            <Link
                              key={child.key}
                              href={`/${locale}${child.href}`}
                              onClick={() => setOpenMenu(null)}
                              className={className}
                            >
                              {tNav(child.key)}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={`/${locale}${item.href}`}
                    className="flex items-center py-4 text-xs font-bold uppercase tracking-wider transition-colors hover:text-brand-red"
                  >
                    {tNav(item.key)}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side: Search, News, Social */}
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label={tLayout("search")}
            onClick={() => setSearchOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-opacity hover:opacity-70"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            href={`/${locale}/noticias`}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-opacity hover:opacity-70"
            aria-label={tLayout("latest_news")}
          >
            <Flame className="h-5 w-5" />
          </Link>
          <div className="ml-2 border-l border-gray-200 pl-3">
            <SocialMediaLinks links={SOCIAL_LINKS} />
          </div>
        </div>
      </div>
    </header>
  );
}
