import { setRequestLocale } from "next-intl/server";
import { FeaturedBlog } from "@/components/sections/featured-blog";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <FeaturedBlog
        heading="Noticias y Actualizaciones"
        headingTag="h1"
        imageRatio="original"
        readMoreLabel="Leer más"
        showDate
        showExcerpt
        articles={[
          {
            title: "Monterrey se prepara para el Mundial 2026",
            excerpt: "La ciudad avanza con los preparativos de infraestructura, movilidad y seguridad para recibir al mundo.",
            image: "/images/blog/articulo-1.jpg",
            imageAlt: "Preparativos Mundial 2026",
            date: "2026-04-01",
            href: "/blog/monterrey-se-prepara",
          },
          {
            title: "Fan Fest: Todo lo que sabemos hasta ahora",
            excerpt: "Los detalles sobre la ubicación, horarios y artistas del Fan Fest oficial de Monterrey.",
            image: "/images/blog/articulo-2.jpg",
            imageAlt: "Fan Fest Monterrey",
            date: "2026-03-25",
            href: "/blog/fan-fest-detalles",
          },
        ]}
      />
    </>
  );
}
