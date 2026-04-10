import { setRequestLocale } from "next-intl/server";
import { RichText } from "@/components/sections/rich-text";
import { ImageBanner } from "@/components/sections/image-banner";
import { SectionVideo } from "@/components/sections/section-video";

export default async function HistoriasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Historia 1: Tacos Doña Mary */}
      <RichText
        desktopPaddingTop={44}
        blocks={[
          { type: "subheading", text: "HISTORIAS CON ALMA REGIA" },
          { type: "heading", text: "Tacos Doña Mary \"La Gritona\": La Autenticidad que Conquistó a Michelin", tag: "h1" },
          { type: "text", content: "<p>Ubicada en la zona centro (calle Capitán Aguilar), <strong>Tacos Doña Mary</strong> es una institución que trasciende lo gastronómico para convertirse en una experiencia antropológica. Doña Mary comenzó trabajando jornadas de <strong>20 horas diarias</strong>, durmiendo apenas cuatro, con el sueño de sacar adelante a su familia. Su apodo, \"La Gritona\", lejos de ser un reclamo, es su distintivo de eficiencia: ella grita las órdenes para que el flujo de la fila no se detenga.</p><p>Su esfuerzo fue recompensado en 2024 cuando la <strong>Guía Michelin</strong> le otorgó el reconocimiento <strong>Bib Gourmand</strong>. ¿El secreto? Tortillas de harina y maíz hechas a mano al momento y guisos que saben a hogar: <strong>barbacoa</strong>, chiles rellenos, albóndigas de papa y su famoso huevo en salsa. Doña Mary personifica la cultura del esfuerzo de Monterrey: una mujer que empezó en una barra en la calle y hoy es reconocida mundialmente por mantener el sabor intacto de la cocina del noreste.</p>" },
        ]}
      />

      <ImageBanner
        image="/images/historias/dona-mary.jpg"
        imageAlt="Tacos Doña Mary La Gritona"
        desktopHeight={55}
        mobileHeight={70}
        desktopPaddingTop={-100}
        blocks={[]}
      />

      {/* Historia 2: The Food Box */}
      <RichText
        blocks={[
          { type: "subheading", text: "HISTORIAS CON ALMA REGIA" },
          { type: "heading", text: "The Food Box: La Revolución de la Hamburguesa \"Explota-Cabezas\"" },
          { type: "text", content: "<p>La historia de <strong>The Food Box</strong> es el caso de estudio favorito de los emprendedores locales. Su fundador, <strong>Juan Ángel Martínez</strong>, comenzó en el patio de la casa de su madre con una cocina de tabla roca y una visión clara: en Monterrey no había una hamburguesa que generara una sensación de asombro total. Inspirado por la cultura del <em>delivery</em> y el empaque premium, diseñó un concepto que hoy es líder en el mercado.</p><p>Tras su paso por Shark Tank México, donde captó la atención de los \"tiburones\" con su propuesta de carne de libre pastoreo e ingredientes exóticos, The Food Box demostró que se puede innovar en un mercado saturado. Sus hamburguesas tienen nombres de conceptos arquitectónicos o matemáticos, reflejando el ADN intelectual y audaz de sus creadores. Es el lugar donde la juventud regia se reúne, representando la cara moderna, global y arriesgada de la ciudad.</p>" },
        ]}
      />

      <SectionVideo
        videoUrl="https://youtu.be/A6MPiRauD60"
        coverImage="/images/historias/food-box.jpg"
        coverImageAlt="The Food Box"
      />

      {/* Historia 3: Tacos El Güero */}
      <RichText
        blocks={[
          { type: "heading", text: "Tacos El Güero: Tradición desde el '97" },
          { type: "text", content: "<p>Fundados el 14 de febrero de 1997, Tacos El Güero es la definición de la taquería de confianza. Lo que empezó como un equipo pequeño enfocado en el detalle, hoy es un referente obligado para quien busca un auténtico taco de bistec o un \"pirata\" bien servido. Su visión siempre fue clara: fascinar al paladar mexicano con calidad e higiene. Si quieres saber a qué sabe el esfuerzo de una familia regia que no ha parado en casi 30 años, este es el lugar.</p>" },
        ]}
      />

      <ImageBanner
        image="/images/historias/el-guero.jpg"
        imageAlt="Tacos El Güero"
        desktopHeight={55}
        mobileHeight={70}
        blocks={[]}
      />

      {/* Historia 4: Las boleras */}
      <RichText
        blocks={[
          { type: "heading", text: "Las boleras del Centro de Monterrey" },
          { type: "text", content: "<p><strong>El Brillo que Refleja el Carácter: Las Bolerías del Centro</strong></p><p>En Monterrey, dicen que \"por los zapatos se conoce al hombre\", es por eso que los detalles lo son todo, y en la Sultana del Norte, no hay detalle más respetado que un calzado impecable. Las boleras de zapatos del Centro, ubicadas estratégicamente en la Plaza Hidalgo, la Macroplaza y bajo los portales de los edificios históricos, son mucho más que simples puestos de trabajo; son los últimos bastiones de una tradición que se resiste a desaparecer.</p><p>Un Ritual de Conexión y Política Sentarse en el trono de madera y cuero de un bolero regio es un ritual de paso. Durante décadas, estos espacios han sido los verdaderos \"centros de inteligencia\" de la ciudad. Mientras el maestro bolero aplica la tinta y el cepillo con un ritmo hipnótico, se cierran tratos, se discuten los fichajes de los equipos locales y se analiza la política del estado. Es el lugar donde el alto ejecutivo y el trabajador se sientan hombro con con hombro, unidos por el deseo de llevar un lustre de espejo.</p>" },
        ]}
      />

      <SectionVideo
        videoUrl="https://www.youtube.com/watch?v=e-cmL5iXrdQ"
        coverImage="/images/historias/boleras.jpg"
        coverImageAlt="Las boleras del Centro de Monterrey"
      />
    </>
  );
}
