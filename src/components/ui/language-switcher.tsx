"use client";

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
  variant?: "pills" | "list";
  className?: string;
}

export function LanguageSwitcher({
  locale,
  variant = "pills",
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname();

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
