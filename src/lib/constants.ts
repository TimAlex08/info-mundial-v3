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
    key: "partidos_y_sedes",
    href: "/partidos-y-sedes",
    children: [
      { key: "calendario_partidos", href: "/calendario-partidos" },
      { key: "horarios_partidos", href: "/horarios-partidos" },
      { key: "resultados", href: "/resultados-partidos" },
      { key: "sedes", href: "/sedes-partidos" },
    ],
  },
  {
    key: "explora_monterrey",
    href: "/explora-monterrey",
    children: [
      { key: "barrio_antiguo", href: "/barrio-antiguo" },
      { key: "tours", href: "/tours" },
      { key: "lugares", href: "/lugares" },
      { key: "fifa_fan", href: "/fifa-fan" },
      { key: "eventos", href: "/eventos" },
    ],
  },
  {
    key: "transporte_y_movilidad",
    href: "/transporte-y-movilidad",
    children: [
      { key: "transporte", href: "/transporte-movilidad" },
      { key: "estadio_monterrey", href: "/estadio-monterrey" },
      { key: "mapa_de_zonas", href: "/mapa-de-zonas" },
    ],
  },
  {
    key: "hospedaje_y_zonas",
    href: "/hospedaje-y-zonas",
    children: [
      { key: "comida", href: "/comida" },
      { key: "bares", href: "/bares" },
      { key: "plataformas", href: "/plataformas" },
      { key: "zonas_recomendadas", href: "/zonas-recomendadas" },
    ],
  },
  {
    key: "cultura_y_experiencias",
    href: "/cultura-y-experiencias",
    children: [
      { key: "museos", href: "/museos" },
      { key: "eventos_cultura", href: "/eventos-cultura" },
    ],
  },
  {
    key: "comunidad",
    href: "/comunidad",
    children: [
      { key: "historias", href: "/historias" },
      { key: "anfitriones_regios", href: "/anfitriones-regios" },
      { key: "pancho_mundial", href: "/pancho-mundial" },
      { key: "mundialito_barrios", href: "/mundialito-barrios" },
    ],
  },
  {
    key: "noticias",
    href: "/noticias",
    children: [
      { key: "eventos_noticias", href: "/eventos-noticias" },
      { key: "infraestructura", href: "/infraestructura" },
    ],
  },
  { key: "prensa", href: "/prensa" },
  { key: "faq", href: "/faq" },
  { key: "contacto", href: "/contacto" },
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
