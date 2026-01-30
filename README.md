# Taquerías - Sistema de Landing Pages

Sistema escalable para generar landing pages de taquerías usando 11ty.

## � Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

### **Node.js** (versión 18 o superior)

**Opción 1: Descargar desde el sitio oficial**
- Ve a [https://nodejs.org/](https://nodejs.org/)
- Descarga la versión LTS (Long Term Support)
- Ejecuta el instalador y sigue las instrucciones

**Opción 2: Usando winget (Windows)**
```powershell
winget install OpenJS.NodeJS.LTS
```

**Opción 3: Usando Chocolatey (Windows)**
```powershell
choco install nodejs-lts
```

### **Verificar instalación**

Abre una terminal nueva y ejecuta:

```powershell
node --version
# Debería mostrar: v18.x.x o superior

npm --version
# Debería mostrar: 9.x.x o superior
```

## 🚀 Inicio Rápido

Una vez que tengas Node.js instalado:

```powershell
# 1. Navegar a la carpeta del proyecto
cd c:\dev\code\pages

# 2. Instalar dependencias
npm install

# 3. Desarrollo local (abre http://localhost:8080/gaviotas/)
npm start

# 4. Build para producción
npm run build
```

## 📁 Estructura

```
src/
  ├── _data/
  │   └── taquerias/          # JSON con datos de cada taquería
  │       └── gaviotas.json
  ├── _includes/
  │   └── layouts/
  │       └── base.njk        # Template principal
  ├── css/
  │   └── style.css           # Estilos globales
  ├── js/
  │   └── main.js             # JavaScript
  └── [taqueria-slug]/        # Carpeta por cada taquería
      └── index.njk
```

## ➕ Agregar Nueva Taquería

1. Crear archivo JSON en `src/_data/taquerias/nueva-taqueria.json`
2. Crear carpeta `src/nueva-taqueria/` con `index.njk`
3. Configurar datos según el schema de ejemplo
4. Build y deploy

## 🌐 Deploy en GitHub Pages

El proyecto genera HTML estático en `_site/`. Configurar GitHub Actions para deploy automático.
