"use client";

import { cn } from "@/lib/utils";
import { SectionWrapper } from "./section-wrapper";
import { BlockRenderer, type SectionBlock } from "./block-renderer";

export interface RichTextProps {
  blocks: SectionBlock[];
  sectionWidth?: "wide" | "narrow";
  centerText?: boolean;
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

export function RichText({
  blocks,
  sectionWidth = "wide",
  centerText = false,
  colorType = "default",
  backgroundColor,
  textColor,
  desktopPaddingTop = 0,
  desktopPaddingBottom = 0,
  mobilePaddingTop = 0,
  mobilePaddingBottom = 0,
  id,
  className,
}: RichTextProps) {
  if (blocks.length === 0) return null;

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
      <div
        className={cn(
          "flex flex-col gap-4",
          centerText && "items-center"
        )}
      >
        <BlockRenderer blocks={blocks} />
      </div>
    </SectionWrapper>
  );
}
