import { setRequestLocale } from "next-intl/server";
import { SplitBanner } from "@/components/sections/split-banner";

export default async function ComunidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SplitBanner
      contentOnHover
      desktopHeight={70}
      mobileHeight={60}
      sectionWidth="full-width"
      narrowContent
      panels={[
        {
          centerText: true,
          verticalAlign: "center",
          horizontalAlign: "center",
          overlayColor: "#000000",
          overlayOpacity: 70,
          subheading: "Offer subheading",
          heading: "Banner heading",
          buttonLabel: "Discover",
          buttonStyle: "outlined",
          colorType: "invert",
        },
        {
          centerText: true,
          verticalAlign: "center",
          horizontalAlign: "center",
          overlayColor: "#000000",
          overlayOpacity: 70,
          subheading: "Offer subheading",
          heading: "Banner heading",
          buttonLabel: "Discover",
          buttonStyle: "outlined",
          colorType: "invert",
        },
      ]}
    />
  );
}
