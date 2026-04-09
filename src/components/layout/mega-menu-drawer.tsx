"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/logo";
import { SocialMediaLinks } from "@/components/ui/social-media-links";
import { SearchField } from "@/components/ui/search-field";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLayoutState } from "./layout-state-provider";
import { MAIN_MENU, SOCIAL_LINKS } from "@/lib/constants";
import type { MenuItem } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MegaMenuDrawerProps {
  locale: string;
}

function MenuItems({
  items,
  locale,
  onClose,
}: {
  items: MenuItem[];
  locale: string;
  onClose: () => void;
}) {
  const tNav = useTranslations("nav");
  const tLayout = useTranslations("layout");

  return (
    <Accordion multiple className="w-full">
      {items.map((item) =>
        item.children && item.children.length > 0 ? (
          <AccordionItem
            key={item.href}
            value={item.href}
            className="border-white/10"
          >
            <AccordionTrigger className="py-3 text-sm font-semibold uppercase tracking-wider hover:no-underline">
              {tNav(item.key)}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-1 pb-2 pl-4">
                <li>
                  <Link
                    href={`/${locale}${item.href}`}
                    onClick={onClose}
                    className="block py-1.5 text-sm opacity-80 transition-opacity hover:opacity-100"
                  >
                    {tLayout("see_all")}
                  </Link>
                </li>
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={`/${locale}${child.href}`}
                      onClick={onClose}
                      className="block py-1.5 text-sm opacity-80 transition-opacity hover:opacity-100"
                    >
                      {tNav(child.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ) : (
          <div key={item.href} className="border-b border-white/10">
            <Link
              href={`/${locale}${item.href}`}
              onClick={onClose}
              className="block py-3 text-sm font-semibold uppercase tracking-wider transition-opacity hover:opacity-70"
            >
              {tNav(item.key)}
            </Link>
          </div>
        )
      )}
    </Accordion>
  );
}

export function MegaMenuDrawer({ locale }: MegaMenuDrawerProps) {
  const { isMenuOpen, setMenuOpen } = useLayoutState();
  const tLayout = useTranslations("layout");

  const close = useCallback(() => setMenuOpen(false), [setMenuOpen]);

  // Lock body scroll and handle Escape
  useEffect(() => {
    if (!isMenuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen, close]);

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[24] bg-black/50"
            onClick={close}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-y-0 left-0 z-[40] flex w-[640px] max-w-full flex-col bg-brand-blue-dark text-white"
            role="dialog"
            aria-modal="true"
            aria-label={tLayout("nav_menu")}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-xs font-bold uppercase tracking-widest">
                {tLayout("slogan")}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label={tLayout("close_menu")}
                className="flex h-11 w-11 items-center justify-center rounded-full transition-opacity hover:opacity-70"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              {/* Logo */}
              <div className="mb-4 flex justify-center">
                <Logo height={144} variant="footer" locale={locale} />
              </div>

              {/* Search */}
              <div className="mb-6">
                <SearchField variant="field" placeholder={tLayout("search_placeholder")} />
              </div>

              {/* Menu */}
              <MenuItems
                items={MAIN_MENU}
                locale={locale}
                onClose={close}
              />

              {/* Social */}
              <div className="mt-8">
                <SocialMediaLinks links={SOCIAL_LINKS} />
              </div>
            </div>

            {/* Pinned: Language Switcher */}
            <div className="border-t border-white/10 px-6 py-4">
              <LanguageSwitcher locale={locale} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
