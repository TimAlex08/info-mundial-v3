import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "./section-wrapper";
import { SectionButton } from "@/components/ui/section-button";

type ImageRatio = "original" | "portrait" | "landscape" | "square" | "wide";

export interface BlogArticle {
  title: string;
  excerpt?: string;
  image?: string;
  imageAlt?: string;
  date?: string;
  author?: string;
  href: string;
}

export interface FeaturedBlogProps {
  subheading?: string;
  heading?: string;
  articles: BlogArticle[];
  showDate?: boolean;
  showAuthor?: boolean;
  showExcerpt?: boolean;
  readMoreLabel?: string;
  imageRatio?: ImageRatio;
  buttonLabel?: string;
  buttonLink?: string;
  buttonStyle?: "solid" | "outlined" | "link";
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

const ratioClasses: Record<ImageRatio, string> = {
  original: "",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

export function FeaturedBlog({
  subheading,
  heading,
  articles,
  showDate = true,
  showAuthor = false,
  showExcerpt = true,
  readMoreLabel = "Keep reading",
  imageRatio = "original",
  buttonLabel,
  buttonLink,
  buttonStyle = "solid",
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
}: FeaturedBlogProps) {
  if (articles.length === 0) return null;

  const displayArticles = articles.slice(0, 2);

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
      {(subheading || heading) && (
        <div className="mb-6">
          {subheading && (
            <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">
              {subheading}
            </p>
          )}
          {heading && (
            <h2 className="text-2xl font-bold md:text-3xl">{heading}</h2>
          )}
        </div>
      )}

      <div
        className={cn(
          "grid gap-6",
          displayArticles.length === 1
            ? "grid-cols-1"
            : "grid-cols-1 md:grid-cols-2"
        )}
      >
        {displayArticles.map((article, i) => (
          <article key={i} className="flex flex-col">
            {article.image && (
              <Link
                href={article.href}
                className={cn(
                  "relative block w-full overflow-hidden rounded-[var(--images-and-section-radius)]",
                  ratioClasses[imageRatio]
                )}
              >
                <Image
                  src={article.image}
                  alt={article.imageAlt || ""}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 920px) 100vw, 50vw"
                />
              </Link>
            )}

            <div className="mt-3 flex flex-col gap-2">
              <Link href={article.href}>
                <h3 className="text-lg font-bold hover:underline">
                  {article.title}
                </h3>
              </Link>

              {(showDate || showAuthor) && (
                <p className="text-sm opacity-60">
                  {showDate && article.date}
                  {showDate && showAuthor && article.author && " · "}
                  {showAuthor && article.author}
                </p>
              )}

              {showExcerpt && article.excerpt && (
                <p className="text-sm opacity-80">{article.excerpt}</p>
              )}

              {readMoreLabel && (
                <Link
                  href={article.href}
                  className="text-sm font-semibold underline underline-offset-4 hover:opacity-70"
                >
                  {readMoreLabel}
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>

      {buttonLabel && articles.length > 2 && (
        <div className="mt-6">
          <SectionButton
            label={buttonLabel}
            href={buttonLink}
            style={buttonStyle}
          />
        </div>
      )}
    </SectionWrapper>
  );
}
