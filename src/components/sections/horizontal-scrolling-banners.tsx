"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SectionButton } from "@/components/ui/section-button";

type DesktopSize = "big" | "small";

interface MediaBlock {
  type: "media";
  desktopSize?: DesktopSize;
  image?: string;
  imageAlt?: string;
  videoSrc?: string;
}

interface TextBlock {
  type: "text";
  desktopSize?: DesktopSize;
  centerText?: boolean;
  narrowContent?: boolean;
  verticalAlign?: "start" | "center" | "end";
  horizontalAlign?: "left" | "center" | "right";
  number?: string;
  subheading?: string;
  heading?: string;
  text?: string;
  buttonLabel?: string;
  buttonHref?: string;
  buttonStyle?: "solid" | "outlined" | "link";
  targetBlank?: boolean;
  colorType?: "default" | "invert" | "custom";
  backgroundColor?: string;
  textColor?: string;
}

interface MediaWithTextBlock {
  type: "media_with_text";
  desktopSize?: DesktopSize;
  contentPosition?: "overlay" | "top" | "bottom";
  image?: string;
  imageAlt?: string;
  videoSrc?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  centerText?: boolean;
  narrowContent?: boolean;
  verticalAlign?: "start" | "center" | "end";
  horizontalAlign?: "left" | "center" | "right";
  number?: string;
  subheading?: string;
  heading?: string;
  text?: string;
  buttonLabel?: string;
  buttonHref?: string;
  buttonStyle?: "solid" | "outlined" | "link";
  targetBlank?: boolean;
  colorType?: "default" | "invert" | "custom";
  backgroundColor?: string;
  textColor?: string;
}

export type HorizontalScrollBlock = MediaBlock | TextBlock | MediaWithTextBlock;

export interface HorizontalScrollingBannersProps {
  blocks: HorizontalScrollBlock[];
  id?: string;
  className?: string;
}

function BlockContent({
  number,
  subheading,
  heading,
  text,
  buttonLabel,
  buttonHref,
  buttonStyle = "solid",
  targetBlank = false,
  centerText = false,
  narrowContent = false,
  verticalAlign = "center",
  horizontalAlign = "center",
}: {
  number?: string;
  subheading?: string;
  heading?: string;
  text?: string;
  buttonLabel?: string;
  buttonHref?: string;
  buttonStyle?: "solid" | "outlined" | "link";
  targetBlank?: boolean;
  centerText?: boolean;
  narrowContent?: boolean;
  verticalAlign?: "start" | "center" | "end";
  horizontalAlign?: "left" | "center" | "right";
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-4 p-6 md:p-10",
        verticalAlign === "start" && "justify-start",
        verticalAlign === "center" && "justify-center",
        verticalAlign === "end" && "justify-end",
        horizontalAlign === "left" && "items-start text-left",
        horizontalAlign === "center" && "items-center text-center",
        horizontalAlign === "right" && "items-end text-right",
        centerText && "items-center text-center",
        narrowContent && "mx-auto max-w-[600px]"
      )}
    >
      {number && (
        <p className="text-4xl font-bold md:text-6xl">{number}</p>
      )}
      {subheading && (
        <p className="text-sm font-semibold uppercase tracking-wide opacity-70">
          {subheading}
        </p>
      )}
      {heading && (
        <h2 className="text-2xl font-bold md:text-3xl">{heading}</h2>
      )}
      {text && (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
      {buttonLabel && (
        <SectionButton
          label={buttonLabel}
          href={buttonHref}
          style={buttonStyle}
          targetBlank={targetBlank}
        />
      )}
    </div>
  );
}

