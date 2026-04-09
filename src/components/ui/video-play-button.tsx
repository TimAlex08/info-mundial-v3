"use client";

import { useState, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VideoPlayButtonProps {
  label: string;
  videoUrl: string;
  videoType?: "youtube" | "vimeo";
  buttonStyle?: "solid" | "outlined" | "link";
  className?: string;
}

function getEmbedUrl(url: string, type: "youtube" | "vimeo"): string {
  if (type === "youtube") {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?]+)/
    );
    const id = match?.[1] ?? url;
    return `https://www.youtube.com/embed/${id}?autoplay=1`;
  }
  const match = url.match(/vimeo\.com\/(\d+)/);
  const id = match?.[1] ?? url;
  return `https://player.vimeo.com/video/${id}?autoplay=1`;
}

export function VideoPlayButton({
  label,
  videoUrl,
  videoType = "youtube",
  buttonStyle = "solid",
  className,
}: VideoPlayButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  const buttonBase =
    "inline-flex items-center gap-3 font-semibold transition-opacity hover:opacity-80";
  const variants: Record<string, string> = {
    solid:
      "rounded-[var(--button-radius)] bg-brand-blue px-6 py-3 text-sm text-white uppercase",
    outlined:
      "rounded-[var(--button-radius)] border-2 border-current px-6 py-3 text-sm uppercase",
    link: "text-sm underline underline-offset-4",
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(buttonBase, variants[buttonStyle], className)}
      >
        {/* Play icon */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 64 64"
          fill="none"
          className="shrink-0"
        >
          <circle cx="32" cy="32" r="32" fill="currentColor" opacity="0.2" />
          <path d="M26 20l18 12-18 12V20z" fill="currentColor" />
        </svg>
        <span>{label}</span>
      </button>

      {/* Video Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={close}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full text-white transition-opacity hover:opacity-70"
              aria-label="Cerrar"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                src={getEmbedUrl(videoUrl, videoType)}
                title={label}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
