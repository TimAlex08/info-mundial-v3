"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "./section-wrapper";

export interface SectionVideoProps {
  videoUrl: string;
  coverImage?: string;
  coverImageAlt?: string;
  mobileCoverImage?: string;
  mobileCoverImageAlt?: string;
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

function parseVideoUrl(url: string): { type: "youtube" | "vimeo"; id: string } | null {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) return { type: "youtube", id: ytMatch[1] };

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return { type: "vimeo", id: vimeoMatch[1] };

  return null;
}

export function SectionVideo({
  videoUrl,
  coverImage,
  coverImageAlt = "",
  mobileCoverImage,
  mobileCoverImageAlt = "",
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
}: SectionVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const video = parseVideoUrl(videoUrl);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  if (!video) return null;

  const embedUrl =
    video.type === "youtube"
      ? `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`
      : `https://player.vimeo.com/video/${video.id}?autoplay=1`;

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
      <div className="relative aspect-video w-full overflow-hidden rounded-[var(--images-and-section-radius)]">
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
            {/* Desktop cover */}
            {coverImage && (
              <Image
                src={coverImage}
                alt={coverImageAlt}
                fill
                className={cn(
                  "object-cover",
                  mobileCoverImage && "hidden md:block"
                )}
                sizes="100vw"
                priority
              />
            )}

            {/* Mobile cover */}
            {mobileCoverImage && (
              <Image
                src={mobileCoverImage}
                alt={mobileCoverImageAlt}
                fill
                className={cn(
                  "object-cover",
                  coverImage ? "md:hidden" : ""
                )}
                sizes="100vw"
              />
            )}

            {/* Fallback */}
            {!coverImage && !mobileCoverImage && (
              <div className="absolute inset-0 bg-muted" />
            )}

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition-transform group-hover:scale-110 md:h-20 md:w-20">
                <Play className="h-6 w-6 fill-current md:h-8 md:w-8" />
              </div>
            </div>
          </button>
        )}
      </div>
    </SectionWrapper>
  );
}
