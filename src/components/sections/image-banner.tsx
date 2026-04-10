"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { BlockRenderer, type SectionBlock } from "./block-renderer";

export interface ImageBannerProps {
  image?: string;
  imageAlt?: string;
  mobileImage?: string;
  blocks: SectionBlock[];
  desktopHeight?: number;
  mobileHeight?: number;
  overlayColor?: string;
  overlayOpacity?: number;
  contentColor?: string;
  verticalAlign?: "start" | "center" | "end";
  horizontalAlign?: "left" | "center" | "right";
  sectionWidth?: "wide" | "full-width";
  colorType?: "default" | "invert" | "custom";
  desktopPaddingTop?: number;
  desktopPaddingBottom?: number;
  mobilePaddingTop?: number;
  mobilePaddingBottom?: number;
  id?: string;
  className?: string;
}

export function ImageBanner({
  image,
  imageAlt = "",
  mobileImage,
  blocks,
  desktopHeight = 80,
  mobileHeight = 60,
  overlayColor = "#000000",
  overlayOpacity = 30,
  contentColor = "#ffffff",
  verticalAlign = "center",
  horizontalAlign = "center",
  sectionWidth = "full-width",
  desktopPaddingTop = 0,
  desktopPaddingBottom = 0,
  mobilePaddingTop = 0,
  mobilePaddingBottom = 0,
  id,
  className,
}: ImageBannerProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden",
        className
      )}
      style={{
        height: `${desktopHeight}vh`,
        paddingTop: `${desktopPaddingTop}px`,
        paddingBottom: `${desktopPaddingBottom}px`,
        "--ib-mobile-h": `${mobileHeight}vh`,
        "--ib-mobile-pt": `${mobilePaddingTop}px`,
        "--ib-mobile-pb": `${mobilePaddingBottom}px`,
      } as React.CSSProperties}
    >
      <style>{`
        @media (max-width: 920px) {
          ${id ? `#${id}` : ".image-banner"} {
            height: var(--ib-mobile-h) !important;
            padding-top: var(--ib-mobile-pt) !important;
            padding-bottom: var(--ib-mobile-pb) !important;
          }
        }
      `}</style>

      {/* Background Image */}
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            className={cn(
              "object-cover",
              mobileImage && "hidden md:block"
            )}
            sizes="100vw"
          />
          {mobileImage && (
            <Image
              src={mobileImage}
              alt={imageAlt}
              fill
              priority
              className="object-cover md:hidden"
              sizes="100vw"
            />
          )}
        </>
      )}

      {/* Fallback when no image */}
      {!image && <div className="absolute inset-0 bg-muted" />}

      {/* Overlay */}
      {overlayOpacity > 0 && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity / 100,
          }}
        />
      )}

      {/* Content */}
      {blocks.length > 0 && (
        <div
          className={cn(
            "relative z-10 flex h-full flex-col gap-4 p-6 md:p-10",
            verticalAlign === "start" && "justify-start",
            verticalAlign === "center" && "justify-center",
            verticalAlign === "end" && "justify-end",
            horizontalAlign === "left" && "items-start text-left",
            horizontalAlign === "center" && "items-center text-center",
            horizontalAlign === "right" && "items-end text-right"
          )}
          style={{ color: contentColor }}
        >
          <BlockRenderer blocks={blocks} />
        </div>
      )}
    </section>
  );
}
