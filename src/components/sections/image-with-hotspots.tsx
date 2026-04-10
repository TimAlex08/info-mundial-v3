"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "./section-wrapper";

export interface HotspotItem {
  text?: string;
  desktopX: number;
  desktopY: number;
  mobileX?: number;
  mobileY?: number;
  position?: "top_left" | "top_center" | "top_right" | "bottom_left" | "bottom_center" | "bottom_right";
}

export interface ImageWithHotspotsProps {
  subheading?: string;
  heading?: string;
  desktopImage?: string;
  desktopImageAlt?: string;
  mobileImage?: string;
  mobileImageAlt?: string;
  hotspots: HotspotItem[];
  headingTag?: "h1" | "h2" | "h3";
  centerText?: boolean;
  colorType?: "default" | "invert" | "custom";
  backgroundColor?: string;
  textColor?: string;
  sectionWidth?: "wide" | "narrow";
  desktopPaddingTop?: number;
  desktopPaddingBottom?: number;
  mobilePaddingTop?: number;
  mobilePaddingBottom?: number;
  id?: string;
  className?: string;
}

const tooltipPosition: Record<string, string> = {
  top_left: "bottom-full left-0 mb-2",
  top_center: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  top_right: "bottom-full right-0 mb-2",
  bottom_left: "top-full left-0 mt-2",
  bottom_center: "top-full left-1/2 -translate-x-1/2 mt-2",
  bottom_right: "top-full right-0 mt-2",
};

export function ImageWithHotspots({
  subheading,
  heading,
  desktopImage,
  desktopImageAlt = "",
  mobileImage,
  mobileImageAlt = "",
  hotspots,
  headingTag: HeadingTag = "h2",
  centerText = true,
  colorType = "default",
  backgroundColor,
  textColor,
  sectionWidth = "wide",
  desktopPaddingTop = 0,
  desktopPaddingBottom = 0,
  mobilePaddingTop = 0,
  mobilePaddingBottom = 0,
  id,
  className,
}: ImageWithHotspotsProps) {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  if (!desktopImage && !mobileImage) return null;

  return (
    <SectionWrapper
      id={id}
      sectionWidth={sectionWidth}
      colorType={colorType}
      backgroundColor={backgroundColor}
      textColor={textColor}
      centerText={centerText}
      desktopPaddingTop={desktopPaddingTop}
      desktopPaddingBottom={desktopPaddingBottom}
      mobilePaddingTop={mobilePaddingTop}
      mobilePaddingBottom={mobilePaddingBottom}
      className={className}
    >
      {(subheading || heading) && (
        <div className="mb-6">
          {subheading && (
            <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">
              {subheading}
            </p>
          )}
          {heading && (
            <HeadingTag className="text-2xl font-bold md:text-3xl">{heading}</HeadingTag>
          )}
        </div>
      )}

      <div className="relative">
        {/* Desktop image */}
        {desktopImage && (
          <div className={cn("relative", mobileImage && "hidden md:block")}>
            <Image
              src={desktopImage}
              alt={desktopImageAlt}
              width={1600}
              height={900}
              className="w-full"
              sizes="100vw"
            />
            {hotspots.map((hotspot, i) => (
              <button
                key={i}
                type="button"
                className="absolute z-10"
                style={{
                  top: `${hotspot.desktopY}%`,
                  left: `${hotspot.desktopX}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => setActiveHotspot(activeHotspot === i ? null : i)}
              >
                <span className="relative flex h-6 w-6">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-40" />
                  <span className="relative inline-flex h-6 w-6 rounded-full border-2 border-white bg-current shadow" />
                </span>
                {activeHotspot === i && hotspot.text && (
                  <div
                    className={cn(
                      "absolute z-20 w-48 rounded bg-white p-3 text-left text-sm text-black shadow-lg",
                      tooltipPosition[hotspot.position || "bottom_center"]
                    )}
                    dangerouslySetInnerHTML={{ __html: hotspot.text }}
                  />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Mobile image */}
        {mobileImage && (
          <div className={cn("relative", desktopImage && "md:hidden")}>
            <Image
              src={mobileImage}
              alt={mobileImageAlt}
              width={800}
              height={1000}
              className="w-full"
              sizes="100vw"
            />
            {hotspots.map((hotspot, i) => (
              <button
                key={i}
                type="button"
                className="absolute z-10"
                style={{
                  top: `${hotspot.mobileY ?? hotspot.desktopY}%`,
                  left: `${hotspot.mobileX ?? hotspot.desktopX}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => setActiveHotspot(activeHotspot === i ? null : i)}
              >
                <span className="relative flex h-6 w-6">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-40" />
                  <span className="relative inline-flex h-6 w-6 rounded-full border-2 border-white bg-current shadow" />
                </span>
                {activeHotspot === i && hotspot.text && (
                  <div
                    className={cn(
                      "absolute z-20 w-48 rounded bg-white p-3 text-left text-sm text-black shadow-lg",
                      tooltipPosition[hotspot.position || "bottom_center"]
                    )}
                    dangerouslySetInnerHTML={{ __html: hotspot.text }}
                  />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Fallback: desktop only, no mobile */}
        {desktopImage && !mobileImage && (
          <div className="md:hidden">
            <Image
              src={desktopImage}
              alt={desktopImageAlt}
              width={800}
              height={1000}
              className="w-full"
              sizes="100vw"
            />
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
