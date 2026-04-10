import { setRequestLocale } from "next-intl/server";
import { BannerGallery } from "@/components/sections/banner-gallery";
import { RichText } from "@/components/sections/rich-text";
import { Banners } from "@/components/sections/banners";

export default async function EventosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BannerGallery
        desktopColumns="5"
        imageRatio="square"
        colorType="invert-content"
        centerText
        verticalAlign="end"
        desktopPaddingTop={44}
        items={[
          { image: "/images/eventos/evento-1.jpg", imageAlt: "Evento 1" },
          { image: "/images/eventos/evento-2.png", imageAlt: "Evento 2" },
          { image: "/images/eventos/evento-3.jpg", imageAlt: "Evento 3" },
          { image: "/images/eventos/evento-4.jpg", imageAlt: "Evento 4" },
          { image: "/images/eventos/evento-5.jpg", imageAlt: "Evento 5" },
        ]}
      />

      <RichText
        blocks={[
          { type: "subheading", text: "Eventos y Ferias" },
          { type: "heading", text: "El Lado B de la Fiesta Regia", tag: "h1" },
          { type: "text", content: "<p>El Mundial va a ser el evento principal, claro, pero Monterrey nunca se detiene. Como ciudad industrial y cultural, siempre hay algo sucediendo. Más allá de los conciertos gigantes o los <em>Fan Fests</em> (que cubriremos aparte), aquí te cuento sobre esos eventos locales que te van a dar un <em>feeling</em> auténtico de la vida regia.</p>" },
        ]}
      />

      <Banners
        subheading="Mercados y Bazares:"
        heading="Para Encontrar la Joya Perdida"
        text="<p>Los mercados locales son el corazón de la interacción social. Si tienes la suerte de que coincida con tu visita, busca:</p>"
        mediaRatio="square"
        cardButtonStyle="outlined"
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#ffffff"
        items={[
          {
            type: "image",
            image: "/images/eventos/mercados.jpg",
            imageAlt: "Mercados de Artesanías",
            heading: "Mercados de Artesanías",
            text: "<p>Son perfectos para comprar ese recuerdo auténtico que no encuentras en el aeropuerto. Aquí verás desde cerámica hasta textiles del norte de México. Es un buen lugar para practicar tu español.</p>",
          },
          {
            type: "image",
            image: "/images/eventos/ferias.jpg",
            imageAlt: "Ferias Gastronómicas",
            heading: "Ferias Gastronómicas o Foodie",
            text: "<p>Los regios amamos comer, y a menudo se organizan eventos de <em>food trucks</em> o ferias de cervezas artesanales. Estos eventos son relajados, seguros y una forma deliciosa de probar lo último de la escena culinaria local.</p>",
          },
        ]}
      />

      <RichText
        colorType="custom"
        backgroundColor="#2e4785"
        textColor="#ffffff"
        blocks={[
          { type: "text", content: "<p><strong>Regio-Tip Estratégico:</strong> Estos eventos suelen realizarse en fin de semana en zonas accesibles como el <strong>Parque Fundidora</strong> o en parques grandes de <strong>San Pedro</strong>. Te recomendamos usar nuestra alerta de eventos para saber la fecha y la ubicación exacta.</p><p><strong>Actividades al Aire Libre y Deportivas</strong></p><p>Dado que nuestra identidad gira en torno al deporte y la naturaleza, es común que se organicen carreras 5K, clases de yoga en parques o actividades de escalada. Estos son geniales si buscas un escape activo entre los días de partido. No es solo beber y comer, ¡también hay que sudar!</p>" },
        ]}
      />
    </>
  );
}
