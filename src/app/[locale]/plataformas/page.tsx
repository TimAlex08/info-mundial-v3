import { setRequestLocale } from "next-intl/server";
import { HorizontalScrollingBanners } from "@/components/sections/horizontal-scrolling-banners";

export default async function PlataformasPage({
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
          subheading: "Plataformas Seguras: ",
          heading: "La Defensa Contra los Falsos Alquileres",
          text: "<p>Seamos honestos: cuando llega un evento de la talla de un Mundial puede haber algunos riesgos que se pueden prevenir. El fraude en alojamiento es una realidad. Como experto en la logística del viajero, mi principal recomendación es: <strong>Sé paranoico con tus reservaciones.</strong> Usa únicamente plataformas que ofrecen una capa de seguridad y verifica la identidad del anfitrión.</p>",
          colorType: "custom",
          backgroundColor: "#82bbe8",
          textColor: "#1f3359",
        },
        {
          type: "media_with_text",
          desktopSize: "big",
          contentPosition: "overlay",
          image: "/images/plataformas/hoteles.jpg",
          imageAlt: "Hoteles",
          overlayColor: "#000000",
          overlayOpacity: 38,
          centerText: true,
          narrowContent: true,
          heading: "Hoteles: La Opción Cero Riesgo",
          colorType: "invert",
        },
        {
          type: "text",
          desktopSize: "big",
          centerText: false,
          verticalAlign: "center",
          horizontalAlign: "center",
          narrowContent: true,
          text: "<p>Las grandes cadenas hoteleras (Marriott, Hilton, etc.) son la opción más segura. Tienen tarifas fijas y están obligadas a respetar tu reservación. </p><p><strong>Regio-Tip:</strong> Los hoteles en <strong>San Pedro</strong> y en el corredor de la <strong>Avenida Constitución/Morones Prieto</strong> suelen tener los mejores sistemas de seguridad y vigilancia.</p><p>Reserva directamente a través de sus sitios web o usando una plataforma de reservas global y reconocida (como Booking o Expedia), que actúan como intermediarios y tienen políticas de protección al cliente robustas.</p>",
          colorType: "custom",
          backgroundColor: "#1f3359",
          textColor: "#ffffff",
        },
        {
          type: "media_with_text",
          desktopSize: "big",
          contentPosition: "overlay",
          image: "/images/plataformas/airbnb.webp",
          imageAlt: "Airbnb y Alquileres",
          overlayColor: "#000000",
          overlayOpacity: 30,
          centerText: true,
          narrowContent: true,
          heading: 'Airbnb y Alquileres de Corta Duración: Reglas para Evitar el "Fantasma"',
          colorType: "invert",
        },
        {
          type: "text",
          desktopSize: "big",
          centerText: false,
          verticalAlign: "center",
          horizontalAlign: "center",
          narrowContent: true,
          text: "<p>Airbnb es una maravilla para quienes quieren experimentar la vida regia de cerca, pero en el Mundial, la cautela es doble.</p><ol><li><strong>Verifica al Anfitrión:</strong> El perfil debe tener múltiples reseñas positivas, no solo una. <strong>Regio-Tip Esencial:</strong> Rechaza cualquier anfitrión que haya creado su perfil hace menos de seis meses y que no tenga ninguna reseña.</li><li><strong>No Salgas de la Plataforma:</strong> Si un anfitrión te pide transferir el pago por fuera (directo a su cuenta bancaria o PayPal), ¡es una estafa! <strong>Todas las transacciones deben ser dentro de la plataforma</strong> para que estés cubierto por sus políticas de reembolso.</li><li><strong>Fotos y Ubicación:</strong> Las fotos deben ser claras, múltiples y el exterior debe coincidir con la vista de Google Maps. Desconfía de precios ridículamente bajos; es la carnada.</li></ol>",
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
          heading: "Reserva con Cancelación Flexible",
          text: "<p>Independientemente de la plataforma, intenta pagar un pequeño extra por una tarifa que te permita cancelar hasta con 48 o 72 horas de antelación. Esto te da margen de maniobra si las condiciones de tu viaje cambian, o si a última hora detectas algo sospechoso con tu reserva. La tranquilidad no tiene precio, y en un evento masivo, la flexibilidad es tu mejor activo. ¡Reserva con inteligencia!</p>",
          colorType: "custom",
          backgroundColor: "#db0138",
          textColor: "#ffffff",
        },
      ]}
    />
  );
}
