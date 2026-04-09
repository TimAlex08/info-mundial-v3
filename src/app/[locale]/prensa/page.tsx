import { setRequestLocale } from "next-intl/server";
import { Banners } from "@/components/sections/banners";

export default async function PrensaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Banners
      subheading="Recursos"
      heading="recursos"
      text="<p>Short description.</p>"
      mediaRatio="square"
      centerText={false}
      cardButtonStyle="outlined"
      items={[
        {
          type: "image",
          heading: "Sala de Prensa",
          text: "<p>Add an optional description to a promotion, product, or collection.</p>",
          buttonLabel: "descargar",
        },
        {
          type: "loop_video",
          heading: "Recursos Oficiales",
          text: "<p>Add an optional description to a promotion, product, or collection.</p>",
          buttonLabel: "descargar",
        },
        {
          type: "loop_video",
          heading: "Identidad Visual",
          text: "<p>Add an optional description to a promotion, product, or collection.</p>",
          buttonLabel: "descargar",
        },
        {
          type: "image",
          heading: "Datos Verificados",
          text: "<p>Add an optional description to a promotion, product, or collection.</p>",
          buttonLabel: "descargar",
        },
      ]}
    />
  );
}
