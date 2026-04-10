import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { SplitBanner } from "@/components/sections/split-banner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "Contacto";
  const description =
    "Contacta al equipo del Mundial FIFA 2026 en Monterrey. Encuentra información de contacto, redes sociales y canales oficiales.";
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/${locale}/contacto`,
    },
  };
}

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SplitBanner
      headingTag="h1"
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
