"use client";

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
  if (blocks.length === 0) return null;

  return (
    <section id={id} className={cn("w-full overflow-hidden", className)}>
      <div className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide">
        {blocks.map((block, i) => {
          const isBig = (block.desktopSize ?? "big") === "big";
          const panelWidth = isBig ? "min-w-[100vw]" : "min-w-[50vw]";
          const mobilePanelWidth = "min-w-[100vw]";

          if (block.type === "media") {
            return (
              <div
                key={i}
                className={cn(
                  "relative h-screen shrink-0 snap-start",
                  mobilePanelWidth,
                  `md:${panelWidth}`
                )}
                style={{ minWidth: isBig ? "100vw" : "50vw" }}
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
                className="relative h-screen shrink-0 snap-start"
                style={{ minWidth: isBig ? "100vw" : "50vw", ...colorStyles }}
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
                  className="relative h-screen shrink-0 snap-start"
                  style={{
                    minWidth: isBig ? "100vw" : "50vw",
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
                className="flex h-screen shrink-0 snap-start flex-col"
                style={{
                  minWidth: isBig ? "100vw" : "50vw",
                  ...colorStyles,
                }}
              >
                {isTop && (
                  <div className="shrink-0">
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
                  <div className="shrink-0">
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
  );
}
