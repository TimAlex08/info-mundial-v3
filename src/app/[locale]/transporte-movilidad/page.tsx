import { setRequestLocale } from "next-intl/server";
import { RichText } from "@/components/sections/rich-text";
import { TransportTabs } from "./transport-tabs";

export default async function TransporteMovilidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Centered content container */}
      <div className="mx-auto max-w-[1100px]">
        <RichText
          sectionWidth="full-width"
          centerText
          desktopPaddingTop={48}
          desktopPaddingBottom={24}
          className="[&>div>div]:mx-auto [&>div>div]:max-w-[65ch] [&_p]:text-justify"
          blocks={[
            { type: "heading", text: "¡Bienvenidos a la Sultana del Norte!" },
            { type: "text", content: "<p>Si algo te va a ahorrar dolores de cabeza en Monterrey durante el Mundial 2026 es entender cómo nos movemos. Créeme, no querrás pasar horas en el tráfico tratando de llegar al estadio. Como un regio que sabe lo que te recomienda, te digo que la clave aquí es la <strong>planeación</strong> y, sobre todo, aprender a usar nuestro sistema de transporte masivo: el <strong>Metrorrey</strong>.</p>" },
          ]}
        />

        <TransportTabs
          className="px-4 pt-4 pb-16 md:px-8"
          tabs={[
            {
              label: "Metrorrey",
              heading: "El Metrorrey: Rápido, Barato y Sin Rodeo",
              image: "/images/transporte/transporte_1.jpg",
              imageAlt: "El Metrorrey",
              text: "<p>El sistema de tren ligero, o Metrorrey, es tu mejor amigo. No solo es extremadamente económico, sino que te permite saltarte el tráfico vehicular de las avenidas principales. Para el Mundial, la <strong>Línea 1</strong> (que corre de poniente a oriente) y la <strong>Línea 2</strong> (que va al norte) serán tus ejes. Es crucial que identifiques la estación más cercana a tu hotel. La buena noticia es que, sabiendo la magnitud del evento, las autoridades han prometido <strong>horarios especiales y frecuencias reforzadas</strong>. Mi consejo de regio es: <strong>compra tu tarjeta de recarga desde el primer día</strong> y recárgale saldo suficiente; evitarás hacer filas innecesarias en el día del partido. Piensa en el Metrorrey como tu carril exclusivo de alta velocidad.</p>",
              buttonLabel: "Metrorrey",
              buttonStyle: "outlined",
            },
            {
              label: "Apps de Movilidad",
              heading: "Apps de Movilidad: El Confort que Agradecerás",
              image: "/images/transporte/transporte_2.png",
              imageAlt: "Apps de Movilidad",
              text: "<p>Sí, por supuesto que puedes usar Uber, Didi e inDriver. Son cómodas, seguras y funcionan de maravilla. Pero aquí va el <em>tip</em> estratégico: <strong>evita usarlas justo a la hora de salida del partido o de un evento masivo en el centro.</strong> Las tarifas se dispararán por la alta demanda (<em>surge pricing</em>), y el tiempo de espera será eterno. Úsalas para trayectos largos, para ir al aeropuerto o si regresas tarde a tu alojamiento. Cuando las uses, siempre verifica la placa y el nombre del conductor. Es la mejor forma de moverte con seguridad si tienes dudas sobre una ruta de autobús nocturna.</p>",
              buttonLabel: "Apps",
              buttonStyle: "outlined",
            },
            {
              label: "Autobús",
              heading: "El Autobús: Moverrety y las Rutas \"Mundialistas\"",
              image: "/images/transporte/transporte_3.jpeg",
              imageAlt: "Moverrety",
              text: "<p>Nuestra red de autobuses ha mejorado mucho con el sistema <strong>Moverrety</strong>, que busca modernizar y ordenar las rutas. Sé que puede ser intimidante, pero aquí la magia serán las <strong>Rutas Especiales para el Estadio</strong>. Busca las rutas anunciadas oficialmente que te dejarán en un perímetro caminable del recinto. Estas rutas estarán claramente señalizadas y suelen ser la opción más directa cuando el Metrorrey no llega exactamente a tu puerta. Pregunta sin miedo; al regio le gusta ayudar, y te indicarán el camino correcto.</p>",
              buttonLabel: "Moverrety",
              buttonStyle: "outlined",
            },
          ]}
        />
      </div>

      <RichText
        sectionWidth="full-width"
        centerText
        colorType="custom"
        backgroundColor="#2e4785"
        textColor="#ffffff"
        desktopPaddingTop={40}
        desktopPaddingBottom={40}
        className="[&>div>div]:mx-auto [&>div>div]:max-w-[65ch] [&_p]:text-justify"
        blocks={[
          { type: "heading", text: "Regio-Tip Final" },
          { type: "text", content: "<p>La caminata en el Centro o a lo largo del <strong>Paseo Santa Lucía</strong> es una experiencia imperdible. No subestimes el poder de moverte a pie en las zonas turísticas para absorber el ambiente, y así ahorrarte unos pesos y algo de tráfico. ¡Prepárate para moverte con eficiencia!</p>" },
        ]}
      />
    </>
  );
}
