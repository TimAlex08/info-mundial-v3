import { setRequestLocale } from "next-intl/server";
import { ImageBanner } from "@/components/sections/image-banner";
import { RichText } from "@/components/sections/rich-text";
import { Banners } from "@/components/sections/banners";
import { Multicolumn } from "@/components/sections/multicolumn";

export default async function FifaFanPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ImageBanner
        image="/images/fifa-fan/hero.jpg"
        imageAlt="FIFA Fan Fest Monterrey"
        desktopHeight={45}
        mobileHeight={70}
        blocks={[]}
      />

      <RichText
        blocks={[
          { type: "subheading", text: "FIFA Fan Fest" },
          { type: "heading", text: "¡El Corazón Pulsante del Mundial en Monterrey!" },
          { type: "text", content: "<p>Si hay un lugar que tienes que visitar sí o sí, incluso si no tienes boletos para el partido, es el <strong>FIFA Fan Fest Oficial</strong>. Este es el cuartel general de la fiesta mundial, un evento gratuito, seguro y la mejor forma de sentir la energía del torneo. </p>" },
        ]}
      />

      <Banners
        heading="Ubicación: El Factor Logístico Clave"
        text="<p>Aunque la ubicación final la define la FIFA, todas las miradas apuntan a dos lugares por su capacidad y accesibilidad logística:</p>"
        mediaRatio="square"
        cardButtonStyle="outlined"
        colorType="custom"
        backgroundColor="#2e4785"
        textColor="#ffffff"
        items={[
          {
            type: "image",
            image: "/images/fifa-fan/parque-fundidora.png",
            imageAlt: "Parque Fundidora",
            heading: "Parque Fundidora",
            text: "<p>Gran capacidad, excelente infraestructura y acceso directo con la estación <strong>Fundidora del Metrorrey</strong>. Es ideal para conciertos y grandes concentraciones.</p>",
          },
          {
            type: "image",
            image: "/images/fifa-fan/macroplaza.jpg",
            imageAlt: "Macroplaza",
            heading: "Macroplaza",
            text: "<p>Más céntrica y con mejor conexión a hoteles, pero con menos capacidad.</p>",
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
          { type: "heading", text: "Regio-Tip de Movilidad" },
          { type: "text", content: "<p>Una vez que se anuncie la ubicación, <strong>domina la ruta de Metrorrey hacia ese punto</strong>. Olvídate de los taxis o autos particulares, la zona estará saturada. El Metrorrey será tu boleto de entrada y salida sin problemas.</p>" },
        ]}
      />

      <Multicolumn
        heading="¿Qué Esperar y Cómo Sobrevivir al Fan Fest?"
        mediaRatio="square"
        buttonStyle="outlined"
        desktopPaddingTop={36}
        desktopPaddingBottom={24}
        items={[
          {
            type: "text",
            heading: "Pantallas Gigantes",
            text: "<p>Podrás ver todos los partidos en un ambiente increíble con miles de aficionados de todas partes.</p>",
          },
          {
            type: "text",
            heading: "Comida y Patrocinadores",
            text: "<p>Habrá <em>stands</em> de comida con opciones regias (tacos, carne asada) e internacionales. Los patrocinadores oficiales tendrán activaciones, regalos y <em>merchandising</em>.</p>",
          },
          {
            type: "text",
            heading: "Seguridad y Horarios",
            text: "<p>Los accesos serán estrictos (política de bolsas pequeñas, sin objetos peligrosos). </p>",
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
          { type: "heading", text: "El check obligatorio" },
          { type: "text", content: "<p>Revisa los horarios de apertura y llegada temprano para asegurar un buen lugar frente a la pantalla, especialmente para los partidos clave de México o las finales.</p>" },
        ]}
      />

      <RichText
        sectionWidth="narrow"
        centerText
        colorType="custom"
        backgroundColor="#2e4785"
        textColor="#ffffff"
        blocks={[
          { type: "text", content: "<p>El Fan Fest es más que ver fútbol; es una inmersión social, cultural y gastronómica. ¡Será donde la gente de Monterrey le dé la bienvenida al mundo!</p>" },
        ]}
      />
    </>
  );
}
