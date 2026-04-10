import { setRequestLocale } from "next-intl/server";

export default async function BarrioBonitoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="h-screen w-full">
      <iframe
        src="https://mide.monterrey.gob.mx/apps/19185/embed"
        title="Barrio Bonito"
        className="h-full w-full border-0"
        allowFullScreen
      />
    </div>
  );
}
