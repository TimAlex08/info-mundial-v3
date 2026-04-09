import { setRequestLocale } from "next-intl/server";
import { MediaWithText } from "@/components/sections/media-with-text";
import { RichText } from "@/components/sections/rich-text";
import { ScrollingPromotion } from "@/components/sections/scrolling-promotion";
import { CollapsibleTabs } from "@/components/sections/collapsible-tabs";
import { ImageBanner } from "@/components/sections/image-banner";
import { Multicolumn } from "@/components/sections/multicolumn";

export default async function MundialitoBarriosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <MediaWithText
        image="/images/Mundialitos-1.png"
        imageAlt="Mundialito Torneo de Barrios"
        sectionWidth="narrow"
        mediaRatio="original"
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#ffffff"
        desktopPaddingTop={32}
        desktopPaddingBottom={-28}
        blocks={[
          { type: "heading", text: "Iª Edición del Mundialito Torneo de Barrios" },
          { type: "text", content: "<p>Se llevará a cabo en las canchas del Municipio de Monterrey, del 15 de abril al 6 de junio del 2026.</p>" },
          { type: "button", label: "IR AL REGISTRO OFICIAL", style: "solid" },
        ]}
      />

      <RichText
        sectionWidth="narrow"
        centerText
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#ffffff"
        desktopPaddingBottom={48}
        blocks={[
          { type: "heading", text: "Podrán participar todos los clubes, escuelas, instituciones, empresas y equipos de la comunidad ubicados en la Ciudad de Monterrey." },
        ]}
      />

      <MediaWithText
        image="/images/Mundialitos-3.png"
        imageAlt="Inscripciones Mundialito"
        sectionWidth="narrow"
        swapMedia
        mediaRatio="original"
        desktopPaddingBottom={-24}
        blocks={[
          { type: "heading", text: "Inscripciones Gratuitas" },
          { type: "text", content: "<ul><li>Gratuitas</li><li>Dirección de Cultura Física y Deporte de Monterrey</li><li>Av. Churubusco y Francisco Beltrán S/N, Col. Carranza</li><li>Lunes a viernes de 10:00 a 16:00 hrs</li><li>Cierre: 10 de abril de 2026</li></ul>" },
          { type: "button", label: "IR AL REGISTRO OFICIAL", style: "solid" },
        ]}
      />

      <RichText
        sectionWidth="narrow"
        centerText
        desktopPaddingBottom={-24}
        blocks={[
          { type: "context_image", src: "/images/Mundialitos-9.png", alt: "Reglas del torneo" },
        ]}
      />

      <ScrollingPromotion
        textSize="medium"
        direction="left"
        speed={2}
        gap={48}
        colorType="custom"
        backgroundColor="#ffffff"
        textColor="#2e4785"
        desktopPaddingTop={-76}
        desktopPaddingBottom={-88}
        items={[
          { text: "Mundialito de Barrios" },
        ]}
      />

      <RichText
        sectionWidth="narrow"
        centerText
        desktopPaddingTop={-36}
        desktopPaddingBottom={-28}
        blocks={[
          { type: "context_image", src: "/images/Mundialitos-6.png", alt: "Formato del torneo" },
        ]}
      />

      <CollapsibleTabs
        heading="Etapas:"
        sectionWidth="narrow"
        colorType="custom"
        backgroundColor="#db0138"
        textColor="#ffffff"
        desktopPaddingTop={24}
        desktopPaddingBottom={52}
        blocks={[
          { type: "tab", heading: "Etapa de Liga - 2 de Abril al 24 de Mayo", content: "<p><strong>Canchas donde se jugarán los partidos.</strong></p><ul><li>Barrio Alameda</li><li>Diego de Montemayor</li><li>Valle de Infonavit</li><li>La Alianza</li><li>Loma Linda</li><li>Valle del Mirador</li><li>Pablo A. Gonzalez</li><li>No reelección</li><li>Jesus Hinojosa Tijerina</li><li>Los Altos</li><li>Fomerrey 116 Bomberos</li><li>Badian</li><li>Villa Mitras</li><li>Ciudad Deportiva Norte</li><li>Fomerrey 45</li><li>Burocratas Municipales</li><li>Maracana</li><li>Croc</li><li>El Nacional</li><li>Provileon 109</li><li>Cancha La Moderna</li><li>Villa Alegre</li><li>Mederos</li><li>La Laguna</li><li>Campeones</li><li>Cancha Yumas</li></ul>" },
          { type: "tab", heading: "Etapa de Zona - 26 de Mayo al 31 de Mayo", content: "<p><strong>Canchas donde se jugarán.</strong></p><ul><li>Ciudad Deportiva</li><li>Moderna</li><li>Jesus Hinojosa Tijerina</li><li>Mederos</li><li>Diego de Montemayor</li><li>La Laguna</li><li>Villa Mitras</li><li>La Alianza</li><li>Cancha Yumas</li></ul>" },
          { type: "tab", heading: "Etapa final - 2 de Junio al 6 de Junio", content: "<p>Canchas donde se jugarán.</p><ul><li>Ciudad Deportiva Estadio</li><li>Ciudad Deportiva Nte.</li></ul>" },
        ]}
      />

      <MediaWithText
        image="/images/Mundialitos-8.png"
        imageAlt="Zonas de Eliminación"
        swapMedia
        mediaRatio="original"
        desktopPaddingTop={56}
        desktopPaddingBottom={44}
        blocks={[
          { type: "heading", text: "Zonas de Eliminación" },
          { type: "text", content: "<p>La inscripción también puede realizarse con los presidentes de las diferentes ligas municipales, según corresponda la ubicación de los equipos, de acuerdo  a las siguientes:</p><p><strong>Zonas</strong></p><p><strong>1. </strong>Cd Deportiva</p><p><strong>2. </strong>Moderna</p><p><strong>3. </strong>Jesus Hinojosa Tijerina</p><p><strong>4. </strong>Mederos</p><p><strong>5. </strong>Diego de Montemayor</p><p><strong>6. </strong>La Laguna</p><p><strong>7. </strong>Villa Mitras</p><p><strong>8. </strong>La Alianza</p>" },
        ]}
      />

      <ImageBanner
        image="/images/Mundialitos-10.png"
        imageAlt="Junta Técnica Mundialito"
        desktopHeight={50}
        mobileHeight={45}
        sectionWidth="full-width"
        colorType="custom"
        desktopPaddingBottom={-120}
        blocks={[
          { type: "heading", text: "Junta Técnica:" },
          { type: "text", content: "<p><strong>Se llevará a cabo el día viernes 27 de marzo a las 19:00 horas</strong></p><p>Gimnasio del Jesús Hinojosa Tijerina (Monterrey 400).</p>" },
          { type: "button", label: "IR AL REGISTRO OFICIAL", style: "outlined" },
        ]}
      />

      <RichText
        sectionWidth="narrow"
        centerText
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#000000"
        desktopPaddingTop={-60}
        desktopPaddingBottom={-28}
        blocks={[
          { type: "context_image", src: "/images/Mundialitos-12.png", alt: "Patrocinadores" },
        ]}
      />

      <Multicolumn
        centerText
        mediaRatio="original"
        buttonStyle="solid"
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#ffffff"
        desktopPaddingTop={4}
        desktopPaddingBottom={52}
        items={[
          {
            type: "text",
            heading: "Reglamento:",
            text: "<p>El vigente de la AFANL y el interno de la <strong>l Edición del Mundial de Futbol Monterrey - Torneo de Barrios.</strong></p>",
          },
          {
            type: "text",
            heading: "Riesgo Deportivo:",
            text: "<p>El Comité Organizador no se hará responsable por cualquier accidente que sufra algún jugador durante el desarrollo del torneo, ya que éste es considerado como riesgo deportivo.</p>",
          },
          {
            type: "text",
            heading: "Transitorios:",
            text: "<p>Comité Organizador</p><p>Monterrey, Nuevo León, 27 de Noviembre del 2025</p>",
          },
        ]}
      />

      <RichText
        sectionWidth="narrow"
        centerText
        blocks={[
          { type: "subheading", text: "Contacto oficial" },
          { type: "heading", text: "German Olivares" },
          { type: "text", content: "<p>Teléfono: 81 1690 9757</p>" },
        ]}
      />
    </>
  );
}
