# Portfolio — Belen Salto

Sitio personal estático. Sin frameworks, sin dependencias, sin costo de hosting.
Todo el diseño sale del Brandbook Belen Salto V1.

---

## Cómo editar

### Cambiar un texto
Todos los textos viven en `assets/js/i18n.js`.
Cada frase tiene una clave, y la clave aparece dos veces: una en `es` y otra en `en`.
Buscá la clave, cambiá el texto en los dos idiomas y guardá.

```js
"hero.line3": "tus redes trabajen.",   // español
"hero.line3": "your social work.",     // inglés
```

En el HTML nunca hace falta tocar nada: cada texto está marcado con `data-i18n="clave"`.

### Cambiar un color o una tipografía
Todo el sistema visual está en `assets/css/tokens.css`.
Es el único archivo que hay que tocar para cambiar la identidad.
Los valores actuales salen del brandbook:

| Rol | Color | Uso |
|---|---|---|
| Ink | `#0A0A0C` | Fondo base |
| Grafito | `#17171C` | Superficies |
| Off-white | `#F5F3EF` | Texto sobre oscuro |
| Lila | `#C2A8FF` | Jerarquía: etiquetas y numeración |
| Neón | `#D3EA7E` | Dato: cifras y métricas |
| Naranja | `#F5871F` | Acción: botones y CTA |
| Gris texto | `#8C8A93` | Texto secundario |
| Punto de firma | `#F5871F` | El punto del monograma "bs." |
| Borde | `#26262D` | Líneas de 1px |

Si cambiás las tipografías, acordate de actualizar también el `<link>` de Google Fonts
en la cabecera de `index.html`.

### Punto de firma: la única excepción al manual
El monograma es "bs." con el punto en naranja. El brandbook dice que el logo va solo
en negro, off-white o lila, así que esto es una excepción tomada a propósito, por dos
razones: cierra el monograma para que se lea como firma, y es lo único distinguible
en el favicon a 16 píxeles.

Tres condiciones para que la excepción no se desarme:

1. El naranja no aparece en ninguna otra parte del logo.
2. Al pasar el mouse el monograma se rellena de lila y el punto deja de ser naranja,
   porque el manual prohíbe naranja sobre lila.
3. En la versión clara el punto usa un naranja un paso más oscuro (`#D96A0A`), porque
   el manual advierte que el naranja pierde contraste sobre claro en tamaño chico.

Si algún día querés sacarlo, borrá el `<b>.</b>` del monograma en `index.html` y el
círculo naranja del favicon.

### Agregar una pieza a Trabajos
La sección va por capítulos: primero qué hace en esa disciplina, después las piezas.
Los títulos y textos de cada capítulo son las claves `ch.*` de `assets/js/i18n.js`.

1. Poné la imagen en `assets/img/work/`.
2. Abrí `assets/js/main.js` y copiá una línea de la lista `WORKS`:

```js
{ src: "assets/img/work/tu-imagen.jpg", cat: "brand", t: "w.tuClave", s: "w.tuClaveSub", shape: "sq" },
```

- `cat`: define en qué capítulo aparece. `brand` identidad de marca, `social` diseño y contenido para redes, `data` datos y performance.
- `shape`: `sq` (cuadrada), `tall` (vertical 9:16) o `wide` (apaisada).
- `t` y `s`: claves de título y subtítulo. Agregalas en `assets/js/i18n.js`, en los dos idiomas.

### El popurrí que abre Trabajos
La tira que pasa sola arriba de Trabajos sale de la lista `PICKS`, en
`assets/js/main.js`. Cada línea es el nombre del archivo de una pieza que ya
está en `WORKS`; el nombre que aparece debajo es el del proyecto.

```js
'soc-renovae-01.jpg',                                  // usa el nombre de WORKS
{ f: 'soc-sygsa-edificio-01.jpg', n: 'w.sygsa' },      // le pone uno más corto
```

Conviene que sean pocas y variadas: es un resumen, no el catálogo. El catálogo
completo está en los capítulos de abajo, que arrancan cerrados y se abren al
tocar el título.

### Agregar un video al reel
1. Comprimí el video y ponelo en `assets/video/reel/` como `mi-video.mp4`.
2. Guardá una imagen de portada con el mismo nombre: `mi-video.jpg`.
3. En `assets/js/main.js`, agregá una línea a la lista `REEL`:

```js
{ id: "mi-video", cat: "ugc", t: "r.miClave", s: "r.miClaveSub" },
```

- `cat`: `inst` (institucional), `ugc` o `ia` (edición con IA).
- Agregá `wide: true` solo si el video es horizontal.
- `t` y `s` son claves de `assets/js/i18n.js`, en los dos idiomas.

Para comprimir un video sin instalar nada, desde la Terminal:

```bash
avconvert -s original.mp4 -p Preset640x480 -o comprimido.mp4
```

### Los botones del dossier de UGC
El PDF de UGC tiene tres botones. En el papel llevaban a carpetas de Drive; en el sitio
llevan al reel con el filtro puesto, así la persona no se va del portafolio. Se dibujan
encima de la página desde la lista `DOC_LINKS` de `assets/js/main.js`, donde cada entrada
dice la página, el filtro del reel (`ugc` o `ia`) y la posición en porcentajes. Si cambiás
el PDF, hay que revisar esas coordenadas.

