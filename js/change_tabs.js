/**
 * Lógica compartida para cambio de pestañas, acordeones, modales y galerías interactivas
 */

// 1. Array de imágenes para el carrusel de la página del cable AMP
const ampImages = [
    'images/6-1427200-4-1.jpg',
    'images/Caja.jpg',
    'images/1427254-4-1.jpg'
];
let currentImageIndex = 0;

// 2. Inicializadores al cargar el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Compatibilidad para pestañas de la página de Cisco Catalyst (index.html / C9200L-24P-4G-E.html)
    const productTab = document.getElementById('product-tab');
    const imagesTab = document.getElementById('images-tab');
    const infoSection = document.getElementById('information-section');
    const imagesSection = document.getElementById('images-section');

    if (productTab && imagesTab && infoSection && imagesSection) {
        productTab.addEventListener('click', function() {
            productTab.classList.remove('bg-gray-100', 'text-gray-700');
            productTab.classList.add('bg-blue-600', 'text-white');
            imagesTab.classList.remove('bg-blue-600', 'text-white');
            imagesTab.classList.add('bg-gray-100', 'text-gray-700');
            infoSection.classList.remove('hidden');
            imagesSection.classList.add('hidden');
        });

        imagesTab.addEventListener('click', function() {
            imagesTab.classList.remove('bg-gray-100', 'text-gray-700');
            imagesTab.classList.add('bg-blue-600', 'text-white');
            productTab.classList.remove('bg-blue-600', 'text-white');
            productTab.classList.add('bg-gray-100', 'text-gray-700');
            imagesSection.classList.remove('hidden');
            infoSection.classList.add('hidden');
        });
    }

    // Inicializar puntos indicadores de la galería móvil al cargar
    updateMobileDots();
});

/* ==========================================================================
   Funciones de la Galería y Carrusel de Fotos (AMP Page)
   ========================================================================== */

/**
 * Selecciona una miniatura por su índice
 * @param {number} index - Índice de la miniatura a seleccionar
 */
function selectThumbnail(index) {
    if (index < 0 || index >= ampImages.length) return;
    currentImageIndex = index;
    
    // Cambiar la imagen principal
    const mainImg = document.getElementById('img_main');
    if (mainImg) {
        mainImg.src = ampImages[index];
    }

    // Actualizar estilos activos de las miniaturas en escritorio
    const thumbs = document.querySelectorAll('.thumb-container');
    thumbs.forEach((thumb, idx) => {
        if (idx === index) {
            thumb.classList.remove('border-gray-200', 'hover:border-blue-400');
            thumb.classList.add('border-primary');
        } else {
            thumb.classList.remove('border-primary');
            thumb.classList.add('border-gray-200', 'hover:border-blue-400');
        }
    });

    // Actualizar puntos de indicador móvil
    updateMobileDots();
}

/**
 * Pasa a la siguiente imagen en la galería
 */
function nextImage() {
    const nextIdx = (currentImageIndex + 1) % ampImages.length;
    selectThumbnail(nextIdx);
}

/**
 * Retrocede a la imagen anterior en la galería
 */
function prevImage() {
    const prevIdx = (currentImageIndex - 1 + ampImages.length) % ampImages.length;
    selectThumbnail(prevIdx);
}

/**
 * Abre el visualizador ampliando la imagen cargada actualmente
 */
function openModalFromMain() {
    viewImage(ampImages[currentImageIndex]);
}

/**
 * Actualiza los círculos indicadores móviles
 */
function updateMobileDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        if (idx === currentImageIndex) {
            dot.classList.remove('bg-gray-300');
            dot.classList.add('bg-primary');
        } else {
            dot.classList.remove('bg-primary');
            dot.classList.add('bg-gray-300');
        }
    });
}

/* ==========================================================================
   Funciones de Pestañas (Desktop) y Acordeones (Móvil)
   ========================================================================== */

/**
 * Alterna entre pestañas de especificaciones en pantallas medianas/grandes
 * @param {number} tabIndex - Índice de la pestaña
 */
function switchTab(tabIndex) {
    // Actualizar botones de pestañas
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach((btn, idx) => {
        if (idx === tabIndex) {
            btn.classList.remove('text-gray-500', 'hover:text-gray-800', 'border-transparent');
            btn.classList.add('text-accent', 'border-accent', 'font-bold');
        } else {
            btn.classList.remove('text-accent', 'border-accent', 'font-bold');
            btn.classList.add('text-gray-500', 'hover:text-gray-800', 'border-transparent');
        }
    });

    // Mostrar/ocultar los paneles de contenido
    const panes = document.querySelectorAll('.tab-pane');
    panes.forEach((pane, idx) => {
        if (idx === tabIndex) {
            pane.classList.remove('hidden');
            pane.classList.add('block');
        } else {
            pane.classList.remove('block');
            pane.classList.add('hidden');
        }
    });
}

/**
 * Despliega/Colapsa un acordeón de información técnica en móviles
 * @param {number} accIndex - Índice del acordeón
 */
function toggleAccordion(accIndex) {
    const content = document.getElementById(`acc-content-${accIndex}`);
    const icon = document.getElementById(`acc-icon-${accIndex}`);
    
    if (!content) return;

    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        if (icon) icon.classList.remove('rotate-180');
    }
}

/* ==========================================================================
   Carrusel de Productos "También Disponible" y Utilidades
   ========================================================================== */

/**
 * Desplaza hacia la derecha el contenedor de productos recomendados
 */
function nextRelated() {
    const container = document.getElementById('related-container');
    if (container) {
        container.scrollBy({ left: 240, behavior: 'smooth' });
    }
}

/**
 * Desplaza hacia la izquierda el contenedor de productos recomendados
 */
function prevRelated() {
    const container = document.getElementById('related-container');
    if (container) {
        container.scrollBy({ left: -240, behavior: 'smooth' });
    }
}

/**
 * Realiza un scroll suave hacia la parte superior de la página
 */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   Modal/Lightbox de Imágenes (Compatibilidad Global)
   ========================================================================== */

/**
 * Abre el modal/lightbox para ver la imagen a pantalla completa
 * @param {string} src - Ruta de la imagen
 */
function viewImage(src) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    if (modal && modalImg) {
        modalImg.src = src;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Evitar scroll
    }
}

/**
 * Cierra el modal/lightbox de imagen
 */
function closeModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restaurar scroll
    }
}

// Escuchar pulsaciones de teclas (Cerrar modal con escape)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Soporte retrocompatible para cambio de imágenes en la página de Cisco
function toExchangeImage(thumbnail) {
    const mainImg = document.getElementById('img_main');
    if (mainImg && thumbnail) {
        mainImg.src = thumbnail.src;
        mainImg.alt = thumbnail.alt;
    }
}