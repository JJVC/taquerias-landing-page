# Sistema de Cupones Dinámicos

## 📋 Descripción

Sistema de generación automática de cupones únicos basados en la fecha y hora actual. Los cupones se generan dinámicamente en el navegador del usuario y se incluyen automáticamente en todos los enlaces de WhatsApp que envían mensajes promocionales.

## 🎯 Formato del Cupón

El cupón sigue el patrón: **[B1]-[B2]-[B3]-[B4]**

### Estructura de Bloques

| Bloque | Formato | Descripción | Ejemplo |
|--------|---------|-------------|---------|
| **B1** | `Y R R R` | Y = Año en Base36 (últimos 2 dígitos)<br>R = 3 caracteres aleatorios | `Q` (2026) + `LZA` |
| **B2** | `R R M M` | RR = 2 caracteres aleatorios<br>MM = Mes (01-12) | `LK` + `02` (Feb) |
| **B3** | `R D D R` | R = Aleatorio<br>DD = Día (01-31)<br>R = Aleatorio | `X` + `04` + `T` |
| **B4** | `H H M M` | HHMM = Hora exacta en formato 24h | `1325` (13:25) |

### Ejemplo Completo

```
Fecha/Hora: 04/Feb/2026 a las 13:25
Cupón generado: QLZA-LK02-X04T-1325
```

### Lectura Rápida

Para verificar un cupón manualmente:
- **Año**: B1[0] en Base36 (Q = 26 = 2026, P = 25 = 2025, etc.)
- **Mes**: B2[2..3] (01 a 12)
- **Día**: B3[1..2] (01 a 31)
- **Hora**: B4[0..1] (00 a 23)
- **Minuto**: B4[2..3] (00 a 59)

## 🔧 Implementación Técnica

### Archivos Modificados

1. **`src/js/main.js`**
   - Función `generarCupon()`: Genera el cupón según el patrón especificado
   - Función `actualizarEnlacesWhatsApp()`: Actualiza todos los enlaces de WhatsApp con el cupón dinámico
   - Se ejecuta automáticamente al cargar la página
   - Se regenera cada minuto para mantenerlo actualizado

2. **`src/index.njk`**
   - Modificado para incluir `PLACEHOLDER` en el mensaje de WhatsApp
   - El campo de cupón visible muestra "Generando..." hasta que JavaScript lo actualiza

3. **`src/_data/taquerias/gaviotas.json`**
   - Campo `mensajeWhatsApp` actualizado para incluir texto genérico
   - El cupón estático fue removido

### Flujo de Funcionamiento

```
1. Usuario carga la página
   ↓
2. JavaScript ejecuta generarCupon()
   ↓
3. Se genera cupón único con fecha/hora actual
   ↓
4. actualizarEnlacesWhatsApp() busca todos los enlaces wa.me
   ↓
5. Reemplaza PLACEHOLDER con el cupón generado
   ↓
6. Actualiza el campo visible del cupón
   ↓
7. Cada minuto se regenera automáticamente
```

## 🌐 Enlaces Afectados

Los siguientes enlaces de WhatsApp se actualizan automáticamente:

- ✅ Botón CTA principal (Hero Section)
- ✅ Botones "Ordenar Ahora" de especialidades
- ✅ Botón "Pedir menú completo"
- ✅ Botón "Usar Cupón" en promociones
- ✅ Botón "Solicitar Ahora" en cortesía
- ✅ Botón "Enviar Mensaje" en contacto
- ✅ Botón CTA final

**No se afectan:**
- ❌ Enlaces que no tienen parámetro `?text=`
- ❌ Enlaces a Google Maps
- ❌ Enlaces de redes sociales

## 🧪 Pruebas

### Archivo de Prueba

Usa `test-cupon.html` para verificar la generación de cupones:

```bash
# Abrir en navegador
open test-cupon.html
```

