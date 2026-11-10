# M7 Lounge — web

Sitio estático (HTML + CSS + JS, sin dependencias ni compilación) de M7 Lounge, Salou y Tarragona.

## Estructura

| Archivo | Qué es |
|---|---|
| `index.html` | La página (generada, ver abajo) |
| `styles.css` | Estilos y tipografías locales |
| `main.js` | Interacciones: cookies, carta, horario en vivo, galería, animaciones |
| `menu.js` | **La carta.** Edita aquí productos y precios; no hace falta regenerar nada |
| `aviso-legal.html`, `privacidad.html`, `cookies.html` | Páginas legales (generadas) |
| `assets/img`, `assets/video`, `assets/fonts` | Fotos WebP, vídeos y fuentes |
| `tools/` | Plantilla y script de montaje (no se publica nada desde aquí) |
| `_legacy/` | Web anterior y sus archivos. Se puede borrar |

## Cambiar cosas

- **Precios o productos:** `menu.js`. Si tocas las shishas, ejecuta además `python3 tools/build.py` para actualizar la sección de sabores.
- **Textos, cócteles destacados, galería:** `tools/index.src.html` y `tools/build.py`, y luego `python3 tools/build.py`.
- **Textos legales:** `tools/legal/*.html` y `python3 tools/build.py`.

`build.py` necesita Python 3 con Pillow y Node. Actualiza solo el `?v=` de CSS y JS para evitar la caché.

## Pendiente antes de publicar

En las tres páginas legales faltan los datos del titular (razón social, NIF, domicilio y email), marcados en rojo como PENDIENTE. Están en `tools/legal/`.

## Publicar

- **GitHub Pages:** rama `main`, carpeta raíz. `.nojekyll` incluido.
- **Hosting clásico (Hostinger, etc.):** sube la carpeta a `public_html`. `.htaccess` incluido (caché y página 404).

## Vista previa en local

```
python3 -m http.server 8765
```

y abre `http://localhost:8765`. Vista móvil rápida: `http://localhost:8765/tools/preview-mobile.html`.
