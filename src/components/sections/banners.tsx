import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "./section-wrapper";
import { SectionButton } from "@/components/ui/section-button";

type MediaRatio = "original" | "portrait" | "landscape" | "square" | "wide";

export interface BannerCardItem {
  type: "image" | "loop_video";
  image?: string;
  imageAlt?: string;
  videoSrc?: string;
  heading?: string;
  text?: string;
  buttonLabel?: string;
  buttonHref?: string;
  targetBlank?: boolean;
}

export interface BannersProps {
  subheading?: string;
  heading?: string;
  text?: string;
  buttonLabel?: string;
  buttonHref?: string;
  buttonStyle?: "solid" | "outlined" | "link";
  targetBlank?: boolean;
  items: BannerCardItem[];
  mediaRatio?: MediaRatio;
  centerText?: boolean;
  cardButtonStyle?: "solid" | "outlined" | "link";
  mobileColumns?: 1 | 2;
  colorType?: "default" | "invert" | "custom";
  backgroundColor?: string;
  textColor?: string;
  headingTag?: "h1" | "h2" | "h3";
  sectionWidth?: "wide" | "narrow";
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

export function Banners({
  subheading,
  heading,
  text,
  buttonLabel,
  buttonHref,
  buttonStyle = "solid",
  targetBlank = false,
  items,
  mediaRatio = "square",
  centerText = false,
  headingTag: HeadingTag = "h2",
  cardButtonStyle = "outlined",
  mobileColumns = 2,
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
}: BannersProps) {
  if (items.length === 0) return null;

  const hasHeader = subheading || heading || text || buttonLabel;

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
      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        {/* Sticky sidebar content */}
        {hasHeader && (
          <div className="w-full md:sticky md:top-[120px] md:w-1/3 md:self-start">
            <div
              className={cn(
                "flex flex-col gap-3",
                centerText && "items-center text-center"
              )}
            >
              {subheading && (
                <p className="text-sm font-semibold uppercase tracking-wide opacity-70">
                  {subheading}
                </p>
              )}
              {heading && (
                <HeadingTag className="text-2xl font-bold md:text-3xl">{heading}</HeadingTag>
              )}
              {text && (
                <div
                  className="prose max-w-none opacity-80"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              )}
              {buttonLabel && (
                <div className="mt-2">
                  <SectionButton
                    label={buttonLabel}
                    href={buttonHref}
                    style={buttonStyle}
                    targetBlank={targetBlank}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cards grid */}
        <div
          className={cn(
            "grid w-full gap-6",
            mobileColumns === 2 ? "grid-cols-2" : "grid-cols-1",
            "md:grid-cols-3",
            hasHeader && "md:w-2/3"
          )}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className={cn(
                "flex flex-col",
                centerText ? "items-center text-center" : "items-start"
              )}
            >
              {/* Media */}
              {(item.image || item.videoSrc) && (
                <div
                  className={cn(
                    "relative w-full overflow-hidden rounded-[var(--images-and-section-radius)]",
                    ratioClasses[mediaRatio]
                  )}
                >
                  {item.type === "loop_video" && item.videoSrc ? (
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
                      sizes={`(max-width: 920px) ${mobileColumns === 2 ? "50vw" : "100vw"}, 33vw`}
                    />
                  ) : null}
                </div>
              )}

              {/* Info */}
              {(item.heading || item.text || item.buttonLabel) && (
                <div className="mt-3 flex flex-col gap-2">
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
                    <SectionButton
                      label={item.buttonLabel}
                      href={item.buttonHref}
                      style={cardButtonStyle}
                      targetBlank={item.targetBlank}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