export function HorizontalScrollingBanners({
  blocks,
  id,
  className,
}: HorizontalScrollingBannersProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [extraHeight, setExtraHeight] = useState(0);

  // Calculate how much horizontal overflow exists → that becomes extra vertical scroll space
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const overflow = Math.max(0, track.scrollWidth - window.innerWidth);
      setExtraHeight(overflow);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [blocks]);

  // Map vertical scroll progress within the wrapper to horizontal translateX
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track || extraHeight <= 0) return;

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrollable = wrapper.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      track.style.transform = `translateX(-${progress * extraHeight}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [extraHeight]);

  if (blocks.length === 0) return null;

  return (
    <div
      ref={wrapperRef}
      style={{ height: `calc(100vh + ${extraHeight}px)` }}
    >
      <section
        id={id}
        className={cn("sticky top-0 h-screen w-full overflow-hidden", className)}
      >
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
        >
          {blocks.map((block, i) => {
            const isBig = (block.desktopSize ?? "big") === "big";

            if (block.type === "media") {
              return (
                <div
                  key={i}
                  className="relative h-full shrink-0"
                  style={{ width: isBig ? "100vw" : "50vw" }}
                >
                  {block.videoSrc ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                    >
                      <source src={block.videoSrc} type="video/mp4" />
                    </video>
                  ) : block.image ? (
                    <Image
                      src={block.image}
                      alt={block.imageAlt || ""}
                      fill
                      className="object-cover"
                      sizes={isBig ? "100vw" : "50vw"}
                    />
                  ) : (
                    <div className="h-full w-full bg-muted" />
                  )}
                </div>
              );
            }

            if (block.type === "text") {
              const colorStyles: React.CSSProperties = {};
              if (block.colorType === "invert") {
                colorStyles.backgroundColor = "rgb(var(--layout-text-color))";
                colorStyles.color = "rgb(var(--layout-background-color))";
              } else if (block.colorType === "custom") {
                if (block.backgroundColor)
                  colorStyles.backgroundColor = block.backgroundColor;
                if (block.textColor) colorStyles.color = block.textColor;
              }

              return (
                <div
                  key={i}
                  className="relative h-full shrink-0"
                  style={{ width: isBig ? "100vw" : "50vw", ...colorStyles }}
                >
                  <BlockContent
                    number={block.number}
                    subheading={block.subheading}
                    heading={block.heading}
                    text={block.text}
                    buttonLabel={block.buttonLabel}
                    buttonHref={block.buttonHref}
                    buttonStyle={block.buttonStyle}
                    targetBlank={block.targetBlank}
                    centerText={block.centerText}
                    narrowContent={block.narrowContent}
                    verticalAlign={block.verticalAlign}
                    horizontalAlign={block.horizontalAlign}
                  />
                </div>
              );
            }

            if (block.type === "media_with_text") {
              const isOverlay = (block.contentPosition ?? "overlay") === "overlay";

              const colorStyles: React.CSSProperties = {};
              if (block.colorType === "invert") {
                colorStyles.backgroundColor = "rgb(var(--layout-text-color))";
                colorStyles.color = "rgb(var(--layout-background-color))";
              } else if (block.colorType === "custom") {
                if (block.backgroundColor)
                  colorStyles.backgroundColor = block.backgroundColor;
                if (block.textColor) colorStyles.color = block.textColor;
              }

              if (isOverlay) {
                return (
                  <div
                    key={i}
                    className="relative h-full shrink-0"
                    style={{
                      width: isBig ? "100vw" : "50vw",
                      ...colorStyles,
                    }}
                  >
                    {block.videoSrc ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover"
                      >
                        <source src={block.videoSrc} type="video/mp4" />
                      </video>
                    ) : block.image ? (
                      <Image
                        src={block.image}
                        alt={block.imageAlt || ""}
                        fill
                        className="object-cover"
                        sizes={isBig ? "100vw" : "50vw"}
                      />
                    ) : null}
                    {(block.overlayOpacity ?? 70) > 0 && (
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundColor: block.overlayColor || "#000000",
                          opacity: (block.overlayOpacity ?? 70) / 100,
                        }}
                      />
                    )}
                    <div className="relative z-10 h-full">
                      <BlockContent
                        number={block.number}
                        subheading={block.subheading}
                        heading={block.heading}
                        text={block.text}
                        buttonLabel={block.buttonLabel}
                        buttonHref={block.buttonHref}
                        buttonStyle={block.buttonStyle}
                        targetBlank={block.targetBlank}
                        centerText={block.centerText}
                        narrowContent={block.narrowContent}
                        verticalAlign={block.verticalAlign}
                        horizontalAlign={block.horizontalAlign}
                      />
                    </div>
                  </div>
                );
              }

              // top or bottom content position
              const isTop = block.contentPosition === "top";
              return (
                <div
                  key={i}
                  className="flex h-full shrink-0 flex-col"
                  style={{
                    width: isBig ? "100vw" : "50vw",
                    ...colorStyles,
                  }}
                >
                  {isTop && (
                    <div className="flex-1">
                      <BlockContent
                        number={block.number}
                        subheading={block.subheading}
                        heading={block.heading}
                        text={block.text}
                        buttonLabel={block.buttonLabel}
                        buttonHref={block.buttonHref}
                        buttonStyle={block.buttonStyle}
                        targetBlank={block.targetBlank}
                        centerText={block.centerText}
                        narrowContent={block.narrowContent}
                        verticalAlign={block.verticalAlign}
                        horizontalAlign={block.horizontalAlign}
                      />
                    </div>
                  )}
                  <div className="relative flex-1">
                    {block.videoSrc ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                      >
                        <source src={block.videoSrc} type="video/mp4" />
                      </video>
                    ) : block.image ? (
                      <Image
                        src={block.image}
                        alt={block.imageAlt || ""}
                        fill
                        className="object-cover"
                        sizes={isBig ? "100vw" : "50vw"}
                      />
                    ) : null}
                  </div>
                  {!isTop && (
                    <div className="flex-1">
                      <BlockContent
                        number={block.number}
                        subheading={block.subheading}
                        heading={block.heading}
                        text={block.text}
                        buttonLabel={block.buttonLabel}
                        buttonHref={block.buttonHref}
                        buttonStyle={block.buttonStyle}
                        targetBlank={block.targetBlank}
                        centerText={block.centerText}
                        narrowContent={block.narrowContent}
                        verticalAlign={block.verticalAlign}
                        horizontalAlign={block.horizontalAlign}
                      />
                    </div>
                  )}
                </div>
              );
            }

            return null;
          })}
        </div>
      </section>
    </div>
  );
}
