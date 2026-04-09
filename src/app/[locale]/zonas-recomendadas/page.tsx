import { setRequestLocale } from "next-intl/server";
import { HorizontalScrollingBanners } from "@/components/sections/horizontal-scrolling-banners";

export default async function ZonasRecomendadasPage({
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
          type: "text",
          desktopSize: "big",
          centerText: false,
          verticalAlign: "center",
          horizontalAlign: "center",
          narrowContent: true,
          subheading: "Alojamiento Regio: ",
          heading: "La Decisión que Define tu Mundial",
          text: "<p>Mira, si algo te puedo asegurar es que la demanda de alojamiento en Monterrey para el Mundial 2026 se va a disparar. Así que, como tu amigo regio, te digo: <strong>la ubicación es el 80% del éxito de tu viaje</strong>. No se trata solo de encontrar una cama, sino de elegir el lugar indicado para que no te pierdas en el tráfico y puedas disfrutar todos los días al máximo. En una ciudad tan grande, hemos definido tres zonas ideales para el aficionado:</p>",
          colorType: "default",
        },
        {
          type: "media_with_text",
          desktopSize: "big",
          contentPosition: "overlay",
          image: "/images/zonas/centro-barrio.jpg",
          imageAlt: "Centro y Barrio Antiguo",
          overlayColor: "#000000",
          overlayOpacity: 25,
          centerText: true,
          narrowContent: false,
          heading: "El Corazón Bohemio: El Centro y Barrio Antiguo",
          colorType: "invert",
        },
        {
          type: "text",
          desktopSize: "big",
          centerText: false,
          verticalAlign: "center",
          horizontalAlign: "center",
          narrowContent: true,
          text: "<p>Si buscas inmersión cultural, accesibilidad y vida nocturna, el Centro Histórico es tu lugar. Aquí, puedes salir caminando de tu hotel y estar en la Macroplaza, el Paseo Santa Lucía o el famoso Barrio Antiguo en minutos.<br/><br/><strong>La gran ventaja (el Regio-Tip estratégico):</strong> tienes las estaciones de <strong>Metrorrey</strong> (Zaragoza, Padre Mier) a la mano. Esto significa que el día del partido puedes saltarte el tráfico vehicular y tomar el tren, que será la ruta más eficiente al estadio. <br/><br/><strong>Ambiente:</strong> Cultural, histórico y con el mejor <em>mood</em> para festejar. <em>Ideal para viajeros con presupuesto medio que priorizan la conexión rápida y la inmersión.</em></p>",
          colorType: "custom",
          backgroundColor: "#db0138",
          textColor: "#ffffff",
        },
        {
          type: "media_with_text",
          desktopSize: "big",
          contentPosition: "overlay",
          image: "/images/zonas/san-pedro.jpg",
          imageAlt: "San Pedro Garza García",
          overlayColor: "#000000",
          overlayOpacity: 37,
          centerText: true,
          narrowContent: true,
          heading: "La Base Ejecutiva: San Pedro Garza García",
          colorType: "invert",
        },
        {
          type: "text",
          desktopSize: "big",
          centerText: false,
          verticalAlign: "center",
          horizontalAlign: "center",
          narrowContent: true,
          text: "<p>Si lo que buscas es lujo, exclusividad, la mejor oferta gastronómica <em>premium</em> y, sobre todo, un entorno de <strong>máxima seguridad</strong>, San Pedro es tu zona. Es el municipio vecino, conocido por sus centros comerciales de diseño y sus hoteles de cadena internacional. <br/><br/><strong>El </strong><em><strong>check</strong></em><strong> de CEO:</strong> Si bien no tienes Metrorrey, las arterias viales son amplias y bien mantenidas. Si planeas moverte principalmente en taxis de aplicación y no te importa pagar un extra por la tranquilidad, esta es tu zona. <em><br/><br/>Ideal para viajeros de alto nivel que valoran la comodidad y la seguridad por encima del costo.</em></p>",
          colorType: "custom",
          backgroundColor: "#1f3359",
          textColor: "#ffffff",
        },
        {
          type: "media_with_text",
          desktopSize: "big",
          contentPosition: "overlay",
          image: "/images/zonas/estadio.jpg",
          imageAlt: "Zonas aledañas al Estadio",
          overlayColor: "#000000",
          overlayOpacity: 41,
          centerText: true,
          narrowContent: true,
          heading: "La Logística Pura: Zonas Aledañas al Estadio (Guadalupe)",
          colorType: "invert",
        },
        {
          type: "text",
          desktopSize: "big",
          centerText: false,
          verticalAlign: "center",
          horizontalAlign: "center",
          narrowContent: true,
          text: "<p>Hospedarte lo más cerca posible del <strong>Estadio Monterrey</strong> parece lógico, pero tiene sus matices. Durante el Mundial, muchas calles cercanas serán cerradas. Sin embargo, para aquellos que priorizan despertar y estar a pocos minutos a pie (o con un <em>shuttle</em> rápido) del recinto, hay opciones hoteleras y de alquiler nuevas. <br/><br/><strong>El factor movilidad:</strong> Si te quedas aquí, tu foco será dominar la ruta de <em>shuttles</em> o la parada de transporte más cercana, ya que la conexión con el Centro o San Pedro no será tan fluida. <em>Ideal para el aficionado puro que solo quiere la máxima conveniencia para los días de partido.</em></p>",
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
          text: '<p>No hay una zona "mejor", sino la que mejor se adapta a tu estrategia de viaje. ¡Elige bien y a disfrutar!</p>',
          colorType: "custom",
          backgroundColor: "#db0138",
          textColor: "#ffffff",
        },
      ]}
    />
  );
}
