import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { MediaWithText } from "@/components/sections/media-with-text";
import { RichText } from "@/components/sections/rich-text";
import { HorizontalScrollingBanners } from "@/components/sections/horizontal-scrolling-banners";
import { CollapsibleTabs } from "@/components/sections/collapsible-tabs";
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
      {/* Hero + ¿Qué es? — fondo azul continuo */}
      <div style={{ backgroundColor: "#1f3359", color: "#ffffff" }}>
        {/* Hero — Ilustración + CTA */}
        <MediaWithText
          image="/images/anfitriones_regios/Voluntarios.png"
          imageAlt="Anfitriones Regios 2026"
          sectionWidth="narrow"
          mediaRatio="original"
          horizontalAlign="center"
          desktopPaddingTop={64}
          desktopPaddingBottom={32}
          className="text-sm [&_h2]:!text-lg [&_h2]:md:!text-xl"
          blocks={[
            { type: "heading", text: "ANFITRIONES REGIOS 2026" },
            { type: "text", content: "<p><em>Forma parte del Mundial 2026 y representa la hospitalidad de Monterrey ante visitantes de todo el mundo.</em></p>" },
            { type: "text", content: "<p>Súmate al programa oficial de voluntariado del Municipio de Monterrey para recibir, orientar y apoyar a quienes visitarán nuestra ciudad durante el evento más importante del planeta.</p>" },
            { type: "button", label: "QUIERO SER ANFITRIÓN REGIO", style: "outlined" },
            { type: "text", content: "<p>Registro gratuito. Cupos limitados.</p>" },
          ]}
        />

        {/* ¿Qué es Anfitriones Regios 2026? */}
        <RichText
          sectionWidth="narrow"
          desktopPaddingTop={32}
          desktopPaddingBottom={64}
          className="text-sm [&_h2]:!text-lg [&_h2]:md:!text-xl"
          blocks={[
            { type: "heading", text: "¿QUÉ ES ANFITRIONES REGIOS 2026?" },
            { type: "text", content: "<p>Anfitriones Regios 2026 es el programa oficial de voluntariado del Municipio de Monterrey para el periodo del Mundial de la FIFA 2026.</p><p>Su objetivo es integrar, capacitar y coordinar a ciudadanos que apoyen a visitantes nacionales e internacionales con orientación, información y acompañamiento en puntos estratégicos de la ciudad, asegurando una experiencia segura, organizada y memorable para todos.</p><p>Ser Anfitrión Regio es ser <strong>la cara de Monterrey ante el mundo.</strong></p>" },
          ]}
        />
      </div>

      {/* Scroll horizontal — ¿Qué hace un Anfitrión Regio? */}
      <HorizontalScrollingBanners
        id="anfitriones-scroll"
        blocks={[
          {
            type: "media",
            desktopSize: "small",
            image: "/images/anfitriones_regios/voluntarios_2.jpg",
            imageAlt: "Voluntarios en acción",
          },
          {
            type: "text",
            desktopSize: "small",
            centerText: false,
            verticalAlign: "center",
            horizontalAlign: "left",
            narrowContent: true,
            heading: "¿QUÉ HACE UN ANFITRIÓN REGIO?",
            text: "<ul><li>Orienta a visitantes en zonas turísticas, sedes y eventos oficiales.</li><li>Apoya en movilidad, rutas, accesos y transporte.</li><li>Brinda información cultural, gastronómica y de servicios.</li><li>Canaliza incidencias o situaciones especiales a las autoridades correspondientes.</li><li>Representa los valores de hospitalidad, respeto y orgullo regio.</li></ul>",
            colorType: "custom",
            backgroundColor: "#db0138",
            textColor: "#ffffff",
          },
          {
            type: "media_with_text",
            desktopSize: "small",
            contentPosition: "top",
            image: "/images/voluntarios/Voluntarios-3.jpg",
            imageAlt: "Vista panorámica de Monterrey",
            overlayColor: "#000000",
            overlayOpacity: 0,
            centerText: false,
            narrowContent: true,
            text: "<p><em>No necesitas experiencia previa, solo actitud de servicio.</em></p>",
            buttonLabel: "QUIERO PARTICIPAR COMO VOLUNTARIO",
            buttonStyle: "solid",
            colorType: "custom",
            backgroundColor: "#82bbe8",
            textColor: "#000000",
          },
        ]}
      />

      {/* Roles disponibles — Accordion */}
      <CollapsibleTabs
        heading="ROLES DISPONIBLES"
        description="<em>El rol final se define después de tu registro y capacitación.</em>"
        centerText
        sectionWidth="full-width"
        colorType="custom"
        backgroundColor="#1f3359"
        textColor="#ffffff"
        desktopPaddingTop={36}
        desktopPaddingBottom={52}
        blocks={[
          { type: "tab", heading: "CITY HOST", content: "<p>Orientación turística, cultural y general en puntos de alta afluencia.</p>" },
          { type: "tab", heading: "TRAIL HOST", content: "<p>Apoyo en movilidad, rutas, transporte público y accesos.</p>" },
          { type: "tab", heading: "SKY HOST", content: "<p>Atención y orientación en aeropuertos y terminales.</p>" },
          { type: "tab", heading: "ZONE HOST", content: "<p>Supervisión de zonas clave y coordinación básica en campo.</p>" },
          { type: "tab", heading: "SAFE HOST", content: "<p>Detección de riesgos, apoyo en casos sensibles y canalización adecuada.</p>" },
          { type: "tab", heading: "RESCUE HOST", content: "<p>Apoyo en primeros auxilios básicos y respuesta inicial ante incidentes.</p>" },
        ]}
      />

      {/* ¿Qué obtienes? — Tarjetas de beneficios */}
      <section
        className="w-full"
        style={{ paddingTop: 48, paddingBottom: 48 }}
      >
        <div className="mx-auto w-full px-6 md:max-w-[66%] md:px-0">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">¿QUÉ OBTIENES AL SER ANFITRIÓN REGIO?</h2>
            <p className="mt-4 opacity-70">Además de vivir el Mundial desde dentro, ser Anfitrión Regio te ofrece beneficios formativos, profesionales y personales.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[var(--radius)] border border-[#1f3359] bg-white p-6 text-center shadow-md">
              <div className="relative mx-auto mb-4 h-28 w-28 shrink-0 overflow-hidden rounded-[var(--radius)]">
                <Image src="/images/voluntarios/Voluntarios-4.jpg" alt="Valor académico y profesional" fill className="object-cover" sizes="112px" />
              </div>
              <h3 className="mb-3 text-base font-bold uppercase">Valor Académico y Profesional</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li><strong>Horas de servicio social y/o prácticas profesionales</strong> (válidas para universidades participantes)</li>
                <li><strong>Constancia oficial con valor curricular</strong> emitida por el Municipio de Monterrey</li>
              </ul>
            </div>

            <div className="rounded-[var(--radius)] border border-[#1f3359] bg-white p-6 text-center shadow-md">
              <div className="relative mx-auto mb-4 h-28 w-28 shrink-0 overflow-hidden rounded-[var(--radius)]">
                <Image src="/images/voluntarios/Voluntarios-5.jpg" alt="Recursos y capacitación" fill className="object-cover" sizes="112px" />
              </div>
              <h3 className="mb-3 text-base font-bold uppercase">Recursos y Capacitación</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li><strong>Uniforme oficial, gafete y kit de bienvenida</strong></li>
                <li><strong>Capacitación gratuita en:</strong> atención turística, hospitalidad, movilidad, seguridad y primeros auxilios</li>
              </ul>
            </div>

            <div className="rounded-[var(--radius)] border border-[#1f3359] bg-white p-6 text-center shadow-md">
              <div className="relative mx-auto mb-4 h-28 w-28 shrink-0 overflow-hidden rounded-[var(--radius)]">
                <Image src="/images/voluntarios/Voluntarios-7.jpg" alt="Experiencia y reconocimiento" fill className="object-cover" sizes="112px" />
              </div>
              <h3 className="mb-3 text-base font-bold uppercase">Experiencia y Reconocimiento</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li><strong>Reconocimiento público</strong> por tu participación</li>
                <li><strong>Acceso a experiencias y convivencias exclusivas</strong> del programa</li>
              </ul>
            </div>

            <div className="rounded-[var(--radius)] border border-[#1f3359] bg-white p-6 text-center shadow-md">
              <div className="relative mx-auto mb-4 h-28 w-28 shrink-0 overflow-hidden rounded-[var(--radius)]">
                <Image src="/images/voluntarios/Voluntarios-6.jpg" alt="Beneficios adicionales" fill className="object-cover" sizes="112px" />
              </div>
              <h3 className="mb-3 text-base font-bold uppercase">Beneficios Adicionales</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li><strong>Descuentos en comercios aliados</strong></li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-center text-sm opacity-60">Todos los beneficios están sujetos a cumplimiento del programa y participación activa.</p>
        </div>
      </section>

      {/* Requisitos */}
      <div style={{ backgroundColor: "#82bbe8", color: "#1f3359" }}>
        <RichText
          sectionWidth="narrow"
          desktopPaddingTop={32}
          desktopPaddingBottom={32}
          blocks={[
            { type: "heading", text: "REQUISITOS" },
            { type: "text", content: "<ul><li>Tener 18 años cumplidos.</li><li>Residir en Monterrey.</li><li>Disponibilidad para capacitaciones y turnos durante el programa.</li><li>Interés genuino en atención al visitante y servicio comunitario.</li><li>Contar con teléfono celular (smartphone) activo.</li></ul>" },
          ]}
        />
      </div>

      {/* ¿Cómo es el proceso? */}
      <MediaWithText
        image="/images/voluntarios/Voluntarios-2.png"
        imageAlt="Proceso de registro"
        sectionWidth="narrow"
        mediaRatio="original"
        desktopPaddingTop={48}
        desktopPaddingBottom={48}
        blocks={[
          { type: "heading", text: "¿CÓMO ES EL PROCESO?" },
          { type: "text", content: "<p><strong>1.</strong> Registro en línea.<br/><strong>2.</strong> Validación de datos.<br/><strong>3.</strong> Sesión informativa.<br/><strong>4.</strong> Capacitación.<br/><strong>5.</strong> Asignación de rol y zona.</p>" },
          { type: "subheading", text: "Registro gratuito. Cupos limitados." },
          { type: "button", label: "REGÍSTRATE COMO ANFITRIÓN REGIO", style: "solid" },
          { type: "subheading", text: "Es gratis y toma menos de 2 minutos." },
        ]}
      />

      <AnchorLink anchorId="instrucciones" />

      {/* Instrucciones */}
      <RichText
        sectionWidth="narrow"
        desktopPaddingTop={48}
        desktopPaddingBottom={48}
        blocks={[
          { type: "line" },
          { type: "empty_space", desktopHeight: 24 },
          { type: "heading", text: "INSTRUCCIONES" },
          { type: "text", content: "<p>Para poder participar como voluntario, llena el siguiente formulario.</p><p>1. Elige el Rol en el que quisieras participar.</p><p>2. En el texto, por favor déjanos tu número celular para Whatsapp y tu fecha de nacimiento.</p><p>3. Adjunta al formato una foto de tu INE, un comprobante de domicilio con una vigencia no mayor a 3 meses y tu CURP.</p>" },
        ]}
      />

      {/* Preguntas frecuentes */}
      <CollapsibleTabs
        heading="PREGUNTAS FRECUENTES"
        centerText
        sectionWidth="full-width"
        colorType="custom"
        backgroundColor="#2e4785"
        textColor="#ffffff"
        desktopPaddingTop={36}
        desktopPaddingBottom={52}
        blocks={[
          { type: "tab", heading: "¿Tiene algún costo participar?", content: "<p>No. El programa es completamente gratuito.</p>" },
          { type: "tab", heading: "¿Recibiré algún reconocimiento?", content: "<p>Sí. Constancia oficial, uniforme y capacitación.</p>" },
          { type: "tab", heading: "¿Sirve como servicio social o prácticas?", content: "<p>Sí, para universidades participantes.</p>" },
          { type: "tab", heading: "¿Puedo darme de baja si no puedo continuar?", content: "<p>Sí. El programa es voluntario.</p>" },
          { type: "tab", heading: "¿Cuándo me contactan después de registrarme?", content: "<p>El Municipio se comunicará contigo conforme avances en el proceso.</p>" },
        ]}
      />
    </>
  );
}
