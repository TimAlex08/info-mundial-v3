import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ImageWithHotspots } from "@/components/sections/image-with-hotspots";
import { Multicolumn } from "@/components/sections/multicolumn";
import { RichText } from "@/components/sections/rich-text";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "Hospedaje y Zonas";
  const description =
    "Encuentra las mejores opciones de hospedaje en Monterrey para el Mundial 2026. Hoteles, zonas recomendadas y consejos para tu estancia.";
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/${locale}/hospedaje-y-zonas`,
    },
  };
}

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
        headingTag="h1"
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
          { type: "heading", text: "Rich text heading", tag: "h1" },
          { type: "text", content: "<p>Tell a story, describe your brand or share announcements. You can also use it as a section heading.</p>" },
          { type: "button", label: "Enlaces Confiables", style: "outlined" },
          { type: "button", label: "Enlaces Confiables", style: "outlined" },
          { type: "button", label: "Enlaces Confiables", style: "outlined" },
        ]}
      />
    </>
  );
}
