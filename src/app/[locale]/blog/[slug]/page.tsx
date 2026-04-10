import { setRequestLocale } from "next-intl/server";
import { RichText } from "@/components/sections/rich-text";
import { ImageBanner } from "@/components/sections/image-banner";

const articles: Record<string, {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  content: string;
}> = {
  "monterrey-se-prepara": {
    title: "Monterrey se prepara para el Mundial 2026",
    excerpt: "La ciudad avanza con los preparativos de infraestructura, movilidad y seguridad para recibir al mundo.",
    image: "/images/blog/articulo-1.jpg",
    date: "2026-04-01",
    content: "<p>Monterrey continúa con los preparativos para ser una de las sedes más importantes del Mundial FIFA 2026. Las obras de infraestructura, mejoras en movilidad y los planes de seguridad avanzan según lo programado.</p><p>El Estadio Monterrey, sede principal de los partidos, se encuentra en óptimas condiciones y listo para recibir a miles de aficionados de todo el mundo.</p>",
  },
  "fan-fest-detalles": {
    title: "Fan Fest: Todo lo que sabemos hasta ahora",
    excerpt: "Los detalles sobre la ubicación, horarios y artistas del Fan Fest oficial de Monterrey.",
    image: "/images/blog/articulo-2.jpg",
    date: "2026-03-25",
    content: "<p>El Fan Fest oficial de Monterrey promete ser uno de los más vibrantes del Mundial 2026. Con una ubicación estratégica y acceso directo por Metrorrey, será el punto de encuentro para todos los aficionados.</p><p>Próximamente se anunciarán los artistas confirmados y los horarios de transmisión de partidos en las pantallas gigantes.</p>",
  },
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = articles[slug];

  if (!article) {
    return (
      <RichText
        sectionWidth="narrow"
        centerText
        desktopPaddingTop={64}
        desktopPaddingBottom={64}
        blocks={[
          { type: "heading", text: "Artículo no encontrado" },
          { type: "text", content: "<p>El artículo que buscas no existe.</p>" },
        ]}
      />
    );
  }

  return (
    <>
      <ImageBanner
        image={article.image}
        imageAlt={article.title}
        desktopHeight={45}
        mobileHeight={50}
        blocks={[]}
      />

      <RichText
        sectionWidth="narrow"
        desktopPaddingTop={32}
        blocks={[
          { type: "heading", text: article.title, tag: "h1" },
          { type: "subheading", text: article.date },
          { type: "text", content: article.content },
          { type: "button", label: "Volver al blog", style: "outlined" },
        ]}
      />
    </>
  );
}
