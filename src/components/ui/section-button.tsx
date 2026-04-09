import Link from "next/link";
import { cn } from "@/lib/utils";

export interface SectionButtonProps {
  label: string;
  href?: string;
  style?: "solid" | "outlined" | "link";
  targetBlank?: boolean;
  className?: string;
}

export function SectionButton({
  label,
  href,
  style = "solid",
  targetBlank = false,
  className,
}: SectionButtonProps) {
  const base =
    "inline-block font-semibold tracking-wide transition-opacity hover:opacity-80";

  const variants: Record<string, string> = {
    solid:
      "rounded-[var(--button-radius)] bg-brand-blue px-6 py-3 text-sm text-white uppercase",
    outlined:
      "rounded-[var(--button-radius)] border-2 border-current px-6 py-3 text-sm uppercase",
    link: "text-sm underline underline-offset-4",
  };

  const classes = cn(base, variants[style], className);

  if (!href) {
    return (
      <span className={cn(classes, "opacity-50 cursor-not-allowed")}>
        {label}
      </span>
    );
  }

  if (targetBlank || href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}
