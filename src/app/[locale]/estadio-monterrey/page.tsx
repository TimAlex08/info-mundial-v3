import { setRequestLocale } from "next-intl/server";
import { RichText } from "@/components/sections/rich-text";
import { HorizontalScrollingBanners } from "@/components/sections/horizontal-scrolling-banners";

export default async function EstadioMonterreyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <RichText
        desktopPaddingBottom={32}
        blocks={[
          { type: "heading", text: "ESTADIO MONTERREY" },
          { type: "text", content: "<p>Si eres aficionado al fútbol, el <strong>Estadio Monterrey</strong> te va a dejar sin aliento. Es una de las sedes más espectaculares del Mundial. Aquí te hablaré de su esencia como casa de los Rayados y, como tu guía local, te daré los mejores <em>tips</em> para que tu día de partido sea épico.</p>" },
        ]}
      />

      <HorizontalScrollingBanners
        blocks={[
          {
            type: "text",
            desktopSize: "big",
            centerText: false,
            verticalAlign: "center",
            horizontalAlign: "center",
            narrowContent: true,
            heading: "Una Obra Maestra con Vista al Cerro de la Silla",
            text: "<p>Inaugurado en 2015, este estadio es una proeza arquitectónica. Los regios estamos orgullosos de que se haya integrado al paisaje, ofreciendo en la parte superior una postal inigualable del emblemático <strong>Cerro de la Silla</strong>. Es la casa del <strong>Club de Fútbol Monterrey (Rayados)</strong>, un equipo con una afición fervorosa y un legado de triunfos nacionales e internacionales.</p>",
            colorType: "custom",
            backgroundColor: "#1f3359",
            textColor: "#ffffff",
          },
          {
            type: "media",
            desktopSize: "big",
            image: "/images/Imagen-8.jpg",
            imageAlt: "Estadio Monterrey exterior",
          },
          {
            type: "text",
            desktopSize: "big",
            centerText: false,
            verticalAlign: "center",
            horizontalAlign: "center",
            narrowContent: true,
            heading: "Héroes de la Pandilla (Rayados)",
            text: "<p>Al pisar este césped, estás caminando por el mismo lugar que pisaron gigantes del fútbol mexicano y mundial. Los Rayados han sido definidos por su garra y figuras legendarias. Aquí brillaron con luz propia el chileno <strong>Humberto \"Chupete\" Suazo</strong>, un delantero que se convirtió en leyenda por sus goles de campeonato; el ídolo local <strong>Jesús Arellano</strong>, un extremo que personificaba el espíritu regio; y, más recientemente, el goleador histórico <strong>Rogelio Funes Mori</strong>. Sentirás esa historia en cada rincón, incluso si tu equipo no es el que juega.</p>",
            colorType: "custom",
            backgroundColor: "#db0138",
            textColor: "#ffffff",
          },
          {
            type: "media",
            desktopSize: "big",
            image: "/images/Imagen-9.jpg",
            imageAlt: "Interior del Estadio Monterrey",
          },
          {
            type: "text",
            desktopSize: "big",
            centerText: false,
            verticalAlign: "center",
            horizontalAlign: "center",
            narrowContent: true,
            heading: "El Día del Partido: Logística de Experto Regio",
            text: "<p>Ahora, a lo práctico: <strong>¿cómo llego sin el caos?</strong></p><ol><li><strong>Transporte, 100% Público:</strong> Deja tu auto (o el taxi) lejos. La zona estará saturada. La <strong>mejor opción</strong> será el sistema de <em>shuttles</em> especiales desde puntos remotos y, dependiendo de la ubicación final que la FIFA designe, una extensión del <strong>Metrorrey</strong>. Planea llegar <strong>al menos 3 horas antes</strong>; esto no es una sugerencia, es una obligación si quieres evitar el estrés y tener tiempo para tomar fotos.</li><li><strong>Identifica tu Puerta (Gate):</strong> El estadio es grande. Tu boleto tendrá una puerta de acceso asignada. Revisa nuestros mapas y diagramas para saber exactamente dónde queda tu puerta con relación a tu punto de llegada. No intentes entrar por otra.</li><li><strong>La Regla de la Bolsa Transparente (Clear Bag Policy):</strong> Es casi seguro que el Mundial implemente una política estricta de bolsas pequeñas y transparentes por seguridad. Deja mochilas grandes en tu hotel. Si llevas una riñonera o bolsa muy pequeña, te ahorrarás 20 minutos de revisión.</li></ol>",
          },
          {
            type: "media",
            desktopSize: "big",
            image: "/images/Imagen-5.jpg",
            imageAlt: "Estadio Monterrey día de partido",
          },
          {
            type: "text",
            desktopSize: "big",
            centerText: true,
            verticalAlign: "center",
            horizontalAlign: "center",
            narrowContent: true,
            text: "<p>Disfruta la experiencia. Ver un partido del Mundial aquí, con el Cerro de la Silla de fondo, es algo que solo Monterrey te puede ofrecer.</p>",
            colorType: "custom",
            backgroundColor: "#1f3359",
            textColor: "#ffffff",
          },
        ]}
      />
    </>
  );
}
