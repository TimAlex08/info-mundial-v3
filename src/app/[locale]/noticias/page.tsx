import { setRequestLocale } from "next-intl/server";
import { FeaturedBlog } from "@/components/sections/featured-blog";

export default async function NoticiasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <FeaturedBlog
        heading="Blog posts"
        buttonLabel="View all"
        imageRatio="square"
        readMoreLabel="Keep reading"
        showDate
        showExcerpt
        articles={[
          {
            title: "Noticia de ejemplo 1",
            excerpt: "Descripción breve de la noticia sobre el Mundial 2026 en Monterrey.",
            image: "/images/noticias/noticia-1.jpg",
            imageAlt: "Noticia 1",
            date: "2026-04-01",
            href: "/noticias/noticia-1",
          },
          {
            title: "Noticia de ejemplo 2",
            excerpt: "Descripción breve de la noticia sobre el Mundial 2026 en Monterrey.",
            image: "/images/noticias/noticia-2.jpg",
            imageAlt: "Noticia 2",
            date: "2026-03-28",
            href: "/noticias/noticia-2",
          },
        ]}
      />
    </>
  );
}
