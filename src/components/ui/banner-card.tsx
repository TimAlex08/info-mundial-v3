import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ImageRatio = "original" | "portrait" | "landscape" | "square" | "wide";
type BannerStyle = "overlay" | "below";

export interface BannerCardProps {
  image?: string;
  imageAlt?: string;
  heading?: string;
  subheading?: string;
  href?: string;
  imageRatio?: ImageRatio;
  bannerStyle?: BannerStyle;
  overlayColor?: string;
  overlayOpacity?: number;
  contentColor?: string;
  verticalAlign?: "start" | "center" | "end";
  horizontalAlign?: "left" | "center" | "right";
  className?: string;
}

const ratioClasses: Record<ImageRatio, string> = {
  original: "aspect-auto",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

export function BannerCard({
  image,
  imageAlt = "",
  heading,
  subheading,
  href,
  imageRatio = "landscape",
  bannerStyle = "overlay",
  overlayColor = "#000000",
  overlayOpacity = 0,
  contentColor = "#ffffff",
  verticalAlign = "end",
  horizontalAlign = "left",
  className,
}: BannerCardProps) {
  const hasContent = heading || subheading;

  const content = (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[var(--images-and-section-radius)]",
        className
      )}
    >
      {/* Image */}
      <div className={cn("relative w-full", ratioClasses[imageRatio])}>
        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-opacity duration-[var(--animation-duration)] group-hover:opacity-80"
            sizes="(max-width: 920px) 100vw, 600px"
          />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}

        {/* Overlay */}
        {bannerStyle === "overlay" && overlayOpacity > 0 && (
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: overlayColor,
              opacity: overlayOpacity / 100,
            }}
          />
        )}

        {/* Overlay content */}
        {bannerStyle === "overlay" && hasContent && (
          <div
            className={cn(
              "absolute inset-0 flex flex-col p-4 md:p-6",
              verticalAlign === "start" && "justify-start",
              verticalAlign === "center" && "justify-center",
              verticalAlign === "end" && "justify-end",
              horizontalAlign === "center" && "items-center text-center",
              horizontalAlign === "right" && "items-end text-right"
            )}
            style={{ color: contentColor }}
          >
            {subheading && (
              <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
                {subheading}
              </p>
            )}
            {heading && (
              <h3 className="text-lg font-bold md:text-xl">{heading}</h3>
            )}
          </div>
        )}
      </div>

      {/* Below content */}
      {bannerStyle === "below" && hasContent && (
        <div
          className={cn(
            "mt-3",
            horizontalAlign === "center" && "text-center",
            horizontalAlign === "right" && "text-right"
          )}
        >
          {subheading && (
            <p className="text-xs font-semibold uppercase tracking-wide opacity-70">
              {subheading}
            </p>
          )}
          {heading && <h3 className="text-base font-bold">{heading}</h3>}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
