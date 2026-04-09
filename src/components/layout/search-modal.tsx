"use client";

import { useEffect, useRef, useCallback } from "react";
import { X, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useLayoutState } from "./layout-state-provider";

export function SearchModal() {
  const { isSearchOpen, setSearchOpen } = useLayoutState();
  const inputRef = useRef<HTMLInputElement>(null);
  const tLayout = useTranslations("layout");

  const close = useCallback(() => setSearchOpen(false), [setSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) return;
    document.body.style.overflow = "hidden";
    // Focus input after animation
    const timer = setTimeout(() => inputRef.current?.focus(), 300);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
    };
  }, [isSearchOpen, close]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col bg-[rgb(var(--layout-background-color))] text-[rgb(var(--layout-text-color))]"
          role="dialog"
          aria-modal="true"
          aria-label={tLayout("search")}
        >
          {/* Close button */}
          <div className="flex justify-end px-6 py-4">
            <button
              type="button"
              onClick={close}
              aria-label={tLayout("close_search")}
              className="flex h-11 w-11 items-center justify-center rounded-full transition-opacity hover:opacity-70"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search form */}
          <div className="mx-auto w-full max-w-[600px] px-6 pt-8">
            <form
              action="/search"
              method="get"
              role="search"
              className="relative"
            >
              <input
                ref={inputRef}
                type="search"
                name="q"
                placeholder={tLayout("search_placeholder")}
                autoComplete="off"
                className="h-14 w-full border-b-2 border-current/20 bg-transparent pr-12 text-2xl font-bold placeholder:opacity-40 focus:border-current/60 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center transition-opacity hover:opacity-70"
                aria-label={tLayout("search")}
              >
                <Search className="h-6 w-6" />
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
