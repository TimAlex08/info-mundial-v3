"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { usePathname, Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LOCALE_LABELS: Record<string, string> = {
  es: "Español",
  en: "English",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
};

export interface LanguageSwitcherProps {
  locale: string;
  variant?: "pills" | "list" | "dropdown";
  className?: string;
}

export function LanguageSwitcher({
  locale,
  variant = "pills",
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (variant === "dropdown") {
    return (
      <div ref={ref} className={cn("relative", className)}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-1 rounded-full px-2 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors hover:text-brand-red"
          aria-label="Cambiar idioma"
        >
          <Globe className="h-4 w-4" />
          <span>{locale.toUpperCase()}</span>
          <ChevronDown
            className={cn(
              "h-3 w-3 transition-transform",
              open && "rotate-180"
            )}
          />
        </button>

        {open && (
          <div className="absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-md bg-white py-1 shadow-xl ring-1 ring-black/10">
            {routing.locales.map((loc) => (
              <Link
                key={loc}
                href={pathname}
                locale={loc}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-4 py-2 text-sm transition-colors hover:bg-gray-50 hover:text-brand-red",
                  loc === locale
                    ? "font-bold text-brand-red"
                    : "text-brand-blue-dark"
                )}
              >
                {LOCALE_LABELS[loc]}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (variant === "list") {
    return (
      <ul className={cn("flex flex-col gap-1", className)}>
        {routing.locales.map((loc) => (
          <li key={loc}>
            <Link
              href={pathname}
              locale={loc}
              className={cn(
                "block py-1 text-sm transition-opacity hover:opacity-70",
                loc === locale ? "font-bold" : "opacity-80"
              )}
            >
              {LOCALE_LABELS[loc]}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          className={cn(
            "rounded-full border px-3 py-1 text-xs uppercase transition-opacity hover:opacity-70",
            loc === locale
              ? "border-white bg-white/20 font-bold"
              : "border-white/30"
          )}
        >
          {LOCALE_LABELS[loc]}
        </Link>
      ))}
    </div>
  );
}
