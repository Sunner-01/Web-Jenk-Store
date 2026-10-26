---
name: Voltio Store
description: Catálogo tecnológico fotográfico de demostración académica.
colors:
  ink: "#142c29"
  muted: "#52605c"
  paper: "#ffffff"
  soft: "#f3f5f2"
  line: "#dce3de"
  accent: "#165b47"
  mint: "#d5ecdf"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(44px, 5.1vw, 74px)"
    fontWeight: 800
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  headline:
    fontSize: "28px"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontSize: "12px"
    fontWeight: 700
rounded:
  control: "8px"
  photo: "12px"
  surface: "14px"
spacing:
  mobile-grid-gap: "16px"
  desktop-grid-gap: "24px"
  section-gap: "64px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "15px 20px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
---

# Design System: Voltio Store

## Overview

Inventario del sistema observado en código y capturas desktop (1440 × 1000) y móvil (390 × 844). No hay comp aprobado; esta documentación no atribuye aprobación estética al usuario. El contrato de superficie vive en `.impeccable/surface.md`.

Fotografía de producto, blanco, tinta verde profunda y menta organizan la compra. Manrope combina titulares densos con controles compactos. Las fichas no tienen contenedores decorativos anidados.

**Key Characteristics:**

- Fotografía rectangular con recorte de cobertura.
- Tinta verde para texto y acciones principales.
- Superficies planas y carrito lateral elevado.
- Jerarquía por escala y peso tipográfico.

## Colors

Los valores normativos del frontmatter corresponden a `src/app/globals.css`.

### Primary

Tinta verde profunda para texto, anuncio, botones principales y selección activa. Verde de interacción para hover y mensajes. Menta clara para portada, selección y confirmación.

### Neutral

Papel blanco para fondo y carrito; verde grisáceo para descripciones; blanco suave para banner y estados vacíos; línea gris verdosa para divisores. El amarillo pertenece a la fotografía, con fallback local `#eec448`, y no constituye un acento global de interacción.

## Typography

**Display Font:** Manrope (Arial, sans-serif de respaldo).
**Body Font:** Manrope (Arial, sans-serif de respaldo).

Los pesos locales importados son 400, 500, 600, 700 y 800. El display del frontmatter cambia a 54px a ≤1050px, 53px a ≤760px y 47px a ≤420px. El título del catálogo pasa de 28px a 25px y luego 23px. Nombres de producto: 15px/800 y 17px en móvil estrecho. Descripciones: 11px; metadatos: 10px. Los precios usan cifras tabulares.

## Layout

Contenedor máximo de 1320px con ancho `calc(100% - 96px)`. A ≤1050px deja 28px por lado y a ≤760px, 18px. La cabecera mide 100px, o 80px en móvil. La portada tiene dos columnas iguales y se apila a ≤760px. Su imagen móvil tiene un mínimo de 290px de alto.

El catálogo tiene cuatro columnas, tres a ≤1050px, dos a ≤760px y una a ≤420px. Espaciado de escritorio: 36px entre filas, 24px entre columnas; móvil: 28px y 16px. El catálogo comienza 64px después de la portada, o 40px en móvil. En el viewport desktop se ven los primeros productos; en móvil se ve el inicio del catálogo.

La navegación textual desaparece a ≤760px y los enlaces de portada conservan acceso al catálogo. A ≤420px el carrito muestra icono y contador con nombre accesible explícito. Las fotografías tienen proporción 1.13, o 1.4 a ≤420px. El panel de carrito ocupa hasta 440px con márgenes de 16px y scroll vertical propio. A ≥1500px la portada e imagen tienen mínimo de 490px y el padding izquierdo del texto aumenta a 60px.

## Elevation & Depth

Fichas planas sin sombra ni borde exterior. El carrito es la única elevación estructural, con sombra `0 12px 60px #142c2933`. El resto se separa por blancos, fotografía, tonos y divisores.

## Shapes

Superficies principales de 14px, fotografías de 12px y controles de 8px. Carrito de 14px. Favoritos y enlace descendente circulares; categorías futuras con píldoras de 25px. Imágenes con `object-fit: cover`.

## Components

### Buttons

Primarios en tinta y blanco, padding definido en frontmatter. Hover verde en 0.2s. Foco global de 3px `#247458`, separado 4px. Deshabilitados con opacidad 0.5. Añadir usa borde fino y hover menta.

### Cards / Containers

Fotografía, categoría/disponibilidad, nombre, descripción, precio y acción. Hover fotográfico a escala 1.035 en 0.4s `cubic-bezier(.16,1,.3,1)`. Agotado tiene etiqueta y acción deshabilitada.

### Inputs / Fields

Borde fino, blanco y esquinas de 6–8px. Búsqueda con foco de contenedor de 2px verde. Búsqueda, orden, cupón y filtros dependen de módulos futuros; no aparecen en las capturas base.

### Navigation

Rayo Lucide y marca textual. Dos enlaces desktop de 13px/600; hover subrayado con separación de 5px. Carrito con borde, icono, contador oscuro, `aria-expanded` y referencia al panel.

### Cart

Panel blanco con lista, cantidades, eliminar, subtotal, envío y total. Estado vacío con llamada a explorar; resumen que declara la compra simulada. Entrada de 0.28s con desplazamiento y clip-path. Movimiento reducido anula animaciones, transiciones y scroll suave.

## Do's and Don'ts

### Do:

- **Do** reutilizar los colores y tipografía extraídos.
- **Do** conservar nombres de acción accesibles, estados vacíos y agotados.
- **Do** comprobar catálogo y carrito en los cuatro cambios de columnas.

### Don't:

- **Don't** presentar fotos como prueba de especificaciones del catálogo ficticio.
- **Don't** introducir indicadores de CI en la compra, según el contrato de superficie.
- **Don't** interpretar este inventario como aprobación estética del usuario.
