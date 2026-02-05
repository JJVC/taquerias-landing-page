// ============================================
// FUNCIONES PRINCIPALES
// ============================================

// ============================================
// CONTROL DE CONTENIDO TEMPORAL POR FECHAS
// ============================================

// Controlar visibilidad de contenido basado en fechas/horas
function manejarContenidoTemporal() {
  const ahora = new Date();
  
  // Seleccionar todos los elementos con atributos de fecha
  const elementosTemporales = document.querySelectorAll('[data-fecha-inicio][data-fecha-fin]');
  
  elementosTemporales.forEach(elemento => {
    try {
      // Parsear fechas (soporta formato ISO 8601 con zona horaria)
      const fechaInicio = new Date(elemento.dataset.fechaInicio);
      const fechaFin = new Date(elemento.dataset.fechaFin);
      
      // Validar que las fechas sean válidas
      if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
        console.error('Fechas inválidas en elemento:', elemento);
        return;
      }
      
      // Verificar si estamos dentro del rango
      const estaActivo = ahora >= fechaInicio && ahora <= fechaFin;
      
      if (estaActivo) {
        elemento.style.display = ''; // Mostrar
        console.log('Contenido temporal visible:', elemento.className);
      } else {
        elemento.style.display = 'none'; // Ocultar
        console.log('Contenido temporal oculto:', elemento.className);
      }
      
      // Log para debugging (opcional, comentar en producción)
      const tiempoRestante = estaActivo ? fechaFin - ahora : fechaInicio - ahora;
      const horasRestantes = Math.floor(tiempoRestante / (1000 * 60 * 60));
      const minutosRestantes = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
      
      if (estaActivo) {
        console.log(`Tiempo restante: ${horasRestantes}h ${minutosRestantes}m`);
      }
      
    } catch (error) {
      console.error('Error al procesar contenido temporal:', error);
    }
  });
}

// Copiar cupón al clipboard
function copiarCupon() {
  const cuponInput = document.getElementById('cuponCode');
  
  if (cuponInput) {
    cuponInput.select();
    cuponInput.setSelectionRange(0, 99999); // Para móviles
    
    navigator.clipboard.writeText(cuponInput.value).then(() => {
      // Cambiar texto del botón temporalmente
      const btn = event.target;
      const textoOriginal = btn.textContent;
      btn.textContent = '✓ Copiado!';
      btn.style.backgroundColor = '#4CAF50';
      
      setTimeout(() => {
        btn.textContent = textoOriginal;
        btn.style.backgroundColor = '';
      }, 2000);
    }).catch(err => {
      console.error('Error al copiar:', err);
      alert('Cupón: ' + cuponInput.value);
    });
  }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

// Observar elementos para animarlos al hacer scroll
const observeElements = () => {
  const elements = document.querySelectorAll('.especialidad-card, .promo-card, .info-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
};

// ============================================
// SMOOTH SCROLL
// ============================================

// Smooth scroll para enlaces internos
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // Iniciar observación de elementos
  observeElements();
  
  // Controlar contenido temporal
  manejarContenidoTemporal();
  
  // Revisar cada minuto si el contenido temporal debe cambiar
  setInterval(manejarContenidoTemporal, 60000); // 60000ms = 1 minuto
});

// ============================================
// WHATSAPP BUTTON TRACKING
// ============================================

// Tracking de clicks en botón de WhatsApp (opcional para analytics)
const trackWhatsAppClick = (location) => {
  console.log(`WhatsApp click desde: ${location}`);
  
  // Aquí podrías agregar Google Analytics o similar
  // gtag('event', 'whatsapp_click', { location: location });
};

// Agregar evento a todos los enlaces de WhatsApp
document.addEventListener('DOMContentLoaded', () => {
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
  
  whatsappLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
      const section = link.closest('section')?.className || 'unknown';
      trackWhatsAppClick(section);
    });
  });
});

// ============================================
// HORARIO ACTUAL (Opcional)
// ============================================

// Mostrar si está abierto o cerrado basado en el horario
const checkHorario = () => {
  const ahora = new Date();
  const hora = ahora.getHours();
  
  // Horario: 15:00 (3 PM) hasta 2:00 AM
  // Está abierto si es >= 15:00 o < 2:00
  const estaAbierto = hora >= 15 || hora < 2;
  
  // Podrías usar esto para mostrar un badge de "Abierto Ahora"
  return estaAbierto;
};

// ============================================
// LAZY LOADING IMAGES (Opcional)
// ============================================

// Lazy loading para imágenes de especialidades
const lazyLoadImages = () => {
  const images = document.querySelectorAll('[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
};

// ============================================
// PERFORMANCE
// ============================================

// Precarga de recursos críticos
const preloadResources = () => {
  // Precargar imágenes importantes
  const heroImage = document.querySelector('.hero');
  if (heroImage) {
    const bgImage = window.getComputedStyle(heroImage).backgroundImage;
    const imageUrl = bgImage.slice(4, -1).replace(/"/g, '');
    
    const img = new Image();
    img.src = imageUrl;
  }
};

// ============================================
// INIT
// ============================================

// Ejecutar al cargar la página
window.addEventListener('load', () => {
  preloadResources();
  
  // Ocultar scroll indicator después de scroll
  let scrolled = false;
  window.addEventListener('scroll', () => {
    if (!scrolled && window.scrollY > 100) {
      const indicator = document.querySelector('.scroll-indicator');
      if (indicator) {
        indicator.style.opacity = '0';
        indicator.style.transition = 'opacity 0.5s';
      }
      scrolled = true;
    }
  });
});

// ============================================
// UTILIDADES
// ============================================

// Formatear número de teléfono
const formatearTelefono = (numero) => {
  // Remover todo excepto dígitos
  const limpio = numero.replace(/\D/g, '');
  
  // Formatear: (XXX) XXX-XXXX
  if (limpio.length === 10) {
    return `(${limpio.slice(0, 3)}) ${limpio.slice(3, 6)}-${limpio.slice(6)}`;
  }
  return numero;
};

// Encode para URLs
const encodeWhatsAppMessage = (mensaje) => {
  return encodeURIComponent(mensaje);
};

// ============================================
// COMPARTIR (Web Share API)
// ============================================

// Permitir compartir la landing page
const compartirPagina = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: '¡Mira este lugar! Los mejores tacos al pastor',
        url: window.location.href
      });
      console.log('Compartido exitosamente');
    } catch (err) {
      console.log('Error al compartir:', err);
    }
  } else {
    // Fallback: copiar URL
    navigator.clipboard.writeText(window.location.href);
    alert('Enlace copiado al portapapeles!');
  }
};

// Exponer funciones globalmente si son necesarias
window.copiarCupon = copiarCupon;
window.compartirPagina = compartirPagina;
