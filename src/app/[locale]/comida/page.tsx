import { setRequestLocale } from "next-intl/server";
import { HorizontalScrollingBanners } from "@/components/sections/horizontal-scrolling-banners";

export default async function ComidaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <HorizontalScrollingBanners
      blocks={[
        {
          type: "text",
          desktopSize: "big",
          centerText: false,
          verticalAlign: "center",
          horizontalAlign: "center",
          narrowContent: true,
          heading: "La Ruta de la Carne: El ADN Gastronómico de Monterrey",
          text: "<p>Aquí va un secreto a voces: a los regios nos encanta la carne. Si vienes al Mundial, tu misión no es solo ver un partido, ¡es probar la mejor <strong>carne asada</strong> de México! Olvídate de la dieta por unos días. Como tu <em>foodie</em> regio y guía, te digo que hay tres categorías que no puedes ignorar.</p>",
          colorType: "custom",
          backgroundColor: "#2e4785",
          textColor: "#ffffff",
        },
        {
          type: "media_with_text",
          desktopSize: "big",
          contentPosition: "overlay",
          image: "/images/comida/cabrito.jpg",
          imageAlt: "El Cabrito",
          overlayColor: "#000000",
          overlayOpacity: 55,
          centerText: true,
          narrowContent: true,
          heading: "El Sacrificio Culinario: El Cabrito",
          colorType: "invert",
        },
        {
          type: "text",
          desktopSize: "big",
          centerText: false,
          verticalAlign: "center",
          horizontalAlign: "center",
          narrowContent: true,
          text: "<p>El <strong>Cabrito al pastor</strong> es el plato insignia de Nuevo León. Es un cabrito joven cocinado lentamente a las brasas. Es un sabor fuerte, único y que te hace sentir inmediatamente en el norte. <br/><br/><strong>Regio-Tip:</strong> Los mejores restaurantes de Cabrito suelen estar en el Centro (cerca de la Macroplaza) y son perfectos para una cena en grupo o de celebración. Busca lugares con tradición, te darán el auténtico sabor regio.</p>",
          colorType: "custom",
          backgroundColor: "#db0138",
          textColor: "#ffffff",
        },
        {
          type: "media_with_text",
          desktopSize: "big",
          contentPosition: "overlay",
          image: "/images/comida/tacos.jpg",
          imageAlt: "Tacos",
          overlayColor: "#000000",
          overlayOpacity: 36,
          centerText: true,
          narrowContent: true,
          heading: "Los Reyes de la Noche: Los Tacos",
          colorType: "invert",
        },
        {
          type: "text",
          desktopSize: "big",
          centerText: false,
          verticalAlign: "center",
          horizontalAlign: "center",
          narrowContent: true,
          text: '<p>El taco es el combustible del regio. Si hablamos de <em>street food</em>, tienes que probar dos cosas:</p><ul><li><strong>Tacos al Pastor:</strong> La carne de cerdo marinada en achiote y asada en un trompo vertical (como un kebab), servida con piña. Son adictivos.</li><li><strong>Tacos de Trompo (Carne de Res):</strong> En Monterrey, también llamamos "trompo" a los tacos de carne de res marinada. Son jugosos y deliciosos.</li></ul>',
          colorType: "custom",
          backgroundColor: "#82bbe8",
          textColor: "#1f3359",
        },
        {
          type: "media_with_text",
          desktopSize: "big",
          contentPosition: "overlay",
          image: "/images/comida/cortes-finos.jpg",
          imageAlt: "Cortes finos y Arrachera",
          overlayColor: "#000000",
          overlayOpacity: 39,
          centerText: true,
          narrowContent: true,
          heading: "La Experiencia Premium: Cortes Finos y Arrachera",
          colorType: "invert",
        },
        {
          type: "text",
          desktopSize: "big",
          centerText: false,
          verticalAlign: "center",
          horizontalAlign: "center",
          narrowContent: true,
          text: "<p>Si buscas una cena elegante, las parrillas en <strong>San Pedro</strong> te ofrecen cortes de carne de clase mundial (Ribeye, Porterhouse, Arrachera). <br/><br/>La <strong>Arrachera</strong> (corte de falda) es un básico regio y te recomiendo pedirla con tortillas de harina recién hechas y un buen guacamole.</p>",
          colorType: "custom",
          backgroundColor: "#1f3359",
          textColor: "#ffffff",
        },
        {
          type: "text",
          desktopSize: "big",
          centerText: true,
          verticalAlign: "center",
          horizontalAlign: "center",
          narrowContent: true,
          text: "<p>Come sin miedo y con pasión, como lo hacemos en Monterrey. <br/><br/>¡Buen provecho!</p>",
          colorType: "custom",
          backgroundColor: "#db0138",
          textColor: "#ffffff",
        },
      ]}
    />
  );
}
