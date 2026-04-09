import { SectionWrapper } from "./section-wrapper";

export interface CustomHtmlProps {
  html: string;
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

export function CustomHtml({
  html,
  sectionWidth = "wide",
  colorType = "default",
  backgroundColor,
  textColor,
  desktopPaddingTop = 0,
  desktopPaddingBottom = 0,
  mobilePaddingTop = 0,
  mobilePaddingBottom = 0,
  id,
  className,
}: CustomHtmlProps) {
  if (!html) return null;

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
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </SectionWrapper>
  );
}
