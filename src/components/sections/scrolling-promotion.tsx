import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ScrollingPromotionItem {
  text: string;
  mobileText?: string;
  image?: string;
  imageAlt?: string;
  link?: string;
  targetBlank?: boolean;
}

export interface ScrollingPromotionProps {
  items: ScrollingPromotionItem[];
  textSize?: "small" | "medium" | "large" | "xlarge";
  speed?: number;
  direction?: "left" | "right";
  gap?: number;
  lineShow?: "disable" | "top" | "bottom" | "both";
  linePadding?: number;
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

const textSizeClasses: Record<string, string> = {
  small: "text-lg md:text-2xl",
  medium: "text-2xl md:text-4xl",
  large: "text-3xl md:text-5xl",
  xlarge: "text-4xl md:text-7xl",
};

export function ScrollingPromotion({
  items,
  textSize = "large",
  speed = 30,
  direction = "left",
  gap = 40,
  lineShow = "disable",
  linePadding = 12,
  colorType = "default",
  backgroundColor,
  textColor,
  desktopPaddingTop = 0,
  desktopPaddingBottom = 0,
  mobilePaddingTop = 0,
  mobilePaddingBottom = 0,
  id,
  className,
}: ScrollingPromotionProps) {
  if (items.length === 0) return null;

  const colorStyles: React.CSSProperties = {};
  if (colorType === "invert") {
    colorStyles.backgroundColor = "rgb(var(--layout-text-color))";
    colorStyles.color = "rgb(var(--layout-background-color))";
  } else if (colorType === "custom") {
    if (backgroundColor) colorStyles.backgroundColor = backgroundColor;
    if (textColor) colorStyles.color = textColor;
  }

  const animationDirection = direction === "right" ? "reverse" : "normal";
  const duration = Math.max(5, items.length * (100 / speed) * 10);

  const showTopLine = lineShow === "top" || lineShow === "both";
  const showBottomLine = lineShow === "bottom" || lineShow === "both";

  const renderItems = (key: string) =>
    items.map((item, i) => {
      const content = (
        <span
          className={cn(
            "inline-flex shrink-0 items-center whitespace-nowrap font-bold",
            textSizeClasses[textSize]
          )}
          style={{ gap: `${gap / 2}px` }}
        >
          {item.image && (
            <span className="relative inline-block h-[1em] w-[1em] overflow-hidden rounded-full">
              <Image
                src={item.image}
                alt={item.imageAlt || ""}
                fill
                className="object-cover"
                sizes="80px"
              />
            </span>
          )}
          <span className="hidden md:inline">{item.text}</span>
          <span className="md:hidden">{item.mobileText || item.text}</span>
        </span>
      );

      if (item.link) {
        const isExternal = item.targetBlank || item.link.startsWith("http");
        if (isExternal) {
          return (
            <a
              key={`${key}-${i}`}
              href={item.link}
              target={item.targetBlank ? "_blank" : undefined}
              rel={item.targetBlank ? "noopener noreferrer" : undefined}
            >
              {content}
            </a>
          );
        }
        return (
          <Link key={`${key}-${i}`} href={item.link}>
            {content}
          </Link>
        );
      }

      return <span key={`${key}-${i}`}>{content}</span>;
    });

  return (
    <section
      id={id}
      className={cn("overflow-hidden", className)}
      style={{
        ...colorStyles,
        paddingTop: `${desktopPaddingTop}px`,
        paddingBottom: `${desktopPaddingBottom}px`,
        "--sp-mobile-pt": `${mobilePaddingTop}px`,
        "--sp-mobile-pb": `${mobilePaddingBottom}px`,
      } as React.CSSProperties}
    >
      <style>{`
        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 920px) {
          ${id ? `#${id}` : ".scrolling-promotion"} {
            padding-top: var(--sp-mobile-pt) !important;
            padding-bottom: var(--sp-mobile-pb) !important;
          }
        }
      `}</style>

      {showTopLine && (
        <div
          className="border-b border-current opacity-20"
          style={{ marginBottom: `${linePadding}px` }}
        />
      )}

      <div className="flex w-full">
        <div
          className="flex shrink-0 items-center"
          style={{
            gap: `${gap}px`,
            animation: `scroll-marquee ${duration}s linear infinite`,
            animationDirection,
          }}
        >
          {renderItems("a")}
          {renderItems("b")}
        </div>
      </div>

      {showBottomLine && (
        <div
          className="border-t border-current opacity-20"
          style={{ marginTop: `${linePadding}px` }}
        />
      )}
    </section>
  );
}
