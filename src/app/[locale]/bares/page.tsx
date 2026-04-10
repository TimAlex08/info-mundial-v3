import { setRequestLocale } from "next-intl/server";
import { HorizontalScrollingBanners } from "@/components/sections/horizontal-scrolling-banners";

export default async function BaresPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <HorizontalScrollingBanners
      headingTag="h1"
      blocks={[
        {
          type: "text",
          desktopSize: "big",
          centerText: false,
          verticalAlign: "center",
          horizontalAlign: "center",
          narrowContent: true,
          subheading: "¡Salud, compadre! ",
          heading: "Dónde Celebrar y Ver el Fútbol en Monterrey",
          text: "<p>Después de un partido, ya sea que festejes o ahogues las penas, vas a querer un buen lugar para tomar algo. La vida nocturna de Monterrey es vibrante y se divide claramente en dos ambientes, pensados para disfrutar al máximo y la seguridad, sin importar dónde te alojes.</p>",
          colorType: "default",
        },
        {
          type: "media_with_text",
          desktopSize: "big",
          contentPosition: "overlay",
          image: "/images/bares/barrio-antiguo.jpg",
          imageAlt: "Barrio Antiguo de noche",
          overlayColor: "#000000",
          overlayOpacity: 49,
          centerText: true,
          narrowContent: true,
          heading: "El Clásico: Barrio Antiguo (La Fiesta Bohemia)",
          colorType: "invert",
        },
        {
          type: "text",
          desktopSize: "big",
          centerText: false,
          verticalAlign: "center",
          horizontalAlign: "center",
          narrowContent: true,
          text: "<p>El <strong>Barrio Antiguo</strong> es la zona con más historia y encanto para salir de noche. Sus calles empedradas están llenas de antiguas casonas convertidas en bares con personalidad. Aquí encontrarás:</p><ul><li><strong>Música en Vivo:</strong> Desde jazz hasta rock y música local. Es el lugar perfecto para una cerveza artesanal tranquila o un buen tequila.</li><li><strong>Ambiente Social:</strong> La gente sale a la calle (peatonal los fines de semana), hay un ambiente más relajado y de fiesta compartida.</li></ul><p><strong>Regio-Tip de Proximidad:</strong> Si te alojas en el <strong>Centro Histórico</strong> (Zona 1), puedes llegar aquí caminando. Es la mejor forma de integrarte al espíritu regio de la noche.</p>",
          colorType: "custom",
          backgroundColor: "#2e4785",
          textColor: "#ffffff",
        },
        {
          type: "media_with_text",
          desktopSize: "big",
          contentPosition: "overlay",
          image: "/images/bares/san-pedro.jpg",
          imageAlt: "San Pedro de noche",
          overlayColor: "#000000",
          overlayOpacity: 26,
          centerText: true,
          narrowContent: true,
          heading: "El Exclusivo: San Pedro (Cócteles y Lujo)",
          colorType: "custom",
          backgroundColor: "#1f3359",
          textColor: "#ffffff",
        },
        {
          type: "text",
          desktopSize: "big",
          centerText: false,
          verticalAlign: "center",
          horizontalAlign: "center",
          narrowContent: true,
          text: "<p>Si prefieres un ambiente más sofisticado, con <em>mixología</em> de autor, <em>rooftops</em> con vistas espectaculares y un <em>dress code</em> un poco más formal, la zona de bares de <strong>San Pedro</strong> (cerca de Centrito Valle y Fashion Drive) es lo tuyo. Es una experiencia más exclusiva y controlada. <br/><br/><strong>El </strong><em><strong>check</strong></em><strong> de Seguridad:</strong> Estos establecimientos suelen tener un control de acceso más estricto, ofreciendo un entorno de fiesta de alto nivel y muy seguro.</p>",
          colorType: "custom",
          backgroundColor: "#1f3359",
          textColor: "#ffffff",
        },
        {
          type: "media_with_text",
          desktopSize: "big",
          contentPosition: "overlay",
          image: "/images/bares/sports-bar.jpg",
          imageAlt: "Sports Bar",
          overlayColor: "#000000",
          overlayOpacity: 57,
          centerText: true,
          narrowContent: true,
          heading: "El Combustible del Aficionado: Los Sports Bars",
          colorType: "invert",
        },
        {
          type: "text",
          desktopSize: "big",
          centerText: false,
          verticalAlign: "center",
          horizontalAlign: "center",
          narrowContent: true,
          text: "<p>Si tu equipo juega en otro horario, o quieres ver los partidos con la máxima adrenalina, necesitas un <strong>Sports Bar</strong> con pantallas gigantes, buen sonido y mucha <em>cheve</em> fría. <br/><br/>Muchos de estos lugares estarán estratégicamente cerca de las zonas hoteleras (tanto en San Pedro como en avenidas importantes del Centro). <br/><br/>Busca lugares que anuncien promociones especiales para el Mundial; serán tu mejor opción para disfrutar el fútbol con otros aficionados.</p>",
          colorType: "custom",
          backgroundColor: "#82bbe8",
          textColor: "#1f3359",
        },
        {
          type: "text",
          desktopSize: "big",
          centerText: true,
          verticalAlign: "center",
          horizontalAlign: "center",
          narrowContent: true,
          text: "<p><strong>Regio-Tip Final:</strong> La bebida local por excelencia es la <strong>Cerveza y si es una Carta Blanca mejor</strong>. Pregunta por nuestras marcas nacionales o prueba alguna de las excelentes cervecerías artesanales que han surgido en los últimos años. ¡Disfruta la noche regia con moderación y seguridad!</p>",
          colorType: "custom",
          backgroundColor: "#db0138",
          textColor: "#ffffff",
        },
      ]}
    />
  );
}
