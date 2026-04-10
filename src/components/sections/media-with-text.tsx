import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BlockRenderer, type SectionBlock } from "./block-renderer";

type MediaRatio = "original" | "portrait" | "landscape" | "square" | "wide";
type MediaSize = "large" | "half" | "small";

export interface MediaWithTextProps {
  image?: string;
  imageAlt?: string;
  videoSrc?: string;
  blocks: SectionBlock[];
  sectionWidth?: "wide" | "narrow" | "full-width";
  swapMedia?: boolean;
  mediaSize?: MediaSize;
  mediaRatio?: MediaRatio;
  verticalAlign?: "start" | "center" | "end";
  horizontalAlign?: "left" | "center" | "right";
  colorType?: "default" | "invert" | "custom";
  backgroundColor?: string;
  textColor?: string;
  href?: string;
  targetBlank?: boolean;
  desktopPaddingTop?: number;
  desktopPaddingBottom?: number;
  mobilePaddingTop?: number;
  mobilePaddingBottom?: number;
  id?: string;
  className?: string;
}

const ratioClasses: Record<MediaRatio, string> = {
  original: "",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

const mediaSizeClasses: Record<MediaSize, string> = {
  large: "md:w-2/3",
  half: "md:w-1/2",
  small: "md:w-1/3",
};

const contentSizeClasses: Record<MediaSize, string> = {
  large: "md:w-1/3",
  half: "md:w-1/2",
  small: "md:w-2/3",
};

export function MediaWithText({
  image,
  imageAlt = "",
  videoSrc,
  blocks,
  sectionWidth = "wide",
  swapMedia = false,
  mediaSize = "half",
  mediaRatio = "square",
  verticalAlign = "center",
  horizontalAlign = "left",
  colorType = "default",
  backgroundColor,
  textColor,
  href,
  targetBlank = false,
  desktopPaddingTop = 0,
  desktopPaddingBottom = 0,
  mobilePaddingTop = 0,
  mobilePaddingBottom = 0,
  id,
  className,
}: MediaWithTextProps) {
  const hasMedia = image || videoSrc;

  const colorStyles: React.CSSProperties = {};
  if (colorType === "invert") {
    colorStyles.backgroundColor = "rgb(var(--layout-text-color))";
    colorStyles.color = "rgb(var(--layout-background-color))";
  } else if (colorType === "custom") {
    if (backgroundColor) colorStyles.backgroundColor = backgroundColor;
    if (textColor) colorStyles.color = textColor;
  }

  const media = hasMedia && (
    <div className={cn("w-full", mediaSizeClasses[mediaSize])}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-[var(--images-and-section-radius)]",
          ratioClasses[mediaRatio]
        )}
      >
        {videoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : image ? (
          mediaRatio === "original" ? (
            <Image
              src={image}
              alt={imageAlt}
              width={0}
              height={0}
              sizes={`(max-width: 920px) 100vw, ${mediaSize === "large" ? "66vw" : mediaSize === "half" ? "50vw" : "33vw"}`}
              className="h-auto w-full"
            />
          ) : (
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes={`(max-width: 920px) 100vw, ${mediaSize === "large" ? "66vw" : mediaSize === "half" ? "50vw" : "33vw"}`}
            />
          )
        ) : null}
      </div>
    </div>
  );

  const content = (
    <div
      className={cn(
        "flex w-full flex-col gap-4",
        contentSizeClasses[mediaSize],
        verticalAlign === "start" && "justify-start",
        verticalAlign === "center" && "justify-center",
        verticalAlign === "end" && "justify-end",
        horizontalAlign === "center" && "items-center text-center",
        horizontalAlign === "right" && "items-end text-right"
      )}
    >
      <BlockRenderer blocks={blocks} />
    </div>
  );

  const inner = (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-stretch md:gap-8",
        swapMedia && "md:flex-row-reverse"
      )}
    >
      {media}
      {content}
    </div>
  );

  const wrapperContent = href ? (
    targetBlank || href.startsWith("http") ? (
      <a
        href={href}
        target={targetBlank ? "_blank" : undefined}
        rel={targetBlank ? "noopener noreferrer" : undefined}
        className="block transition-opacity hover:opacity-90"
      >
        {inner}
      </a>
    ) : (
      <Link href={href} className="block transition-opacity hover:opacity-90">
        {inner}
      </Link>
    )
  ) : (
    inner
  );

  return (
    <section
      id={id}
      className={cn("w-full", className)}
      style={{
        ...colorStyles,
        paddingTop: `${desktopPaddingTop}px`,
        paddingBottom: `${desktopPaddingBottom}px`,
        "--mwt-mobile-pt": `${mobilePaddingTop}px`,
        "--mwt-mobile-pb": `${mobilePaddingBottom}px`,
      } as React.CSSProperties}
    >
      <style>{`
        @media (max-width: 920px) {
          ${id ? `#${id}` : ".media-with-text"} {
            padding-top: var(--mwt-mobile-pt) !important;
            padding-bottom: var(--mwt-mobile-pb) !important;
          }
        }
      `}</style>
      <div className="mx-auto w-full px-6 md:max-w-[66%] md:px-0">
        {wrapperContent}
      </div>
    </section>
  );
}
