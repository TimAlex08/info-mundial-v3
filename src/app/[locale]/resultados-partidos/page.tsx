import { setRequestLocale } from "next-intl/server";
import { RichText } from "@/components/sections/rich-text";
import { MediaWithText } from "@/components/sections/media-with-text";

export default async function ResultadosPartidosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <RichText
        sectionWidth="narrow"
        desktopPaddingTop={4}
        desktopPaddingBottom={-8}
        blocks={[
          { type: "subheading", text: "Resultados Regios" },
          { type: "heading", text: "El Resumen Rápido y Confiable" },
          { type: "text", content: "<p>Si no pudiste asistir al partido o si simplemente quieres verificar el marcador final mientras estás disfrutando de un cabrito, esta subsección es tu parada obligada. Como experto en contenido, sabemos que la información de <strong>resultados debe ser rápida, limpia y 100% precisa</strong>.</p>" },
        ]}
      />

      <MediaWithText
        image="/images/resultados/marcador.jpg"
        imageAlt="La Cifra Final y Algo Más"
        sectionWidth="narrow"
        mediaRatio="square"
        verticalAlign="center"
        desktopPaddingBottom={20}
        blocks={[
          { type: "heading", text: "La Cifra Final y Algo Más" },
          { type: "text", content: "<p>Aquí no solo te daremos el marcador final. Nuestro objetivo es darte un panorama completo del partido:</p><ul><li><strong>El Resumen del Marcador:</strong> La cifra final del partido jugado en el Estadio Monterrey.</li><li><strong>Goles Clave:</strong> Quién anotó y en qué minuto.</li><li><strong>Estadísticas Básicas:</strong> Posesión de balón, tiros a puerta y tarjetas. Esto te da el contexto del juego sin tener que ver el partido completo.</li></ul>" },
        ]}
      />

      <RichText
        sectionWidth="narrow"
        centerText
        colorType="custom"
        backgroundColor="#2e4785"
        textColor="#ffffff"
        blocks={[
          { type: "heading", text: "Regio-Tip" },
          { type: "text", content: "<p> Los marcadores son el inicio de la conversación. Usa esta información para impresionar a tus amigos en el bar después del partido. ¡Aquí tienes todo lo que necesitas para ser el experto de la mesa!</p>" },
        ]}
      />
    </>
  );
}
