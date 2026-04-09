import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ImageRatio = "original" | "portrait" | "landscape" | "square" | "wide";

export interface ArticleCardProps {
  title: string;
  excerpt?: string;
  image?: string;
  imageAlt?: string;
  date?: string;
  author?: string;
  href: string;
  showDate?: boolean;
  showAuthor?: boolean;
  showExcerpt?: boolean;
  readMoreLabel?: string;
  imageRatio?: ImageRatio;
  className?: string;
}

const ratioClasses: Record<ImageRatio, string> = {
  original: "",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

export function ArticleCard({
  title,
  excerpt,
  image,
  imageAlt = "",
  date,
  author,
  href,
  showDate = true,
  showAuthor = false,
  showExcerpt = true,
  readMoreLabel = "Keep reading",
  imageRatio = "original",
  className,
}: ArticleCardProps) {
  return (
    <article className={cn("flex flex-col", className)}>
      {image && (
        <Link
          href={href}
          className={cn(
            "relative block w-full overflow-hidden rounded-[var(--images-and-section-radius)]",
            ratioClasses[imageRatio]
          )}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 920px) 100vw, 50vw"
          />
        </Link>
      )}

      <div className="mt-3 flex flex-col gap-2">
        <Link href={href}>
          <h3 className="text-lg font-bold hover:underline">{title}</h3>
        </Link>

        {(showDate || showAuthor) && (date || author) && (
          <p className="text-sm opacity-60">
            {showDate && date}
            {showDate && showAuthor && date && author && " · "}
            {showAuthor && author}
          </p>
        )}

        {showExcerpt && excerpt && (
          <p className="text-sm opacity-80">{excerpt}</p>
        )}

        {readMoreLabel && (
          <Link
            href={href}
            className="text-sm font-semibold underline underline-offset-4 hover:opacity-70"
          >
            {readMoreLabel}
          </Link>
        )}
      </div>
    </article>
  );
}
