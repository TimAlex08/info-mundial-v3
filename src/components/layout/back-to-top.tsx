import { ChevronUp } from "lucide-react";

interface BackToTopProps {
  label: string;
}

export function BackToTop({ label }: BackToTopProps) {
  return (
    <a
      href="#top"
      className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
    >
      <span>{label}</span>
      <ChevronUp className="h-5 w-5" />
    </a>
  );
}
