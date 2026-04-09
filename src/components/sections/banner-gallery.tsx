import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "./section-wrapper";

type ImageRatio = "original" | "portrait" | "landscape" | "square" | "wide";

export interface BannerGalleryItem {
  image?: string;
  imageAlt?: string;
  heading?: string;
  link?: string;
  targetBlank?: boolean;
}

export interface BannerGalleryProps {
  heading?: string;
  items: BannerGalleryItem[];
  desktopColumns?: "3" | "4" | "5";
  mobileColumns?: 1 | 2;
  imageRatio?: ImageRatio;
  overlayColor?: string;
  overlayOpacity?: number;
  contentOnHover?: boolean;
  verticalAlign?: "start" | "center" | "end";
  centerText?: boolean;
  colorType?: "default" | "invert" | "invert-content" | "custom";
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

const ratioClasses: Record<ImageRatio, string> = {
  original: "",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

export function BannerGallery({
  heading,
  items,
  desktopColumns = "5",
  mobileColumns = 2,
  imageRatio = "square",
  overlayColor = "#000000",
  overlayOpacity = 70,
  contentOnHover = true,
  verticalAlign = "end",
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
}: BannerGalleryProps) {
  if (items.length === 0) return null;

  const gridCols: Record<string, string> = {
    "3": "md:grid-cols-3",
    "4": "md:grid-cols-4",
    "5": "md:grid-cols-5",
  };

  return (
    <SectionWrapper
      id={id}
      sectionWidth={sectionWidth}
      colorType={colorType === "invert-content" ? "default" : colorType as "default" | "invert" | "custom"}
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
          "grid gap-4",
          mobileColumns === 2 ? "grid-cols-2" : "grid-cols-1",
          gridCols[desktopColumns] || "md:grid-cols-5"
        )}
      >
        {items.map((item, i) => {
          const card = (
            <div
              className={cn(
                "group relative overflow-hidden rounded-[var(--images-and-section-radius)]",
                ratioClasses[imageRatio]
              )}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.imageAlt || ""}
                  fill
                  className="object-cover"
                  sizes={`(max-width: 920px) ${mobileColumns === 2 ? "50vw" : "100vw"}, ${Math.round(100 / parseInt(desktopColumns))}vw`}
                />
              ) : (
                <div className="absolute inset-0 bg-muted" />
              )}

              {/* Overlay */}
              {overlayOpacity > 0 && (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: overlayColor,
                    opacity: overlayOpacity / 100,
                  }}
                />
              )}

              {/* Heading */}
              {item.heading && (
                <div
                  className={cn(
                    "absolute inset-0 z-10 flex p-3",
                    verticalAlign === "start" && "items-start",
                    verticalAlign === "center" && "items-center",
                    verticalAlign === "end" && "items-end",
                    centerText && "justify-center text-center",
                    contentOnHover &&
                      "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                    colorType === "invert-content"
                      ? "text-[rgb(var(--layout-background-color))]"
                      : ""
                  )}
                >
                  <p className="text-sm font-bold">{item.heading}</p>
                </div>
              )}
            </div>
          );

          if (item.link) {
            const isExternal =
              item.targetBlank || item.link.startsWith("http");
            if (isExternal) {
              return (
                <a
                  key={i}
                  href={item.link}
                  target={item.targetBlank ? "_blank" : undefined}
                  rel={item.targetBlank ? "noopener noreferrer" : undefined}
                  className="block"
                >
                  {card}
                </a>
              );
            }
            return (
              <Link key={i} href={item.link} className="block">
                {card}
              </Link>
            );
          }

          return <div key={i}>{card}</div>;
        })}
      </div>
    </SectionWrapper>
  );
}
