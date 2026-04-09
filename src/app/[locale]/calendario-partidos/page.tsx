import { setRequestLocale } from "next-intl/server";
import { HorizontalScrollingBanners } from "@/components/sections/horizontal-scrolling-banners";
import { Events } from "@/components/sections/events";

export default async function CalendarioPartidosPage({
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
            type: "media_with_text",
            desktopSize: "big",
            contentPosition: "overlay",
            image: "/images/calendario/calendario-hero.png",
            imageAlt: "El Calendario Regio",
            overlayColor: "#000000",
            overlayOpacity: 55,
            centerText: false,
            narrowContent: true,
            subheading: "El Calendario Regio:",
            heading: "La Hoja de Ruta de tu Mundial",
            text: "<p>El calendario es la Biblia del aficionado, y aquí, en Monterrey, seremos sede de algunos de los partidos más emocionantes del torneo. Como tu guía experto, te digo que dominar este calendario no solo te asegura ver a tu equipo, sino que te permite <strong>estrategizar tu alojamiento y movilidad</strong>. No es lo mismo un día de partido de fase de grupos que uno de eliminación.</p>",
            colorType: "invert",
          },
          {
            type: "media",
            desktopSize: "big",
            image: "/images/calendario/estadio-bbva.jpg",
            imageAlt: "Estadio BBVA",
          },
          {
            type: "text",
            desktopSize: "big",
            centerText: false,
            verticalAlign: "center",
            horizontalAlign: "center",
            narrowContent: true,
            heading: "El Desglose Estratégico de las Fechas",
            text: "<p>El <strong>Estadio Monterrey</strong> albergará una combinación de partidos que probablemente incluirán encuentros de la <strong>Fase de Grupos</strong> y, con suerte, alguna ronda de eliminación directa (Octavos o Dieciseisavos de Final).</p><ul><li><strong>Fase de Grupos (Fechas X a Y):</strong> Aquí es donde la ciudad estará en su máxima capacidad. Habrá una rotación constante de selecciones y aficionados, lo que significa que la energía será alta y el Metrorrey estará a tope. <br/><strong>Regio-Tip:</strong> Los partidos de esta fase suelen jugarse en horarios escalonados; revisa si tu partido es a primera hora (tarde) o nocturno.</li></ul><p></p><ul><li><strong>Rondas de Eliminación (Fechas Z a W):</strong> Si Monterrey es sede de alguna de estas rondas, la intensidad subirá. Un partido de Octavos de Final paraliza a la ciudad. La planeación de transporte debe ser impecable, con al menos <strong>3 horas de antelación</strong> para llegar al estadio.</li></ul>",
            colorType: "custom",
            backgroundColor: "#2e4785",
            textColor: "#ffffff",
          },
          {
            type: "media",
            desktopSize: "big",
            image: "/images/calendario/aficion.jpg",
            imageAlt: "Afición en el estadio",
          },
          {
            type: "text",
            desktopSize: "big",
            centerText: false,
            verticalAlign: "center",
            horizontalAlign: "center",
            narrowContent: true,
            heading: "El Factor México/EE. UU. (Norteamérica)",
            text: "<p>Los partidos de la Selección Mexicana o de EE. UU. (si el calendario lo permite) o de una potencia mundial dispararán la demanda local y los precios. Revisa con lupa estos días.</p>",
            colorType: "custom",
            backgroundColor: "#db0138",
            textColor: "#ffffff",
          },
        ]}
      />

      <Events
        heading="Partidos"
        maxColumns="1"
        mediaRatio="square"
        showDate
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#ffffff"
        desktopPaddingTop={44}
        desktopPaddingBottom={36}
        events={[
          {
            image: "/images/calendario/partido-1.jpg",
            imageAlt: "Bolivia vs Surinam",
            heading: "BOLIVIA VS SURINAM",
            description: "<p>Partido de repechaje para el Mundial 2026</p>",
            location: "estadio monterrey",
            startDate: "2026-03-26",
            enableAddToCalendar: true,
          },
          {
            image: "/images/calendario/partido-2.webp",
            imageAlt: "Bolivia/Surinam vs Irak",
            heading: "BOLIV(BOLIVIA/SURINAM) VS IRAK",
            description: "<p>Partido por el último boleto al Mundial 2026</p>",
            location: "estadio monterrey",
            startDate: "2026-03-31",
            enableAddToCalendar: true,
          },
        ]}
      />
    </>
  );
}
