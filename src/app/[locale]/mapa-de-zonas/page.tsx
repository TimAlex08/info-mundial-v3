import { setRequestLocale } from "next-intl/server";
import { RichText } from "@/components/sections/rich-text";
import { BannerGallery } from "@/components/sections/banner-gallery";

export default async function MapaDeZonasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <RichText
        centerText
        desktopPaddingTop={52}
        blocks={[
          { type: "heading", text: "MAPA DE ZONAS O ZONAS A VISITAR" },
          { type: "context_image", src: "/images/mapa-zonas/mapa-mty.png", alt: "Mapa de Monterrey" },
          { type: "text", content: "<p>En Monterrey decimos que somos una ciudad para recorrer, no solo para ver. Para que no te sientas perdido en nuestra gran mancha urbana, te comparto el \"mapa mental\" que usamos los regios para simplificar la ciudad. La movilidad se vuelve facilísima cuando entiendes estas<strong>tres zonas estratégicas</strong>.</p>" },
        ]}
      />

      {/* Zona 1: Centro */}
      <RichText
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#ffffff"
        blocks={[
          { type: "heading", text: "El Corazón Histórico y Fiestero (Centro, Macroplaza y Barrio Antiguo)" },
          { type: "text", content: "<p>Este es el punto neurálgico de la ciudad y donde la mayoría de los turistas pasan gran parte del tiempo. La <strong>Macroplaza</strong> es una de las plazas más grandes del mundo, y conecta con el <strong>Paseo Santa Lucía</strong> (un canal navegable hermoso) y el <strong>Barrio Antiguo</strong>, donde encontrarás vida nocturna y casonas coloniales. Si te hospedas aquí, tienes acceso directo al Metrorrey (estaciones <strong>Zaragoza</strong> y <strong>Padre Mier</strong>). <strong>Regio-Tip:</strong> Los fines de semana, el Barrio Antiguo es peatonal; es el momento ideal para ir. Nuestros mapas te ayudarán a trazar el recorrido a pie para que no te pierdas ni un solo mural.</p>" },
        ]}
      />

      <BannerGallery
        desktopColumns="4"
        imageRatio="square"
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#ffffff"
        items={[
          { image: "/images/mapa-zonas/centro-1.jpg", imageAlt: "Centro de Monterrey" },
          { image: "/images/mapa-zonas/centro-2.jpg", imageAlt: "Macroplaza" },
          { image: "/images/mapa-zonas/centro-3.jpg", imageAlt: "Barrio Antiguo" },
          { image: "/images/mapa-zonas/centro-4.jpg", imageAlt: "Paseo Santa Lucía" },
        ]}
      />

      {/* Zona 2: San Pedro */}
      <RichText
        colorType="custom"
        backgroundColor="#82bbe8"
        textColor="#2e4785"
        desktopPaddingTop={44}
        blocks={[
          { type: "heading", text: "La Zona Ejecutiva y de Lujo (San Pedro Garza García)" },
          { type: "text", content: "<p>San Pedro es el municipio vecino, conocido por su modernidad, sus centros comerciales de alto nivel (como Fashion Drive) y su vasta oferta gastronómica <em>premium</em>. Si tu presupuesto lo permite, muchos hoteles de lujo están aquí. La clave de esta zona es que es más residencial y corporativa, por lo que <strong>la mejor forma de moverte es en taxi de aplicación</strong>. Los accesos viales hacia el estadio son excelentes, pero ¡ojo! el tráfico puede ser intenso en hora pico, así que planea con 90 minutos de anticipación. Nuestros mapas identifican las arterias viales claves (como el Corredor Alfonso Reyes) para que tu taxi no dé vueltas innecesarias.</p>" },
        ]}
      />

      <BannerGallery
        desktopColumns="4"
        imageRatio="square"
        colorType="custom"
        backgroundColor="#82bbe8"
        textColor="#ffffff"
        items={[
          { image: "/images/mapa-zonas/sanpedro-1.jpg", imageAlt: "San Pedro" },
          { image: "/images/mapa-zonas/sanpedro-2.png", imageAlt: "Fashion Drive" },
          { image: "/images/mapa-zonas/sanpedro-3.jpg", imageAlt: "Gastronomía San Pedro" },
          { image: "/images/mapa-zonas/sanpedro-4.png", imageAlt: "San Pedro de noche" },
        ]}
      />

      {/* Zona 3: Guadalupe / Estadio */}
      <RichText
        colorType="custom"
        backgroundColor="#2e4785"
        textColor="#ffffff"
        blocks={[
          { type: "heading", text: "La Zona del Partido (Guadalupe y el Estadio)" },
          { type: "text", content: "<p>El Estadio Monterrey está ubicado estratégicamente en el municipio de Guadalupe. Para el aficionado, esta zona se convierte en el destino principal. Lo importante aquí es entender la <strong>logística del día del partido</strong>. Nuestros mapas detallan los <strong>perímetros de seguridad</strong> y las zonas donde el tráfico vehicular se restringe. Esto te obligará a usar el transporte público o los <em>shuttles</em> desde estacionamientos remotos.</p>" },
        ]}
      />

      <BannerGallery
        desktopColumns="4"
        imageRatio="square"
        colorType="custom"
        backgroundColor="#2e4785"
        textColor="#ffffff"
        items={[
          { image: "/images/mapa-zonas/guadalupe-1.jpg", imageAlt: "Guadalupe" },
          { image: "/images/mapa-zonas/guadalupe-2.jpg", imageAlt: "Estadio zona" },
          { image: "/images/mapa-zonas/guadalupe-3.jpg", imageAlt: "Accesos al estadio" },
          { image: "/images/mapa-zonas/guadalupe-4.jpg", imageAlt: "Estadio Monterrey" },
        ]}
      />
    </>
  );
}
