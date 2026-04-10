import { setRequestLocale } from "next-intl/server";
import { VideoBanner } from "@/components/sections/video-banner";
import { RichText } from "@/components/sections/rich-text";
import { MediaWithText } from "@/components/sections/media-with-text";
import { HorizontalScrollingBanners } from "@/components/sections/horizontal-scrolling-banners";

export default async function PanchoMundialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <VideoBanner
        videoSrc="/videos/Video-6.mp4"
        desktopHeight={75}
        mobileHeight={60}
        overlayColor="#000000"
        overlayOpacity={34}
        verticalAlign="center"
        horizontalAlign="center"
        colorType="invert"
        blocks={[
          { type: "subheading", text: "El Regreso de la Leyenda" },
          { type: "heading", text: "¿Quién es Pancho Mundial?", tag: "h1" },
          { type: "text", content: "<p>La Leyenda Detrás del Micrófono</p>" },
          { type: "button", label: "Canal YouTube", style: "solid" },
        ]}
      />

      <RichText
        desktopPaddingTop={-80}
        blocks={[
          { type: "text", content: "<p>Para algunos es el Ingeniero Físico Industrial egresado del ITESM. Pero para nosotros, es simplemente Pancho Mundial, un hombre de complexión delgada , cabellera larga y rizada , y una pasión por el fútbol que lo mantiene en un debate eterno: ¿es Tigre o es Rayado?. La realidad es que le va a los dos, porque para Pancho, cualquier victoria es pretexto para un autoasueto.</p>" },
        ]}
      />

      <MediaWithText
        image="/images/general/Imagen-9.jpg"
        imageAlt="Pancho Mundial"
        swapMedia
        mediaRatio="square"
        blocks={[
          { type: "heading", text: "Un Pasado de Fama y \"Fracasos\" Gloriosos" },
          { type: "text", content: "<p>Pancho no es cualquier analista. Su momento de gloria llegó en 1997, como reportero de cancha en aquel inolvidable Tigres vs Real Sociedad de Zacatecas. Tras años de retiro —y una insolación histórica en un Pumas vs Tigres que aún le deja secuelas — Pancho ha vuelto para cumplir el sueño que sus amigos siempre le echaron en cara: ¡Ir a un Mundial!. Aunque se sorprendió al enterarse de que este es el tercer mundial en la ciudad, su entusiasmo es inagotable.</p>" },
        ]}
      />

      <HorizontalScrollingBanners
        blocks={[
          {
            type: "media_with_text",
            desktopSize: "big",
            contentPosition: "overlay",
            videoSrc: "/videos/Video-5.mp4",
            overlayColor: "#000000",
            overlayOpacity: 45,
            centerText: false,
            narrowContent: true,
            heading: "¿Por qué Pancho es el mejor host mundialista?",
            text: "<p>En esta nueva etapa como periodista deportivo , Pancho se encargará de realizar reportajes, sondeos, narraciones y análisis. Con su estilo noble y honesto, te traerá:</p>",
            colorType: "invert",
          },
          {
            type: "text",
            desktopSize: "big",
            centerText: false,
            verticalAlign: "center",
            horizontalAlign: "center",
            narrowContent: true,
            text: "<ul><li><strong>Análisis de Lógica de Ingeniero</strong>: Donde su capacidad matemática para el comercio de la Central de Abastos se aplica a la táctica del juego.</li><li><strong>Crónicas de Barrio</strong>: Historias auténticas desde la \"Zona Tec\" (o la Indepe, como la conocemos todos) o desde Washington D. C. nunca sabemos donde anda.</li><li><strong>Sabiduría Popular</strong>: Consejos sobre la vida, el fútbol y por qué las quesadillas de gloria con limón son el manjar de los campeones</li></ul>",
            colorType: "custom",
            backgroundColor: "#ffb902",
            textColor: "#1f3359",
          },
          {
            type: "media",
            desktopSize: "big",
            image: "/images/general/Imagen-10.jpg",
            imageAlt: "Pancho Mundial en el campo",
          },
        ]}
      />
    </>
  );
}
