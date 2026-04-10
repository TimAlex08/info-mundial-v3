import { setRequestLocale } from "next-intl/server";
import { RichText } from "@/components/sections/rich-text";
import { Multicolumn } from "@/components/sections/multicolumn";

export default async function EventosNoticiasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <RichText
        desktopPaddingTop={64}
        blocks={[
          { type: "heading", text: "LA INFORMACIÓN CALIENTE QUE NO ENCONTRARÁS EN LAS GUÍAS", tag: "h1" },
          { type: "text", content: "<p>En el Mundial, el calendario de eventos es fluido. Los horarios cambian, se anuncian conciertos sorpresa, y las autoridades ajustan la logística. Como experto regio y futbolero, te digo que esta subsección no es solo una lista, ¡es un servicio de inteligencia! Queremos que seas el primero en saber si la banda que te gusta tocará en el <strong>Fan Fest</strong> o si el horario de un mercado artesanal se extendió.</p>" },
          { type: "subheading", text: "El Enfoque de la Noticia Logística" },
          { type: "text", content: "<p>Nuestras \"Noticias de Eventos\" se centrarán en dos áreas clave:</p>" },
        ]}
      />

      <Multicolumn
        mediaRatio="landscape"
        buttonStyle="outlined"
        desktopPaddingBottom={36}
        items={[
          {
            type: "image",
            image: "/images/eventos-noticias/fan-fest.jpg",
            imageAlt: "Actualizaciones del Fan Fest",
            heading: "Actualizaciones del Fan Fest y Seguridad:",
            text: "<p>Esto incluye cualquier cambio en el perímetro de seguridad, el anuncio oficial de horarios de transmisión y, lo más importante, la lista de artistas y bandas que se presentarán. </p><p><strong>Regio-Tip:</strong> Los anuncios de artistas locales y nacionales suelen ser de última hora. Mantente atento.</p>",
          },
          {
            type: "image",
            image: "/images/eventos-noticias/agenda-cultural.jpg",
            imageAlt: "Ajustes de la Agenda Cultural",
            heading: "Ajustes de la Agenda Cultural:",
            text: "<p>Si el tráfico de un partido fuerza el cambio de horario de una feria o si un museo decide abrir más tarde para los aficionados, lo publicaremos aquí. Estos pequeños detalles marcan la diferencia entre un día de paseo tranquilo y un día frustrante.</p>",
          },
        ]}
      />

      <RichText
        sectionWidth="narrow"
        centerText
        colorType="custom"
        backgroundColor="#2e4785"
        textColor="#ffffff"
        blocks={[
          { type: "heading", text: "Un Compromiso Regio" },
          { type: "text", content: "<p> Te prometemos información verificada directamente de fuentes oficiales (FIFA, gobierno estatal y municipal). Olvídate de los rumores; aquí solo hay información que te sirve para disfrutar el Mundial sin contratiempos. </p><p><strong>¡Somos tus ojos y oídos en la ciudad!</strong></p>" },
        ]}
      />
    </>
  );
}
