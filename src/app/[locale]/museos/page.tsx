import { setRequestLocale } from "next-intl/server";
import { RichText } from "@/components/sections/rich-text";
import { Multicolumn } from "@/components/sections/multicolumn";

export default async function MuseosPage({
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
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#ffffff"
        blocks={[
          { type: "subheading", text: "La Ruta de los Museos:" },
          { type: "heading", text: "Un Respiro Regio entre Partidos", tag: "h1" },
          { type: "text", content: "<p>Cuando vienes a Monterrey, el fútbol es la estrella, pero hay que saber tomarse un respiro. Como tu guía experto, te digo que la mejor forma de hacerlo es sumergirte en nuestro circuito cultural, que está convenientemente concentrado en la <strong>Macroplaza</strong> y sus alrededores. La ventaja estratégica aquí es que puedes hacer esta ruta completamente a pie si te alojas en el Centro, sin tener que lidiar con el tráfico.</p>" },
          { type: "line" },
          { type: "text", content: "<p><strong>El Triángulo Dorado del Arte y la Historia</strong></p><p>Olvídate de taxis; aquí están los tres grandes que te van a fascinar:</p>" },
        ]}
      />

      <Multicolumn
        mediaRatio="square"
        buttonStyle="solid"
        colorType="custom"
        backgroundColor="#2e4785"
        textColor="#ffffff"
        desktopPaddingTop={36}
        desktopPaddingBottom={36}
        items={[
          {
            type: "image",
            image: "/images/museos/marco.png",
            imageAlt: "MARCO",
            heading: "MARCO (Museo de Arte Contemporáneo)",
            text: "<p>Es el icono cultural de la ciudad. Su arquitectura y su famosa <strong>Paloma de Botero</strong> en la entrada son instagrameables. Aquí verás exposiciones de arte de vanguardia nacional e internacional. Si buscas algo diferente, elegante y que te dé tema de conversación, este es.</p>",
            buttonLabel: "UBICACIÓN",
          },
          {
            type: "image",
            image: "/images/museos/mhm.jpg",
            imageAlt: "Museo de Historia Mexicana",
            heading: "MUSEO DE HISTORIA MEXICANA (MHM) y MUNE (Museo del Noreste)",
            text: "<p>Ubicados juntos, estos dos museos son esenciales para entender <strong>México</strong> y, más importante, la identidad del <strong>Noreste</strong> y de los regios. El MHM es enorme y didáctico; el MUNE te explica por qué somos como somos (enfocados en la industria, la carne asada y el Cerro de la Silla). Si quieres entender la cultura local a fondo, dedícales una mañana entera.</p>",
            buttonLabel: "UBICACIÓN",
          },
          {
            type: "image",
            image: "/images/museos/horno3.jpg",
            imageAlt: "El Museo del Acero, Horno 3",
            heading: "El Museo del Acero, Horno 3",
            text: "<p> Este es un <em>must</em> si te interesa la arquitectura industrial. Ubicado dentro del <strong>Parque Fundidora</strong>, este museo te permite subir al antiguo alto horno de la fundidora de Monterrey. Es una experiencia inmersiva que explica el pasado industrial que forjó la ciudad. Además, el Parque Fundidora es un pulmón verde perfecto para caminar.</p>",
            buttonLabel: "UBICACIÓN",
          },
        ]}
      />

      <RichText
        sectionWidth="narrow"
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#ffffff"
        blocks={[
          { type: "heading", text: "Regio-Tip Estratégico:" },
          { type: "text", content: "<p>Planea tus visitas a mitad de semana. Los fines de semana pueden llenarse, y si hay un evento en la Macroplaza, la movilidad peatonal se complica. Los museos son tu oasis de tranquilidad y cultura. ¡No te los pierdas!</p>" },
        ]}
      />
    </>
  );
}
