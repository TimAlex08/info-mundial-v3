import { cn } from "@/lib/utils";

type TextAlign = "left" | "center" | "right";

export interface TextBlockProps {
  subheading?: string;
  content?: string;
  align?: TextAlign;
  colorType?: "default" | "invert" | "custom" | "accent";
  className?: string;
}

export function TextBlock({
  subheading,
  content,
  align = "left",
  colorType = "default",
  className,
}: TextBlockProps) {
  if (!subheading && !content) return null;

  const alignClass: Record<TextAlign, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const colorClass =
    colorType === "invert"
      ? "text-white"
      : colorType === "accent"
        ? "text-brand-blue"
        : "";

  return (
    <div className={cn("flex flex-col gap-2", alignClass[align], colorClass, className)}>
      {subheading && (
        <p className="text-sm font-semibold uppercase tracking-wide opacity-70">
          {subheading}
        </p>
      )}
      {content && (
        <div
          className="prose max-w-none prose-a:underline prose-a:underline-offset-2"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}
