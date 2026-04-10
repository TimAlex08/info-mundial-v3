import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";
import { VideoBanner } from "@/components/sections/video-banner";
import { ImageWithHotspots } from "@/components/sections/image-with-hotspots";
import { Multicolumn } from "@/components/sections/multicolumn";
import { HorizontalScrollingBanners } from "@/components/sections/horizontal-scrolling-banners";
import { MediaWithTabs } from "@/components/sections/media-with-tabs";
import { SlideshowWithMedia } from "@/components/sections/slideshow-with-media";

const pageMeta: Record<string, { title: string; description: string }> = {
  es: {
    title: "Inicio",
    description: SITE_DESCRIPTION,
  },
  en: {
    title: "Home",
    description:
      "Official portal of Monterrey as a FIFA 2026 World Cup host city. Discover matches, stadium, transport, culture, food, and everything you need to know.",
  },
  fr: {
    title: "Accueil",
    description:
      "Portail officiel de Monterrey, ville h\u00f4te de la Coupe du Monde FIFA 2026\u2122. D\u00e9couvrez les matchs, le stade, les transports, la culture et la gastronomie.",
  },
  de: {
    title: "Startseite",
    description:
      "Offizielles Portal von Monterrey als Austragungsort der FIFA WM 2026\u2122. Entdecken Sie Spiele, Stadion, Transport, Kultur und Gastronomie.",
  },
  it: {
    title: "Home",
    description:
      "Portale ufficiale di Monterrey come citt\u00e0 ospitante della Coppa del Mondo FIFA 2026\u2122. Scopri partite, stadio, trasporti, cultura e gastronomia.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = pageMeta[locale] ?? pageMeta.es;

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: `${meta.title} | ${SITE_NAME}`,
      description: meta.description,
      url: `${SITE_URL}/${locale}`,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: ["es", "en", "fr", "de", "it"],
      },
      {
        "@type": "Organization",
        name: "Gobierno de Monterrey",
        url: SITE_URL,
        logo: `${SITE_URL}/logos/logo-el-mundial-mty.png`,
        sameAs: [
          "https://www.instagram.com/mundialenmty/",
          "https://www.tiktok.com/@mundialenmty",
          "https://www.facebook.com/profile.php?id=61581262591303",
          "https://www.youtube.com/@MundialenMTY",
        ],
      },
      {
        "@type": "SportsEvent",
        name: "FIFA World Cup 2026 - Monterrey",
        startDate: "2026-06-11",
        endDate: "2026-07-19",
        location: {
          "@type": "StadiumOrArena",
          name: "Estadio BBVA",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Guadalupe",
            addressRegion: "Nuevo León",
            addressCountry: "MX",
          },
        },
        organizer: {
          "@type": "Organization",
          name: "FIFA",
          url: "https://www.fifa.com",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — Video Banner */}
      <VideoBanner
        id="home-hero"
        videoSrc="/videos/Video-1(1).mp4"
        priority
        desktopHeight={80}
        mobileHeight={45}
        overlayColor="#000000"
        overlayOpacity={0}
        contentColor="#ffffff"
        verticalAlign="end"
        horizontalAlign="center"
        sectionWidth="full-width"
        desktopPaddingBottom={-36}
        blocks={[
          {
            type: "button",
            label: "CONOCE MTY",
            href: "",
            style: "solid",
          },
        ]}
      />

      {/* Mapa interactivo — Image With Hotspots */}
      <ImageWithHotspots
        id="home-mapa"
        heading="VISITA MONTERREY"
        headingTag="h1"
        desktopImage="/images/mapas/Mapa.jpg"
        desktopImageAlt="Mapa de Monterrey"
        mobileImage="/images/mapas/Mapa-C.jpg"
        mobileImageAlt="Mapa de Monterrey"
        centerText
        colorType="default"
        desktopPaddingTop={48}
        mobilePaddingTop={24}
        mobilePaddingBottom={16}
        hotspots={[
          {
            text: "<p>Barrio Antiguo</p>",
            position: "bottom_right",
            desktopX: 37,
            desktopY: 43,
            mobileX: 20,
            mobileY: 45,
          },
          {
            text: "<p>Experiencias locales</p>",
            position: "bottom_right",
            desktopX: 79,
            desktopY: 47,
            mobileX: 83,
            mobileY: 41,
          },
          {
            text: "<p>Restaurantes</p>",
            position: "bottom_right",
            desktopX: 64,
            desktopY: 66,
            mobileX: 68,
            mobileY: 67,
          },
          {
            text: "<p>Parque Fundidora</p>",
            position: "bottom_right",
            desktopX: 54,
            desktopY: 49,
            mobileX: 50,
            mobileY: 50,
          },
        ]}
      />

      {/* Cómo moverte — Multicolumn */}
      <Multicolumn
        id="home-movilidad"
        heading="CÓMO MOVERTE"
        mediaRatio="square"
        centerText={false}
        buttonStyle="outlined"
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#ffffff"
        sectionWidth="full-width"
        desktopPaddingTop={28}
        desktopPaddingBottom={76}
        mobilePaddingTop={12}
        mobilePaddingBottom={36}
        items={[
          {
            type: "image",
            image: "/images/general/Imagen-5.jpg",
            imageAlt: "Rutas principales",
            heading: "Rutas principales",
            text: "<p>Sé que puede ser intimidante, pero aquí la magia serán las <strong>Rutas Especiales para el Estadio</strong>. Busca las rutas anunciadas oficialmente que te dejarán en un perímetro caminable del recinto. Estas rutas estarán claramente señalizadas y suelen ser la opción más directa cuando el Metrorrey</p>",
            buttonLabel: "CONOCER",
          },
          {
            type: "image",
            image: "/images/general/Imagen-6.jpg",
            imageAlt: "Cómo llegar al estadio",
            heading: "Cómo llegar al estadio",
            text: "<p>Si eres aficionado al fútbol, el <strong>Estadio Monterrey</strong> te va a dejar sin aliento. Es una de las sedes más espectaculares del Mundial. Aquí te hablaré de su esencia como casa de los Rayados y, como tu guía local, te daré los mejores <em>tips</em> para que tu día de partido sea épico.</p>",
            buttonLabel: "CONOCER",
          },
          {
            type: "image",
            image: "/images/general/Imagen-7.jpg",
            imageAlt: "Regio Ruta",
            heading: "Regio Ruta",
            text: "<p>Nuestra red de autobuses ha mejorado mucho con el sistema <strong>Regio Ruta</strong>, que busca modernizar y ordenar las rutas. Busca las rutas anunciadas oficialmente que te dejarán en un perímetro caminable del recinto.</p>",
            buttonLabel: "CONOCER",
          },
        ]}
      />

      {/* Scroll horizontal — Partidos, estadio, FIFA */}
      <HorizontalScrollingBanners
        id="home-scroll"
        blocks={[
          {
            type: "media",
            desktopSize: "big",
            videoSrc: "/videos/WEB_Fut_01.mp4",
          },
          {
            type: "text",
            desktopSize: "small",
            centerText: false,
            verticalAlign: "center",
            horizontalAlign: "center",
            narrowContent: true,
            heading: "Próximo partido",
            text: "<p>El calendario es la Biblia del aficionado, y aquí, en Monterrey, seremos sede de algunos de los partidos más emocionantes del torneo.</p>",
            buttonLabel: "VER PARTIDOS",
            buttonStyle: "solid",
            colorType: "custom",
            backgroundColor: "#db0138",
            textColor: "#ffffff",
          },
          {
            type: "media_with_text",
            desktopSize: "small",
            contentPosition: "bottom",
            image: "/images/general/Imagen-8.jpg",
            imageAlt: "Estadio BBVA",
            overlayColor: "#000000",
            overlayOpacity: 0,
            centerText: true,
            narrowContent: true,
            heading: "Estadio BBVA",
            text: "<p>Es la casa del<strong>Club de Fútbol Monterrey (Rayados)</strong>, un equipo con una afición fervorosa y un legado de triunfos nacionales e internacionales.</p>",
            buttonLabel: "VER ESTADIO",
            buttonStyle: "solid",
            colorType: "custom",
            backgroundColor: "#82bbe8",
            textColor: "#ffffff",
          },
          {
            type: "media",
            desktopSize: "big",
            image: "/images/general/Imagen-10.jpg",
            imageAlt: "Mascotas del Mundial",
          },
          {
            type: "media_with_text",
            desktopSize: "small",
            contentPosition: "overlay",
            image: "/images/general/Imagen-11.jpg",
            imageAlt: "Balón FIFA World Cup 2026",
            overlayColor: "#000000",
            overlayOpacity: 70,
            centerText: true,
            narrowContent: true,
            heading: "FIFA",
            text: "<p>Monterrey es una de las 16 sedes de la Copa Mundial de la FIFA 2026™. Cultura, pasión, gastronomía, deporte, negocios, turismo, emprendimiento. Listos para recibir el mundo.</p>",
            buttonLabel: "INFORMACIÓN",
            buttonStyle: "solid",
            colorType: "custom",
            backgroundColor: "#2e4785",
            textColor: "#ffffff",
          },
        ]}
      />

      {/* Historias y comunidad — Media With Tabs */}
      <MediaWithTabs
        id="home-historias"
        subheading="HISTORIAS Y COMUNIDAD"
        sectionWidth="narrow"
        swapMedia
        mediaSize="half"
        mediaRatio="square"
        verticalAlign="start"
        horizontalAlign="left"
        narrowContent
        colorType="default"
        textColor="#1f3359"
        desktopPaddingTop={52}
        desktopPaddingBottom={12}
        tabs={[
          {
            type: "image",
            image: "/images/anfitriones_regios/Voluntarios.png",
            imageAlt: "Voluntarios",
            heading: "Voluntarios",
            text: "<p>Pair text with image or loop video to focus on your featured product, collection, or promotion. Tell a story, describe your brand or share announcements.</p>",
            buttonLabel: "SER PARTE",
            buttonStyle: "outlined",
          },
          {
            type: "image",
            image: "/images/voluntarios/Voluntarios-2.png",
            imageAlt: "Trabajadores",
            heading: "Trabajadores",
            text: "<p>Pair text with image or loop video to focus on your featured product, collection, or promotion. Tell a story, describe your brand or share announcements.</p>",
            buttonLabel: "CONOCER",
            buttonStyle: "outlined",
          },
          {
            type: "image",
            image: "/images/voluntarios/Voluntarios-3.jpg",
            imageAlt: "Historias locales",
            heading: "Historias locales",
            text: "<p>Pair text with image or loop video to focus on your featured product, collection, or promotion. Tell a story, describe your brand or share announcements.</p>",
            buttonLabel: "VER",
            buttonStyle: "outlined",
          },
        ]}
      />

      {/* Slideshow de videos — Barrio Antiguo, Callejón Morelos, Nuevos espacios */}
      <SlideshowWithMedia
        id="home-slideshow"
        desktopHeight={50}
        mobileHeight={50}
        sectionWidth="full-width"
        enableAutoplay
        autoplaySpeed={10}
        colorType="invert"
        desktopPaddingTop={16}
        desktopPaddingBottom={-52}
        slides={[
          {
            videoSrc: "/videos/VIDEO-1.mp4",
            overlayColor: "#000000",
            overlayOpacity: 40,
            centerText: false,
            verticalAlign: "center",
            horizontalAlign: "center",
            narrowContent: true,
            subheading: "Barrio Antiguo",
            heading: "Trabajo nocturno en Barrio Antiguo",
            buttonLabel1: "CONOCER",
            buttonStyle1: "solid",
          },
          {
            videoSrc: "/videos/VIDEO-2.mp4",
            overlayColor: "#000000",
            overlayOpacity: 40,
            centerText: false,
            verticalAlign: "center",
            horizontalAlign: "center",
            narrowContent: true,
            subheading: "Callejón Morelos",
            heading: "Transformación callejón Morelos",
            buttonLabel1: "CONOCER",
            buttonStyle1: "solid",
          },
          {
            videoSrc: "/videos/VIDEO-3.mp4",
            overlayColor: "#000000",
            overlayOpacity: 40,
            centerText: false,
            verticalAlign: "center",
            horizontalAlign: "center",
            narrowContent: true,
            subheading: "MONTERREY",
            heading: "Nuevos espacios públicos",
            buttonLabel1: "CONOCER",
            buttonStyle1: "solid",
          },
        ]}
      />
    </>
  );
}
