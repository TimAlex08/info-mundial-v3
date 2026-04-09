import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ImageRatio = "original" | "portrait" | "landscape" | "square" | "wide";

export interface ContextImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  ratio?: ImageRatio;
  maxWidth?: number;
  borderRadius?: string;
  href?: string;
  targetBlank?: boolean;
  className?: string;
}

const ratioClasses: Record<ImageRatio, string> = {
  original: "",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

export function ContextImage({
  src,
  alt,
  width,
  height,
  ratio = "original",
  maxWidth,
  borderRadius,
  href,
  targetBlank = false,
  className,
}: ContextImageProps) {
  const imageContent = (
    <div
      className={cn(
        "relative overflow-hidden",
        ratioClasses[ratio],
        className
      )}
      style={{
        maxWidth: maxWidth ? `${maxWidth}px` : undefined,
        borderRadius: borderRadius ?? "var(--images-and-section-radius)",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width ?? 800}
        height={height ?? 600}
        className="h-full w-full object-cover transition-opacity duration-[var(--animation-duration)]"
      />
    </div>
  );

  if (href) {
    if (targetBlank || href.startsWith("http")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-70 transition-opacity"
        >
          {imageContent}
        </a>
      );
    }
    return (
      <Link href={href} className="block hover:opacity-70 transition-opacity">
        {imageContent}
      </Link>
    );
  }

  return imageContent;
}
