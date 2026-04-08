# Plan de Migración: Shopify Avante → Next.js

## Portal Informativo Monterrey FIFA 2026

---

## Índice

1. [Resumen del proyecto](#1-resumen-del-proyecto)
2. [Decisiones de alcance](#2-decisiones-de-alcance)
3. [Arquitectura del nuevo proyecto](#3-arquitectura-del-nuevo-proyecto)
4. [Fase 0 — Scaffold y configuración base](#4-fase-0--scaffold-y-configuración-base)
5. [Fase 1 — Layout y navegación](#5-fase-1--layout-y-navegación)
6. [Fase 2 — Secciones (componentes de página)](#6-fase-2--secciones-componentes-de-página)
7. [Fase 3 — Snippets (sub-componentes)](#7-fase-3--snippets-sub-componentes)
8. [Fase 4 — Templates (páginas)](#8-fase-4--templates-páginas)
9. [Fase 5 — Assets (CSS/JS)](#9-fase-5--assets-cssjs)
10. [Fase 6 — Locales (i18n)](#10-fase-6--locales-i18n)
11. [Fase 7 — Videos y media](#11-fase-7--videos-y-media)
12. [Fase 8 — SEO y performance](#12-fase-8--seo-y-performance)
13. [Fase 9 — Deploy](#13-fase-9--deploy)
14. [Apéndice A — Mapa completo de archivos](#apéndice-a--mapa-completo-de-archivos)
15. [Apéndice B — Instrucciones para Claude Code](#apéndice-b--instrucciones-para-claude-code)

---

## 1. Resumen del proyecto

### Qué es hoy

Un sitio web construido sobre **Shopify** usando el tema premium **Avante v12.0.0** (por Staylime). Aunque Shopify es una plataforma de e-commerce, el sitio se usa como **portal informativo** para promover Monterrey como sede del Mundial FIFA 2026.

### Qué será

Una aplicación **Next.js 15+** (App Router) desplegada en **Vercel**, 100% estática, sin e-commerce, sin CMS, sin formularios. El contenido se hardcodea directamente en componentes y archivos estáticos.

### Inventario actual del proyecto Shopify

| Carpeta | Archivos | Descripción |
|---|---|---|
| `layout/` | 2 | Esqueletos HTML base (theme.liquid, password.liquid) |
| `templates/` | 56 | Definiciones JSON de qué secciones tiene cada página |
| `sections/` | 93 | Componentes visuales de página (.liquid) |
| `snippets/` | 81 | Fragmentos reutilizables pequeños (.liquid) |
| `assets/` | 148 | 118 CSS + 30 JS |
| `config/` | 2 | Schema de configuración + valores actuales |
| `locales/` | 10 | Traducciones en 5 idiomas (ES, EN, FR, DE, IT) |
| **Total** | **392** | |

### Qué se migra realmente

| Carpeta | Total | Migrar | Ignorar | Motivo de exclusión |
|---|---|---|---|---|
| `layout/` | 2 | 1 | 1 | password.liquid no se necesita |
| `templates/` | 56 | 38 | 18 | E-commerce, cuenta usuario, duplicados |
| `sections/` | 93 | 30 | 63 | 49 son plantilla genérica de Avante + e-commerce |
| `snippets/` | 81 | 30 | 51 | 25 son e-commerce, 25 son de secciones no usadas, 1 sin uso |
| `assets/` | 148 | ~60 | ~88 | Se convierten a Tailwind, no se copian |
| `config/` | 2 | 0 | 2 | Solo referencia para extraer design tokens |
| `locales/` | 10 | 5 | 5 | Los .schema.json son para el admin de Shopify |
| **Total** | **392** | **~164** | **~228** | **Se descarta el 58% del código** |

---

## 2. Decisiones de alcance

| Aspecto | Decisión | Impacto |
|---|---|---|
| E-commerce | **NO** — sitio 100% informativo | Elimina ~10 secciones, ~25 snippets, 7 templates de cuenta |
| CMS | **NO** — contenido hardcodeado, assets locales | Sin API calls, sin data fetching dinámico |
| Idiomas | **5 idiomas** (ES, EN, FR, DE, IT) | Usar `next-intl` con archivos JSON locales |
| Blog/Noticias | Mantener estructura como páginas estáticas | Sin sistema de blog dinámico |
| Formularios | **NO** — eliminados | Elimina contact-form y newsletter |
| Videos | **Híbrido** — loops en `/public/`, largos embedidos | Videos cortos locales, YouTube/Vimeo para largos |
| Diseño | **Réplica fiel** del sitio actual | CSS de Avante como referencia directa |
| Deploy | **Vercel** | Optimizado para Next.js, SSG |

---

## 3. Arquitectura del nuevo proyecto

### Stack tecnológico

| Capa | Tecnología | Justificación |
|---|---|---|
| Framework | Next.js 15+ (App Router) | SSG nativo, Image optimization, i18n routing |
| Lenguaje | TypeScript | Type safety |
| Estilos | Tailwind CSS v4 | Utility-first, replica el sistema de design tokens |
| Componentes UI | shadcn/ui | Base para accordion, buttons, etc. |
| Carruseles | Swiper | Mismo que usa el tema Avante |
| Animaciones | Framer Motion | Reemplaza TweenMax/GSAP del tema |
| i18n | next-intl | Routing por locale, mensajes JSON |
| Deploy | Vercel | SSG + Edge |

### Estructura de carpetas del proyecto Next.js

```
codigo-mty/
├── public/
│   ├── images/                  ← Imágenes estáticas del sitio
│   ├── videos/                  ← Videos cortos (loops, backgrounds)
│   ├── fonts/                   ← Fuentes custom
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx       ← Layout principal (= theme.liquid)
│   │   │   ├── page.tsx         ← Home (= templates/index.json)
│   │   │   ├── explora-monterrey/
│   │   │   │   └── page.tsx
│   │   │   ├── partidos-y-sedes/
│   │   │   │   └── page.tsx
│   │   │   ├── hospedaje-y-zonas/
│   │   │   │   └── page.tsx
│   │   │   ├── cultura-y-experiencias/
│   │   │   │   └── page.tsx
│   │   │   ├── transporte-y-movilidad/
│   │   │   │   └── page.tsx
│   │   │   ├── ... (cada página es una ruta)
│   │   │   └── not-found.tsx    ← 404
│   │   └── globals.css          ← Variables CSS globales + resets
│   │
│   ├── components/
│   │   ├── layout/              ← Header, Footer, Navigation
│   │   │   ├── DesktopHeader.tsx
│   │   │   ├── MobileHeader.tsx
│   │   │   ├── MegaMenuDrawer.tsx
│   │   │   ├── AnnouncementBar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Flyout.tsx
│   │   │   └── BackToTop.tsx
│   │   │
│   │   ├── sections/            ← Componentes de sección (= sections/)
│   │   │   ├── VideoBanner.tsx
│   │   │   ├── ImageWithHotspots.tsx
│   │   │   ├── Multicolumn.tsx
│   │   │   ├── HorizontalScrollingBanners.tsx
│   │   │   ├── MediaWithTabs.tsx
│   │   │   ├── SlideshowWithMedia.tsx
│   │   │   ├── CollapsibleTabs.tsx
│   │   │   ├── Events.tsx
│   │   │   ├── RichText.tsx
│   │   │   ├── Banners.tsx
│   │   │   ├── SplitBanner.tsx
│   │   │   ├── BannerGallery.tsx
│   │   │   ├── ImageBanner.tsx
│   │   │   ├── MediaWithText.tsx
│   │   │   ├── ScrollingPromotion.tsx
│   │   │   ├── SectionVideo.tsx
│   │   │   ├── FeaturedBlog.tsx
│   │   │   ├── IconsWithText.tsx
│   │   │   ├── CustomLiquid.tsx  ← Se renombra a CustomHTML
│   │   │   └── MainPage.tsx
│   │   │
│   │   └── ui/                  ← Sub-componentes reutilizables (= snippets/)
│   │       ├── Button.tsx       ← Extender shadcn con variantes del tema
│   │       ├── Icon.tsx
│   │       ├── CountdownTimer.tsx
│   │       ├── ContextImage.tsx
│   │       ├── VideoButton.tsx
│   │       ├── Breadcrumbs.tsx
│   │       ├── SocialMedia.tsx
│   │       ├── Logo.tsx
│   │       ├── Divider.tsx
│   │       ├── Spacer.tsx
│   │       ├── ShareButton.tsx
│   │       ├── ArticleCard.tsx
│   │       ├── SwiperCarousel.tsx
│   │       └── Accordion.tsx    ← shadcn base
│   │
│   ├── lib/
│   │   ├── utils.ts             ← Utilidades (cn, formatDate, etc.)
│   │   └── constants.ts         ← Constantes del sitio
│   │
│   ├── i18n/
│   │   ├── request.ts           ← Config de next-intl
│   │   └── routing.ts           ← Routing config
│   │
│   ├── messages/                ← Archivos de traducción
│   │   ├── es.json
│   │   ├── en.json
│   │   ├── fr.json
│   │   ├── de.json
│   │   └── it.json
│   │
│   └── styles/
│       └── sections/            ← CSS Modules para secciones complejas
│           ├── video-banner.module.css
│           ├── horizontal-scrolling.module.css
│           └── ...
│
├── tailwind.config.ts           ← Design tokens extraídos del tema
├── next.config.ts
├── tsconfig.json
├── package.json
└── PLAN-MIGRACION-NEXTJS.md     ← Este archivo
```

---

## 4. Fase 0 — Scaffold y configuración base

### Paso 0.1 — Crear el proyecto

```bash
npx create-next-app@latest codigo-mty --typescript --tailwind --app --src-dir --use-npm
```

### Paso 0.2 — Instalar dependencias

```bash
npm install next-intl swiper framer-motion
npm install -D @types/node
npx shadcn@latest init
npx shadcn@latest add accordion button
```

### Paso 0.3 — Extraer design tokens del tema Avante

**Archivo fuente:** `layout/theme.liquid` (líneas 82-235)
**Archivo destino:** `tailwind.config.ts`

Los siguientes valores se extraen de `config/settings_data.json` y se mapean a Tailwind:

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--layout-background-color))",
        foreground: "rgb(var(--layout-text-color))",
        primary: "rgb(var(--base-button-color))",
        accent: "rgb(var(--accent-button-color))",
        hover: "rgb(var(--hover-button-color))",
        brand: {
          red: "#db0138",
          blue: {
            dark: "#1f3359",
            DEFAULT: "#2e4785",
            light: "#82bbe8",
          },
        },
        sale: "rgb(var(--sale-text-color))",
        error: "rgb(var(--error-color))",
        success: "rgb(var(--success-color))",
      },
      screens: {
        sm: "640px",
        md: "920px",   // ← Breakpoint principal del tema Avante
        lg: "1024px",
        xl: "1400px",
      },
      maxWidth: {
        page: "var(--page-width)",
      },
      borderRadius: {
        button: "var(--button-radius)",
        field: "var(--field-radius)",
        section: "var(--images-and-section-radius)",
        card: "var(--product-card-radius)",
      },
      transitionDuration: {
        theme: "var(--animation-duration)",
      },
      fontFamily: {
        base: ["var(--font-base)", "sans-serif"],
        accent: ["var(--font-accent)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

### Paso 0.4 — Variables CSS globales

**Archivo fuente:** `layout/theme.liquid` líneas 82-235
**Archivo destino:** `src/app/globals.css`

Extraer todos los valores de `config/settings_data.json` y hardcodearlos como CSS custom properties:

```css
:root {
  --layout-background-color: 255, 255, 255;
  --layout-text-color: 0, 0, 0;
  --base-button-color: /* valor de settings_data.json */;
  --accent-button-color: /* valor de settings_data.json */;
  /* ... todos los tokens de theme.liquid líneas 82-235 */

  --page-width: /* desktop_max_width */px;
  --button-radius: /* button_radius */;
  --field-radius: /* field_radius */;
  --animation-duration: /* animation_duration */s;
  /* etc. */
}
```

**Instrucción para Claude Code:**
> Lee `config/settings_data.json`, busca la clave `"current"` → `"settings"`. Extrae todos los valores de color, tipografía, espaciado, border-radius, y animación. Genera el archivo `globals.css` con estas variables CSS hardcodeadas.

### Paso 0.5 — Configurar next-intl

**Archivos fuente:** `locales/es.json`, `locales/en.default.json`, `locales/fr.json`, `locales/de.json`, `locales/it.json`
**Archivos destino:** `src/messages/*.json`

```typescript
// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en", "fr", "de", "it"],
  defaultLocale: "es",
});
```

```typescript
// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

**Instrucción para Claude Code:**
> Copia los 5 archivos de locale (sin los .schema.json) a `src/messages/`. Renombra `en.default.json` a `en.json`. Los archivos ya están en formato JSON compatible con next-intl, pero revisa que las claves con prefijo `t:` se limpien (esas son referencias del schema de Shopify, no traducciones reales).

---

## 5. Fase 1 — Layout y navegación

### Qué es el layout en Shopify

`layout/theme.liquid` es el esqueleto HTML de **todas las páginas**. Contiene:
- `<head>` con meta tags, CSS, JS, fuentes
- Barra de anuncios
- Header (desktop + mobile)
- Menú drawer
- `{{ content_for_layout }}` — aquí se inyecta el contenido de cada página
- Footer
- Scripts globales

### Equivalente en Next.js

**`src/app/[locale]/layout.tsx`**

### Archivo: `layout/theme.liquid` → `src/app/[locale]/layout.tsx`

| Líneas en theme.liquid | Qué hace | Equivalente Next.js |
|---|---|---|
| 1-4 | HTML tag con lang, dir (RTL) | `<html lang={locale} dir={dir}>` en layout.tsx |
| 5-16 | Meta tags, preconnect | `metadata` export en layout.tsx |
| 18-20 | Favicon | `metadata.icons` |
| 22-35 | `<title>` dinámico | `metadata.title` template |
| 37-39 | Meta description | `metadata.description` |
| 41 | `{% render 'meta-tags' %}` | Componente `<MetaTags />` o metadata API |
| 43-48 | Script loading (swiper, masonry, global.js) | Imports en componentes que los usan |
| 66 | `{{ content_for_header }}` | Shopify-specific, eliminar |
| 68-79 | Font loading | `next/font` |
| 74-248 | CSS custom properties `{% style %}` | `globals.css` (Fase 0.4) |
| 249 | `{% render 'font-variables' %}` | Parte de `globals.css` |
| 250-257 | Stylesheet loading | Tailwind + CSS Modules |
| 260-265 | JS class toggle (no-js→js) | No necesario |
| 267-300 | Body classes (typography preset) | Classes de Tailwind en `<body>` |
| 302-303 | `{% section 'announcement-bar' %}` | `<AnnouncementBar />` |
| 304-308 | Menu drawer | `<MegaMenuDrawer />` |
| 313-343 | Content wrapper + header + main | Estructura JSX |
| 340 | `{{ content_for_layout }}` | `{children}` |
| 342 | `{% sections 'footer-group' %}` | `<Footer />` + `<Flyout />` |
| 347-367 | Quick view drawer | **ELIMINAR** (e-commerce) |
| 369-418 | Global JS variables (routes, cart) | **ELIMINAR** (e-commerce) |
| 420-460 | Scripts finales | Importados donde se usen |

### Componentes de layout a crear

#### 5.1 — `DesktopHeader.tsx`

**Fuente Shopify:** `sections/header.liquid`
**CSS asociado:** `assets/header.css`, `assets/menu.css`, `assets/mega-menu.css`, `assets/miscellaneous.css`, `assets/logo.css`, `assets/localization.css`
**Snippets que consume:** `logo`, `menu`, `mega-menu`, `miscellaneous`, `search-modal`, `country-and-language`

**Qué hace:**
- Logo del sitio
- Menú de navegación principal
- Mega menu con imágenes y submenús
- Buscador (modal)
- Selector de idioma
- Sticky header al scroll
- Se oculta en pantallas ≤920px

**Cómo migrarlo:**
1. Copiar `sections/header.liquid` al proyecto Next.js como referencia
2. Crear `src/components/layout/DesktopHeader.tsx`
3. Traducir la lógica Liquid a JSX:
   - `{% if section.settings.sticky_header == 'always_stick' %}` → prop o constante
   - `{% for block in section.blocks %}` → `.map()` sobre array de datos
   - `{{ settings.* }}` → CSS variables de `globals.css`
4. Los datos del menú se hardcodean en un archivo de constantes
5. Agregar `className="hidden md:block"` (breakpoint 920px)

**Instrucción para Claude Code:**
> Tengo el archivo `sections/header.liquid` del tema Shopify Avante. Conviértelo a un componente React con TypeScript y Tailwind CSS. El header es sticky, tiene logo centrado, menú de navegación, y se oculta en mobile (≤920px). Los datos del menú están hardcodeados. Usa los CSS de referencia: `header.css`, `menu.css`, `logo.css`. El breakpoint principal es md:920px.

#### 5.2 — `MobileHeader.tsx`

**Fuente Shopify:** `sections/mobile-header.liquid`
**CSS asociado:** `assets/mobile-header.css`
**Snippets que consume:** `logo`, `burger-menu`, `miscellaneous`

**Qué hace:**
- Header simplificado para mobile
- Botón hamburguesa que abre el drawer
- Logo
- Iconos de búsqueda y idioma
- Solo visible en pantallas ≤920px

**Instrucción para Claude Code:**
> Convierte `sections/mobile-header.liquid` a un componente React client (`"use client"`). Solo se muestra en ≤920px (`md:hidden`). Tiene un botón hamburguesa que dispara la apertura del MegaMenuDrawer, el logo, y botón de búsqueda.

#### 5.3 — `MegaMenuDrawer.tsx`

**Fuente Shopify:** `sections/mega-menu-drawer.liquid`
**CSS asociado:** `assets/mega-menu-drawer.css`, `assets/menus.css`
**Snippets que consume:** `drawer-menu`, `nested-menu-item-first`, `nested-menu-item-second`, `nested-item`, `logo`, `social-media`, `country-and-language`

**Qué hace:**
- Panel lateral que se desliza desde la izquierda
- Menú de navegación con submenús anidados (hasta 3 niveles)
- Logo, redes sociales, selector de idioma en el footer del drawer
- Overlay oscuro sobre el contenido

**Tipo de componente:** Client (`"use client"`) — necesita estado para abrir/cerrar y animación

**Instrucción para Claude Code:**
> Convierte `sections/mega-menu-drawer.liquid` a un componente React client. Es un drawer (panel lateral) que se abre desde la izquierda con animación slide-in. Usa Framer Motion para la animación. Tiene menú anidado con hasta 3 niveles de profundidad. Los datos del menú están hardcodeados. Incluye overlay con onClick para cerrar.

#### 5.4 — `AnnouncementBar.tsx`

**Fuente Shopify:** `sections/announcement-bar.liquid`
**CSS asociado:** `assets/section-announcement-bar.css`

**Qué hace:**
- Barra fija en la parte superior del sitio
- Puede tener múltiples mensajes que rotan (autoplay con Swiper)
- Colores personalizados
- Puede ocultarse con un botón

**Tipo de componente:** Client (`"use client"`) — Swiper autoplay

**Instrucción para Claude Code:**
> Convierte `sections/announcement-bar.liquid` a un componente React client. Es una barra superior con mensajes que rotan usando Swiper con autoplay. Colores personalizados via CSS variables. Incluye botón para cerrar/ocultar.

#### 5.5 — `Footer.tsx`

**Fuente Shopify:** `sections/footer.liquid` + `sections/footer-group.json`
**CSS asociado:** `assets/footer.css`, `assets/social-media.css`
**Snippets que consume:** `social-media`, `logo`, `newsletter` (eliminar), `menu`

**Qué hace (según footer-group.json del sitio actual):**
- Grid de 3 columnas
- Bloque 1: Menú secundario "mundial-mty"
- Bloque 2: Logo (LogoMB-500x500px.png)
- Bloque 3: Redes sociales con heading "Sigue nuestras redes oficiales"
- Bloque 4: Newsletter → **ELIMINAR**
- Bloque 5: Legal "Todos los derechos reservados" + botón "Regresar arriba"
- Bloque 6: Buscador
- Fondo rojo (#db0138), texto blanco (#ffffff)

**Instrucción para Claude Code:**
> Convierte `sections/footer.liquid` a React. El footer tiene fondo rojo brand (#db0138), texto blanco. Grid de 3 columnas. Contiene: menú de links, logo, redes sociales, texto legal con botón back-to-top. NO incluir newsletter. Los datos están hardcodeados.

#### 5.6 — `Flyout.tsx`

**Fuente Shopify:** `sections/flyout.liquid` + `sections/footer-group.json`
**CSS asociado:** `assets/section-flyout.css`

**Qué hace (según footer-group.json):**
- Panel flotante que aparece desde el borde derecho
- Se activa al hacer scroll (75%)
- Contiene: redes sociales
- Tab sticky en la esquina inferior con texto "Conoce más"
- Fondo rojo (#db0138), texto blanco
- Los bloques de countdown, newsletter, heading y button están **disabled** en la config actual

**Tipo de componente:** Client (`"use client"`) — scroll detection, toggle

**Instrucción para Claude Code:**
> Convierte `sections/flyout.liquid` a React client. Es un panel flotante fijo en el borde derecho que se muestra al scrollear 75% de la página. Tiene un tab sticky con texto "Conoce más" que al hacer click abre el panel. Contiene redes sociales. Fondo rojo (#db0138), texto blanco.

#### 5.7 — `BackToTop.tsx`

**Fuente Shopify:** `snippets/back-to-top.liquid`

**Qué hace:** Botón que aparece al scrollear y vuelve al inicio de la página.
**Tipo:** Client component con scroll listener.

---

## 6. Fase 2 — Secciones (componentes de página)

### Qué son las secciones en Shopify

Son los **bloques visuales principales** que componen cada página. Cada sección es un componente autocontenido con:
- HTML/Liquid para el markup
- Un bloque `{% schema %}` que define opciones de configuración
- Estilos scoped vía `{% style %}`

### Cuáles migrar

De las 93 secciones disponibles, **solo 30 se usan en las páginas del sitio**. Las demás son plantilla genérica del tema Avante o funcionalidad de e-commerce.

### Tabla maestra de secciones a migrar

| # | Sección Liquid | Componente Next.js | Usado en N páginas | Complejidad | Tipo componente |
|---|---|---|---|---|---|
| 1 | `main-page.liquid` | `MainPage.tsx` | 38 | BAJA | Server |
| 2 | `rich-text.liquid` | `RichText.tsx` | 50 usos | BAJA | Server |
| 3 | `horizontal-scrolling-banners.liquid` | `HorizontalScrollingBanners.tsx` | 11 | ALTA | Client |
| 4 | `banners.liquid` | `Banners.tsx` | 9 | MEDIA | Client (scroll) |
| 5 | `multicolumn.liquid` | `Multicolumn.tsx` | 12 | MEDIA | Server |
| 6 | `collapsible-tabs.liquid` | `CollapsibleTabs.tsx` | 8 | BAJA | Client |
| 7 | `video-banner.liquid` | `VideoBanner.tsx` | 6 | ALTA | Client |
| 8 | `image-banner.liquid` | `ImageBanner.tsx` | 5 | BAJA | Server |
| 9 | `media-with-text.liquid` | `MediaWithText.tsx` | 15 usos | MEDIA | Server |
| 10 | `split-banner.liquid` | `SplitBanner.tsx` | 4 | MEDIA | Client (hover) |
| 11 | `image-with-hotspots.liquid` | `ImageWithHotspots.tsx` | 3 | ALTA | Client |
| 12 | `media-with-tabs.liquid` | `MediaWithTabs.tsx` | 3 | MEDIA | Client |
| 13 | `events.liquid` | `Events.tsx` | 3 | MEDIA | Server |
| 14 | `slideshow-with-media.liquid` | `SlideshowWithMedia.tsx` | 2 | ALTA | Client |
| 15 | `banner-gallery.liquid` | `BannerGallery.tsx` | 5 usos | MEDIA | Server |
| 16 | `scrolling-promotion.liquid` | `ScrollingPromotion.tsx` | 2 | BAJA | Client (anim) |
| 17 | `section-video.liquid` | `SectionVideo.tsx` | 2 | BAJA | Client |
| 18 | `featured-blog.liquid` | `FeaturedBlog.tsx` | 2 | MEDIA | Server |
| 19 | `icons-with-text.liquid` | `IconsWithText.tsx` | 1 | BAJA | Server |
| 20 | `custom-liquid.liquid` | `CustomHTML.tsx` | 3 usos | BAJA | Server |
| 21 | `testimonials.liquid` | `Testimonials.tsx` | 2 | MEDIA | Client |
| 22 | `anchor-link.liquid` | `AnchorLink.tsx` | 12 usos | BAJA | Server |

**Secciones de layout (ya cubiertas en Fase 1):**
| # | Sección | Ya migrada como |
|---|---|---|
| 23 | `announcement-bar.liquid` | `AnnouncementBar.tsx` |
| 24 | `header.liquid` | `DesktopHeader.tsx` |
| 25 | `mobile-header.liquid` | `MobileHeader.tsx` |
| 26 | `mega-menu-drawer.liquid` | `MegaMenuDrawer.tsx` |
| 27 | `menu-drawer.liquid` | Alternativa al mega menu (evaluar si se usa) |
| 28 | `footer.liquid` | `Footer.tsx` |
| 29 | `flyout.liquid` | `Flyout.tsx` |
| 30 | `news-drawer.liquid` | `NewsDrawer.tsx` |

### Detalle de cada sección a migrar

#### 6.1 — `main-page.liquid` → `MainPage.tsx` (38 páginas lo usan)

**CSS:** `assets/section-main-page.css`
**Función:** Renderiza el título y contenido HTML de una página de Shopify. En Next.js, esto se convierte simplemente en el contenido hardcodeado de cada page.tsx.
**Nota:** No se crea un componente separado. El contenido de `main-page` se integra directamente en cada `page.tsx`.

#### 6.2 — `rich-text.liquid` → `RichText.tsx` (50 usos)

**CSS:** `assets/section-rich-text.css`
**Función:** Sección con subheading, heading, texto libre, y botones. Altamente configurable (alineación, tamaños, colores).
**Props clave:** heading, headingSize, headingTag, text, textSize, centerText, colorType, backgroundColor, textColor, padding
**Snippets que usa:** `text`, `button`, `empty-space`, `context-image`

**Instrucción para Claude Code:**
> Convierte `sections/rich-text.liquid` a React. Es una sección de texto con heading opcional, subheading, párrafos, y botones CTA. Soporta color personalizado, alineación centrada o izquierda, y padding responsivo. Es el componente más reutilizado del sitio (50 usos).

#### 6.3 — `horizontal-scrolling-banners.liquid` → `HorizontalScrollingBanners.tsx` (11 páginas)

**CSS:** `assets/section-horizontal-scrolling-banners.css`
**Función:** Contenedor con scroll horizontal. Contiene bloques de 3 tipos: `media` (imagen/video), `text` (contenido textual), `media_with_text` (combinación). Cada bloque puede ser "big" o "small".
**Snippets que usa:** `button`, `text`, `countdown-timer`, `image`, `video-button`, `context-image`
**Librerías:** Swiper

**Instrucción para Claude Code:**
> Convierte `sections/horizontal-scrolling-banners.liquid` a React client. Es un contenedor con scroll horizontal que contiene bloques de 3 tipos: media (imagen/video), text (con fondo de color), y media_with_text (imagen con texto superpuesto). Cada bloque puede ser tamaño "big" o "small". Usa Swiper para el scroll. CSS de referencia: `section-horizontal-scrolling-banners.css`.

#### 6.4 — `banners.liquid` → `Banners.tsx` (9 páginas)

**CSS:** `assets/section-slider.css`, `assets/component-slider.css`, `assets/section-featured-products.css`, `assets/section-features.css`
**Función:** Grid de tarjetas tipo banner con imagen/video, texto, y botón. Soporta sticky scroll en desktop. Diferentes ratios de imagen y layouts.
**Snippets que usa:** `banner`, `button`, `text`, `image`, `video-button`, `context-image`

**Instrucción para Claude Code:**
> Convierte `sections/banners.liquid` a React. Es un grid de tarjetas banner con imagen, heading, texto y botón CTA. Soporta sticky content en desktop. Configurable: columnas, ratio de imagen, spacing, colores custom.

#### 6.5 — `multicolumn.liquid` → `Multicolumn.tsx` (12 páginas)

**CSS:** `assets/section-multicolumn.css`
**Función:** Grid flexible de columnas. Cada columna tiene imagen, heading, texto, y botón. Soporta masonry grid con `masonry.pkgd.min.js`.
**Snippets que usa:** `image`, `button`, `text`, `context-image`
**Librerías:** masonry.pkgd.min.js → Reemplazar con CSS Grid o react-masonry-css

**Instrucción para Claude Code:**
> Convierte `sections/multicolumn.liquid` a React. Grid de columnas (2-4) con imagen, heading, texto y botón por columna. El tema original usa masonry.pkgd.min.js — reemplaza con CSS Grid `masonry` layout o `react-masonry-css`. Responsive: columnas en desktop, stack en mobile.

#### 6.6 — `collapsible-tabs.liquid` → `CollapsibleTabs.tsx` (8 páginas)

**CSS:** `assets/section-collapsible-tabs.css`
**Función:** Acordeón con topics (headings de grupo) y tabs (items expandibles). Usado para FAQs y secciones informativas.
**Snippets que usa:** `accordion`, `icon-accordion`, `icon-accordion-2`, `text`, `button`
**Base UI:** Usar shadcn `<Accordion>`

**Instrucción para Claude Code:**
> Convierte `sections/collapsible-tabs.liquid` a React usando shadcn Accordion como base. Es un acordeón con dos niveles: "topics" (headings de grupo) y "tabs" (items expandibles). Tiene heading general, texto descriptivo, y botón CTA. Usado para FAQs.

#### 6.7 — `video-banner.liquid` → `VideoBanner.tsx` (6 páginas)

**CSS:** `assets/section-banner.css`
**Función:** Banner de altura completa con video de fondo en autoplay/loop/muted. Overlay oscuro configurable. Contenido superpuesto: heading, texto, botones, countdown timer. Soporte para video en mobile con diferente altura.
**Snippets que usa:** `button`, `text`, `countdown-timer`, `context-image`, `empty-space`

**Instrucción para Claude Code:**
> Convierte `sections/video-banner.liquid` a React client. Banner con video de fondo (`<video autoPlay loop muted playsInline>`). Overlay con opacidad configurable. Contenido superpuesto centrado: heading, texto, botones. El video viene de `/public/videos/` (local). Alturas diferentes para desktop y mobile (en vh). CSS de referencia: `section-banner.css`.

#### 6.8 — `image-banner.liquid` → `ImageBanner.tsx` (5 páginas)

**CSS:** `assets/section-image-banner.css`
**Función:** Similar a video-banner pero con imagen estática. Imagen de fondo con overlay y contenido superpuesto.
**Snippets que usa:** `button`, `text`, `context-image`, `empty-space`

**Instrucción para Claude Code:**
> Convierte `sections/image-banner.liquid` a React. Banner con imagen de fondo usando `next/image` (fill, objectFit cover). Overlay con opacidad. Contenido superpuesto: heading, texto, botones. Alturas en vh para desktop y mobile.

#### 6.9 — `media-with-text.liquid` → `MediaWithText.tsx` (15 usos)

**CSS:** `assets/section-media-with-text.css`
**Función:** Layout de dos columnas: imagen/video en un lado, texto en el otro. Posición intercambiable (swap). Diferentes ratios de media y alineaciones de texto.
**Snippets que usa:** `button`, `text`, `image`, `video-button`, `context-image`, `countdown-timer`

**Instrucción para Claude Code:**
> Convierte `sections/media-with-text.liquid` a React. Layout de dos columnas: media (imagen/video) + texto. La posición es intercambiable con prop `swap`. Soporta diferentes ratios de imagen (portrait, landscape, square). Texto con heading, párrafo y botón CTA. Responsive: stack en mobile.

#### 6.10 — `split-banner.liquid` → `SplitBanner.tsx` (4 páginas)

**CSS:** `assets/section-split-banner.css`
**Función:** Dos banners lado a lado que se expanden al hacer hover. Cada uno tiene imagen de fondo y contenido superpuesto.
**Snippets que usa:** `button`, `text`, `image`

**Instrucción para Claude Code:**
> Convierte `sections/split-banner.liquid` a React client. Dos banners lado a lado (50/50) que al hacer hover uno se expande (ej: 60/40) con transición suave. Cada banner tiene imagen de fondo y contenido overlay. Usa Framer Motion o CSS transitions para la animación de expansión.

#### 6.11 — `image-with-hotspots.liquid` → `ImageWithHotspots.tsx` (3 páginas)

**CSS:** `assets/image-with-hotspots.css`
**Función:** Imagen interactiva (mapa de Monterrey) con puntos posicionados por porcentaje (%). Cada punto muestra un tooltip/label. Posiciones diferentes para desktop y mobile. Tipos de hotspot: texto y producto (solo texto aplica).
**Snippets que usa:** `image`, `text`, `context-image`

**Instrucción para Claude Code:**
> Convierte `sections/image-with-hotspots.liquid` a React client. Es una imagen grande (mapa de Monterrey) con puntos interactivos posicionados por porcentaje CSS (top/left en %). Cada punto muestra un label de texto. Las posiciones son diferentes para desktop y mobile. Imágenes diferentes para desktop y mobile. Usa `next/image` para la imagen base.

#### 6.12 — `media-with-tabs.liquid` → `MediaWithTabs.tsx` (3 páginas)

**CSS:** `assets/media-with-tabs.css`
**Función:** Sección con tabs, cada tab cambia la imagen/video y el texto mostrado. Layout: media en un lado, tabs + contenido en el otro.
**Snippets que usa:** `button`, `text`, `image`, `video-button`, `context-image`

**Instrucción para Claude Code:**
> Convierte `sections/media-with-tabs.liquid` a React client. Componente con tabs donde cada tab cambia el contenido: imagen + heading + texto + botón CTA. Layout de dos columnas (media | tabs+content). La posición del media es intercambiable. Animación de cambio entre tabs.

#### 6.13 — `events.liquid` → `Events.tsx` (3 páginas)

**CSS:** `assets/section-events.css`
**Función:** Grid de tarjetas de evento. Cada evento tiene: imagen, fecha (badge), título, descripción, ubicación, link de tickets, botón add-to-calendar. Configurable columnas y layout mobile.
**Snippets que usa:** `image`, `button`, `icon`, `text`

**Instrucción para Claude Code:**
> Convierte `sections/events.liquid` a React. Grid de tarjetas de evento con: imagen, badge de fecha, título, descripción, ubicación con icono, y botón de acción. Soporta columnas configurables (2-3) y genera datos de calendar para add-to-calendar (iCal format).

#### 6.14 — `slideshow-with-media.liquid` → `SlideshowWithMedia.tsx` (2 páginas)

**CSS:** `assets/slideshow-with-media.css`
**Función:** Carrusel Swiper con slides de video. Cada slide tiene video de fondo, overlay, heading, subheading, texto, y botones. Controles de navegación (flechas o dots). Autoplay configurable.
**Snippets que usa:** `button`, `text`, `countdown-timer`, `image`, `context-image`
**Librerías:** Swiper

**Instrucción para Claude Code:**
> Convierte `sections/slideshow-with-media.liquid` a React client. Carrusel Swiper con slides de video. Cada slide: `<video autoPlay loop muted>` de fondo + overlay + contenido (heading, subheading, botones CTA). Controles: flechas de navegación. Autoplay con intervalo configurable. Alturas en vh.

#### 6.15 — `banner-gallery.liquid` → `BannerGallery.tsx` (5 usos)

**CSS:** `assets/section-banner-gallery.css`
**Función:** Galería de imágenes tipo grid con diferentes tamaños. Click para abrir en lightbox o navegar.
**Snippets que usa:** `image`, `banner`, `text`, `button`

#### 6.16 — `scrolling-promotion.liquid` → `ScrollingPromotion.tsx` (2 páginas)

**CSS:** `assets/scrolling-promotion.css`
**Función:** Texto marquee que se desplaza horizontalmente de forma infinita. Velocidad y dirección configurables.

**Instrucción para Claude Code:**
> Convierte `sections/scrolling-promotion.liquid` a React client. Es un marquee/ticker de texto que se desplaza horizontalmente de forma infinita. Usa CSS animation `translateX` con duplicación del contenido para efecto seamless. Velocidad y dirección configurables.

#### 6.17 — `section-video.liquid` → `SectionVideo.tsx` (2 páginas)

**CSS:** `assets/section-video.css`
**Función:** Reproductor de video standalone. Soporta video local (MP4) y embeds (YouTube/Vimeo).

#### 6.18 — `featured-blog.liquid` → `FeaturedBlog.tsx` (2 páginas)

**CSS:** `assets/section-blog-post.css`
**Función:** Grid de tarjetas de artículos de blog. Imagen, título, excerpt, fecha, autor.
**Snippets que usa:** `article-card`

#### 6.19 — `icons-with-text.liquid` → `IconsWithText.tsx` (1 página)

**CSS:** Inline
**Función:** Grid de iconos con heading y texto descriptivo. Tipo "features" o "benefits".

#### 6.20 — `custom-liquid.liquid` → `CustomHTML.tsx` (3 usos)

**Función:** Renderiza HTML personalizado. En Next.js, se convierte en un componente que recibe HTML como prop y lo renderiza con `dangerouslySetInnerHTML` o mejor aún, se hardcodea el contenido directamente.

#### 6.21 — `testimonials.liquid` → `Testimonials.tsx` (2 páginas)

**CSS:** `assets/section-testimonials.css`
**Función:** Carrusel de testimonios. Cada testimonio: estrellas, heading (cita), texto, nombre del autor, cargo/posición.
**Librerías:** Swiper

#### 6.22 — `anchor-link.liquid` → `AnchorLink.tsx` (12 usos)

**Función:** Invisible — solo genera un `<div id="anchor">` para navegación interna. En Next.js, se puede reemplazar con un simple `<div id={anchorId} />`.

### Secciones que NO se migran (63 archivos)

#### Plantilla genérica de Avante (no usada por ninguna página):
```
advantages, age-verification, apps, banner-grid, breadcrumbs,
collection-list, collection-with-products, custom-html, empty-space,
featured-collection-tabs, featured-collection-with-media,
featured-collection-with-product-grid, featured-collections,
featured-product, featured-products, image-comparison, image-grid,
line-section, link-list, logo-slider, main-sidebar, new-arrivals-collection,
new-arrivals-tabs, page, popup, predictive-search, related-collections,
secondary-header, secondary-sidebar, selected-products,
shoppable-media-slider, store-selector-drawer, stories-slideshow, tabs
```

#### E-commerce (eliminado del alcance):
```
cart-drawer, cart-recommendations, main-cart, main-collection-product-grid,
main-list-collections, main-product, main-product-details,
product-recommendations, quick-view, recently-viewed-products,
featured-collection-grid, pickup-availability
```

#### Cuenta de usuario (eliminado):
```
main-account, main-activate-account, main-addresses, main-login,
main-order, main-register, main-reset-password
```

#### Páginas de contraseña (no necesarias):
```
main-password-header, main-password-footer
```

#### Búsqueda (evaluar si se necesita):
```
main-search, main-404
```

---

## 7. Fase 3 — Snippets (sub-componentes)

### Qué son los snippets

Son fragmentos Liquid pequeños y reutilizables que las secciones llaman con `{% render 'nombre' %}`. Equivalen a componentes de UI atómicos.

### Snippets a migrar (30 de 81)

#### Tier 1 — Usados por muchas secciones:

| Snippet | Componente | Usado por | Descripción |
|---|---|---|---|
| `button.liquid` | `ui/Button.tsx` | Casi todas las secciones | Botón con variantes: solid, outlined, link. Extender shadcn. |
| `icon.liquid` | `ui/Icon.tsx` | Global | Sistema de iconos SVG. Contiene todos los SVGs inline. Migrar a componente con switch/map. |
| `image.liquid` | `ui/OptimizedImage.tsx` | Muchas secciones | Wrapper de `next/image` con lazy loading, aspect ratio, focal point. |
| `text.liquid` | `ui/TextBlock.tsx` | RichText, Banners, etc. | Bloque de texto con heading, subheading, párrafo. Tamaños configurables. |
| `context-image.liquid` | `ui/ContextImage.tsx` | Banners, Media | Imagen con ratio forzado, radius, y hover effect. |
| `line.liquid` | `ui/Divider.tsx` | Varias secciones | Línea horizontal con opacidad configurable. |
| `empty-space.liquid` | `ui/Spacer.tsx` | Varias secciones | Espacio vertical con altura desktop/mobile. |
| `logo.liquid` | `ui/Logo.tsx` | Header, Footer, Drawer | Logo del sitio como `next/image`. |

#### Tier 2 — Usados por secciones específicas:

| Snippet | Componente | Usado por | Descripción |
|---|---|---|---|
| `banner.liquid` | `ui/BannerCard.tsx` | Banners, BannerGallery | Tarjeta de banner con imagen, overlay, texto. |
| `accordion.liquid` | `ui/AccordionItem.tsx` | CollapsibleTabs | Item de acordeón. Usar shadcn Accordion. |
| `icon-accordion.liquid` | `ui/AccordionIcon.tsx` | CollapsibleTabs | Icono animado del acordeón (+ → −). |
| `countdown-timer.liquid` | `ui/CountdownTimer.tsx` | VideoBanner, Slideshow | Cuenta regresiva con días/horas/min/seg. Client component. |
| `video-button.liquid` | `ui/VideoPlayButton.tsx` | Media sections | Botón play que abre video externo. |
| `article-card.liquid` | `ui/ArticleCard.tsx` | FeaturedBlog | Tarjeta de artículo de blog. |
| `breadcrumbs.liquid` | `ui/Breadcrumbs.tsx` | Páginas interiores | Navegación breadcrumb. |
| `social-media.liquid` | `ui/SocialMedia.tsx` | Footer, Flyout | Lista de iconos de redes sociales con links. |
| `share.liquid` | `ui/ShareButton.tsx` | Artículos | Botones de compartir (Twitter, Facebook, etc.). |
| `stories-slide.liquid` | — | No se usa (sección eliminada) | **NO MIGRAR** |

#### Tier 3 — Layout/Navegación:

| Snippet | Componente | Usado por |
|---|---|---|
| `mega-menu.liquid` | Parte de `MegaMenuDrawer.tsx` | Header |
| `menu.liquid` | Parte de `DesktopHeader.tsx` | Header |
| `drawer-menu.liquid` | Parte de `MegaMenuDrawer.tsx` | Mega menu |
| `nested-menu-item-first.liquid` | Parte de `MegaMenuDrawer.tsx` | Mega menu |
| `nested-menu-item-second.liquid` | Parte de `MegaMenuDrawer.tsx` | Mega menu |
| `nested-item.liquid` | Parte de `MegaMenuDrawer.tsx` | Mega menu |
| `burger-menu.liquid` | Parte de `MobileHeader.tsx` | Mobile header |
| `miscellaneous.liquid` | Parte de headers | Header icons |
| `search-modal.liquid` | `SearchModal.tsx` | Header |
| `country-and-language.liquid` | `LanguageSwitcher.tsx` | Header, Footer |
| `news.liquid` | Parte de `NewsDrawer.tsx` | Header group |
| `back-to-top.liquid` | `BackToTop.tsx` | Layout |
| `meta-tags.liquid` | `generateMetadata()` | Layout |
| `font-variables.liquid` | `globals.css` | Layout |
| `custom-assets.liquid` | Imports en layout | Layout |

### Snippets que NO se migran (51 de 81)

#### E-commerce (25 snippets):
```
buy-buttons, card-product, product-card-image, product-variant-picker,
product-media, product-thumbnail, product-feature, product-placeholder,
product-related-collections, price, cart, cart-drawer, cart-discount,
cart-recommendations, complementary-products, linked-products,
selected-products, featured-collection-card, card-collection,
custom-options-checkbox, custom-options-color, custom-options-date,
custom-options-dropdown, custom-options-measurement, custom-options-multi-line,
custom-options-pills, custom-options-single-line, custom-options-swatches,
custom-options-upload, facets, facets-vertical, facets-visual-display,
free-shipping-bar, pickup-availability, store-selector, promo-code,
popup, account, pagination, block-image, image-grid, ask-question,
custom-liquid, contacts
```

**Nota:** Algunos snippets como `pagination`, `block-image`, `contacts` son usados solo por secciones que no se migran.

---

## 8. Fase 4 — Templates (páginas)

### Qué son los templates en Shopify

Son archivos JSON que declaran **qué secciones componen cada página** y con qué configuración. No contienen HTML — son puramente declarativos.

### Equivalente en Next.js

Cada template se convierte en un `page.tsx` dentro de `src/app/[locale]/`. El contenido que antes venía de Shopify se hardcodea directamente.

### Método de migración

Para cada template:
1. Leer el JSON del template para saber qué secciones usa y en qué orden
2. Leer los datos de cada sección (textos, imágenes, configuración)
3. Crear el `page.tsx` importando los componentes de sección correspondientes
4. Hardcodear los datos de contenido como props

### Páginas a migrar (38 templates)

#### Home

| Template | Ruta Next.js | Secciones que usa |
|---|---|---|
| `index.json` | `app/[locale]/page.tsx` | VideoBanner, ImageWithHotspots, Multicolumn, HorizontalScrollingBanners, MediaWithTabs, SlideshowWithMedia |

#### Partidos y Sedes (5 páginas)

| Template | Ruta Next.js | Secciones que usa |
|---|---|---|
| `page.partidos-y-sedes.json` | `app/[locale]/partidos-y-sedes/page.tsx` | MainPage, VideoBanner, Events, MediaWithTabs, CollapsibleTabs |
| `page.calendario-partidos.json` | `app/[locale]/calendario-partidos/page.tsx` | MainPage, HorizontalScrollingBanners, Events |
| `page.horarios-partidos.json` | `app/[locale]/horarios-partidos/page.tsx` | MainPage, HorizontalScrollingBanners |
| `page.resultados-partidos.json` | `app/[locale]/resultados-partidos/page.tsx` | MainPage, RichText, MediaWithText, RichText |
| `page.sedes-partidos.json` | `app/[locale]/sedes-partidos/page.tsx` | MainPage, RichText, Banners, RichText, Multicolumn |

#### Movilidad (4 páginas)

| Template | Ruta Next.js | Secciones que usa |
|---|---|---|
| `page.transporte-y-movilidad.json` | `app/[locale]/transporte-y-movilidad/page.tsx` | MainPage, Multicolumn, CollapsibleTabs |
| `page.transporte-movilidad.json` | `app/[locale]/transporte-movilidad/page.tsx` | MainPage, RichText, MediaWithTabs, RichText |
| `page.estadiomonterre-movilidad.json` | `app/[locale]/estadio-monterrey/page.tsx` | MainPage, RichText, HorizontalScrollingBanners |
| `page.mapadezonas-movilidad.json` | `app/[locale]/mapa-de-zonas/page.tsx` | MainPage, RichText(x3), BannerGallery(x3), CustomHTML(x3) |

#### Hospitalidad (5 páginas)

| Template | Ruta Next.js | Secciones que usa |
|---|---|---|
| `page.hospedaje-y-zonas.json` | `app/[locale]/hospedaje-y-zonas/page.tsx` | MainPage, ImageWithHotspots, Multicolumn(x2), RichText |
| `page.comida-hospitalidad.json` | `app/[locale]/comida/page.tsx` | MainPage, HorizontalScrollingBanners |
| `page.bares-hospitalidad.json` | `app/[locale]/bares/page.tsx` | MainPage, HorizontalScrollingBanners |
| `page.plataformas-hospitalidad.json` | `app/[locale]/plataformas/page.tsx` | MainPage, HorizontalScrollingBanners |
| `page.zonarecomend-hospitalidad.json` | `app/[locale]/zonas-recomendadas/page.tsx` | MainPage, HorizontalScrollingBanners |

#### Cultura (3 páginas)

| Template | Ruta Next.js | Secciones que usa |
|---|---|---|
| `page.cultura-y-experiencias.json` | `app/[locale]/cultura-y-experiencias/page.tsx` | MainPage, Banners, Events |
| `page.museos-cultura.json` | `app/[locale]/museos/page.tsx` | MainPage, RichText, Multicolumn, RichText |
| `page.eventos-cultura.json` | `app/[locale]/eventos-cultura/page.tsx` | MainPage, RichText, Multicolumn, RichText |

#### Qué Hacer (5 páginas)

| Template | Ruta Next.js | Secciones que usa |
|---|---|---|
| `page.explora-monterrey.json` | `app/[locale]/explora-monterrey/page.tsx` | MainPage, VideoBanner, ImageWithHotspots, CollapsibleTabs, Multicolumn |
| `page.barrioantiguo-quehacer.json` | `app/[locale]/barrio-antiguo/page.tsx` | MainPage, HorizontalScrollingBanners |
| `page.tours-quehacer.json` | `app/[locale]/tours/page.tsx` | MainPage, RichText, Banners(x2), RichText, Multicolumn |
| `page.lugares-quehacer.json` | `app/[locale]/lugares/page.tsx` | MainPage, RichText, MediaWithText, Banners, RichText |
| `page.fifafan-quehacer.json` | `app/[locale]/fifa-fan/page.tsx` | MainPage, ImageBanner, RichText(x4), Banners, Multicolumn |
| `page.eventos-quehacer.json` | `app/[locale]/eventos/page.tsx` | MainPage, BannerGallery, RichText, Banners, RichText |

#### Comunidad (5 páginas)

| Template | Ruta Next.js | Secciones que usa |
|---|---|---|
| `page.comunidad.json` | `app/[locale]/comunidad/page.tsx` | MainPage, SplitBanner |
| `page.historias-comunidad.json` | `app/[locale]/historias/page.tsx` | MainPage, RichText(x4), ImageBanner(x2), SectionVideo(x2) |
| `page.anfitrionesregios-volunta.json` | `app/[locale]/anfitriones-regios/page.tsx` | MediaWithText(x2), RichText(x5), HorizontalScrollingBanners, CollapsibleTabs(x2), IconsWithText, AnchorLink, MainPage |
| `page.panchomundial-comunidad.json` | `app/[locale]/pancho-mundial/page.tsx` | MainPage, VideoBanner, RichText, MediaWithText, HorizontalScrollingBanners |
| `page.mundialitobarrios-landing.json` | `app/[locale]/mundialito-barrios/page.tsx` | MediaWithText(x3), RichText(x5), ScrollingPromotion, CollapsibleTabs, MainPage, ImageBanner, Multicolumn |

#### Noticias (3 páginas)

| Template | Ruta Next.js | Secciones que usa |
|---|---|---|
| `page.noticias-y-actualizacione.json` | `app/[locale]/noticias/page.tsx` | MainPage, FeaturedBlog |
| `page.eventos-noticias.json` | `app/[locale]/eventos-noticias/page.tsx` | MainPage, RichText, Multicolumn, RichText |
| `page.infraestructura-noticias.json` | `app/[locale]/infraestructura/page.tsx` | MainPage, Banners |

#### Prensa (2 páginas)

| Template | Ruta Next.js | Secciones que usa |
|---|---|---|
| `page.prensa-y-medios.json` | `app/[locale]/prensa/page.tsx` | MainPage, Banners |
| `page.prensa-medios.json` | — | **EVALUAR: posible duplicado de prensa-y-medios** (usa contact-form → eliminado) |

#### Contacto y FAQ (3 páginas)

| Template | Ruta Next.js | Secciones que usa |
|---|---|---|
| `page.contacto-y-ayuda.json` | `app/[locale]/contacto/page.tsx` | MainPage, SplitBanner |
| `page.faq.json` | `app/[locale]/faq/page.tsx` | MainPage, CollapsibleTabs |
| `page.faqs.json` | — | **Solo tiene MainPage — posible duplicado de faq** |

#### Blog (4 templates)

| Template | Ruta Next.js | Secciones que usa |
|---|---|---|
| `blog.seasons.json` | `app/[locale]/blog/page.tsx` | MainBlog (listado) |
| `article.seasons-blog-post.json` | `app/[locale]/blog/[slug]/page.tsx` | MainArticle |
| `blog.json` | — | Template default, usar `blog.seasons.json` |
| `article.json` | — | Template default, usar `article.seasons-blog-post.json` |

#### Otros

| Template | Ruta Next.js | Secciones que usa |
|---|---|---|
| `page.stockists.json` | `app/[locale]/puntos-de-venta/page.tsx` | MainPage, RichText, AnchorLink(x3), BannerGallery, MediaWithText(x4) |
| `page.about.json` | — | **Plantilla genérica Avante, no MTY — NO MIGRAR** |
| `404.json` | `app/[locale]/not-found.tsx` | Main404 |
| `search.json` | `app/[locale]/buscar/page.tsx` | MainSearch (evaluar necesidad) |
| `password.json` | — | **NO MIGRAR** |

### Templates que NO se migran (18 de 56)

```
page.json              ← Template default genérico
page.about.json        ← Genérico de Avante
page.contact.json      ← Usa contact-form (eliminado), duplicado
page.prensa-medios.json ← Usa contact-form (eliminado), duplicado
page.faqs.json         ← Duplicado de page.faq.json
password.json          ← No necesario
product.json           ← E-commerce
product.preorder.json  ← E-commerce
product.quick-view.json ← E-commerce
collection.json        ← E-commerce
list-collections.json  ← E-commerce
cart.json              ← E-commerce
customers/account.json      ← E-commerce
customers/login.json        ← E-commerce
customers/register.json     ← E-commerce
customers/addresses.json    ← E-commerce
customers/order.json        ← E-commerce
customers/activate_account.json ← E-commerce
customers/reset_password.json   ← E-commerce
```

---

## 9. Fase 5 — Assets (CSS/JS)

### Estrategia

**Los assets NO se copian.** Se usan como referencia visual para recrear con Tailwind CSS.

### CSS (118 archivos)

Los CSS del tema Avante se dividen en:

#### CSS base (convertir a globals.css + Tailwind):
| Archivo | Qué contiene | Destino |
|---|---|---|
| `base.css` | Reset, tipografía base, variables | `globals.css` |
| `content-fonts.css` | @font-face, presets tipográficos | `globals.css` + `next/font` |
| `custom-code.css` | Estilos custom del cliente | `globals.css` |
| `custom-styles.css` | Overrides adicionales | `globals.css` |

#### CSS de secciones usadas (referencia para componentes):
| Archivo CSS | Componente que lo usa |
|---|---|
| `section-banner.css` | VideoBanner, ImageBanner |
| `section-horizontal-scrolling-banners.css` | HorizontalScrollingBanners |
| `section-multicolumn.css` | Multicolumn |
| `section-collapsible-tabs.css` | CollapsibleTabs |
| `section-events.css` | Events |
| `section-rich-text.css` | RichText |
| `section-split-banner.css` | SplitBanner |
| `section-banner-gallery.css` | BannerGallery |
| `section-media-with-text.css` | MediaWithText |
| `section-testimonials.css` | Testimonials |
| `section-blog-post.css` | FeaturedBlog |
| `section-image-banner.css` | ImageBanner |
| `section-newsletter.css` | **NO MIGRAR** (eliminado) |
| `section-contact-form.css` | **NO MIGRAR** (eliminado) |
| `scrolling-promotion.css` | ScrollingPromotion |
| `section-video.css` | SectionVideo |
| `slideshow-with-media.css` | SlideshowWithMedia |
| `image-with-hotspots.css` | ImageWithHotspots |
| `media-with-tabs.css` | MediaWithTabs |
| `section-flyout.css` | Flyout |
| `section-announcement-bar.css` | AnnouncementBar |

#### CSS de layout:
| Archivo CSS | Componente |
|---|---|
| `header.css` | DesktopHeader |
| `mobile-header.css` | MobileHeader |
| `mega-menu-drawer.css` | MegaMenuDrawer |
| `menu-drawer.css` | MenuDrawer (si se usa) |
| `menu.css` | Menú de navegación |
| `mega-menu.css` | Mega menú |
| `logo.css` | Logo |
| `footer.css` | Footer |
| `burger-menu.css` | Botón hamburguesa |
| `miscellaneous.css` | Iconos del header |
| `news-drawer.css` | NewsDrawer |
| `social-media.css` | SocialMedia |
| `localization.css` | LanguageSwitcher |
| `back-to-top.css` | BackToTop |

#### CSS que NO se migran (~60 archivos):
Todos los CSS de secciones no usadas + e-commerce.

### JS (30 archivos)

#### Reemplazados por funcionalidad de Next.js/React:

| Archivo JS | Reemplazo |
|---|---|
| `global.js` | Lógica distribuida en componentes React |
| `menu-drawer.js` | Estado en MegaMenuDrawer.tsx |
| `cart-drawer.js` | **ELIMINAR** (e-commerce) |
| `cart.js` | **ELIMINAR** |
| `cart-discount.js` | **ELIMINAR** |
| `cart-notification.js` | **ELIMINAR** |
| `quick-view.js` | **ELIMINAR** |
| `product-form.js` | **ELIMINAR** |
| `product-modal.js` | **ELIMINAR** |
| `product-model.js` | **ELIMINAR** |
| `media-gallery.js` | **ELIMINAR** |
| `facets.js` | **ELIMINAR** |
| `customer.js` | **ELIMINAR** |
| `recipient-form.js` | **ELIMINAR** |
| `pickup-availability.js` | **ELIMINAR** |
| `promo-code.js` | **ELIMINAR** |
| `search-modal.js` | SearchModal.tsx |
| `predictive-search.js` | Parte de SearchModal.tsx |
| `overlap-navigation.js` | CSS/Framer Motion |
| `blog-filter.js` | Blog page component |
| `theme-editor.js` | **ELIMINAR** (Shopify editor) |
| `custom-script.js` | Evaluar contenido, integrar donde corresponda |

#### Librerías que se mantienen (como npm packages):

| Archivo JS | npm Package |
|---|---|
| `swiper-bundle.min.js` | `swiper` (ya instalado) |
| `TweenMax.min.js` | `framer-motion` (reemplazo) |
| `masonry.pkgd.min.js` | CSS Grid o `react-masonry-css` |
| `quicklink.umd.js` | **ELIMINAR** — Next.js tiene prefetch nativo |
| `magnify.js` | **ELIMINAR** (zoom de producto = e-commerce) |

#### Scripts del carrusel de stories:
| Archivo | Acción |
|---|---|
| `stories-slider.min.js` | **ELIMINAR** (sección no usada) |
| `effect-carousel.min.js` | **ELIMINAR** (sección no usada) |
| `shoppable-media-slider.js` | **ELIMINAR** (sección no usada) |

---

## 10. Fase 6 — Locales (i18n)

### Archivos fuente

| Archivo | Líneas | Idioma | Migrar |
|---|---|---|---|
| `locales/es.json` | 548 | Español | SI |
| `locales/en.default.json` | ~548 | Inglés | SI (renombrar a `en.json`) |
| `locales/fr.json` | ~548 | Francés | SI |
| `locales/de.json` | ~548 | Alemán | SI |
| `locales/it.json` | ~548 | Italiano | SI |
| `locales/es.schema.json` | — | Admin Shopify | NO |
| `locales/en.default.schema.json` | — | Admin Shopify | NO |
| `locales/fr.schema.json` | — | Admin Shopify | NO |
| `locales/de.schema.json` | — | Admin Shopify | NO |
| `locales/it.schema.json` | — | Admin Shopify | NO |

### Proceso de migración

1. Copiar los 5 archivos JSON (sin .schema) a `src/messages/`
2. Renombrar `en.default.json` → `en.json`
3. Limpiar claves que referencian funcionalidad de e-commerce:
   - `sections.cart.*` → ELIMINAR
   - `products.product.*` → ELIMINAR
   - `customer.*` → ELIMINAR
   - `gift_cards.*` → ELIMINAR
   - `templates.cart.*` → ELIMINAR
4. Mantener claves informativas:
   - `general.*` (breadcrumbs, social media, search, pagination)
   - `sections.header.*`, `sections.footer.*`
   - `sections.slideshow.*`, `sections.newsletter.*`
   - `accessibility.*`
   - `blogs.*`
5. Verificar que el formato JSON sea compatible con `next-intl`

**Instrucción para Claude Code:**
> Copia `locales/es.json` a `src/messages/es.json`. Elimina todas las claves relacionadas con e-commerce (cart, product, customer, gift_cards). Mantén las claves de navegación, accesibilidad, blog, y secciones informativas. Repite para los otros 4 idiomas.

---

## 11. Fase 7 — Videos y media

### Videos locales (loops/backgrounds)

Los videos cortos que se usan como fondos de banner se descargan del CDN de Shopify y se colocan en `public/videos/`.

**Videos identificados en `index.json` y templates:**

| Video Shopify | Destino local | Usado en |
|---|---|---|
| `WEB_HOME_01_text.mp4` | `public/videos/home-hero.mp4` | Home — VideoBanner |
| `VIDEO-1_*.mp4` | `public/videos/slideshow-1.mp4` | Home — SlideshowWithMedia |
| `VIDEO-2_*.mp4` | `public/videos/slideshow-2.mp4` | Home — SlideshowWithMedia |
| `VIDEO-3_*.mp4` | `public/videos/slideshow-3.mp4` | Home — SlideshowWithMedia |
| `WEB_Fut_01.mp4` | `public/videos/futbol.mp4` | Home — HorizontalScrollingBanners |

**Nota:** Revisar cada template para identificar todos los videos usados. Los videos están alojados en `shopify://files/videos/` y deben descargarse manualmente del admin de Shopify.

### Imágenes

Las imágenes están en el CDN de Shopify (`shopify://shop_images/`). Deben descargarse y colocarse en `public/images/`.

**Imágenes identificadas en `index.json`:**

| Imagen Shopify | Destino sugerido |
|---|---|
| `Mapa_*.jpg` | `public/images/home/mapa-monterrey.jpg` |
| `Mapa-C.jpg` | `public/images/home/mapa-monterrey-mobile.jpg` |
| `Imagen-1_*.jpg` | `public/images/home/rutas-principales.jpg` |
| `Imagen-2_*.jpg` | `public/images/home/regio-ruta.jpg` |
| `image_*.jpg` | `public/images/home/como-llegar-estadio.jpg` |
| `Imagen-8.jpg` | `public/images/home/estadio-bbva.jpg` |
| `MASCOTAS-14.jpg` | `public/images/home/mascotas.jpg` |
| `MM5_FIFA_*.webp` | `public/images/home/fifa-balon.webp` |
| `Historias-1.png` | `public/images/home/historias-1.png` |
| `Historias-2.png` | `public/images/home/historias-2.png` |
| `Historias-3.png` | `public/images/home/historias-3.png` |
| `LogoMB-500x500px.png` | `public/images/logo-mb.png` |

**Instrucción:** Descargar TODAS las imágenes del admin de Shopify (Settings → Files) y organizarlas en `public/images/` por sección/página.

### Videos embedidos (externos)

Para videos largos (YouTube/Vimeo), usar un componente wrapper:

```typescript
// src/components/ui/VideoEmbed.tsx
interface VideoEmbedProps {
  src: string; // URL de YouTube/Vimeo
  title: string;
  aspectRatio?: "16/9" | "4/3" | "1/1";
}
```

---

## 12. Fase 8 — SEO y performance

### Metadata

Cada `page.tsx` debe exportar `generateMetadata()`:

```typescript
export function generateMetadata({ params }: Props): Metadata {
  return {
    title: "Partidos y Sedes | Monterrey FIFA 2026",
    description: "Calendario de partidos, sedes y horarios...",
    openGraph: {
      title: "...",
      description: "...",
      images: ["/images/og/partidos.jpg"],
    },
  };
}
```

### Performance

| Técnica | Implementación |
|---|---|
| Imágenes | `next/image` con `sizes`, blur placeholder, lazy loading |
| Videos | Lazy load con Intersection Observer, `preload="none"` |
| Code splitting | `next/dynamic` para secciones pesadas (Swiper, Framer Motion) |
| Fonts | `next/font` para cargar fuentes optimizadas |
| Static generation | `output: 'export'` para SSG completo en Vercel |

### Archivos SEO

```
app/
  sitemap.ts        ← Genera sitemap.xml automáticamente
  robots.ts         ← Configura robots.txt
  manifest.ts       ← PWA manifest (opcional)
```

---

## 13. Fase 9 — Deploy

### Configuración de Vercel

1. Conectar repositorio Git a Vercel
2. Configurar variables de entorno (si las hay)
3. Build command: `next build`
4. Output: Static Export (`output: 'export'` en next.config.ts)

### next.config.ts

```typescript
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  output: "export", // SSG completo
  images: {
    unoptimized: true, // Para static export
    // O usar loader custom para Vercel
  },
};

export default withNextIntl(nextConfig);
```

---

## Apéndice A — Mapa completo de archivos

### Leyenda
- MIGRAR = Se convierte a un componente/archivo en Next.js
- REFERENCIA = Se usa como referencia visual/de datos, no se copia
- ELIMINAR = No se necesita en el nuevo proyecto

### layout/ (2 archivos)

| Archivo | Acción | Destino en Next.js |
|---|---|---|
| `theme.liquid` | MIGRAR | `src/app/[locale]/layout.tsx` + `globals.css` |
| `password.liquid` | ELIMINAR | — |

### templates/ (56 archivos)

| Archivo | Acción | Destino en Next.js |
|---|---|---|
| `index.json` | MIGRAR | `src/app/[locale]/page.tsx` |
| `page.partidos-y-sedes.json` | MIGRAR | `src/app/[locale]/partidos-y-sedes/page.tsx` |
| `page.calendario-partidos.json` | MIGRAR | `src/app/[locale]/calendario-partidos/page.tsx` |
| `page.horarios-partidos.json` | MIGRAR | `src/app/[locale]/horarios-partidos/page.tsx` |
| `page.resultados-partidos.json` | MIGRAR | `src/app/[locale]/resultados-partidos/page.tsx` |
| `page.sedes-partidos.json` | MIGRAR | `src/app/[locale]/sedes-partidos/page.tsx` |
| `page.transporte-y-movilidad.json` | MIGRAR | `src/app/[locale]/transporte-y-movilidad/page.tsx` |
| `page.transporte-movilidad.json` | MIGRAR | `src/app/[locale]/transporte-movilidad/page.tsx` |
| `page.estadiomonterre-movilidad.json` | MIGRAR | `src/app/[locale]/estadio-monterrey/page.tsx` |
| `page.mapadezonas-movilidad.json` | MIGRAR | `src/app/[locale]/mapa-de-zonas/page.tsx` |
| `page.hospedaje-y-zonas.json` | MIGRAR | `src/app/[locale]/hospedaje-y-zonas/page.tsx` |
| `page.comida-hospitalidad.json` | MIGRAR | `src/app/[locale]/comida/page.tsx` |
| `page.bares-hospitalidad.json` | MIGRAR | `src/app/[locale]/bares/page.tsx` |
| `page.plataformas-hospitalidad.json` | MIGRAR | `src/app/[locale]/plataformas/page.tsx` |
| `page.zonarecomend-hospitalidad.json` | MIGRAR | `src/app/[locale]/zonas-recomendadas/page.tsx` |
| `page.cultura-y-experiencias.json` | MIGRAR | `src/app/[locale]/cultura-y-experiencias/page.tsx` |
| `page.museos-cultura.json` | MIGRAR | `src/app/[locale]/museos/page.tsx` |
| `page.eventos-cultura.json` | MIGRAR | `src/app/[locale]/eventos-cultura/page.tsx` |
| `page.explora-monterrey.json` | MIGRAR | `src/app/[locale]/explora-monterrey/page.tsx` |
| `page.barrioantiguo-quehacer.json` | MIGRAR | `src/app/[locale]/barrio-antiguo/page.tsx` |
| `page.tours-quehacer.json` | MIGRAR | `src/app/[locale]/tours/page.tsx` |
| `page.lugares-quehacer.json` | MIGRAR | `src/app/[locale]/lugares/page.tsx` |
| `page.fifafan-quehacer.json` | MIGRAR | `src/app/[locale]/fifa-fan/page.tsx` |
| `page.eventos-quehacer.json` | MIGRAR | `src/app/[locale]/eventos/page.tsx` |
| `page.comunidad.json` | MIGRAR | `src/app/[locale]/comunidad/page.tsx` |
| `page.historias-comunidad.json` | MIGRAR | `src/app/[locale]/historias/page.tsx` |
| `page.anfitrionesregios-volunta.json` | MIGRAR | `src/app/[locale]/anfitriones-regios/page.tsx` |
| `page.panchomundial-comunidad.json` | MIGRAR | `src/app/[locale]/pancho-mundial/page.tsx` |
| `page.mundialitobarrios-landing.json` | MIGRAR | `src/app/[locale]/mundialito-barrios/page.tsx` |
| `page.noticias-y-actualizacione.json` | MIGRAR | `src/app/[locale]/noticias/page.tsx` |
| `page.eventos-noticias.json` | MIGRAR | `src/app/[locale]/eventos-noticias/page.tsx` |
| `page.infraestructura-noticias.json` | MIGRAR | `src/app/[locale]/infraestructura/page.tsx` |
| `page.prensa-y-medios.json` | MIGRAR | `src/app/[locale]/prensa/page.tsx` |
| `page.contacto-y-ayuda.json` | MIGRAR | `src/app/[locale]/contacto/page.tsx` |
| `page.faq.json` | MIGRAR | `src/app/[locale]/faq/page.tsx` |
| `page.stockists.json` | MIGRAR | `src/app/[locale]/puntos-de-venta/page.tsx` |
| `blog.seasons.json` | MIGRAR | `src/app/[locale]/blog/page.tsx` |
| `article.seasons-blog-post.json` | MIGRAR | `src/app/[locale]/blog/[slug]/page.tsx` |
| `404.json` | MIGRAR | `src/app/[locale]/not-found.tsx` |
| `search.json` | EVALUAR | `src/app/[locale]/buscar/page.tsx` |
| `page.about.json` | ELIMINAR | Plantilla genérica Avante |
| `page.json` | ELIMINAR | Template default |
| `page.contact.json` | ELIMINAR | Usa formulario (eliminado) |
| `page.prensa-medios.json` | ELIMINAR | Usa formulario (eliminado) |
| `page.faqs.json` | ELIMINAR | Duplicado de faq |
| `password.json` | ELIMINAR | — |
| `product.json` | ELIMINAR | E-commerce |
| `product.preorder.json` | ELIMINAR | E-commerce |
| `product.quick-view.json` | ELIMINAR | E-commerce |
| `collection.json` | ELIMINAR | E-commerce |
| `list-collections.json` | ELIMINAR | E-commerce |
| `cart.json` | ELIMINAR | E-commerce |
| `customers/account.json` | ELIMINAR | E-commerce |
| `customers/login.json` | ELIMINAR | E-commerce |
| `customers/register.json` | ELIMINAR | E-commerce |
| `customers/addresses.json` | ELIMINAR | E-commerce |
| `customers/order.json` | ELIMINAR | E-commerce |
| `customers/activate_account.json` | ELIMINAR | E-commerce |
| `customers/reset_password.json` | ELIMINAR | E-commerce |

### sections/ (93 archivos)

| Archivo | Acción | Destino en Next.js |
|---|---|---|
| `anchor-link.liquid` | MIGRAR | `sections/AnchorLink.tsx` |
| `announcement-bar.liquid` | MIGRAR | `layout/AnnouncementBar.tsx` |
| `banner-gallery.liquid` | MIGRAR | `sections/BannerGallery.tsx` |
| `banners.liquid` | MIGRAR | `sections/Banners.tsx` |
| `collapsible-tabs.liquid` | MIGRAR | `sections/CollapsibleTabs.tsx` |
| `custom-liquid.liquid` | MIGRAR | `sections/CustomHTML.tsx` |
| `events.liquid` | MIGRAR | `sections/Events.tsx` |
| `featured-blog.liquid` | MIGRAR | `sections/FeaturedBlog.tsx` |
| `flyout.liquid` | MIGRAR | `layout/Flyout.tsx` |
| `footer.liquid` | MIGRAR | `layout/Footer.tsx` |
| `header.liquid` | MIGRAR | `layout/DesktopHeader.tsx` |
| `horizontal-scrolling-banners.liquid` | MIGRAR | `sections/HorizontalScrollingBanners.tsx` |
| `icons-with-text.liquid` | MIGRAR | `sections/IconsWithText.tsx` |
| `image-banner.liquid` | MIGRAR | `sections/ImageBanner.tsx` |
| `image-with-hotspots.liquid` | MIGRAR | `sections/ImageWithHotspots.tsx` |
| `main-page.liquid` | MIGRAR | Integrado en cada page.tsx |
| `media-with-tabs.liquid` | MIGRAR | `sections/MediaWithTabs.tsx` |
| `media-with-text.liquid` | MIGRAR | `sections/MediaWithText.tsx` |
| `mega-menu-drawer.liquid` | MIGRAR | `layout/MegaMenuDrawer.tsx` |
| `mobile-header.liquid` | MIGRAR | `layout/MobileHeader.tsx` |
| `multicolumn.liquid` | MIGRAR | `sections/Multicolumn.tsx` |
| `news-drawer.liquid` | MIGRAR | `layout/NewsDrawer.tsx` |
| `rich-text.liquid` | MIGRAR | `sections/RichText.tsx` |
| `scrolling-promotion.liquid` | MIGRAR | `sections/ScrollingPromotion.tsx` |
| `section-video.liquid` | MIGRAR | `sections/SectionVideo.tsx` |
| `slideshow-with-media.liquid` | MIGRAR | `sections/SlideshowWithMedia.tsx` |
| `split-banner.liquid` | MIGRAR | `sections/SplitBanner.tsx` |
| `testimonials.liquid` | MIGRAR | `sections/Testimonials.tsx` |
| `video-banner.liquid` | MIGRAR | `sections/VideoBanner.tsx` |
| `menu-drawer.liquid` | EVALUAR | Alternativa a mega-menu-drawer |
| `footer-group.json` | REFERENCIA | Datos para Footer.tsx y Flyout.tsx |
| `more-header-sections.json` | REFERENCIA | Datos para NewsDrawer.tsx |
| `main-404.liquid` | MIGRAR | `not-found.tsx` |
| Los otros 60 archivos | ELIMINAR | No usados o e-commerce |

### snippets/ (81 archivos)

| Archivo | Acción | Destino en Next.js |
|---|---|---|
| `accordion.liquid` | MIGRAR | `ui/AccordionItem.tsx` (shadcn base) |
| `article-card.liquid` | MIGRAR | `ui/ArticleCard.tsx` |
| `back-to-top.liquid` | MIGRAR | `layout/BackToTop.tsx` |
| `banner.liquid` | MIGRAR | `ui/BannerCard.tsx` |
| `breadcrumbs.liquid` | MIGRAR | `ui/Breadcrumbs.tsx` |
| `burger-menu.liquid` | MIGRAR | Parte de `MobileHeader.tsx` |
| `button.liquid` | MIGRAR | `ui/Button.tsx` (extender shadcn) |
| `context-image.liquid` | MIGRAR | `ui/ContextImage.tsx` |
| `countdown-timer.liquid` | MIGRAR | `ui/CountdownTimer.tsx` |
| `country-and-language.liquid` | MIGRAR | `ui/LanguageSwitcher.tsx` |
| `custom-assets.liquid` | REFERENCIA | Imports en layout |
| `drawer-menu.liquid` | MIGRAR | Parte de `MegaMenuDrawer.tsx` |
| `empty-space.liquid` | MIGRAR | `ui/Spacer.tsx` |
| `font-variables.liquid` | REFERENCIA | `globals.css` |
| `icon.liquid` | MIGRAR | `ui/Icon.tsx` |
| `icon-accordion.liquid` | MIGRAR | `ui/AccordionIcon.tsx` |
| `icon-accordion-2.liquid` | MIGRAR | Variante de AccordionIcon |
| `image.liquid` | MIGRAR | `ui/OptimizedImage.tsx` |
| `line.liquid` | MIGRAR | `ui/Divider.tsx` |
| `logo.liquid` | MIGRAR | `ui/Logo.tsx` |
| `mega-menu.liquid` | MIGRAR | Parte de `MegaMenuDrawer.tsx` |
| `menu.liquid` | MIGRAR | Parte de `DesktopHeader.tsx` |
| `meta-tags.liquid` | REFERENCIA | `generateMetadata()` |
| `miscellaneous.liquid` | MIGRAR | Parte de headers |
| `nested-item.liquid` | MIGRAR | Parte de `MegaMenuDrawer.tsx` |
| `nested-menu-item-first.liquid` | MIGRAR | Parte de `MegaMenuDrawer.tsx` |
| `nested-menu-item-second.liquid` | MIGRAR | Parte de `MegaMenuDrawer.tsx` |
| `news.liquid` | MIGRAR | Parte de `NewsDrawer.tsx` |
| `search-modal.liquid` | MIGRAR | `SearchModal.tsx` |
| `share.liquid` | MIGRAR | `ui/ShareButton.tsx` |
| `social-media.liquid` | MIGRAR | `ui/SocialMedia.tsx` |
| `text.liquid` | MIGRAR | `ui/TextBlock.tsx` |
| `video-button.liquid` | MIGRAR | `ui/VideoPlayButton.tsx` |
| Los otros 48 archivos | ELIMINAR | E-commerce o secciones no usadas |

### locales/ (10 archivos)

| Archivo | Acción | Destino |
|---|---|---|
| `es.json` | MIGRAR | `src/messages/es.json` (limpiar claves e-commerce) |
| `en.default.json` | MIGRAR | `src/messages/en.json` (renombrar + limpiar) |
| `fr.json` | MIGRAR | `src/messages/fr.json` (limpiar) |
| `de.json` | MIGRAR | `src/messages/de.json` (limpiar) |
| `it.json` | MIGRAR | `src/messages/it.json` (limpiar) |
| `es.schema.json` | ELIMINAR | Admin de Shopify |
| `en.default.schema.json` | ELIMINAR | Admin de Shopify |
| `fr.schema.json` | ELIMINAR | Admin de Shopify |
| `de.schema.json` | ELIMINAR | Admin de Shopify |
| `it.schema.json` | ELIMINAR | Admin de Shopify |

### config/ (2 archivos)

| Archivo | Acción | Uso |
|---|---|---|
| `settings_schema.json` | REFERENCIA | Entender qué opciones existen |
| `settings_data.json` | REFERENCIA | Extraer valores actuales para design tokens |

---

## Apéndice B — Instrucciones para Claude Code

### Flujo de trabajo recomendado

Para cada componente a migrar, seguir este proceso:

1. **Copiar el archivo .liquid** del proyecto Shopify al proyecto Next.js (carpeta temporal o como referencia)
2. **Copiar los CSS asociados** como referencia
3. **Darle a Claude Code el siguiente prompt:**

```
Estoy migrando un tema Shopify (Avante) a Next.js. 

Archivo fuente: [nombre].liquid
CSS de referencia: [nombre].css

Convierte este componente Liquid a un componente React con TypeScript y Tailwind CSS.

Reglas:
- {{ variable }} → props o constantes hardcodeadas
- {% if condition %} → condicional JSX
- {% for item in array %} → .map()
- {% render 'snippet' %} → import del componente correspondiente
- {{ 'file.css' | asset_url | stylesheet_tag }} → Tailwind classes
- {{ 'file.js' | asset_url }} → import del módulo
- section.settings.* → props del componente
- settings.* → CSS variables de globals.css o constantes
- Shopify CDN URLs → rutas locales (/images/, /videos/)
- request.locale → useLocale() de next-intl
- Breakpoint principal: 920px = md en Tailwind
- Mantener la misma estructura visual (réplica fiel)
```

4. **Revisar el output**, ajustar estilos comparando con el sitio de Shopify
5. **Importar el componente** en el page.tsx correspondiente

### Orden de ejecución recomendado

```
Fase 0: Scaffold + config (1 sesión de Claude Code)
  └── Crear proyecto, tailwind.config, globals.css, next-intl setup

Fase 1: Layout (2-3 sesiones)
  └── layout.tsx → AnnouncementBar → DesktopHeader → MobileHeader 
      → MegaMenuDrawer → Footer → Flyout → BackToTop

Fase 2: Secciones de alta prioridad (5-7 sesiones)
  └── RichText → VideoBanner → ImageBanner → Multicolumn 
      → MediaWithText → CollapsibleTabs → Banners 
      → HorizontalScrollingBanners → SplitBanner

Fase 3: Secciones de media prioridad (3-4 sesiones)
  └── ImageWithHotspots → MediaWithTabs → Events → SlideshowWithMedia
      → BannerGallery → ScrollingPromotion → SectionVideo
      → Testimonials → FeaturedBlog → IconsWithText

Fase 4: Páginas — empezar por Home (5-8 sesiones)
  └── Home → Explora Monterrey → Partidos y Sedes 
      → Transporte → Hospedaje → Cultura → Qué Hacer
      → Comunidad → Noticias → Prensa → FAQ → Contacto

Fase 5: i18n + SEO + Polish (2-3 sesiones)
  └── Locale files → metadata → sitemap → testing visual
```

### Cómo pedir cada componente a Claude Code

**Ejemplo para VideoBanner:**
```
Migra sections/video-banner.liquid a src/components/sections/VideoBanner.tsx

Contexto:
- Es un banner full-width con video de fondo en autoplay/loop/muted
- Tiene overlay con opacidad configurable
- Contenido superpuesto: heading, texto, botones CTA
- Videos locales en /public/videos/
- CSS de referencia: assets/section-banner.css
- Breakpoint: 920px = md
- Alturas en vh (desktop y mobile diferentes)

Props que necesita:
- videoSrc: string (ruta local del video)
- overlayOpacity?: number (0-100)
- height?: { desktop: number; mobile: number } (en vh)
- contentPosition?: { vertical: string; horizontal: string }
- colorType?: 'default' | 'invert' | 'custom'
- children: React.ReactNode (contenido superpuesto)

Usa "use client" porque tiene <video> con autoplay.
Usa Tailwind CSS para los estilos.
Replica fielmente el diseño del CSS de referencia.
```
