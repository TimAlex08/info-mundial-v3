import { setRequestLocale } from "next-intl/server";
import { RichText } from "@/components/sections/rich-text";
import { Banners } from "@/components/sections/banners";
import { Multicolumn } from "@/components/sections/multicolumn";

export default async function ToursPage({
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
        blocks={[
          { type: "subheading", text: "Tours Organizados:" },
          { type: "heading", text: "Conoce Nuevo León Sin Preocupaciones" },
          { type: "text", content: "<p>Si ya tienes un par de días libres y quieres salir de la mancha urbana, Nuevo León tiene joyas naturales espectaculares. Como tu guía personal, te recomiendo encarecidamente que uses tours organizados. ¿Por qué? Porque la logística para ir a las afueras puede ser complicada, y un tour te garantiza transporte seguro, guía y te ahorra tiempo de planeación.</p>" },
        ]}
      />

      <Banners
        heading="Aventura Natural a Minutos de la Ciudad"
        text="<p>Aquí están los dos tours de día completo que los regios aman:</p>"
        mediaRatio="square"
        cardButtonStyle="outlined"
        colorType="custom"
        backgroundColor="#2e4785"
        textColor="#ffffff"
        desktopPaddingTop={24}
        desktopPaddingBottom={8}
        items={[
          {
            type: "image",
            image: "/images/tours/grutas-garcia.png",
            imageAlt: "Grutas de García",
            heading: "Grutas de García",
            text: "<p>Ubicadas a unos 40 minutos de la ciudad. Son unas cuevas impresionantes con formaciones milenarias de estalactitas y estalagmitas. El viaje en el teleférico hasta la entrada es una aventura en sí misma. Es un escape perfecto para un día caluroso.</p>",
          },
          {
            type: "image",
            image: "/images/tours/cola-caballo.jpg",
            imageAlt: "Cola de Caballo",
            heading: "Cola de Caballo",
            text: "<p>Esta es una majestuosa cascada en la Sierra Madre Oriental. El camino es verde, fresco y el sitio es ideal para tomar fotos. Los tours suelen incluir transporte y el acceso al parque. <strong><br/><br/>Regio-Tip:</strong> Los tours a Cola de Caballo a menudo incluyen visitas a otros pueblos mágicos cercanos, dándote más por tu dinero.</p>",
          },
        ]}
      />

      <Banners
        subheading="Tours Temáticos"
        heading="La Esencia Regia"
        text="<p>Si la naturaleza no es lo tuyo, puedes sumergirte en la identidad industrial o gastronómica de la ciudad:</p>"
        mediaRatio="square"
        cardButtonStyle="outlined"
        colorType="custom"
        backgroundColor="#db0138"
        textColor="#ffffff"
        desktopPaddingTop={16}
        desktopPaddingBottom={8}
        items={[
          {
            type: "image",
            image: "/images/tours/tour-cervecero.jpg",
            imageAlt: "Tour Cervecero",
            heading: "Tour Cervecero",
            text: "<p>Monterrey tiene una gran tradición cervecera. Algunos tours te llevan a conocer cervecerías artesanales o te dan una visita guiada a las grandes plantas (si están operando con tours al público).</p>",
          },
          {
            type: "image",
            image: "/images/tours/tour-industrial.jpg",
            imageAlt: "Tour Industrial/Histórico",
            heading: "Tour Industrial/Histórico",
            text: "<p>Una visita a lugares clave como el <strong>Horno 3</strong> o recorridos especializados que explican cómo la industria (cerveza, acero y vidrio) forjó la identidad de la ciudad.</p>",
          },
        ]}
      />

      <RichText
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#ffffff"
        desktopPaddingTop={16}
        blocks={[
          { type: "text", content: "<p>La belleza de optar por un tour organizado es la <strong>paz mental</strong> que te da. Como regio y aventurero, te digo que la aventura es fantástica, pero la seguridad es lo primero. Con estos tours, te olvidas de:</p>" },
        ]}
      />

      <Multicolumn
        mediaRatio="square"
        buttonStyle="outlined"
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#ffffff"
        items={[
          {
            type: "text",
            heading: "Mapas Complicados",
            text: "<p>No tienes que preocuparte por las direcciones en carretera o la señalización rural.</p>",
          },
          {
            type: "text",
            heading: "Estacionamiento",
            text: "<p>Cero estrés buscando dónde dejar el auto en zonas naturales concurridas.</p>",
          },
          {
            type: "text",
            heading: "Transporte de Vuelta",
            text: "<p>Después de un día de caminata, tu asiento de vuelta está garantizado.</p>",
          },
        ]}
      />
    </>
  );
}