### Un video suelto, fuera del reel
Cualquier botón con `data-video` abre el reproductor del sitio con ese archivo.
Lo usa el video de lanzamiento de Los Chihuahuas, montado en un marco de teléfono:

```html
<button class="phoneframe" type="button" data-video="assets/video/reel/mi-video.mp4">
```

Sirve para videos que no pertenecen al reel de clientes. El reproductor asume vertical.

### El botón de volver
Cuando alguien toca un caso, un cliente o un botón dentro de un dossier, la
página salta a otro lugar. Ahí aparece abajo a la izquierda un botón que dice
"Volver a" y el nombre de donde venía, y lo devuelve a ese punto exacto.

Se arma solo: cada salto guarda de qué elemento salió. Si la persona vuelve
scrolleando por su cuenta, el botón se va sin que haga falta tocarlo.

### Cómo se conectan casos, clientes y trabajos
Cada caso y cada cliente puede llevar a su trabajo, en vez de repetir las piezas.
En `assets/js/main.js`, la lista `CLIENTS` acepta un campo `go`:

```js
go: { grupo: "g.bplay" }                        // baja al subgrupo de esa marca
go: { doc: ["manual-kausa", 19, "man.kausa"] }  // abre el documento en el visor
go: { video: "ugc-barkly" }                     // reproduce ese video del reel
```

Sin `go`, el nombre queda como texto: esa marca todavía no tiene material en el sitio.
En los casos, el botón "Ver el trabajo" usa `data-go-group` o `data-go-doc` en `index.html`.

### Sumar un cliente por proyecto
En `assets/js/main.js`, agregá una línea a la lista `CLIENTS`:

```js
{ name: "Nombre de la marca", s: "cli.s.ugc" },
```

Servicios disponibles hoy: `cli.s.brand` identidad de marca, `cli.s.ads` estrategia
de pauta, `cli.s.ugc` contenido UGC, `cli.s.adcontent` contenido para anuncios,
`cli.s.personal` marca personal, `cli.s.visual` identidad visual y redes,
`cli.s.metavideo` video para anuncios de Meta.

Si el servicio que necesitás no está, agregalo en `assets/js/i18n.js` junto a los otros
`cli.s.*`, en español y en inglés. La grilla se acomoda sola a cualquier cantidad de marcas.

### Cambiar el CV o los dossiers
Reemplazá el archivo dentro de `assets/docs/` conservando el mismo nombre.

Los dossiers se leen dentro del sitio, no se descargan. Para eso cada página del PDF
está pre-renderizada como imagen en `assets/docs/pages/<nombre>/`. Si reemplazás un
dossier, hay que volver a generar esas imágenes y actualizar el `data-pages` del botón
en `index.html`. Desde la Terminal, en esta carpeta:

```bash
sips -s format jpeg -Z 1300 pagina.png --out assets/docs/pages/mi-dossier/p01.jpg
```

---

## Cómo verlo en tu compu

El sitio necesita un servidor local para que los PDF y los videos funcionen bien.
Abrí la Terminal, entrá a esta carpeta y ejecutá:

```bash
ruby -run -e httpd . -p 4000
```

Después abrí `http://localhost:4000` en el navegador. Para cortarlo, `Ctrl + C`.

---

## Cómo publicarlo gratis en GitHub Pages

Una sola vez:

1. Creá una cuenta en [github.com](https://github.com) si todavía no tenés.
2. Creá un repositorio nuevo, público, llamado `belensalto.github.io`.
   El nombre importa: tiene que ser tu usuario seguido de `.github.io`.
3. En la Terminal, parada en esta carpeta:

```bash
git init
git add .
git commit -m "Portfolio Belen Salto"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-USUARIO.github.io.git
git push -u origin main
```

4. En GitHub, andá a **Settings → Pages** y elegí la rama `main`, carpeta `/ (root)`.
5. A los dos minutos el sitio queda online en `https://TU-USUARIO.github.io`.

Cada vez que quieras actualizar el sitio después de editar algo:

```bash
git add .
git commit -m "Actualizo textos"
git push
```

---

## Qué NO se publica

El archivo `.gitignore` deja afuera las carpetas pesadas de originales y de video en bruto.
Esos archivos se quedan en tu compu. Si querés sumar un video al sitio, primero comprimilo
y guardalo en `assets/video/reel/`. Mirá "Agregar un video al reel" más arriba.

---

## Estructura

```
index.html                  Estructura de la página
assets/css/tokens.css       Colores, tipografías y medidas. La identidad.
assets/css/styles.css       Estilos del sitio
assets/js/i18n.js           Todos los textos, en español e inglés
assets/js/main.js           Animaciones, galería, filtros, lightbox
assets/img/me/              Retratos y fotos personales
assets/img/work/            Piezas de la galería
assets/video/reel/          Videos del reel y sus portadas
assets/docs/                CV, dossiers y brandbook en PDF
_originales/                Material fuente. No se publica.
```

---

## Detalles técnicos

- Sin librerías externas. Solo HTML, CSS y JavaScript.
- Bilingüe español e inglés, con el idioma guardado en el navegador.
- Tema oscuro y claro, también recordado.
- Respeta `prefers-reduced-motion`: si alguien tiene las animaciones desactivadas en su sistema, el sitio no se mueve.
- Navegable con teclado. El lightbox se cierra con `Esc` y se recorre con las flechas.
