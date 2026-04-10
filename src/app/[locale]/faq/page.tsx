import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { CollapsibleTabs } from "@/components/sections/collapsible-tabs";
import type { CollapsibleBlock } from "@/components/sections/collapsible-tabs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "Preguntas Frecuentes";
  const description =
    "Respuestas a las preguntas más frecuentes sobre el Mundial FIFA 2026 en Monterrey: boletos, transporte, hospedaje, seguridad y más.";
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/${locale}/faq`,
    },
  };
}

const faqBlocks: CollapsibleBlock[] = [
  {
    type: "topic",
    heading: "Boletos y Entradas",
    text: "<p>Información sobre la compra de boletos para los partidos del Mundial FIFA 2026 en el Estadio BBVA de Monterrey.</p>",
  },
  {
    type: "tab",
    heading: "¿Dónde puedo comprar boletos para los partidos en Monterrey?",
    content:
      "<p>Los boletos oficiales para los partidos del Mundial FIFA 2026™ se venden exclusivamente a través de la plataforma oficial de FIFA en <strong>FIFA.com/tickets</strong>. No compres boletos en sitios no autorizados para evitar fraudes.</p>",
  },
  {
    type: "tab",
    heading: "¿Cuántos partidos se jugarán en el Estadio BBVA?",
    content:
      "<p>El Estadio BBVA de Monterrey será sede de varios partidos de la fase de grupos del Mundial FIFA 2026™. El calendario exacto de partidos está disponible en nuestra sección de <strong>Calendario de Partidos</strong>.</p>",
  },
  {
    type: "tab",
    heading: "¿Necesito un FIFA Fan ID para asistir a los partidos?",
    content:
      "<p>Sí, todos los asistentes a los partidos necesitarán un FIFA Fan ID además de su boleto. Este documento es gratuito y se tramita en línea a través del portal oficial de FIFA.</p>",
  },
  {
    type: "topic",
    heading: "Transporte y Movilidad",
    text: "<p>Cómo llegar al Estadio BBVA y moverse por Monterrey durante el Mundial.</p>",
  },
  {
    type: "tab",
    heading: "¿Cómo puedo llegar al Estadio BBVA desde el centro de Monterrey?",
    content:
      "<p>El Estadio BBVA cuenta con conexiones de transporte público, incluyendo rutas de autobuses especiales durante los días de partido. También habrá estaciones de transporte temporal y servicios de traslado organizados. Consulta nuestra sección de <strong>Transporte y Movilidad</strong> para rutas detalladas.</p>",
  },
  {
    type: "tab",
    heading: "¿Habrá estacionamiento disponible en el estadio?",
    content:
      "<p>El estacionamiento en el Estadio BBVA será limitado durante los partidos del Mundial. Se recomienda utilizar el transporte público o los servicios de traslado oficiales. Se habilitarán estacionamientos remotos con servicio de shuttle.</p>",
  },
  {
    type: "tab",
    heading: "¿Cuál es el aeropuerto más cercano?",
    content:
      "<p>El Aeropuerto Internacional de Monterrey (MTY) se encuentra a aproximadamente 25 km del Estadio BBVA. Desde el aeropuerto hay servicios de taxi, transporte privado y conexiones de transporte público hacia el centro de la ciudad y la zona del estadio.</p>",
  },
  {
    type: "topic",
    heading: "Hospedaje",
    text: "<p>Opciones de alojamiento durante el Mundial FIFA 2026 en Monterrey.</p>",
  },
  {
    type: "tab",
    heading: "¿Dónde puedo hospedarme durante el Mundial en Monterrey?",
    content:
      "<p>Monterrey cuenta con una amplia oferta hotelera en zonas como San Pedro Garza García, el centro de la ciudad, Valle Oriente y la zona cercana al Estadio BBVA. Recomendamos reservar con anticipación ya que la demanda será muy alta. Visita nuestra sección de <strong>Hospedaje y Zonas</strong> para más detalles.</p>",
  },
  {
    type: "tab",
    heading: "¿Es seguro caminar por la ciudad de noche?",
    content:
      "<p>Monterrey es una ciudad metropolitana con zonas turísticas bien iluminadas y vigiladas. Durante el Mundial se reforzará la seguridad en todas las zonas de interés. Como en cualquier ciudad grande, se recomienda tomar precauciones básicas y mantenerse en zonas concurridas.</p>",
  },
  {
    type: "topic",
    heading: "Información General",
    text: "<p>Datos prácticos para tu visita a Monterrey durante el Mundial FIFA 2026™.</p>",
  },
  {
    type: "tab",
    heading: "¿Qué clima tiene Monterrey en junio y julio?",
    content:
      "<p>Monterrey tiene un clima cálido en verano con temperaturas que pueden superar los 35°C. Se recomienda llevar ropa ligera, protector solar, sombrero y mantenerse hidratado, especialmente si asistes a partidos o actividades al aire libre.</p>",
  },
  {
    type: "tab",
    heading: "¿Necesito visa para visitar México durante el Mundial?",
    content:
      "<p>Los requisitos de visa dependen de tu nacionalidad. Ciudadanos de muchos países pueden ingresar a México sin visa por hasta 180 días. Consulta la embajada o consulado mexicano más cercano para verificar los requisitos específicos de tu país.</p>",
  },
  {
    type: "tab",
    heading: "¿Qué moneda se usa en México?",
    content:
      "<p>La moneda oficial es el peso mexicano (MXN). La mayoría de establecimientos aceptan tarjetas de crédito y débito internacionales. También hay casas de cambio y cajeros automáticos disponibles en toda la ciudad.</p>",
  },
];

function getFaqJsonLd() {
  const questions = faqBlocks.filter(
    (b): b is Extract<typeof b, { type: "tab" }> => b.type === "tab",
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.heading,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.content.replace(/<[^>]*>/g, ""),
      },
    })),
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd()) }}
      />
      <CollapsibleTabs
        heading="Preguntas Frecuentes"
        headingTag="h1"
        sectionWidth="narrow"
        desktopPaddingTop={-160}
        mobilePaddingTop={-80}
        blocks={faqBlocks}
      />
    </>
  );
}
