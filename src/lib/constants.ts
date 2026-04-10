import type { MenuItem, SocialLink } from "./types";

export const SITE_NAME = "Monterrey FIFA 2026";

export const COUNTDOWN_TARGET = "2026-06-11T13:00:00";

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "instagram",
    url: "https://www.instagram.com/mundialenmty/",
    label: "Instagram",
  },
  {
    platform: "tiktok",
    url: "https://www.tiktok.com/@mundialenmty",
    label: "TikTok",
  },
  {
    platform: "facebook",
    url: "https://www.facebook.com/profile.php?id=61581262591303",
    label: "Facebook",
  },
  {
    platform: "youtube",
    url: "https://www.youtube.com/@MundialenMTY",
    label: "YouTube",
  },
];

export const MAIN_MENU: MenuItem[] = [
  {
    key: "visita_monterrey",
    href: "/explora-monterrey",
    children: [
      { key: "guia_mundialista", href: "/explora-monterrey" },
      { key: "zonas_de_la_ciudad", href: "/mapa-de-zonas" },
    ],
  },
  {
    key: "monterrey_se_prepara",
    href: "/comunidad",
    children: [
      { key: "barrio_bonito", href: "/barrio-bonito" },
      { key: "anfitrion_regio", href: "/anfitriones-regios" },
      { key: "transformando_mty", href: "/infraestructura" },
    ],
  },
  {
    key: "como_moverte",
    href: "/transporte-movilidad",
    children: [
      { key: "regio_ruta", href: "https://www.monterrey.gob.mx/regio-ruta" },
      { key: "transporte", href: "/transporte-movilidad" },
    ],
  },
  {
    key: "el_mundial_en_mty",
    href: "/partidos-y-sedes",
    children: [
      { key: "calendario_partidos", href: "/calendario-partidos" },
      { key: "sedes_partidos", href: "/sedes-partidos" },
      { key: "mundialito_barrios", href: "/mundialito-barrios" },
    ],
  },
  {
    key: "historias_de_la_ciudad",
    href: "/historias",
  },
];

export const FOOTER_MENU: MenuItem[] = [
  { key: "partidos_y_sedes", href: "/partidos-y-sedes" },
  { key: "explora_monterrey", href: "/explora-monterrey" },
  { key: "transporte", href: "/transporte-y-movilidad" },
  { key: "hospedaje", href: "/hospedaje-y-zonas" },
  { key: "cultura", href: "/cultura-y-experiencias" },
  { key: "comunidad", href: "/comunidad" },
  { key: "noticias", href: "/noticias" },
  { key: "prensa", href: "/prensa" },
  { key: "faq", href: "/faq" },
  { key: "contacto", href: "/contacto" },
];
