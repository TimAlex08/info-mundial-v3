import { setRequestLocale } from "next-intl/server";
import { Banners } from "@/components/sections/banners";
import { Events } from "@/components/sections/events";

export default async function CulturaYExperienciasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Banners
        subheading="Historias de la Gente"
        heading="Historias de la Gente"
        text="<p>Short description.</p>"
        mediaRatio="square"
        cardButtonStyle="outlined"
        items={[
          { type: "image", heading: "Image heading", text: "<p>Add an optional description to a promotion, product, or collection.</p>", buttonLabel: "Discover" },
          { type: "loop_video", heading: "Loop video heading", text: "<p>Add an optional description to a promotion, product, or collection.</p>", buttonLabel: "Discover" },
          { type: "loop_video", heading: "Loop video heading", text: "<p>Add an optional description to a promotion, product, or collection.</p>", buttonLabel: "Discover" },
          { type: "image", heading: "Image heading", text: "<p>Add an optional description to a promotion, product, or collection.</p>", buttonLabel: "Discover" },
        ]}
      />

      <Events
        heading="Agenda de Eventos Gratuitos"
        maxColumns="1"
        mediaRatio="original"
        showDate
        detailsButtonStyle="outlined"
        buyTicketsButtonStyle="solid"
        addToCalendarLabel="Add to calendar"
        events={[
          { heading: "Heading", description: "<p>Add an optional description to your event.</p>", location: "CA 94063 Redwood City 541 Jefferson Ave", startDate: "2030-01-01", enableAddToCalendar: true, detailsButtonLabel: "Discover", buyTicketsButtonLabel: "Buy tickets" },
          { heading: "Heading", description: "<p>Add an optional description to your event.</p>", location: "CA 94063 Redwood City 541 Jefferson Ave", startDate: "2030-01-01", enableAddToCalendar: true, detailsButtonLabel: "Discover", buyTicketsButtonLabel: "Buy tickets" },
          { heading: "Heading", description: "<p>Add an optional description to your event.</p>", location: "CA 94063 Redwood City 541 Jefferson Ave", startDate: "2030-01-01", enableAddToCalendar: true, detailsButtonLabel: "Discover", buyTicketsButtonLabel: "Buy tickets" },
        ]}
      />
    </>
  );
}
