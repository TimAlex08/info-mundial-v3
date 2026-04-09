"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLayoutState } from "@/components/layout/layout-state-provider";

interface SearchFieldProps {
  variant?: "icon" | "field";
  className?: string;
  placeholder?: string;
}

export function SearchField({
  variant = "icon",
  className,
  placeholder = "Buscar...",
}: SearchFieldProps) {
  const { setSearchOpen } = useLayoutState();

  if (variant === "icon") {
    return (
      <button
        type="button"
        aria-label="Buscar"
        onClick={() => setSearchOpen(true)}
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full transition-opacity hover:opacity-70",
          className
        )}
      >
        <Search className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className={cn("relative w-full", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
      <input
        type="search"
        placeholder={placeholder}
        className="h-11 w-full rounded-[var(--field-radius)] border border-current/20 bg-transparent pl-10 pr-4 text-sm placeholder:opacity-50 focus:outline-none focus:ring-1 focus:ring-current/30"
      />
    </div>
  );
}
