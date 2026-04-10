import { setRequestLocale } from "next-intl/server";
import { HorizontalScrollingBanners } from "@/components/sections/horizontal-scrolling-banners";

export default async function BarrioAntiguoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <HorizontalScrollingBanners
      blocks={[
        {
          type: "media",
          desktopSize: "big",
          videoSrc: "/videos/Video-7.mp4",
        },
        {
          type: "text",
          desktopSize: "big",
          centerText: false,
          verticalAlign: "center",
          horizontalAlign: "center",
          narrowContent: true,
          subheading: "Barrio Bonito (Antiguo):",
          heading: "Donde la Historia Se Vuelve Fiesta",
          text: '<p>Si me preguntas dónde ir para sentir el <em>mood</em> más auténtico y bohemio de la ciudad, te diría sin dudarlo: <strong>el Barrio Antiguo</strong>. Y sí, nosotros le decimos cariñosamente "Barrio Bonito" porque tiene ese encanto que no encuentras en las zonas corporativas. Es el centro de la cultura y, sobre todo, de la vida nocturna.</p>',
          colorType: "custom",
          backgroundColor: "#82bbe8",
          textColor: "#1f3359",
        },
        {
          type: "media",
          desktopSize: "big",
          image: "/images/general/Imagen-6.jpg",
          imageAlt: "Casona colonial Barrio Antiguo",
        },
        {
          type: "text",
          desktopSize: "big",
          centerText: false,
          verticalAlign: "center",
          horizontalAlign: "center",
          narrowContent: true,
          heading: "De Casona Colonial a Galería de Arte",
          text: "<p>Durante el día, el Barrio Antiguo es una delicia para caminar. Sus calles empedradas están flanqueadas por <strong>casonas coloniales</strong> de dos pisos, muchas de las cuales han sido convertidas en pequeñas galerías de arte, tiendas de diseño local y cafés increíbles. </p><p><strong>Regio-Tip:</strong> Visítalo un domingo por la mañana; a menudo hay bazares de arte y comida que te permiten ver el ambiente familiar y creativo del lugar.</p>",
          colorType: "custom",
          backgroundColor: "#1f3359",
          textColor: "#ffffff",
        },
        {
          type: "media",
          desktopSize: "big",
          image: "/images/general/Imagen-7.jpg",
          imageAlt: "Noche en Barrio Antiguo",
        },
        {
          type: "text",
          desktopSize: "big",
          centerText: false,
          verticalAlign: "center",
          horizontalAlign: "center",
          narrowContent: true,
          heading: "La Noche: El Alma del Barrio",
          text: "<p>Pero es cuando cae el sol que el Barrio Antiguo se transforma.</p><ol><li><strong>Música en Vivo:</strong> Es la cuna de la escena musical local. Encontrarás desde bandas de rock y jazz hasta música folclórica y, por supuesto, lugares para bailar con DJ.</li><li><strong>El Ambiente:</strong> Los fines de semana, la zona se vuelve peatonal, lo que significa que la fiesta se desborda a la calle (de forma ordenada, claro). Es el mejor lugar para convivir con los regios y otros visitantes en un ambiente relajado y festivo.</li></ol>",
          colorType: "custom",
          backgroundColor: "#2e4785",
          textColor: "#ffffff",
        },
        {
          type: "text",
          desktopSize: "big",
          centerText: true,
          verticalAlign: "center",
          horizontalAlign: "center",
          narrowContent: true,
          heading: "El Check de Seguridad:",
          text: "<p>Como se concentra mucha gente, la seguridad en la zona se refuerza, especialmente durante eventos masivos como el Mundial. Si te quedas en el Centro de la ciudad, puedes llegar caminando y es muy seguro. Si vienes de San Pedro, usa un taxi de aplicación y pídele que te deje en un punto central de la calle principal (como Morelos o Mina). Es la mejor opción para cerrar tu noche de celebración.</p><p><strong>¡Prepárate para bailar y probar unos buenos cócteles artesanales!</strong></p>",
          colorType: "custom",
          backgroundColor: "#db0138",
          textColor: "#ffffff",
        },
      ]}
    />
  );
}
