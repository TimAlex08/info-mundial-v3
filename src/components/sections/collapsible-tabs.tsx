"use client";

import { cn } from "@/lib/utils";
import { SectionWrapper } from "./section-wrapper";
import { SectionButton } from "@/components/ui/section-button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export interface TabItem {
  type: "tab";
  heading: string;
  content: string;
}

export interface TopicItem {
  type: "topic";
  heading?: string;
  text?: string;
  buttonLabel?: string;
  buttonHref?: string;
  buttonStyle?: "solid" | "outlined" | "link";
  targetBlank?: boolean;
}

export type CollapsibleBlock = TabItem | TopicItem;

export interface CollapsibleTabsProps {
  subheading?: string;
  heading?: string;
  description?: string;
  blocks: CollapsibleBlock[];
  buttonLabel?: string;
  buttonHref?: string;
  buttonStyle?: "solid" | "outlined" | "link";
  targetBlank?: boolean;
  sectionWidth?: "wide" | "narrow";
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

export function CollapsibleTabs({
  subheading,
  heading,
  description,
  blocks,
  buttonLabel,
  buttonHref,
  buttonStyle = "solid",
  targetBlank = false,
  sectionWidth = "narrow",
  colorType = "default",
  backgroundColor,
  textColor,
  desktopPaddingTop = 0,
  desktopPaddingBottom = 0,
  mobilePaddingTop = 0,
  mobilePaddingBottom = 0,
  id,
  className,
}: CollapsibleTabsProps) {
  if (blocks.length === 0) return null;

  const hasHeader = subheading || heading || description;

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
      {/* Section header */}
      {hasHeader && (
        <div className="mb-6">
          {subheading && (
            <p className="text-sm font-semibold uppercase tracking-wide opacity-70">
              {subheading}
            </p>
          )}
          {heading && (
            <h2 className="text-2xl font-bold uppercase md:text-3xl">
              {heading}
            </h2>
          )}
          {description && (
            <div
              className="prose mt-2 max-w-none opacity-70"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
      )}

      {/* Blocks */}
      <Accordion multiple>
        {blocks.map((block, i) => {
          if (block.type === "topic") {
            return (
              <div key={i} className="mt-8 mb-4 first:mt-0">
                {block.heading && (
                  <p className="text-xs font-bold uppercase tracking-wide">
                    {block.heading}
                  </p>
                )}
                {block.text && (
                  <div
                    className="prose mt-1 max-w-none text-sm opacity-70"
                    dangerouslySetInnerHTML={{ __html: block.text }}
                  />
                )}
                {block.buttonLabel && (
                  <div className="mt-3">
                    <SectionButton
                      label={block.buttonLabel}
                      href={block.buttonHref}
                      style={block.buttonStyle}
                      targetBlank={block.targetBlank}
                    />
                  </div>
                )}
              </div>
            );
          }

          return (
            <AccordionItem key={i} className={cn("border-b")}>
              <AccordionTrigger>{block.heading}</AccordionTrigger>
              <AccordionContent>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: block.content }}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* Section button */}
      {buttonLabel && (
        <div className="mt-6 flex justify-center">
          <SectionButton
            label={buttonLabel}
            href={buttonHref}
            style={buttonStyle}
            targetBlank={targetBlank}
          />
        </div>
      )}
    </SectionWrapper>
  );
}
