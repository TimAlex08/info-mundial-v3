"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionButton } from "@/components/ui/section-button";
import { ContextImage } from "@/components/ui/context-image";

export interface SlideshowSlide {
  videoSrc?: string;
  desktopImage?: string;
  desktopImageAlt?: string;
  mobileImage?: string;
  mobileImageAlt?: string;
  link?: string;
  targetBlank?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  centerText?: boolean;
  verticalAlign?: "start" | "center" | "end";
  horizontalAlign?: "left" | "center" | "right";
  narrowContent?: boolean;
  contextImage?: string;
  contextImageAlt?: string;
  contextImageWidth?: number;
  contextImageRatio?: "original" | "portrait" | "landscape" | "square" | "wide";
  subheading?: string;
  heading?: string;
  text?: string;
  buttonLabel1?: string;
  buttonLink1?: string;
  buttonStyle1?: "solid" | "outlined" | "link";
  targetBlank1?: boolean;
  buttonLabel2?: string;
  buttonLink2?: string;
  buttonStyle2?: "solid" | "outlined" | "link";
  targetBlank2?: boolean;
}

export interface SlideshowWithMediaProps {
  slides: SlideshowSlide[];
  desktopHeight?: number;
  mobileHeight?: number;
  sectionWidth?: "full-width" | "wide";
  enableAutoplay?: boolean;
  autoplaySpeed?: number;
  colorType?: "default" | "invert" | "custom";
  backgroundColor?: string;
  textColor?: string;
  desktopPaddingTop?: number;
  desktopPaddingBottom?: number;
  mobilePaddingTop?: number;
  mobilePaddingBottom?: number;
  id?: string;
  className?: string;
}

export function SlideshowWithMedia({
  slides,
  desktopHeight = 70,
  mobileHeight = 60,
  sectionWidth = "wide",
  enableAutoplay = true,
  autoplaySpeed = 7,
  colorType = "default",
  backgroundColor,
  textColor,
  desktopPaddingTop = 0,
  desktopPaddingBottom = 0,
  mobilePaddingTop = 0,
  mobilePaddingBottom = 0,
  id,
  className,
}: SlideshowWithMediaProps) {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (!enableAutoplay || slides.length <= 1) return;
    const timer = setInterval(next, autoplaySpeed * 1000);
    return () => clearInterval(timer);
  }, [enableAutoplay, autoplaySpeed, next, slides.length]);

  if (slides.length === 0) return null;

  const colorStyles: React.CSSProperties = {};
  if (colorType === "invert") {
    colorStyles.backgroundColor = "rgb(var(--layout-text-color))";
    colorStyles.color = "rgb(var(--layout-background-color))";
  } else if (colorType === "custom") {
    if (backgroundColor) colorStyles.backgroundColor = backgroundColor;
    if (textColor) colorStyles.color = textColor;
  }

  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden",
        className
      )}
      style={{
        ...colorStyles,
        paddingTop: `${desktopPaddingTop}px`,
        paddingBottom: `${desktopPaddingBottom}px`,
        "--sw-mobile-pt": `${mobilePaddingTop}px`,
        "--sw-mobile-pb": `${mobilePaddingBottom}px`,
        "--sw-desktop-h": `${desktopHeight}vh`,
        "--sw-mobile-h": `${mobileHeight}vh`,
      } as React.CSSProperties}
    >
      <style>{`
        @media (max-width: 920px) {
          ${id ? `#${id}` : ".slideshow-with-media"} {
            padding-top: var(--sw-mobile-pt) !important;
            padding-bottom: var(--sw-mobile-pb) !important;
          }
        }
      `}</style>

      <div
        className="relative w-full"
        style={{ height: "var(--sw-desktop-h)" }}
      >
        <style>{`
          @media (max-width: 920px) {
            ${id ? `#${id}` : ".slideshow-with-media"} .slideshow-viewport {
              height: var(--sw-mobile-h) !important;
            }
          }
        `}</style>

        {slides.map((slide, i) => (
          <div
            key={i}
            className={cn(
              "slideshow-viewport absolute inset-0 transition-opacity duration-700",
              i === current ? "z-10 opacity-100" : "z-0 opacity-0"
            )}
            style={{ height: "var(--sw-desktop-h)" }}
          >
            {/* Background video */}
            {slide.videoSrc && (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src={slide.videoSrc} type="video/mp4" />
              </video>
            )}

            {/* Desktop image */}
            {!slide.videoSrc && slide.desktopImage && (
              <Image
                src={slide.desktopImage}
                alt={slide.desktopImageAlt || ""}
                fill
                className={cn(
                  "object-cover",
                  slide.mobileImage && "hidden md:block"
                )}
                sizes="100vw"
                priority={i === 0}
              />
            )}

            {/* Mobile image */}
            {!slide.videoSrc && slide.mobileImage && (
              <Image
                src={slide.mobileImage}
                alt={slide.mobileImageAlt || ""}
                fill
                className={cn(
                  "object-cover",
                  slide.desktopImage ? "md:hidden" : ""
                )}
                sizes="100vw"
                priority={i === 0}
              />
            )}

            {!slide.videoSrc && !slide.desktopImage && !slide.mobileImage && (
              <div className="absolute inset-0 bg-muted" />
            )}

            {/* Overlay */}
            {(slide.overlayOpacity ?? 70) > 0 && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: slide.overlayColor || "#000000",
                  opacity: (slide.overlayOpacity ?? 70) / 100,
                }}
              />
            )}

            {/* Content */}
            <div
              className={cn(
                "relative z-10 flex h-full flex-col gap-4 p-6 md:p-10",
                slide.verticalAlign === "start" && "justify-start",
                slide.verticalAlign === "center" && "justify-center",
                slide.verticalAlign === "end" && "justify-end",
                slide.horizontalAlign === "left" && "items-start text-left",
                slide.horizontalAlign === "center" && "items-center text-center",
                slide.horizontalAlign === "right" && "items-end text-right",
                slide.centerText && "items-center text-center",
                slide.narrowContent && "mx-auto max-w-[600px]"
              )}
            >
              {slide.contextImage && (
                <ContextImage
                  src={slide.contextImage}
                  alt={slide.contextImageAlt || ""}
                  maxWidth={slide.contextImageWidth}
                  ratio={slide.contextImageRatio}
                />
              )}

              {slide.subheading && (
                <p className="text-sm font-semibold uppercase tracking-wide opacity-70">
                  {slide.subheading}
                </p>
              )}

              {slide.heading && (
                <h2 className="text-3xl font-bold md:text-5xl">
                  {slide.heading}
                </h2>
              )}

              {slide.text && (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: slide.text }}
                />
              )}

              {(slide.buttonLabel1 || slide.buttonLabel2) && (
                <div className="flex flex-wrap items-center gap-3">
                  {slide.buttonLabel1 && (
                    <SectionButton
                      label={slide.buttonLabel1}
                      href={slide.buttonLink1}
                      style={slide.buttonStyle1}
                      targetBlank={slide.targetBlank1}
                    />
                  )}
                  {slide.buttonLabel2 && (
                    <SectionButton
                      label={slide.buttonLabel2}
                      href={slide.buttonLink2}
                      style={slide.buttonStyle2}
                      targetBlank={slide.targetBlank2}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-colors hover:bg-white/40"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="min-w-[3rem] text-center text-sm font-semibold tabular-nums">
              {current + 1} / {slides.length}
            </span>
            <button
              type="button"
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-colors hover:bg-white/40"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
