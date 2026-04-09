"use client";

import { SectionButton } from "@/components/ui/section-button";
import { ContextImage } from "@/components/ui/context-image";
import { Spacer } from "@/components/ui/spacer";
import { Divider } from "@/components/ui/divider";
import { VideoPlayButton } from "@/components/ui/video-play-button";
import { CountdownTimer } from "@/components/ui/countdown-timer";

export type SectionBlock =
  | { type: "subheading"; text: string }
  | { type: "heading"; text: string; tag?: string }
  | { type: "text"; content: string; dim?: boolean }
  | {
      type: "button";
      label: string;
      href?: string;
      style?: "solid" | "outlined" | "link";
      targetBlank?: boolean;
    }
  | {
      type: "context_image";
      src: string;
      alt?: string;
      width?: number;
      ratio?: "original" | "portrait" | "landscape" | "square" | "wide";
      borderRadius?: string;
      href?: string;
      targetBlank?: boolean;
    }
  | { type: "empty_space"; desktopHeight?: number; mobileHeight?: number }
  | {
      type: "line";
      opacity?: number;
      paddingTop?: number;
      paddingBottom?: number;
    }
  | {
      type: "video_button";
      label: string;
      videoUrl: string;
      videoType?: "youtube" | "vimeo";
      buttonStyle?: "solid" | "outlined" | "link";
    }
  | { type: "countdown_timer"; targetDate: string; textColor?: string };

interface BlockRendererProps {
  blocks: SectionBlock[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "subheading":
            return (
              <p
                key={i}
                className="text-sm font-semibold uppercase tracking-wide opacity-70"
              >
                {block.text}
              </p>
            );

          case "heading": {
            const Tag = (block.tag || "h2") as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
            return (
              <Tag key={i} className="text-2xl font-bold md:text-3xl">
                {block.text}
              </Tag>
            );
          }

          case "text":
            return (
              <div
                key={i}
                className={`prose max-w-none prose-a:underline prose-a:underline-offset-2 ${block.dim ? "opacity-70" : ""}`}
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
            );

          case "button":
            return (
              <SectionButton
                key={i}
                label={block.label}
                href={block.href}
                style={block.style}
                targetBlank={block.targetBlank}
              />
            );

          case "context_image":
            return (
              <ContextImage
                key={i}
                src={block.src}
                alt={block.alt || ""}
                maxWidth={block.width}
                ratio={block.ratio}
                borderRadius={block.borderRadius}
                href={block.href}
                targetBlank={block.targetBlank}
              />
            );

          case "empty_space":
            return (
              <Spacer
                key={i}
                desktopHeight={block.desktopHeight}
                mobileHeight={block.mobileHeight}
              />
            );

          case "line":
            return (
              <Divider
                key={i}
                opacity={block.opacity}
                paddingTop={block.paddingTop}
                paddingBottom={block.paddingBottom}
              />
            );

          case "video_button":
            return (
              <VideoPlayButton
                key={i}
                label={block.label}
                videoUrl={block.videoUrl}
                videoType={block.videoType}
                buttonStyle={block.buttonStyle}
              />
            );

          case "countdown_timer":
            return (
              <CountdownTimer
                key={i}
                targetDate={block.targetDate}
                textColor={block.textColor}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}
