import { setRequestLocale } from "next-intl/server";
import { RichText } from "@/components/sections/rich-text";
import { Multicolumn } from "@/components/sections/multicolumn";

export default async function EventosCulturaPage({
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
          { type: "subheading", text: "La Fiesta Regia:" },
          { type: "heading", text: "El Calendario que No Puedes Ignorar" },
          { type: "text", content: "<p>Monterrey es una ciudad que sabe hacer fiestas. Además del ambiente futbolero, puedes esperar una agenda cultural y de entretenimiento diseñada específicamente para el Mundial 2026. Como experto local, te aseguro que estos eventos son clave para vivir la ciudad al máximo y serán puntos de reunión fantásticos.</p>" },
        ]}
      />

      <Multicolumn
        mediaRatio="square"
        buttonStyle="solid"
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#ffffff"
        desktopPaddingTop={36}
        desktopPaddingBottom={36}
        items={[
          {
            type: "image",
            image: "/images/eventos-cultura/fan-fest.jpg",
            imageAlt: "Fan Fests Oficiales",
            heading: "El Centro de Mando Social: Los Fan Fests Oficiales",
            text: "<p>Este es el punto <strong>más importante</strong>. La <strong>FIFA</strong> establecerá un o varios <strong>Fan Fests Oficiales</strong> en ubicaciones estratégicas. Tradicionalmente, el <strong>Parque Fundidora</strong> o la <strong>Macroplaza</strong> son candidatos serios por su capacidad y accesibilidad. </p>",
          },
          {
            type: "image",
            image: "/images/eventos-cultura/musica.png",
            imageAlt: "Música en Vivo",
            heading: "Música en Vivo: Del Rock al Norteño",
            text: "<p>Monterrey es la capital de la música en el norte de México. Si bien los eventos grandes (como el festival Pa'l Norte) no coinciden con el Mundial, puedes esperar una serie de <strong>conciertos y festivales culturales</strong> gratuitos o de bajo costo organizados por el gobierno de Nuevo León para animar la ciudad. Estarán enfocados en géneros populares como el <strong>rock, pop y la música norteña</strong> (nuestro sonido local).</p>",
          },
          {
            type: "image",
            image: "/images/eventos-cultura/barrio-antiguo.jpg",
            imageAlt: "Celebraciones en el Barrio Antiguo",
            heading: "3. Celebraciones en el Barrio Antiguo",
            text: "<p>El <strong>Barrio Antiguo</strong> se convierte en un evento constante por sí mismo. Aunque no sean \"oficiales\", la concentración de bares y restaurantes en sus calles lo convierte en el epicentro de la celebración nocturna. Espera que muchos bares instalen pantallas grandes y ofrezcan promociones temáticas del Mundial.</p>",
          },
        ]}
      />

      <RichText
        sectionWidth="narrow"
        colorType="custom"
        backgroundColor="#2e4785"
        textColor="#ffffff"
        blocks={[
          { type: "heading", text: "Regio-Tip Estratégico:" },
          { type: "text", content: "<p>Algunos de estos lugares son gratuitos y tienen pantallas gigantes, música en vivo, comida y patrocinadores. Es el mejor lugar para convivir con aficionados de todo el mundo, incluso si tu equipo no está jugando ese día. Identifica su ubicación exacta tan pronto como se anuncie; ¡será tu cuartel general!</p>" },
        ]}
      />
    </>
  );
}
