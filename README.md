# DS3 Comunicaciones - Rediseño Responsivo y Premium

Este repositorio contiene la solución a la prueba técnica para transformar la página del producto **Cable UTP AMP Cat 6 (6-1427200-4)** en una interfaz web premium, de alta fidelidad, 100% responsiva y optimizada a nivel de código, rendimiento y accesibilidad.

---

## 🚀 Resumen del Trabajo Realizado

Partiendo de la base heredada del conmutador Cisco (*C9200L-24P-4G-E*), se implementó un rediseño de marca completo y un sistema responsivo fluido adaptado a los lineamientos modernos de **DS3 Comunicaciones**.

### 📱 1. Adaptabilidad y Responsividad (Mobile First)
*   **Grid Fluido**: Conversión de la estructura de tablas fijas y contenedores estáticos a una maquetación basada en **Flexbox** y **CSS Grid** de Tailwind.
*   **Tabs Adaptativas (Escritorio vs. Móvil)**:
    *   En ordenadores, la información técnica se organiza en pestañas horizontales limpias (*Descripción*, *Especificaciones*, *Aplicaciones*, *Descargas*).
    *   En dispositivos móviles, estas pestañas se transforman dinámicamente en **acordeones verticales colapsables** táctiles, optimizando la legibilidad en pantallas pequeñas.
*   **Header Compacto Móvil**: Reducción del tamaño de cabecera con el logotipo de la marca unificado a la izquierda pegado al menú de hamburguesa, y el botón **COTIZAR** a la derecha, mejorando la usabilidad con una sola mano.

### 🎨 2. Rediseño Estético e Interacciones
*   **Galería Interactiva**: Carrusel interactivo compatible con chevrons (flechas), selección mediante miniaturas (*thumbnails*) locales e indicadores por puntos en móviles.
*   **Fila de Iconos Técnicos**: Diseño moderno de iconos técnicos para las especificaciones primarias del cable (Categoría, Pares, Frecuencia, Chaqueta y Certificación).
*   **Tarjetas de Confianza**: Inserción de bloques promocionales con iconos vectoriales sobre envíos, autenticidad y soporte técnico, fortaleciendo la confianza del comprador.
*   **Llamados a la Acción (CTA)**: Diseño destacado y ergonómico para cotizaciones rápidas vía web o WhatsApp, además del botón flotante en la esquina inferior derecha.

### 🛠️ 3. Mejoras Técnicas y Buenas Prácticas
*   **Eliminación de CLS (Cumulative Layout Shift)**: Optimización del tamaño de contenedores e imágenes para evitar saltos en la maquetación durante la carga del sitio.
*   **Consolidación de Estilos**: Reemplazo de inyecciones dinámicas de estilos en JavaScript por clases estáticas y limpias en [style.css](./css/style.css).
*   **Resolución de Rutas Relativas**: Modificación en el script del Navbar [nav.js](./js/nav.js) para detectar si la página se ejecuta en la raíz o en una subcarpeta (como `/AMP/`), cargando el Navbar de forma dinámica sin romper los enlaces.
*   **Unificación Tipográfica**: Importación e implementación global de la fuente **Inter** de Google Fonts para dar un acabado limpio y corporativo al sitio.
*   **Corrección de Identificadores (IDs)**: Limpieza de IDs duplicados en el DOM para cumplir con los estándares W3C y garantizar la compatibilidad con buscadores y lectores de pantalla.

---

## 📸 Capturas de Pantalla (Rediseño)

| Vista Escritorio | Vista Móvil |
| :---: | :---: |
| ![Desktop Preview](./AMP/screenshot/127.0.0.1_5500_AMP_6-1427200-4.html%28iPad%20Pro%29.png) | ![Mobile Preview](./AMP/screenshot/127.0.0.1_5500_AMP_6-1427200-4.html%28iPhone%2014%20Pro%20Max%29%20%281%29.png) |

---

## 📈 Recomendaciones Profesionales para DS3 Comunicaciones

A nivel de arquitectura y desarrollo de cara al futuro del portal de la empresa, se sugieren las siguientes optimizaciones a mediano plazo:

### 1. Migración a un Framework Basado en Componentes
Actualmente el sitio carga el menú de navegación dinámicamente mediante `fetch()` por AJAX en cada carga de página. Esto penaliza el tiempo del **LCP (Largest Contentful Paint)** y del SEO ya que los buscadores no siempre renderizan scripts asíncronos en el primer barrido.

*   **Recomendación**: Migrar el sitio a **Next.js (React)** o **Astro**.
    *   **Beneficios**: Generación Estática (SSG) de páginas, optimización automática de imágenes, y reutilización real de cabeceras y pies de página sin peticiones de red del lado del cliente.
    *   *Astro* es especialmente adecuado para sitios informativos y de catálogo ya que produce 0 KB de JavaScript por defecto en el cliente.

### 2. Implementación de un CDN de Imágenes
Las imágenes del catálogo de productos y cables se cargan localmente.
*   **Recomendación**: Utilizar servicios como **Cloudinary** o un CDN (como Cloudflare) configurado para servir imágenes en formatos modernos (como `.webp` o `.avif`) con compresión al vuelo. Esto reduciría el peso de las imágenes de la galería en más del 70%, acelerando la velocidad de carga móvil.

### 3. Pipeline de Compilación CSS (PurgeCSS)
El sitio importa Tailwind CSS de manera completa, lo que puede resultar en archivos pesados.
*   **Recomendación**: Si se mantiene la base en HTML clásico, utilizar un proceso de construcción mediante NPM para purgar el CSS no utilizado y minificar los archivos finales antes de subirlos a producción.

---

## 📁 Estructura del Proyecto

*   [AMP/6-1427200-4.html](./AMP/6-1427200-4.html): Página de producto responsiva rediseñada.
*   [components/navbar.html](./components/navbar.html): Cabecera global compartida (DS3 Logo y barra de búsqueda).
*   [css/style.css](./css/style.css): Hoja de estilos centralizada.
*   [js/change_tabs.js](./js/change_tabs.js): Lógica interactiva del carrusel de imágenes, tabs de escritorio y acordeones móviles.
*   [js/nav.js](./js/nav.js): Inyector asíncrono y enrutador del Navbar global.
