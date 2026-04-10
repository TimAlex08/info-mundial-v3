import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

const pages = [
  "",
  "anfitriones-regios",
  "bares",
  "barrio-antiguo",
  "barrio-bonito",
  "blog",
  "calendario-partidos",
  "comida",
  "comunidad",
  "contacto",
  "cultura-y-experiencias",
  "estadio-monterrey",
  "eventos",
  "eventos-cultura",
  "eventos-noticias",
  "explora-monterrey",
  "faq",
  "fifa-fan",
  "historias",
  "horarios-partidos",
  "hospedaje-y-zonas",
  "infraestructura",
  "lugares",
  "mapa-de-zonas",
  "mundialito-barrios",
  "museos",
  "noticias",
  "pancho-mundial",
  "partidos-y-sedes",
  "plataformas",
  "prensa",
  "resultados-partidos",
  "sedes-partidos",
  "tours",
  "transporte-movilidad",
  "transporte-y-movilidad",
  "zonas-recomendadas",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = `${SITE_URL}/${locale}${page ? `/${page}` : ""}`;
    }

    entries.push({
      url: `${SITE_URL}/${routing.defaultLocale}${page ? `/${page}` : ""}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? "weekly" : "monthly",
      priority: page === "" ? 1 : 0.8,
      alternates: { languages },
    });
  }

  return entries;
}
