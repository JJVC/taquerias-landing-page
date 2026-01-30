# Sistema de Landing Pages para Taquerías

Este proyecto usa 11ty (Eleventy) para generar landing pages estáticas optimizadas para conversión.

## 🚀 Configuración Inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Desarrollo local

```bash
npm start
```

Abre http://localhost:8080/gaviotas/ para ver la landing page de Taquería Gaviotas.

### 3. Build de producción

```bash
npm run build
```

Los archivos se generan en `_site/`

## 📂 Estructura del Proyecto

```
pages/
├── src/
│   ├── _data/
│   │   └── taquerias/
│   │       └── gaviotas.json          # Datos de Taquería Gaviotas
│   ├── _includes/
│   │   └── layouts/
│   │       └── base.njk               # Layout base HTML
│   ├── css/
│   │   └── style.css                  # Estilos globales
│   ├── js/
│   │   └── main.js                    # JavaScript
│   └── gaviotas/
│       └── index.njk                  # Página de Gaviotas
├── .eleventy.js                       # Configuración 11ty
├── package.json
└── README.md
```

## ➕ Agregar Nueva Taquería

### Paso 1: Crear archivo de datos

Crea `src/_data/taquerias/nueva-taqueria.json` copiando y editando `gaviotas.json`:

```json
{
  "nombre": "Taquería Nueva",
  "slug": "nueva-taqueria",
  "lema": "El mejor sabor",
  ...
}
```

### Paso 2: Crear carpeta y página

Crea `src/nueva-taqueria/index.njk` copiando `src/gaviotas/index.njk` y cambiando la referencia:

```yaml
---
layout: layouts/base.njk
taqueria: taquerias.nueva-taqueria
...
---
```

### Paso 3: Build y deploy

```bash
npm run build
```

La nueva página estará en `_site/nueva-taqueria/`

## 🌐 Deploy a GitHub Pages

### Configuración automática (GitHub Actions)

1. Sube el proyecto a GitHub
2. Ve a Settings > Pages
3. Source: GitHub Actions
4. Cada push a `main` desplegará automáticamente

### Acceso a las páginas

- Taquería Gaviotas: `https://tu-usuario.github.io/pages/gaviotas/`
- Nueva taquería: `https://tu-usuario.github.io/pages/nueva-taqueria/`

### Configurar dominio personalizado

Para subdominios (taqueria-gaviotas.tudominio.com):

1. En tu DNS, crea registro CNAME:
   - Host: `taqueria-gaviotas`
   - Valor: `tu-usuario.github.io`

2. En GitHub Settings > Pages > Custom domain:
   - Agrega: `taqueria-gaviotas.tudominio.com`

## 🎨 Personalización

### Colores

Los colores se definen en `src/_data/taquerias/[nombre].json`:

```json
"colores": {
  "primario": "#FF6B35",
  "secundario": "#006847",
  "acento": "#4A90E2"
}
```

### Contenido persuasivo

El template incluye técnicas de conversión:

- ✅ **Urgencia**: Horarios destacados, promociones limitadas
- ✅ **Prueba social**: Estadísticas, años de experiencia
- ✅ **Diferenciadores**: Badges con beneficios únicos
- ✅ **CTA claros**: Botones de WhatsApp estratégicamente ubicados
- ✅ **Escasez**: "Solo aplica una promoción"

### WhatsApp

El mensaje se configura en el JSON:

```json
"mensajeWhatsApp": "¡Hola! Quiero hacer un pedido con el cupón GAVIOTAS2026"
```

Se convierte automáticamente en enlace: `https://wa.me/527444735256?text=...`

## 📱 Features

- ✅ Responsive (móvil, tablet, desktop)
- ✅ SEO optimizado
- ✅ Botón flotante WhatsApp con mensaje pre-llenado
- ✅ Integración Google Maps
- ✅ Sistema de cupones
- ✅ Animaciones suaves
- ✅ Performance optimizado
- ✅ Accesibilidad

## 🛠 Comandos Disponibles

```bash
# Desarrollo con hot-reload
npm start

# Build de producción
npm run build

# Limpiar carpeta _site
npm run clean
```

## 📊 Técnicas de Marketing Implementadas

1. **Hero impactante**: Lema + promoción visible inmediatamente
2. **Múltiples CTAs**: Botones estratégicos en cada sección
3. **Cupón exclusivo**: Crea urgencia y trackea conversión
4. **Prueba social**: Años de experiencia, calificaciones
5. **Beneficios claros**: Diferencian de la competencia
6. **WhatsApp directo**: Fricción mínima para convertir

## 🎯 Próximos Pasos

1. Reemplazar placeholders con imágenes reales
2. Configurar Google Maps con ubicación exacta
3. Agregar más taquerías siguiendo el proceso
4. Configurar subdominios en tu DNS
5. Opcional: Agregar Google Analytics

## 📝 Notas

- Cada taquería es completamente independiente
- Solo editas JSON para cambiar contenido
- El diseño es consistente pero personalizable
- GitHub Pages es gratuito para sitios públicos

## 🆘 Soporte

Si necesitas ayuda:
1. Revisa los ejemplos en `src/gaviotas/`
2. La documentación de 11ty: https://www.11ty.dev/
3. Verifica que el JSON esté bien formado

---

**Creado con ❤️ para las mejores taquerías de México** 🌮