El archivo de prueba muestra:
- Cupón generado en tiempo real
- Desglose de cada bloque
- Fecha/hora actual codificada
- Botón para copiar cupón
- Botón para generar nuevo cupón

### Verificación Manual

1. Inspeccionar elemento en cualquier botón de WhatsApp
2. Verificar que el `href` incluye el cupón en el parámetro `text`
3. Copiar el enlace y decodificar el parámetro `text`
4. Verificar que el formato coincide con el patrón

### Consola del Navegador

Al cargar la página, verás:
```
✓ Enlaces de WhatsApp actualizados con cupón: QLZA-LK02-X04T-1325
```

## 🔄 Actualización Automática

- **Frecuencia**: Cada 60 segundos (1 minuto)
- **Método**: `setInterval()` ejecuta `actualizarEnlacesWhatsApp()`
- **Efecto**: El cupón se regenera con la hora actualizada
- **Usuario**: No nota cambio hasta hacer clic en un botón

## 📱 Experiencia del Usuario

1. Usuario hace clic en "Haz tu Pedido Ahora"
2. Se abre WhatsApp con mensaje pre-llenado
3. El mensaje incluye el cupón único generado
4. El cupón refleja la fecha/hora exacta del clic
5. El negocio puede verificar la validez del cupón

### Ejemplo de Mensaje Enviado

```
¡Hola Taquería Gaviotas! 🌮 Quiero hacer un pedido y solicitar la PROMOCIÓN con el cupón - Cupón: QLZA-LK02-X04T-1325
```

## 🔐 Seguridad y Validación

### Ventajas del Sistema

- ✅ **Único por minuto**: Dificulta la reutilización masiva
- ✅ **Fecha/hora codificada**: Permite validar vigencia
- ✅ **Generado en cliente**: No requiere servidor
- ✅ **Fácil de verificar**: Lectura visual directa

### Limitaciones

- ⚠️ El cupón se genera en el navegador (puede ser manipulado)
- ⚠️ No hay validación server-side
- ⚠️ Múltiples usuarios pueden generar cupones similares en el mismo minuto
- ⚠️ Depende de la hora del dispositivo del usuario

### Mejoras Futuras Sugeridas

1. **Backend de validación**: API para verificar cupones únicos
2. **Base de datos**: Almacenar cupones usados
3. **Límite de uso**: Un cupón por usuario/teléfono
4. **Expiración**: Cupones válidos solo por X minutos/horas
5. **Analytics**: Rastrear uso de cupones

## 📊 Conversión Base36

| Año | Base36 | Año | Base36 |
|-----|--------|-----|--------|
| 2020 | K | 2026 | Q |
| 2021 | L | 2027 | R |
| 2022 | M | 2028 | S |
| 2023 | N | 2029 | T |
| 2024 | O | 2030 | U |
| 2025 | P | 2031 | V |

## 🛠️ Mantenimiento

### Modificar el Formato del Cupón

Edita la función `generarCupon()` en [src/js/main.js](src/js/main.js):

```javascript
function generarCupon() {
  // Modificar lógica aquí
  const b1 = '...';
  const b2 = '...';
  const b3 = '...';
  const b4 = '...';
  
  return `${b1}-${b2}-${b3}-${b4}`;
}
```

### Cambiar Frecuencia de Actualización

En [src/js/main.js](src/js/main.js), línea ~240:

```javascript
// Cambiar 60000 (1 minuto) por el valor deseado en milisegundos
setInterval(actualizarEnlacesWhatsApp, 60000);
```

### Deshabilitar Auto-actualización

Comenta las líneas de `setInterval()`:

```javascript
// setInterval(actualizarEnlacesWhatsApp, 60000);
```

## 📞 Soporte

Para preguntas o problemas:
1. Revisar la consola del navegador (F12)
2. Verificar que `main.js` se carga correctamente
3. Comprobar que no hay errores de JavaScript
4. Usar `test-cupon.html` para pruebas aisladas

---

**Última actualización**: Febrero 2026
**Versión**: 1.0.0
