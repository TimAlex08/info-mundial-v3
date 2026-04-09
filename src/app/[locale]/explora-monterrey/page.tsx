import { setRequestLocale } from "next-intl/server";
import { VideoBanner } from "@/components/sections/video-banner";
import { ImageWithHotspots } from "@/components/sections/image-with-hotspots";
import { CollapsibleTabs } from "@/components/sections/collapsible-tabs";
import { Multicolumn } from "@/components/sections/multicolumn";

export default async function ExploraMonterreyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <VideoBanner
        videoSrc="/videos/explora-monterrey.mp4"
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
          { type: "heading", text: "Video banner heading" },
          { type: "text", content: "<p>Add an optional description to a promotion, product, or collection.</p>" },
          { type: "button", label: "Discover", style: "outlined" },
        ]}
      />

      <ImageWithHotspots
        heading="Mapa con puntos de lugares"
        centerText
        hotspots={[
          { text: "", position: "bottom_center", desktopX: 50, desktopY: 50, mobileX: 30, mobileY: 30 },
          { text: "", position: "bottom_center", desktopX: 13, desktopY: 38, mobileX: 30, mobileY: 30 },
          { text: "", position: "bottom_center", desktopX: 75, desktopY: 78, mobileX: 30, mobileY: 30 },
          { text: "", position: "bottom_center", desktopX: 50, desktopY: 89, mobileX: 30, mobileY: 30 },
          { text: "", position: "bottom_center", desktopX: 32, desktopY: 73, mobileX: 30, mobileY: 30 },
          { text: "", position: "bottom_center", desktopX: 24, desktopY: 22, mobileX: 30, mobileY: 30 },
        ]}
      />

      <CollapsibleTabs
        heading="Collapsible tabs"
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

      <Multicolumn
        mediaRatio="square"
        buttonStyle="outlined"
        items={[
          { type: "image", heading: "Image heading", text: "<p>Pair text with image or loop video to focus on your featured product, collection, or promotion. Tell a story, describe your brand or share announcements.</p>", buttonLabel: "Discover" },
          { type: "video", heading: "Loop video heading", text: "<p>Pair text with image or loop video to focus on your featured product, collection, or promotion. Tell a story, describe your brand or share announcements.</p>", buttonLabel: "Discover" },
          { type: "text", heading: "Heading", text: "<p>This is where you can share your brand story and vision with your customers. You can change the text in the theme editor.</p>", buttonLabel: "Discover" },
        ]}
      />
    </>
  );
}
