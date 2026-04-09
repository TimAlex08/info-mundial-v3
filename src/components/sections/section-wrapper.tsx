import { cn } from "@/lib/utils";

type SectionWidth = "wide" | "narrow" | "full-width";
type ColorType = "default" | "invert" | "custom";

export interface SectionWrapperProps {
  sectionWidth?: SectionWidth;
  colorType?: ColorType;
  backgroundColor?: string;
  textColor?: string;
  centerText?: boolean;
  desktopPaddingTop?: number;
  desktopPaddingBottom?: number;
  mobilePaddingTop?: number;
  mobilePaddingBottom?: number;
  className?: string;
  children: React.ReactNode;
  id?: string;
}

export function SectionWrapper({
  sectionWidth = "wide",
  colorType = "default",
  backgroundColor,
  textColor,
  centerText = false,
  desktopPaddingTop = 0,
  desktopPaddingBottom = 0,
  mobilePaddingTop = 0,
  mobilePaddingBottom = 0,
  className,
  children,
  id,
}: SectionWrapperProps) {
  const colorStyles: React.CSSProperties = {};

  if (colorType === "invert") {
    colorStyles.backgroundColor = "rgb(var(--layout-text-color))";
    colorStyles.color = "rgb(var(--layout-background-color))";
  } else if (colorType === "custom") {
    if (backgroundColor) colorStyles.backgroundColor = backgroundColor;
    if (textColor) colorStyles.color = textColor;
  }

  return (
    <section
      id={id}
      className={cn(
        sectionWidth === "full-width" && "w-full",
        sectionWidth === "wide" && "mx-auto w-full max-w-[var(--page-width)]",
        sectionWidth === "narrow" && "mx-auto w-full max-w-[800px]",
        centerText && "text-center",
        className
      )}
      style={{
        ...colorStyles,
        paddingTop: `${desktopPaddingTop}px`,
        paddingBottom: `${desktopPaddingBottom}px`,
        "--mobile-pt": `${mobilePaddingTop}px`,
        "--mobile-pb": `${mobilePaddingBottom}px`,
      } as React.CSSProperties}
    >
      <style>{`
        @media (max-width: 920px) {
          #${id || "section"} {
            padding-top: var(--mobile-pt) !important;
            padding-bottom: var(--mobile-pb) !important;
          }
        }
      `}</style>
      <div className={cn(
        sectionWidth !== "full-width" && "px-4 md:px-8"
      )}>
        {children}
      </div>
    </section>
  );
}
