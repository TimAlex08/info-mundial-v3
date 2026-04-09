import Image from "next/image";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "./section-wrapper";

export interface IconsWithTextItem {
  image?: string;
  imageAlt?: string;
  heading?: string;
  text?: string;
  link?: string;
  targetBlank?: boolean;
}

export interface IconsWithTextProps {
  heading?: string;
  items: IconsWithTextItem[];
  maxColumns?: "2" | "3" | "4";
  mobileColumns?: 1 | 2;
  centerText?: boolean;
  iconSize?: number;
  fillContainer?: boolean;
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

export function IconsWithText({
  heading,
  items,
  maxColumns = "4",
  mobileColumns = 1,
  centerText = true,
  iconSize = 64,
  fillContainer = false,
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
}: IconsWithTextProps) {
  if (items.length === 0) return null;

  const cols = Math.min(parseInt(maxColumns), items.length);

  const gridCols: Record<number, string> = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

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
      {heading && (
        <div className={cn("mb-6", centerText && "text-center")}>
          <h2 className="text-2xl font-bold md:text-3xl">{heading}</h2>
        </div>
      )}

      <div
        className={cn(
          "grid gap-6",
          mobileColumns === 2 ? "grid-cols-2" : "grid-cols-1",
          gridCols[cols] || "md:grid-cols-4"
        )}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className={cn(
              "flex flex-col gap-3",
              centerText && "items-center text-center",
              fillContainer &&
                "rounded-[var(--images-and-section-radius)] bg-muted/30 p-6"
            )}
          >
            {item.image && (
              <div
                className="relative shrink-0 overflow-hidden rounded-[var(--images-and-section-radius)]"
                style={{ width: iconSize, height: iconSize }}
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt || ""}
                  fill
                  className="object-contain"
                  sizes={`${iconSize}px`}
                />
              </div>
            )}

            {item.heading && (
              <h3 className="text-base font-bold">{item.heading}</h3>
            )}

            {item.text && (
              <div
                className="prose max-w-none text-sm opacity-80"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
