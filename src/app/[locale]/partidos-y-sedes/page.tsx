import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { VideoBanner } from "@/components/sections/video-banner";
import { Events } from "@/components/sections/events";
import { MediaWithTabs } from "@/components/sections/media-with-tabs";
import { CollapsibleTabs } from "@/components/sections/collapsible-tabs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "Partidos y Sedes";
  const description =
    "Información sobre los partidos del Mundial FIFA 2026 en Monterrey: calendario, sedes, selecciones y todo lo que necesitas saber.";
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/${locale}/partidos-y-sedes`,
    },
  };
}

export default async function PartidosYSedesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <VideoBanner
        videoSrc="/videos/partidos-y-sedes.mp4"
        desktopHeight={70}
        mobileHeight={60}
        overlayColor="#000000"
        overlayOpacity={70}
        contentColor="#ffffff"
        verticalAlign="center"
        horizontalAlign="center"
        sectionWidth="wide"
        blocks={[
          { type: "subheading", text: "Subheading" },
          { type: "heading", text: "Video banner heading", tag: "h1" },
          { type: "text", content: "<p>Add an optional description to a promotion, product, or collection.</p>" },
          { type: "button", label: "Discover", style: "outlined" },
        ]}
      />

      <Events
        heading="Calendario"
        maxColumns="1"
        mediaRatio="original"
        showDate
        detailsButtonStyle="outlined"
        buyTicketsButtonStyle="solid"
        addToCalendarLabel="Add to calendar"
        events={[
          {
            image: "/images/partidos/clasico-regio.jpg",
            imageAlt: "Tigres vs Rayados",
            heading: "TIGRES VS RAYADOS",
            description: "<p>Add an optional description to your event.</p>",
            location: "CA 94063 Redwood City 541 Jefferson Ave",
            startDate: "2030-01-01",
            enableAddToCalendar: true,
            buyTicketsButtonLabel: "Buy tickets",
            detailsButtonLabel: "Discover",
          },
          {
            image: "/images/partidos/clasico-regio.jpg",
            imageAlt: "Tigres vs Rayados",
            heading: "TIGRES VS RAYADOS",
            description: "<p>Add an optional description to your event.</p>",
            location: "CA 94063 Redwood City 541 Jefferson Ave",
            startDate: "2030-01-01",
            enableAddToCalendar: true,
            buyTicketsButtonLabel: "Buy tickets",
            detailsButtonLabel: "Discover",
          },
          {
            image: "/images/partidos/clasico-regio.jpg",
            imageAlt: "Tigres vs Rayados",
            heading: "TIGRES VS RAYADOS",
            description: "<p>Add an optional description to your event.</p>",
            location: "CA 94063 Redwood City 541 Jefferson Ave",
            startDate: "2030-01-01",
            enableAddToCalendar: true,
            buyTicketsButtonLabel: "Buy tickets",
            detailsButtonLabel: "Discover",
          },
        ]}
      />

      <MediaWithTabs
        subheading="Estadio BBVA"
        swapMedia
        mediaSize="half"
        mediaRatio="square"
        verticalAlign="start"
        horizontalAlign="left"
        narrowContent
        tabs={[
          { type: "image", heading: "Image tab heading", text: "<p>Pair text with image or loop video to focus on your featured product, collection, or promotion. Tell a story, describe your brand or share announcements.</p>", buttonLabel: "Discover", buttonStyle: "outlined" },
          { type: "image", heading: "Image tab heading", text: "<p>Pair text with image or loop video to focus on your featured product, collection, or promotion. Tell a story, describe your brand or share announcements.</p>", buttonLabel: "Discover", buttonStyle: "outlined" },
          { type: "image", heading: "Image tab heading", text: "<p>Pair text with image or loop video to focus on your featured product, collection, or promotion. Tell a story, describe your brand or share announcements.</p>", buttonLabel: "Discover", buttonStyle: "outlined" },
        ]}
      />

      <CollapsibleTabs
        heading="FAN ZONES"
        sectionWidth="narrow"
        buttonLabel="View all"
        blocks={[
          { type: "topic", heading: "Topic", text: "<p>Optional description of the group of questions.</p>" },
          { type: "tab", heading: "Collapsible tab heading", content: "<p>Collapsible tab content.</p>" },
          { type: "tab", heading: "Collapsible tab heading", content: "<p>Collapsible tab content.</p>" },
          { type: "tab", heading: "Collapsible tab heading", content: "<p>Collapsible tab content.</p>" },
          { type: "topic", heading: "Topic", text: "<p>Optional description of the group of questions.</p>" },
          { type: "tab", heading: "Collapsible tab heading", content: "<p>Collapsible tab content.</p>" },
          { type: "tab", heading: "Collapsible tab heading", content: "<p>Collapsible tab content.</p>" },
          { type: "tab", heading: "Collapsible tab heading", content: "<p>Collapsible tab content.</p>" },
        ]}
      />
    </>
  );
}
