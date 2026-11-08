# Expedición Innovación UNAD — copia local jugable

Juego educativo 3D (Three.js) sobre el **motor de la innovación**, basado en la estructura de
*Verne · Tools to Innovate* (2015). Cinco mundos, un reto de innovación por mundo, bitácora,
logros, pistas y fragmentos de un mensaje final.

Esta carpeta es una **copia local** del sitio `https://viem.innovahub360.net/` preparada para
poder usarse sin servidor, sin login y sin restricciones de avance.

---

## Qué es

| Elemento | Detalle |
|---|---|
| Tipo | Sitio estático: HTML + CSS + JavaScript, sin paso de compilación |
| Motor 3D | Three.js, incluido dentro de `js/juego.bundle.js` |
| Contenido | Define mundos, nodos, pasos, bitácoras, logros y textos en `js/data.js` |
| Persistencia | `localStorage` del navegador (clave `paipa_expedicion_v2`) |
| Estructura del juego | 5 islas, 8 etapas, 18 nodos |

## Contenido de la carpeta

```
_sitio_viem/
├── index.html                  Página principal (única)
├── css/style.css               Estilos de HUD, panel de misión, intro y final
├── js/
│   ├── data.js                 Datos del juego: CONFIG, ISLAS, ETAPAS, NODOS,
│   │                           ENCUESTA, BITACORA, ENTRADAS, METRICAS, GOGO
│   ├── juego.bundle.js         Lógica del juego + Three.js (versión parcheada)
│   ├── juego.bundle.orig.js    Respaldo del bundle original sin parches
│   └── dev-unlock.js           Ayudas locales: botones de reinicio y desbloqueo
├── img/                        GOGO (avatar y video de habla)
├── audio/                      Audio de la experiencia
├── fonts/                      Tipografías
└── assets/                     Recursos adicionales
```

---

## Cómo correrlo

No requiere instalar dependencias. Elige una de las dos formas:

### Opción 1 — Abrir directamente (más rápido)

Abre `index.html` con doble clic. Funciona sin servidor porque el juego no carga datos externos.

### Opción 2 — Servir por HTTP (recomendado)

Desde esta carpeta, en una terminal:

```bash
# con Node.js
npx serve .
# luego abre http://localhost:3000

# o con Python
python -m http.server 8000
# luego abre http://localhost:8000
```

> Si usas `npx serve`, ejecútalo **dentro** de `_sitio_viem`, no en la carpeta padre, para que
> `index.html` quede en la raíz servida.

### Para publicarlo en GitHub Pages

1. Sube el contenido de esta carpeta a la rama que publicarás (ver abajo).
2. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   rama `expedicion-viem`, carpeta `/ (root)`.
3. La URL quedará como `https://<usuario>.github.io/nodo-banana2/`.

---

## Controles

- **Arrastrar** para girar el mundo · **rueda o pellizco** para acercar.
- Toca los **puntos brillantes** para abrir una misión.
- Dentro de la misión, los pasos se superan en orden: relato → código → bitácora, etc.

---

## Cambios respecto al sitio original

Estos cambios son **solo para esta copia local** y están pensados para poder jugar todo sin
dependencias de servidor:

1. **Login eliminado.** En `js/data.js`, `CONFIG.api` se cambió de `"api/"` a `""`. Sin API, el
   juego no muestra el formulario de código de equipo / PIN y guarda el avance en el navegador.
2. **Candados de progresión eliminados.** En `js/juego.bundle.js`, la función `Xi()` ahora
   devuelve `available` para cualquier nodo (antes exigía haber completado la etapa anterior).
3. **Modo libre.** En `js/juego.bundle.js`, la función `kx()` acepta cualquier respuesta,
   código o bitácora como válida (`window.__MODO_LIBRE = true`). El campo de código sigue
   visible, pero ya no hay un código correcto que introducir.
4. **Ayudas locales** en `js/dev-unlock.js`:
   - **↺ Reiniciar progreso** (abajo a la derecha): borra `paipa_expedicion_v2`, `paipa_token`
     y `paipa_sid`, y recarga.
   - **🚀 Todo desbloqueado**: marca todos los mundos y fragmentos como completados.
   - También disponible por consola: `reiniciarJuego()` y `desbloquearTodo()`.

### Volver al comportamiento original

```bash
cp js/juego.bundle.orig.js js/juego.bundle.js
```

Y en `js/data.js` restaurar `"api": "api/"`. En ese caso el juego vuelve a pedir código de
equipo y PIN, y a validar códigos y respuestas.

---

## Personalizar contenido

Todo el guion vive en `js/data.js` (objeto `window.DATOS`) y está generado por un `build.js`
externo; si lo editas a mano, hazlo con cuidado y conserva el formato JSON. Los textos de
`CONFIG.titulo`, `ISLAS`, `ETAPAS` y `NODOS` cambian lo que se ve en pantalla.

Para exportar la bitácora diligenciada, usa el botón **Registro (CSV)** del pie de página.

---

## Créditos

- Diseño estructural inspirado en *Verne · Tools to Innovate* (2015).
- UNAD · Vicerrectoría de Innovación.
- Motor 3D: [Three.js](https://threejs.org/), licencia MIT.
