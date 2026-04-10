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
      className={cn("w-full", centerText && "text-center", className)}
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
      <div className="mx-auto w-full px-6 md:max-w-[66%] md:px-0">
        {children}
      </div>
    </section>
  );
}
