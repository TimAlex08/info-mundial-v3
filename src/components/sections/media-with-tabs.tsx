"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "./section-wrapper";
import { SectionButton } from "@/components/ui/section-button";

type MediaRatio = "original" | "portrait" | "landscape" | "square" | "wide";

interface TabBase {
  heading: string;
  text?: string;
  buttonLabel?: string;
  buttonLink?: string;
  buttonStyle?: "solid" | "outlined" | "link";
  targetBlank?: boolean;
}

interface ImageTab extends TabBase {
  type: "image";
  image?: string;
  imageAlt?: string;
}

interface VideoTab extends TabBase {
  type: "video";
  videoUrl: string;
  coverImage?: string;
  coverImageAlt?: string;
}

interface LoopVideoTab extends TabBase {
  type: "loop_video";
  videoSrc: string;
}

export type MediaTab = ImageTab | VideoTab | LoopVideoTab;

export interface MediaWithTabsProps {
  subheading?: string;
  tabs: MediaTab[];
  swapMedia?: boolean;
  mediaSize?: "large" | "half" | "small";
  mediaRatio?: MediaRatio;
  verticalAlign?: "start" | "center" | "end";
  horizontalAlign?: "left" | "center" | "right";
  narrowContent?: boolean;
  sectionWidth?: "full-width" | "wide" | "narrow";
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

const ratioClasses: Record<MediaRatio, string> = {
  original: "",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

const mediaSizeClasses: Record<string, string> = {
  large: "md:w-2/3",
  half: "md:w-1/2",
  small: "md:w-1/3",
};

function parseVideoUrl(url: string): { type: "youtube" | "vimeo"; id: string } | null {
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) return { type: "youtube", id: ytMatch[1] };
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return { type: "vimeo", id: vimeoMatch[1] };
  return null;
}

function VideoEmbed({
  tab,
  ratio,
}: {
  tab: VideoTab;
  ratio: MediaRatio;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const video = parseVideoUrl(tab.videoUrl);

  const handlePlay = useCallback(() => setIsPlaying(true), []);

  if (!video) return null;

  const embedUrl =
    video.type === "youtube"
      ? `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`
      : `https://player.vimeo.com/video/${video.id}?autoplay=1`;

  return (
    <div className={cn("relative w-full overflow-hidden rounded-[var(--images-and-section-radius)]", ratioClasses[ratio])}>
      {isPlaying ? (
        <iframe
          src={embedUrl}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
          title="Video"
        />
      ) : (
        <button
          type="button"
          onClick={handlePlay}
          className="group relative block h-full w-full"
          aria-label="Play video"
        >
          {tab.coverImage ? (
            <Image
              src={tab.coverImage}
              alt={tab.coverImageAlt || ""}
              fill
              className="object-cover"
              sizes="50vw"
            />
          ) : (
            <div className="absolute inset-0 bg-muted" />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition-transform group-hover:scale-110">
              <Play className="h-6 w-6 fill-current" />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}

export function MediaWithTabs({
  subheading,
  tabs,
  swapMedia = true,
  mediaSize = "half",
  mediaRatio = "square",
  verticalAlign = "start",
  horizontalAlign = "left",
  narrowContent = true,
  sectionWidth = "wide",
  colorType = "default",
  backgroundColor,
  textColor,
  desktopPaddingTop = 0,
  desktopPaddingBottom = 0,
  mobilePaddingTop = 0,
  mobilePaddingBottom = 0,
  id,
  className,
}: MediaWithTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (tabs.length === 0) return null;

  const currentTab = tabs[activeTab];

  return (
    <SectionWrapper
      id={id}
      sectionWidth={sectionWidth}
      colorType={colorType}
      backgroundColor={backgroundColor}
      textColor={textColor}
      desktopPaddingTop={desktopPaddingTop}
      desktopPaddingBottom={desktopPaddingBottom}
      mobilePaddingTop={mobilePaddingTop}
      mobilePaddingBottom={mobilePaddingBottom}
      className={className}
    >
      <div
        className={cn(
          "flex flex-col gap-6 md:flex-row md:gap-8",
          swapMedia ? "md:flex-row" : "md:flex-row-reverse"
        )}
      >
        {/* Media */}
        <div className={cn("w-full shrink-0", mediaSizeClasses[mediaSize])}>
          {tabs.map((tab, i) => (
            <div key={i} className={cn(i === activeTab ? "block" : "hidden")}>
              {tab.type === "image" && tab.image && (
                <div
                  className={cn(
                    "relative w-full overflow-hidden rounded-[var(--images-and-section-radius)]",
                    ratioClasses[mediaRatio]
                  )}
                >
                  <Image
                    src={tab.image}
                    alt={tab.imageAlt || ""}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
              )}

              {tab.type === "video" && (
                <VideoEmbed tab={tab} ratio={mediaRatio} />
              )}

              {tab.type === "loop_video" && tab.videoSrc && (
                <div
                  className={cn(
                    "relative w-full overflow-hidden rounded-[var(--images-and-section-radius)]",
                    ratioClasses[mediaRatio]
                  )}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  >
                    <source src={tab.videoSrc} type="video/mp4" />
                  </video>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div
          className={cn(
            "flex w-full flex-col gap-4",
            verticalAlign === "start" && "justify-start",
            verticalAlign === "center" && "justify-center",
            verticalAlign === "end" && "justify-end",
            horizontalAlign === "left" && "items-start text-left",
            horizontalAlign === "center" && "items-center text-center",
            horizontalAlign === "right" && "items-end text-right",
            narrowContent && "mx-auto max-w-[500px]"
          )}
        >
          {subheading && (
            <p className="text-sm font-semibold uppercase tracking-wide opacity-70">
              {subheading}
            </p>
          )}

          {/* Tab headings */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveTab(i)}
                className={cn(
                  "text-xl font-bold transition-opacity md:text-2xl",
                  i === activeTab ? "opacity-100" : "opacity-40 hover:opacity-70"
                )}
              >
                {tab.heading}
              </button>
            ))}
          </div>

          {/* Active tab content */}
          {currentTab.text && (
            <div
              className="prose max-w-none text-sm"
              dangerouslySetInnerHTML={{ __html: currentTab.text }}
            />
          )}

          {currentTab.buttonLabel && (
            <SectionButton
              label={currentTab.buttonLabel}
              href={currentTab.buttonLink}
              style={currentTab.buttonStyle}
              targetBlank={currentTab.targetBlank}
            />
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
