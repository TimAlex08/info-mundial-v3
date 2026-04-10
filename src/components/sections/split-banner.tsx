"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionButton } from "@/components/ui/section-button";
import { ContextImage } from "@/components/ui/context-image";

export interface SplitBannerPanel {
  image?: string;
  imageAlt?: string;
  link?: string;
  targetBlank?: boolean;
  centerText?: boolean;
  verticalAlign?: "start" | "center" | "end";
  horizontalAlign?: "left" | "center" | "right";
  overlayColor?: string;
  overlayOpacity?: number;
  contextImage?: string;
  contextImageAlt?: string;
  contextImageWidth?: number;
  contextImageRatio?: "original" | "portrait" | "landscape" | "square" | "wide";
  subheading?: string;
  heading?: string;
  text?: string;
  buttonLabel?: string;
  buttonStyle?: "solid" | "outlined" | "link";
  colorType?: "default" | "invert" | "custom";
  backgroundColor?: string;
  textColor?: string;
}

export interface SplitBannerProps {
  panels: SplitBannerPanel[];
  desktopHeight?: number;
  mobileHeight?: number;
  sectionWidth?: "full-width" | "wide";
  narrowContent?: boolean;
  contentOnHover?: boolean;
  desktopPaddingTop?: number;
  desktopPaddingBottom?: number;
  mobilePaddingTop?: number;
  mobilePaddingBottom?: number;
  id?: string;
  className?: string;
}

export function SplitBanner({
  panels,
  desktopHeight = 70,
  mobileHeight = 60,
  sectionWidth = "full-width",
  narrowContent = true,
  contentOnHover = true,
  desktopPaddingTop = 0,
  desktopPaddingBottom = 0,
  mobilePaddingTop = 0,
  mobilePaddingBottom = 0,
  id,
  className,
}: SplitBannerProps) {
  if (panels.length === 0) return null;

  return (
    <section
      id={id}
      className={cn("w-full", className)}
      style={{
        paddingTop: `${desktopPaddingTop}px`,
        paddingBottom: `${desktopPaddingBottom}px`,
        "--sb-mobile-pt": `${mobilePaddingTop}px`,
        "--sb-mobile-pb": `${mobilePaddingBottom}px`,
      } as React.CSSProperties}
    >
      <style>{`
        @media (max-width: 920px) {
          ${id ? `#${id}` : ".split-banner"} {
            padding-top: var(--sb-mobile-pt) !important;
            padding-bottom: var(--sb-mobile-pb) !important;
          }
        }
      `}</style>

      <div className="flex flex-col md:flex-row">
        {panels.slice(0, 2).map((panel, i) => {
          const colorStyles: React.CSSProperties = {};
          if (panel.colorType === "invert") {
            colorStyles.backgroundColor = "rgb(var(--layout-text-color))";
            colorStyles.color = "rgb(var(--layout-background-color))";
          } else if (panel.colorType === "custom") {
            if (panel.backgroundColor)
              colorStyles.backgroundColor = panel.backgroundColor;
            if (panel.textColor) colorStyles.color = panel.textColor;
          }

          const content = (
            <div
              className={cn(
                "relative overflow-hidden",
                panels.length === 1 ? "w-full" : "w-full md:w-1/2"
              )}
              style={{
                height: `${desktopHeight}vh`,
                "--sb-mobile-h": `${mobileHeight}vh`,
                ...colorStyles,
              } as React.CSSProperties}
            >
              <style>{`
                @media (max-width: 920px) {
                  ${id ? `#${id}` : ".split-banner"} .split-panel-${i} {
                    height: var(--sb-mobile-h) !important;
                  }
                }
              `}</style>

              {/* Background Image */}
              {panel.image && (
                <Image
                  src={panel.image}
                  alt={panel.imageAlt || ""}
                  fill
                  className="object-cover"
                  sizes={panels.length === 1 ? "100vw" : "(max-width: 920px) 100vw, 50vw"}
                />
              )}

              {!panel.image && <div className="absolute inset-0 bg-muted" />}

              {/* Overlay */}
              {(panel.overlayOpacity ?? 70) > 0 && (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: panel.overlayColor || "#000000",
                    opacity: (panel.overlayOpacity ?? 70) / 100,
                  }}
                />
              )}

              {/* Content */}
              <div
                className={cn(
                  "relative z-10 flex h-full flex-col gap-4 p-6 md:p-10",
                  contentOnHover &&
                    "opacity-0 transition-opacity duration-300 hover:opacity-100 md:opacity-0",
                  !contentOnHover && "opacity-100",
                  panel.verticalAlign === "start" && "justify-start",
                  panel.verticalAlign === "center" && "justify-center",
                  panel.verticalAlign === "end" && "justify-end",
                  panel.horizontalAlign === "left" && "items-start text-left",
                  panel.horizontalAlign === "center" && "items-center text-center",
                  panel.horizontalAlign === "right" && "items-end text-right",
                  panel.centerText && "items-center text-center",
                  narrowContent && "mx-auto max-w-[500px]"
                )}
              >
                {panel.contextImage && (
                  <ContextImage
                    src={panel.contextImage}
                    alt={panel.contextImageAlt || ""}
                    maxWidth={panel.contextImageWidth}
                    ratio={panel.contextImageRatio}
                  />
                )}
                {panel.subheading && (
                  <p className="text-sm font-semibold uppercase tracking-wide opacity-70">
                    {panel.subheading}
                  </p>
                )}
                {panel.heading && (
                  <h2 className="text-2xl font-bold md:text-3xl">
                    {panel.heading}
                  </h2>
                )}
                {panel.text && (
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: panel.text }}
                  />
                )}
                {panel.buttonLabel && (
                  <SectionButton
                    label={panel.buttonLabel}
                    href={panel.link}
                    style={panel.buttonStyle}
                    targetBlank={panel.targetBlank}
                  />
                )}
              </div>
            </div>
          );

          if (panel.link) {
            const isExternal =
              panel.targetBlank || panel.link.startsWith("http");
            if (isExternal) {
              return (
                <a
                  key={i}
                  href={panel.link}
                  target={panel.targetBlank ? "_blank" : undefined}
                  rel={panel.targetBlank ? "noopener noreferrer" : undefined}
                  className={cn("block", `split-panel-${i}`)}
                >
                  {content}
                </a>
              );
            }
            return (
              <Link key={i} href={panel.link} className={cn("block", `split-panel-${i}`)}>
                {content}
              </Link>
            );
          }

          return (
            <div key={i} className={`split-panel-${i}`}>
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
