import { setRequestLocale } from "next-intl/server";
import { HorizontalScrollingBanners } from "@/components/sections/horizontal-scrolling-banners";

export default async function HorariosPartidosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HorizontalScrollingBanners
        blocks={[
          {
            type: "text",
            desktopSize: "big",
            centerText: false,
            verticalAlign: "center",
            horizontalAlign: "center",
            narrowContent: true,
            subheading: "Horarios",
            heading: "El Arte de la Precisión Temporal Regia",
            text: "<p>El Mundial de 2026 es un evento global, y eso significa que el tema de las <strong>zonas horarias</strong> será crucial. Un error de hora puede significar perderse el inicio del partido. Aquí te daremos la información con una precisión de reloj suizo, adaptada al horario de Monterrey.</p>",
            colorType: "custom",
            backgroundColor: "#2e4785",
            textColor: "#ffffff",
          },
          {
            type: "media_with_text",
            desktopSize: "big",
            contentPosition: "overlay",
            image: "/images/horarios/fans-cheering.jpg",
            imageAlt: "Fans celebrando en un bar",
            overlayColor: "#000000",
            overlayOpacity: 61,
            centerText: false,
            narrowContent: true,
            heading: "Monterrey y el Tiempo: CDT/CST",
            text: "<p>Monterrey opera en el <strong>Horario Central (Central Time Zone - CT)</strong>. Durante los meses de junio y julio, esto suele ser <strong>UTC-5 (Horario de Verano)</strong>. </p>",
            colorType: "invert",
          },
          {
            type: "text",
            desktopSize: "big",
            centerText: false,
            verticalAlign: "center",
            horizontalAlign: "center",
            narrowContent: true,
            heading: "La Estrategia de los Horarios (Tiempos de Inicio)",
            text: "<p>Los horarios de inicio de los partidos del Mundial suelen estar escalonados para maximizar la audiencia global. Esto te afecta directamente:</p><ul><li><strong>Partidos Matutinos (Ej. 11:00 AM o 1:00 PM):</strong> Raros en México, pero si ocurren, significa levantarse muy temprano.</li><li><strong>Partidos Vespertinos (Ej. 4:00 PM o 5:00 PM):</strong> El horario ideal para ir al estadio después de comer, pero con alto tráfico de salida.</li><li><strong>Partidos Nocturnos (Ej. 7:00 PM o 8:00 PM):</strong> Perfecto para disfrutar la noche regia, pero la salida del estadio será larga y tendrás que planear bien tu cena post-partido.</li></ul>",
            colorType: "custom",
            backgroundColor: "#db0138",
            textColor: "#ffffff",
          },
          {
            type: "media",
            desktopSize: "big",
            image: "/images/horarios/fans-selfie.jpg",
            imageAlt: "Fans tomándose una selfie",
          },
          {
            type: "text",
            desktopSize: "big",
            centerText: false,
            verticalAlign: "center",
            horizontalAlign: "center",
            narrowContent: true,
            heading: "Regio-Tip Internacional",
            text: "<p>Siempre revisa la hora de inicio en tu boleto o fuente oficial. Si estás viendo el partido en un bar, usa nuestra guía de <strong>Bares</strong> para asegurarte de que estén abiertos para la hora de inicio de tu encuentro.</p>",
            colorType: "custom",
            backgroundColor: "#1f3359",
            textColor: "#ffffff",
          },
        ]}
      />
    </>
  );
}
