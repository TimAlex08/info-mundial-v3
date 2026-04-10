import { setRequestLocale } from "next-intl/server";
import { Multicolumn } from "@/components/sections/multicolumn";
import { CollapsibleTabs } from "@/components/sections/collapsible-tabs";

export default async function TransporteYMovilidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Multicolumn
        mediaRatio="square"
        buttonStyle="outlined"
        items={[
          { type: "image", heading: "Image heading", text: "<p>Pair text with image or loop video to focus on your featured product, collection, or promotion. Tell a story, describe your brand or share announcements.</p>", buttonLabel: "Discover" },
          { type: "video", heading: "Loop video heading", text: "<p>Pair text with image or loop video to focus on your featured product, collection, or promotion. Tell a story, describe your brand or share announcements.</p>", buttonLabel: "Discover" },
        ]}
      />

      <CollapsibleTabs
        heading="Collapsible tabs"
        headingTag="h1"
        sectionWidth="narrow"
        buttonLabel="View all"
        blocks={[
          { type: "topic", heading: "Transporte Público", text: "<p>Optional description of the group of questions.</p>" },
          { type: "tab", heading: "Collapsible tab heading", content: "<p>Collapsible tab content.</p>" },
          { type: "tab", heading: "Collapsible tab heading", content: "<p>Collapsible tab content.</p>" },
          { type: "topic", heading: "Rutas al Estadio", text: "<p>Optional description of the group of questions.</p>" },
          { type: "tab", heading: "Collapsible tab heading", content: "<p>Collapsible tab content.</p>" },
          { type: "tab", heading: "Collapsible tab heading", content: "<p>Collapsible tab content.</p>" },
          { type: "topic", heading: "Apps y Taxis", text: "<p>Optional description of the group of questions.</p>" },
          { type: "tab", heading: "Collapsible tab heading", content: "<p>Collapsible tab content.</p>" },
          { type: "topic", heading: "Mapas y Cierres", text: "<p>Optional description of the group of questions.</p>" },
          { type: "tab", heading: "Collapsible tab heading", content: "<p>Collapsible tab content.</p>" },
        ]}
      />
    </>
  );
}
