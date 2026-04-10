import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "./section-wrapper";
import { SectionButton } from "@/components/ui/section-button";

type ImageRatio = "original" | "portrait" | "landscape" | "square" | "wide";

export interface MulticolumnItem {
  type: "image" | "video" | "text";
  image?: string;
  imageAlt?: string;
  videoSrc?: string;
  heading?: string;
  text?: string;
  buttonLabel?: string;
  buttonHref?: string;
  targetBlank?: boolean;
  fullBlockClickable?: boolean;
}

export interface MulticolumnProps {
  subheading?: string;
  heading?: string;
  items: MulticolumnItem[];
  maxColumns?: "default" | "2" | "3" | "4";
  mobileColumns?: 1 | 2;
  mediaRatio?: ImageRatio;
  centerText?: boolean;
  buttonStyle?: "solid" | "outlined" | "link";
  colorType?: "default" | "invert" | "custom";
  backgroundColor?: string;
  textColor?: string;
  sectionWidth?: "wide" | "narrow" | "full-width";
  desktopPaddingTop?: number;
  desktopPaddingBottom?: number;
  mobilePaddingTop?: number;
  mobilePaddingBottom?: number;
  id?: string;
  className?: string;
}

const ratioClasses: Record<ImageRatio, string> = {
  original: "",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

function resolveColumns(
  maxColumns: string,
  itemCount: number
): number {
  if (maxColumns === "default") {
    if (itemCount === 3) return 3;
    if (itemCount === 1) return 1;
    return 2;
  }
  const max = parseInt(maxColumns, 10);
  return Math.min(max, itemCount);
}

export function Multicolumn({
  subheading,
  heading,
  items,
  maxColumns = "default",
  mobileColumns = 2,
  mediaRatio = "square",
  centerText = false,
  buttonStyle = "outlined",
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
}: MulticolumnProps) {
  if (items.length === 0) return null;

  const columns = resolveColumns(maxColumns, items.length);

  const gridCols: Record<number, string> = {
    1: "md:grid-cols-1",
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
      centerText={centerText}
      desktopPaddingTop={desktopPaddingTop}
      desktopPaddingBottom={desktopPaddingBottom}
      mobilePaddingTop={mobilePaddingTop}
      mobilePaddingBottom={mobilePaddingBottom}
      className={className}
    >
      {/* Section header */}
      {(subheading || heading) && (
        <div className={cn("mb-6", centerText && "text-center")}>
          {subheading && (
            <p className="text-sm font-semibold uppercase tracking-wide opacity-70">
              {subheading}
            </p>
          )}
          {heading && (
            <h2 className="text-2xl font-bold md:text-3xl">{heading}</h2>
          )}
        </div>
      )}

      {/* Grid */}
      <div
        className={cn(
          "grid gap-6",
          mobileColumns === 2 ? "grid-cols-2" : "grid-cols-1",
          gridCols[columns] || "md:grid-cols-2"
        )}
      >
        {items.map((item, i) => {
          const card = (
            <div
              key={i}
              className={cn(
                "flex h-full flex-col",
                centerText ? "items-center text-center" : "items-start"
              )}
            >
              {/* Media */}
              {item.type !== "text" && (item.image || item.videoSrc) && (
                <div
                  className={cn(
                    "relative w-full overflow-hidden rounded-[var(--images-and-section-radius)]",
                    ratioClasses[mediaRatio]
                  )}
                >
                  {item.type === "video" && item.videoSrc ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                    >
                      <source src={item.videoSrc} type="video/mp4" />
                    </video>
                  ) : item.image ? (
                    <Image
                      src={item.image}
                      alt={item.imageAlt || ""}
                      fill
                      className="object-cover"
                      sizes={`(max-width: 920px) ${mobileColumns === 2 ? "50vw" : "100vw"}, ${Math.round(100 / columns)}vw`}
                    />
                  ) : null}
                </div>
              )}

              {/* Info */}
              {(item.heading || item.text || item.buttonLabel) && (
                <div className="mt-3 flex flex-1 flex-col gap-2">
                  {item.heading && (
                    <p className="font-bold">{item.heading}</p>
                  )}
                  {item.text && (
                    <div
                      className="prose max-w-none text-sm opacity-80"
                      dangerouslySetInnerHTML={{ __html: item.text }}
                    />
                  )}
                  {item.buttonLabel && (
                    <div className="mt-auto self-center pt-2">
                      <SectionButton
                        label={item.buttonLabel}
                        href={item.buttonHref}
                        style={buttonStyle}
                        targetBlank={item.targetBlank}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );

          if (item.fullBlockClickable && item.buttonHref) {
            if (item.targetBlank || item.buttonHref.startsWith("http")) {
              return (
                <a
                  key={i}
                  href={item.buttonHref}
                  target={item.targetBlank ? "_blank" : undefined}
                  rel={item.targetBlank ? "noopener noreferrer" : undefined}
                  className="block transition-opacity hover:opacity-80"
                >
                  {card}
                </a>
              );
            }
            return (
              <Link
                key={i}
                href={item.buttonHref}
                className="block transition-opacity hover:opacity-80"
              >
                {card}
              </Link>
            );
          }

          return card;
        })}
      </div>
    </SectionWrapper>
  );
}
