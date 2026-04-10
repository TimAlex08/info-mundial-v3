import { setRequestLocale } from "next-intl/server";
import { HorizontalScrollingBanners } from "@/components/sections/horizontal-scrolling-banners";

export default async function CalendarioPartidosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <HorizontalScrollingBanners
      id="calendario-partidos"
      blocks={[
        {
          type: "media",
          desktopSize: "small",
          image: "/images/calendarios/calendarios_1.png",
          imageAlt: "Selecciones del mundo en Monterrey",
        },
        {
          type: "text",
          desktopSize: "small",
          centerText: true,
          narrowContent: true,
          verticalAlign: "center",
          horizontalAlign: "center",
          heading: "Fase de Grupos",
          text: "<p>El <strong>Estadio Monterrey</strong> será sede de emocionantes partidos de la fase de grupos del Mundial 2026. Desde el primer silbatazo, la Sultana del Norte vibrará con las mejores selecciones del mundo compitiendo por un lugar en la siguiente ronda. Prepárate para vivir el fútbol en su máxima expresión.</p>",
          buttonLabel: "VER PARTIDOS",
          buttonStyle: "solid",
          colorType: "custom",
          backgroundColor: "#1f3359",
          textColor: "#ffffff",
        },
        {
          type: "text",
          desktopSize: "small",
          centerText: true,
          narrowContent: true,
          verticalAlign: "center",
          horizontalAlign: "center",
          heading: "Sede Monterrey",
          text: "<p>Con capacidad para más de <strong>53,000 espectadores</strong>, el Estadio Monterrey es una joya arquitectónica que combina tecnología de punta con la calidez regia. Consulta las fechas y horarios de cada encuentro para planear tu visita y no perderte ni un solo gol.</p>",
          buttonLabel: "VER SEDE",
          buttonStyle: "solid",
          colorType: "custom",
          backgroundColor: "#db0138",
          textColor: "#ffffff",
        },
        {
          type: "media",
          desktopSize: "small",
          image: "/images/calendarios/calendarios_2.jpeg",
          imageAlt: "Estadio Monterrey con el Cerro de la Silla",
        },
        {
          type: "media",
          desktopSize: "small",
          image: "/images/calendarios/calendarios_3.jpeg",
          imageAlt: "Selecciones internacionales en acción",
        },
        {
          type: "text",
          desktopSize: "small",
          centerText: true,
          narrowContent: true,
          verticalAlign: "center",
          horizontalAlign: "center",
          heading: "Vive el Mundial",
          text: "<p>Más allá de los 90 minutos, Monterrey te ofrece una experiencia mundialista completa. <strong>Fan Zones</strong>, actividades culturales y la mejor gastronomía del norte de México te esperan. Consulta el calendario completo y organiza tu estancia para disfrutar cada momento de la fiesta del fútbol.</p>",
          buttonLabel: "PLANEA TU VISITA",
          buttonStyle: "solid",
          colorType: "custom",
          backgroundColor: "#2e4785",
          textColor: "#ffffff",
        },
      ]}
    />
  );
}
