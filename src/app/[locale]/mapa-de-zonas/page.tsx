import Image from "next/image";
import { setRequestLocale } from "next-intl/server";

const MAP_EMBED_URL =
  "https://mide.monterrey.gob.mx/datasets/geonode:centros_atencion_sistemas_dif/embed";

function ZoneImages({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {images.map((img) => (
        <div
          key={img.src}
          className="relative aspect-square w-full overflow-hidden rounded-xl"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="(max-width: 920px) 50vw, 25vw"
          />
        </div>
      ))}
    </div>
  );
}

function EmbeddedMap() {
  return (
    <div className="mt-12">
      <div className="overflow-hidden rounded-xl shadow-lg">
        <iframe
          src={MAP_EMBED_URL}
          title="Mapa de Monterrey"
          className="h-[450px] w-full border-0"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default async function MapaDeZonasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Hero: Mapa ilustrado */}
      <section className="w-full bg-white py-16 text-center">
        <div className="mx-auto w-full px-6 md:max-w-[66%] md:px-0">
          <h1 className="mb-10 text-3xl font-black uppercase tracking-tight text-brand-blue-dark md:text-4xl">
            Mapa de Zonas o Zonas a Visitar
          </h1>

          <div className="mx-auto">
            <Image
              src="/images/mapas/MAPA_MTY.png.webp"
              alt="Mapa ilustrado de las zonas de Monterrey"
              width={900}
              height={600}
              className="h-auto w-full"
              priority
            />
          </div>

          <p className="mx-auto mt-10 text-base leading-relaxed text-gray-700 md:text-lg">
            En Monterrey decimos que somos una ciudad para recorrer, no solo
            para ver. Para que no te sientas perdido en nuestra gran mancha
            urbana, te comparto el &quot;mapa mental&quot; que usamos los regios
            para simplificar la ciudad. La movilidad se vuelve facilísima cuando
            entiendes estas
            <strong className="text-brand-red"> tres zonas estratégicas</strong>.
          </p>
        </div>
      </section>

      {/* Zona 1: Centro, Macroplaza y Barrio Antiguo */}
      <section className="w-full bg-[#1f3359] py-16 text-white">
        <div className="mx-auto w-full px-6 md:max-w-[66%] md:px-0">
          <h2 className="mb-6 text-2xl font-black uppercase tracking-tight md:text-3xl">
            El Corazón Histórico y Fiestero (Centro, Macroplaza y Barrio
            Antiguo)
          </h2>

          <p className="mb-10 text-base leading-relaxed opacity-90 md:text-lg">
            Este es el punto neurálgico de la ciudad y donde la mayoría de los
            turistas pasan gran parte del tiempo. La{" "}
            <strong>Macroplaza</strong> es una de las plazas más grandes del
            mundo, y conecta con el{" "}
            <strong>Paseo Santa Lucía</strong> (un canal navegable hermoso) y el{" "}
            <strong>Barrio Antiguo</strong>, donde encontrarás vida nocturna y
            casonas coloniales. Si te hospedas aquí, tienes acceso directo al
            Metrorrey (estaciones <strong>Zaragoza</strong> y{" "}
            <strong>Padre Mier</strong>).{" "}
            <strong>Regio-Tip:</strong> Los fines de semana, el Barrio Antiguo es
            peatonal; es el momento ideal para ir. Nuestros mapas te ayudarán a
            trazar el recorrido a pie para que no te pierdas ni un solo mural.
          </p>

          <ZoneImages
            images={[
              { src: "/images/zonas_ciudad/centro_1.jpg", alt: "Centro de Monterrey 1" },
              { src: "/images/zonas_ciudad/centro_2.jpg", alt: "Centro de Monterrey 2" },
              { src: "/images/zonas_ciudad/centro_3.jpg", alt: "Centro de Monterrey 3" },
              { src: "/images/zonas_ciudad/centro_4.jpg", alt: "Centro de Monterrey 4" },
            ]}
          />
          <EmbeddedMap />
        </div>
      </section>

      {/* Zona 2: San Pedro Garza García */}
      <section className="w-full bg-[#82bbe8] py-16 text-[#2e4785]">
        <div className="mx-auto w-full px-6 md:max-w-[66%] md:px-0">
          <h2 className="mb-6 text-2xl font-black uppercase tracking-tight md:text-3xl">
            La Zona Ejecutiva y de Lujo (San Pedro Garza García)
          </h2>

          <p className="mb-10 text-base leading-relaxed opacity-90 md:text-lg">
            San Pedro es el municipio vecino, conocido por su modernidad, sus
            centros comerciales de alto nivel (como Fashion Drive) y su vasta
            oferta gastronómica <em>premium</em>. Si tu presupuesto lo permite,
            muchos hoteles de lujo están aquí. La clave de esta zona es que es
            más residencial y corporativa, por lo que{" "}
            <strong className="underline">
              la mejor forma de moverte es en taxi de aplicación
            </strong>
            . Los accesos viales hacia el estadio son excelentes, pero ¡ojo! el
            tráfico puede ser intenso en hora pico, así que planea con 90
            minutos de anticipación. Nuestros mapas identifican las arterias
            viales claves (como el Corredor Alfonso Reyes) para que tu taxi no
            dé vueltas innecesarias.
          </p>

          <ZoneImages
            images={[
              { src: "/images/zonas_ciudad/ejecutiva_1.jpg", alt: "Zona Ejecutiva San Pedro 1" },
              { src: "/images/zonas_ciudad/ejecutiva_2.png", alt: "Zona Ejecutiva San Pedro 2" },
              { src: "/images/zonas_ciudad/ejecutiva_3.jpeg", alt: "Zona Ejecutiva San Pedro 3" },
              { src: "/images/zonas_ciudad/ejecutiva_4.png", alt: "Zona Ejecutiva San Pedro 4" },
            ]}
          />
          <EmbeddedMap />
        </div>
      </section>

      {/* Zona 3: Guadalupe y el Estadio */}
      <section className="w-full bg-[#2e4785] py-16 text-white">
        <div className="mx-auto w-full px-6 md:max-w-[66%] md:px-0">
          <h2 className="mb-6 text-2xl font-black uppercase tracking-tight md:text-3xl">
            La Zona del Partido (Guadalupe y el Estadio)
          </h2>

          <p className="mb-10 text-base leading-relaxed opacity-90 md:text-lg">
            El Estadio Monterrey está ubicado estratégicamente en el municipio de
            Guadalupe. Para el aficionado, esta zona se convierte en el destino
            principal. Lo importante aquí es entender la{" "}
            <strong>logística del día del partido</strong>. Nuestros mapas
            detallan los <strong>perímetros de seguridad</strong> y las zonas
            donde el tráfico vehicular se restringe. Esto te obligará a usar el
            transporte público o los <em>shuttles</em> desde estacionamientos
            remotos.
          </p>

          <ZoneImages
            images={[
              { src: "/images/zonas_ciudad/estadio_1.jpg", alt: "Zona del Estadio Monterrey 1" },
              { src: "/images/zonas_ciudad/estadio_2.jpg", alt: "Zona del Estadio Monterrey 2" },
              { src: "/images/zonas_ciudad/estadio_3.jpg", alt: "Zona del Estadio Monterrey 3" },
              { src: "/images/zonas_ciudad/estadio_4.jpg", alt: "Zona del Estadio Monterrey 4" },
            ]}
          />
          <EmbeddedMap />
        </div>
      </section>
    </>
  );
}
