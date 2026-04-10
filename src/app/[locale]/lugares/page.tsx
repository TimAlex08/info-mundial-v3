import { setRequestLocale } from "next-intl/server";
import { RichText } from "@/components/sections/rich-text";
import { MediaWithText } from "@/components/sections/media-with-text";
import { Banners } from "@/components/sections/banners";

export default async function LugaresPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <RichText
        desktopPaddingTop={56}
        blocks={[
          { type: "subheading", text: "Lugares Imperdibles:" },
          { type: "heading", text: "La Ruta que No Hace el Turista Común", tag: "h1" },
          { type: "text", content: "<p>Mira, venir a Monterrey solo a ver el partido es un error. Aquí el paisaje es una extensión de la ciudad, y tenemos lugares que te van a dejar con la boca abierta. Como tu amigo regio, te voy a dar la lista de esos \"must-see\" que tienes que priorizar si tienes unas horas libres.</p>" },
        ]}
      />

      <MediaWithText
        image="/images/lugares/chipinque.jpg"
        imageAlt="Chipinque y el Cerro de la Silla"
        swapMedia
        mediaRatio="square"
        desktopPaddingTop={-36}
        blocks={[
          { type: "heading", text: "La Naturaleza Nos Define: Chipinque y el Cerro de la Silla" },
          { type: "text", content: "<p>Si ves el <strong>Cerro de la Silla</strong> desde el estadio, te va a picar la curiosidad. Es nuestro símbolo. Aunque no lo subas, la vista desde el <strong>Parque Ecológico Chipinque</strong> es inigualable. </p><p><strong>Regio-Tip Esencial:</strong> Chipinque es un escape de la ciudad en 15 minutos en coche. Puedes subir en auto y disfrutar de miradores espectaculares. Es el lugar perfecto para tomar fotos épicas de la metrópolis. Si eres más aventurado, hay rutas de senderismo increíbles.</p>" },
        ]}
      />

      <Banners
        subheading="Agua y Arquitectura:"
        heading="El Circuito Urbano"
        mediaRatio="square"
        cardButtonStyle="outlined"
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#ffffff"
        desktopPaddingTop={44}
        desktopPaddingBottom={12}
        items={[
          {
            type: "image",
            image: "/images/lugares/paseo-santa-lucia.jpg",
            imageAlt: "El Paseo Santa Lucía",
            heading: "El Paseo Santa Lucía:",
            text: "<p>Esto es una belleza de ingeniería. Es un <strong>canal navegable</strong> que conecta el Centro de la ciudad (Macroplaza) con el <strong>Parque Fundidora</strong>. Tomar la lancha es una experiencia tranquila y te da una perspectiva única de la ciudad. Es un paseo relajado que te permite recargar energías.</p>",
          },
          {
            type: "image",
            image: "/images/lugares/parque-fundidora.png",
            imageAlt: "El Parque Fundidora",
            heading: "El Parque Fundidora",
            text: "<p>Más que un parque, es un museo al aire libre y un centro de eventos gigantesco. Antiguamente fue una fundidora de acero, y hoy conserva el <strong>Horno 3</strong> y las estructuras metálicas que le dan un toque post-industrial fascinante. Es ideal para caminar, rentar una bicicleta o simplemente sentarte a ver a la gente.</p>",
          },
        ]}
      />

      <RichText
        sectionWidth="narrow"
        centerText
        colorType="custom"
        backgroundColor="#82bbe8"
        textColor="#1f3359"
        blocks={[
          { type: "heading", text: "El Check regio" },
          { type: "text", content: "<p>Estos lugares son fáciles de recomendar porque son inherentemente fotogénicos y la gente los busca activamente. Además, el Parque Fundidora es accesible directamente por el Metrorrey (estación Fundidora), lo que minimiza el problema de movilidad. No pierdas tiempo, estos son los lugares que te van a contar la historia de Monterrey.</p>" },
        ]}
      />
    </>
  );
}
