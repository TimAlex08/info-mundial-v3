import Image from "next/image";
import { cn } from "@/lib/utils";

type ImageRatio = "original" | "portrait" | "landscape" | "square" | "wide";

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  ratio?: ImageRatio;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  loading?: "lazy" | "eager";
  className?: string;
  containerClassName?: string;
  style?: React.CSSProperties;
}

const ratioClasses: Record<ImageRatio, string> = {
  original: "",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  ratio = "original",
  fill = false,
  priority = false,
  sizes,
  loading,
  className,
  containerClassName,
  style,
}: OptimizedImageProps) {
  if (fill) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-[var(--images-and-section-radius)]",
          ratioClasses[ratio],
          containerClassName
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={loading ?? (priority ? "eager" : "lazy")}
          className={cn("object-cover", className)}
          sizes={sizes ?? "(max-width: 920px) 100vw, 50vw"}
          style={style}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--images-and-section-radius)]",
        ratioClasses[ratio],
        containerClassName
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width ?? 800}
        height={height ?? 600}
        priority={priority}
        loading={loading ?? (priority ? "eager" : "lazy")}
        className={cn("h-auto w-full object-cover", className)}
        style={style}
      />
    </div>
  );
}
