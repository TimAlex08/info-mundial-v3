import { setRequestLocale } from "next-intl/server";
import { ImageWithHotspots } from "@/components/sections/image-with-hotspots";
import { Multicolumn } from "@/components/sections/multicolumn";
import { RichText } from "@/components/sections/rich-text";

export default async function HospedajeYZonasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ImageWithHotspots
        subheading="Mapa de Zonas"
        heading="Mapa de Zonas"
        centerText
        hotspots={[
          { text: "<p>Zona 1</p>", position: "bottom_center", desktopX: 50, desktopY: 74, mobileX: 30, mobileY: 30 },
          { text: "", position: "bottom_center", desktopX: 50, desktopY: 50, mobileX: 30, mobileY: 30 },
        ]}
      />

      <Multicolumn
        mediaRatio="square"
        buttonStyle="outlined"
        items={[
          { type: "image", heading: "Image heading", text: "<p>Pair text with image or loop video to focus on your featured product, collection, or promotion. Tell a story, describe your brand or share announcements.</p>", buttonLabel: "Discover" },
          { type: "image", heading: "Image heading", text: "<p>Pair text with image or loop video to focus on your featured product, collection, or promotion. Tell a story, describe your brand or share announcements.</p>", buttonLabel: "Discover" },
          { type: "image", heading: "Image heading", text: "<p>Pair text with image or loop video to focus on your featured product, collection, or promotion. Tell a story, describe your brand or share announcements.</p>", buttonLabel: "Discover" },
        ]}
      />

      <Multicolumn
        mediaRatio="square"
        buttonStyle="outlined"
        items={[
          { type: "image", heading: "Image heading", text: "<p>Pair text with image or loop video to focus on your featured product, collection, or promotion. Tell a story, describe your brand or share announcements.</p>", buttonLabel: "Discover" },
          { type: "image", heading: "Image heading", text: "<p>Pair text with image or loop video to focus on your featured product, collection, or promotion. Tell a story, describe your brand or share announcements.</p>", buttonLabel: "Discover" },
          { type: "image", heading: "Image heading", text: "<p>Pair text with image or loop video to focus on your featured product, collection, or promotion. Tell a story, describe your brand or share announcements.</p>", buttonLabel: "Discover" },
        ]}
      />

      <RichText
        centerText
        blocks={[
          { type: "subheading", text: "Subheading" },
          { type: "heading", text: "Rich text heading" },
          { type: "text", content: "<p>Tell a story, describe your brand or share announcements. You can also use it as a section heading.</p>" },
          { type: "button", label: "Enlaces Confiables", style: "outlined" },
          { type: "button", label: "Enlaces Confiables", style: "outlined" },
          { type: "button", label: "Enlaces Confiables", style: "outlined" },
        ]}
      />
    </>
  );
}
