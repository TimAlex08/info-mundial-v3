import { setRequestLocale } from "next-intl/server";
import { Banners } from "@/components/sections/banners";

export default async function InfraestructuraPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Banners
      subheading=""
      heading="Infraestructura de Clase Mundial"
      headingTag="h1"
      text='<p>Monterrey no solo será sede, será el ejemplo de cómo una ciudad se reinventa. El municipio, bajo el lema <em>"Aquí se Resuelve"</em>, está ejecutando un plan de infraestructura que va mucho más allá de las canchas. Como tu guía experto, te presento los pilares que cambiarán tu forma de moverte y vivir la ciudad en 2026.</p>'
      mediaRatio="square"
      centerText={false}
      cardButtonStyle="solid"
      colorType="custom"
      backgroundColor="#ffffff"
      textColor="#1f3359"
      desktopPaddingTop={52}
      desktopPaddingBottom={48}
      items={[
        {
          type: "image",
          image: "/images/infraestructura/barrio-antiguo.jpg",
          imageAlt: "La Joya de la Corona",
          heading: "La Joya de la Corona",
          text: "<p>Restauración Integral del Barrio Antiguo El alcalde Adrián de la Garza ha sido claro: el Barrio Antiguo será el corazón peatonal y cultural del Mundial.</p><p> Se está llevando a cabo una rehabilitación histórica que incluye la mejora de fachadas, iluminación arquitectónica y la peatonalización de calles clave (como la calle Mina y Morelos). </p><p>El objetivo es crear un distrito bohemio y seguro donde la historia regia se fusione con la fiesta global.</p>",
        },
        {
          type: "image",
          image: "/images/infraestructura/movilidad-gratuita.jpg",
          imageAlt: "Movilidad Gratuita",
          heading: "Movilidad Gratuita",
          text: "<p>La Regio Ruta busca facilitar los traslados de los aficionados y ciudadanos. Este sistema de transporte gratuito ha sido ampliado con nuevos circuitos que conectan estaciones clave del Metro con zonas turísticas y hoteles, reduciendo la carga vehicular en el centro y garantizando que nadie se quede fuera de la fiesta por falta de transporte.</p>",
        },
        {
          type: "image",
          image: "/images/infraestructura/seguridad.jpg",
          imageAlt: "Seguridad",
          heading: "Seguridad",
          text: "<p>Estrategia ESCUDO 2026 La seguridad es el pilar central. Se ha activado la estrategia ESCUDO, un operativo blindado que conecta cámaras de alta definición con el C4 y C5, cubriendo especialmente la zona hotelera, el centro y los perímetros del estadio. </p><p>Con la llegada de la \"Policía Mundialista\" capacitada en atención turística e idiomas, Monterrey garantiza que tu única preocupación será el marcador.</p>",
        },
        {
          type: "image",
          image: "/images/infraestructura/conectividad.png",
          imageAlt: "Conectividad y Sostenibilidad",
          heading: "Conectividad y Sostenibilidad",
          text: "<p>Corredores Verdes Monterrey apuesta por una ciudad caminable. La creación de Corredores Verdes en avenidas principales y zonas como San Jerónimo permite traslados peatonales seguros, con accesibilidad universal y áreas arboladas. Estos corredores actúan como arterias que unen el Parque Fundidora con el Estadio, ofreciendo una ruta escénica y eficiente para el aficionado.</p>",
        },
      ]}
    />
  );
}
