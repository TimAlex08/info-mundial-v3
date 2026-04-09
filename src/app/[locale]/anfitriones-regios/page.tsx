import { setRequestLocale } from "next-intl/server";
import { MediaWithText } from "@/components/sections/media-with-text";
import { RichText } from "@/components/sections/rich-text";
import { HorizontalScrollingBanners } from "@/components/sections/horizontal-scrolling-banners";
import { CollapsibleTabs } from "@/components/sections/collapsible-tabs";
import { IconsWithText } from "@/components/sections/icons-with-text";
import { AnchorLink } from "@/components/sections/anchor-link";

export default async function AnfitrionesRegiosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <MediaWithText
        image="/images/Voluntarios.png"
        imageAlt="Anfitriones Regios 2026"
        sectionWidth="narrow"
        swapMedia
        mediaRatio="original"
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#ffffff"
        desktopPaddingTop={32}
        desktopPaddingBottom={-48}
        blocks={[
          { type: "heading", text: "Anfitriones Regios 2026" },
          { type: "text", content: "<h5>Forma parte del Mundial 2026 y representa la hospitalidad de Monterrey ante visitantes de todo el mundo.</h5>" },
          { type: "subheading", text: "Súmate al programa oficial de voluntariado del Municipio de Monterrey para recibir, orientar y apoyar a quienes visitarán nuestra ciudad durante el evento más importante del planeta." },
          { type: "button", label: "QUIERO SER ANFITRIÓN REGIO", style: "solid" },
          { type: "subheading", text: "Registro gratuito. Cupos limitados." },
        ]}
      />

      <RichText
        sectionWidth="narrow"
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#ffffff"
        desktopPaddingBottom={48}
        blocks={[
          { type: "heading", text: "¿Qué es Anfitriones Regios 2026?" },
          { type: "text", content: "<p>Anfitriones Regios 2026 es el programa oficial de voluntariado del Municipio de Monterrey para el periodo del Mundial de la FIFA 2026.</p><p>Su objetivo es integrar, capacitar y coordinar a ciudadanos que apoyen a visitantes nacionales e internacionales con orientación, información y acompañamiento en puntos estratégicos de la ciudad, asegurando una experiencia segura, organizada y memorable para todos.</p><p>Ser Anfitrión Regio es ser <strong>la cara de Monterrey ante el mundo.</strong></p>" },
        ]}
      />

      <HorizontalScrollingBanners
        blocks={[
          {
            type: "media",
            desktopSize: "big",
            image: "/images/Voluntarios-4.jpg",
            imageAlt: "Voluntarios en acción",
          },
          {
            type: "text",
            desktopSize: "big",
            centerText: false,
            verticalAlign: "center",
            horizontalAlign: "center",
            narrowContent: true,
            heading: "¿Qué hace un Anfitrión Regio?",
            text: "<ul><li>Orienta a visitantes en zonas turísticas, sedes y eventos oficiales.</li><li>Apoya en movilidad, rutas, accesos y transporte.</li><li>Brinda información cultural, gastronómica y de servicios.</li><li>Canaliza incidencias o situaciones especiales a las autoridades correspondientes.</li><li>Representa los valores de hospitalidad, respeto y orgullo regio.</li></ul>",
            colorType: "custom",
            backgroundColor: "#db0138",
            textColor: "#ffffff",
          },
          {
            type: "media_with_text",
            desktopSize: "big",
            contentPosition: "top",
            image: "/images/Voluntarios-3.jpg",
            imageAlt: "Grupo de voluntarios",
            overlayColor: "#000000",
            overlayOpacity: 70,
            centerText: false,
            narrowContent: true,
            text: "<p><em>No necesitas experiencia previa, solo actitud de servicio.</em></p>",
            colorType: "custom",
            backgroundColor: "#82bbe8",
            textColor: "#000000",
          },
        ]}
      />

      <CollapsibleTabs
        heading="Roles disponibles"
        sectionWidth="narrow"
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#ffffff"
        desktopPaddingTop={36}
        desktopPaddingBottom={52}
        blocks={[
          { type: "tab", heading: "City Host", content: "<p>Orientación turística, cultural y general en puntos de alta afluencia.</p>" },
          { type: "tab", heading: "Trail Host", content: "<p> Apoyo en movilidad, rutas, transporte público y accesos.</p>" },
          { type: "tab", heading: "Sky Host", content: "<p>Atención y orientación en aeropuertos y terminales.</p>" },
          { type: "tab", heading: "Zone Host", content: "<p>Supervisión de zonas clave y coordinación básica en campo.</p>" },
          { type: "tab", heading: "Safe Host", content: "<p>Detección de riesgos, apoyo en casos sensibles y canalización adecuada.</p>" },
          { type: "tab", heading: "Rescue Host", content: "<p>Apoyo en primeros auxilios básicos y respuesta inicial ante incidentes.</p>" },
        ]}
      />

      <RichText
        sectionWidth="narrow"
        desktopPaddingTop={48}
        blocks={[
          { type: "heading", text: "¿Qué obtienes al ser Anfitrión Regio?" },
          { type: "text", content: "<p>Además de vivir el Mundial desde dentro, ser Anfitrión Regio te ofrece beneficios formativos, profesionales y personales.</p>" },
        ]}
      />

      <IconsWithText
        centerText
        iconSize={152}
        items={[
          {
            image: "/images/Voluntarios-4.jpg",
            imageAlt: "Valor académico y profesional",
            heading: "Valor académico y profesional",
            text: "<p><strong>Horas de servicio social y/o prácticas profesionales</strong> (válidas para universidades participantes)</p><p><strong>Constancia oficial con valor curricular</strong> Emitida por el Municipio de Monterrey.</p>",
          },
          {
            image: "/images/Voluntarios-5.jpg",
            imageAlt: "Recursos y capacitación",
            heading: "Recursos y capacitación",
            text: "<p><strong>Uniforme oficial, gafete y kit de bienvenida</strong></p><p><strong>Capacitación gratuita en:</strong></p><ul><li>Atención turística</li><li>Hospitalidad</li><li>Movilidad</li><li>Seguridad</li><li>Primeros auxilios</li></ul>",
          },
          {
            image: "/images/Voluntarios-7.jpg",
            imageAlt: "Experiencia y reconocimiento",
            heading: "Experiencia y reconocimiento",
            text: "<p><strong>Reconocimiento público por tu participación</strong></p><p><strong>Acceso a experiencias y convivencias exclusivas del programa</strong></p>",
          },
          {
            image: "/images/Voluntarios-6.jpg",
            imageAlt: "Beneficios adicionales",
            heading: "Beneficios adicionales",
            text: "<p><strong>Descuentos en comercios aliados</strong></p>",
          },
        ]}
      />

      <RichText
        sectionWidth="narrow"
        centerText
        desktopPaddingTop={-20}
        desktopPaddingBottom={48}
        blocks={[
          { type: "text", content: "<p>Todos los beneficios están sujetos a cumplimiento del programa y participación activa.</p>" },
        ]}
      />

      <RichText
        sectionWidth="narrow"
        colorType="custom"
        backgroundColor="#82bbe8"
        textColor="#1f3359"
        desktopPaddingTop={32}
        desktopPaddingBottom={32}
        blocks={[
          { type: "heading", text: "REQUISITOS" },
          { type: "text", content: "<ul><li>Tener 18 años cumplidos.</li><li>Residir en Monterrey.</li><li>Disponibilidad para capacitaciones y turnos durante el programa.</li><li>Interés genuino en atención al visitante y servicio comunitario.</li><li>Contar con teléfono celular (smartphone) activo.</li></ul>" },
        ]}
      />

      <MediaWithText
        image="/images/Voluntarios-2.png"
        imageAlt="Proceso de registro"
        sectionWidth="narrow"
        swapMedia
        mediaRatio="original"
        desktopPaddingBottom={4}
        blocks={[
          { type: "heading", text: "¿Cómo es el proceso?" },
          { type: "text", content: "<p><strong>1. </strong>Registro en línea.<br/><strong>2. </strong>Validación de datos.<br/><strong>3. </strong>Sesión informativa.<br/><strong>4. </strong>Capacitación.<br/><strong>5. </strong>Asignación de rol y zona.</p>" },
          { type: "subheading", text: "Registro gratuito. Cupos limitados." },
          { type: "button", label: "REGÍSTRATE COMO ANFITRIÓN REGIO", style: "solid" },
          { type: "subheading", text: "Es gratis y toma menos de 2 minutos." },
        ]}
      />

      <AnchorLink anchorId="instrucciones" />

      <RichText
        sectionWidth="narrow"
        blocks={[
          { type: "heading", text: "Instrucciones" },
          { type: "text", content: "<p>Para poder participar como voluntario, llena el siguiente formulario.</p><ol><li>Elige el Rol en el que quisieras participar.</li><li>En el texto, por favor déjanos tu número celular para Whatsapp y tu fecha de nacimiento.</li><li>Adjunta al formato una foto de tu INE, un comprobante de domicilio con una vigencia no mayor a 3 meses y tu CURP.</li></ol>" },
        ]}
      />

      <CollapsibleTabs
        heading="Preguntas frecuentes"
        sectionWidth="narrow"
        colorType="custom"
        backgroundColor="#2e4785"
        textColor="#ffffff"
        desktopPaddingTop={36}
        desktopPaddingBottom={52}
        blocks={[
          { type: "tab", heading: "¿Tiene algún costo participar?", content: "<p> No. El programa es completamente gratuito.</p>" },
          { type: "tab", heading: "¿Recibiré algún reconocimiento?", content: "<p> Sí. Constancia oficial, uniforme y capacitación.</p>" },
          { type: "tab", heading: "¿Sirve como servicio social o prácticas?", content: "<p> Sí, para universidades participantes.</p>" },
          { type: "tab", heading: "¿Puedo darme de baja si no puedo continuar?", content: "<p> Sí. El programa es voluntario.</p>" },
          { type: "tab", heading: "¿Cuándo me contactan después de registrarme?", content: "<p> El Municipio se comunicará contigo conforme avances en el proceso.</p>" },
        ]}
      />
    </>
  );
}
