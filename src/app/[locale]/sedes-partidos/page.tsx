import { setRequestLocale } from "next-intl/server";
import { RichText } from "@/components/sections/rich-text";
import { Banners } from "@/components/sections/banners";
import { Multicolumn } from "@/components/sections/multicolumn";

export default async function SedesPartidosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <RichText
        sectionWidth="narrow"
        desktopPaddingTop={20}
        desktopPaddingBottom={16}
        blocks={[
          { type: "subheading", text: "SEDES DEL MUNDIAL" },
          { type: "heading", text: "DONDE LA MAGIA SUCEDE (DENTRO Y FUERA DE LA CANCHA)", tag: "h1" },
          { type: "text", content: "<p>Cuando hablamos de sedes, no solo nos referimos al Estadio Monterrey, sino también a las <strong>canchas de entrenamiento</strong> que usarán las selecciones. </p><p>Esto es un <em>Regio-Tip</em> de oro: a veces, los entrenamientos abiertos son la mejor forma de ver a tus ídolos de cerca.</p>" },
        ]}
      />

      <Banners
        subheading="El Estadio Monterrey"
        heading="Nuestra Joya de la Corona"
        text="<p>Ya hablaremos de su historia y su belleza, pero como sede del Mundial, el estadio se transforma en una fortaleza logística.</p>"
        mediaRatio="square"
        cardButtonStyle="outlined"
        colorType="custom"
        backgroundColor="#db0138"
        textColor="#ffffff"
        desktopPaddingTop={56}
        desktopPaddingBottom={24}
        items={[
          {
            type: "image",
            image: "/images/sedes/capacidad.jpg",
            imageAlt: "Capacidad y Comodidad",
            heading: "Capacidad y Comodidad",
            text: "<p>Es moderno, con excelentes butacas y visibilidad. Las rampas de acceso y las zonas de concesiones están diseñadas para manejar grandes flujos de gente.</p>",
          },
          {
            type: "image",
            image: "/images/sedes/accesos.png",
            imageAlt: "Accesos Estratégicos",
            heading: "Accesos Estratégicos",
            text: "<p>El día del partido, la zona vehicular será una pesadilla. Por ello, <strong>la sede clave de movilidad es el Metrorrey</strong>, que conecta con los <em>shuttles</em> en el perímetro. </p>",
          },
        ]}
      />

      <RichText
        sectionWidth="narrow"
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#ffffff"
        desktopPaddingTop={36}
        blocks={[
          { type: "heading", text: "Las Sedes de Entrenamiento: Tu Oportunidad de Verlos Cerca" },
          { type: "text", content: "<p>La FIFA exige canchas de entrenamiento de primer nivel. En Monterrey, los candidatos más probables y con la infraestructura ideal son:</p>" },
        ]}
      />

      <Multicolumn
        mediaRatio="square"
        buttonStyle="outlined"
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#ffffff"
        desktopPaddingBottom={44}
        items={[
          {
            type: "image",
            image: "/images/sedes/el-barrial.jpg",
            imageAlt: "El Barrial (Rayados)",
            heading: "El Barrial (Rayados)",
            text: "<p>Las instalaciones de entrenamiento del Club Monterrey son de clase mundial.</p>",
          },
          {
            type: "image",
            image: "/images/sedes/la-uanl.jpg",
            imageAlt: "La UANL (Tigres)",
            heading: "La UANL (Tigres)",
            text: "<p>El equipo rival tiene también instalaciones de alto nivel que podrían ser utilizadas.</p>",
          },
          {
            type: "image",
            image: "/images/sedes/campus.png",
            imageAlt: "Campus de Universidades/Clubes Privados",
            heading: "Campus de Universidades/Clubes Privados",
            text: "<p>Canchas que cumplan con los estándares de privacidad y césped.</p>",
          },
        ]}
      />
    </>
  );
}
