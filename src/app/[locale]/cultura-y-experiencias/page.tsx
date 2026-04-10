import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { Banners } from "@/components/sections/banners";
import { Events } from "@/components/sections/events";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "Cultura y Experiencias";
  const description =
    "Descubre la riqueza cultural de Monterrey: museos, gastronomía, vida nocturna, tours y experiencias únicas para disfrutar durante el Mundial 2026.";
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/${locale}/cultura-y-experiencias`,
    },
  };
}

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
        headingTag="h1"
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
