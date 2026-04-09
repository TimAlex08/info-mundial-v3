import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "./section-wrapper";
import { SectionButton } from "@/components/ui/section-button";

export interface TestimonialItem {
  stars?: number;
  heading?: string;
  text?: string;
  avatarImage?: string;
  avatarImageAlt?: string;
  authorName?: string;
  authorPosition?: string;
}

export interface TestimonialsProps {
  heading?: string;
  items: TestimonialItem[];
  showRating?: boolean;
  maxColumns?: "1" | "2" | "3" | "4";
  mobileColumns?: 1 | 2;
  centerText?: boolean;
  buttonLabel?: string;
  buttonLink?: string;
  buttonStyle?: "solid" | "outlined" | "link";
  targetBlank?: boolean;
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

function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const fill = rating >= i ? 1 : rating >= i - 0.5 ? 0.5 : 0;
    stars.push(
      <span key={i} className="relative inline-block h-4 w-4">
        <Star className="absolute h-4 w-4 text-current opacity-20" />
        {fill > 0 && (
          <span
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${fill * 100}%` }}
          >
            <Star className="h-4 w-4 fill-current text-current" />
          </span>
        )}
      </span>
    );
  }
  return <div className="flex gap-0.5">{stars}</div>;
}

export function Testimonials({
  heading,
  items,
  showRating = true,
  maxColumns = "3",
  mobileColumns = 1,
  centerText = false,
  buttonLabel,
  buttonLink,
  buttonStyle = "solid",
  targetBlank = false,
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
}: TestimonialsProps) {
  if (items.length === 0) return null;

  const cols = Math.min(parseInt(maxColumns), items.length);

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
      {heading && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold md:text-3xl">{heading}</h2>
        </div>
      )}

      <div
        className={cn(
          "grid gap-6",
          mobileColumns === 2 ? "grid-cols-2" : "grid-cols-1",
          gridCols[cols] || "md:grid-cols-3"
        )}
      >
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-3">
            {showRating && item.stars != null && (
              <StarRating rating={item.stars} />
            )}

            {item.heading && (
              <p className="font-bold">{item.heading}</p>
            )}

            {item.text && (
              <div
                className="prose max-w-none text-sm opacity-80"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            )}

            {(item.avatarImage || item.authorName || item.authorPosition) && (
              <div className={cn("mt-2 flex items-center gap-3", centerText && "justify-center")}>
                {item.avatarImage && (
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={item.avatarImage}
                      alt={item.avatarImageAlt || ""}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                )}
                <div>
                  {item.authorName && (
                    <p className="text-sm font-semibold">{item.authorName}</p>
                  )}
                  {item.authorPosition && (
                    <div
                      className="text-sm opacity-60"
                      dangerouslySetInnerHTML={{ __html: item.authorPosition }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {buttonLabel && (
        <div className={cn("mt-6", centerText && "text-center")}>
          <SectionButton
            label={buttonLabel}
            href={buttonLink}
            style={buttonStyle}
            targetBlank={targetBlank}
          />
        </div>
      )}
    </SectionWrapper>
  );
}
