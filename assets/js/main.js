/* ============================================================
   MOTOR DEL SITIO — Belen Salto
   Sin librerías externas. Todo vanilla JS.
   ============================================================ */

(function () {
  'use strict';

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================
     1. GALERÍA — catálogo de piezas
     Para agregar una pieza nueva: copiá una línea y cambiá
     src (ruta de la imagen), cat (capítulo), g (subgrupo) y las claves de
     título/subtítulo que viven en i18n.js.
     fit: 1 muestra la pieza entera sin recortar. Va en piezas de
     diseño. Las fotos van sin fit, para que llenen el recuadro.
     phone: true monta la imagen dentro de un marco de teléfono.
     Va solo en capturas de pantalla, no en piezas de diseño.
     ========================================================== */

  const WORKS = [
    { src: 'assets/img/work/soc-renovae-01.jpg', cat: 'social', g: 'g.renovae', t: 'w.feedPost', s: 'w.renovae', shape: 'sq', fit: 1 },
    { src: 'assets/img/work/soc-renovae-02.jpg', cat: 'social', g: 'g.renovae', t: 'w.feedPost', s: 'w.renovae', shape: 'sq', fit: 1 },
    { src: 'assets/img/work/soc-renovae-03.jpg', cat: 'social', g: 'g.renovae', t: 'w.feedPost', s: 'w.renovae', shape: 'sq', fit: 1 },
    { src: 'assets/img/work/soc-renovae-04.jpg', cat: 'social', g: 'g.renovae', t: 'w.feedPost', s: 'w.renovae', shape: 'sq', fit: 1 },
    { src: 'assets/img/work/soc-renovae-hist-01.jpg', cat: 'social', g: 'g.renovaeHist', t: 'w.story', s: 'w.renovae', shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-renovae-hist-02.jpg', cat: 'social', g: 'g.renovaeHist', t: 'w.story', s: 'w.renovae', shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-renovae-hist-03.jpg', cat: 'social', g: 'g.renovaeHist', t: 'w.story', s: 'w.renovae', shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-renovae-hist-04.jpg', cat: 'social', g: 'g.renovaeHist', t: 'w.story', s: 'w.renovae', shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-renovae-hist-05.jpg', cat: 'social', g: 'g.renovaeHist', t: 'w.story', s: 'w.renovae', shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-renovae-hist-06.jpg', cat: 'social', g: 'g.renovaeHist', t: 'w.story', s: 'w.renovae', shape: 'tall', fit: 1 },

    { src: 'assets/img/work/soc-altavoz-01.jpg',     cat: 'social', g: 'g.altavoz',  t: 'w.feedPost', s: 'w.altavoz',  shape: 'sq',   fit: 1 },
    { src: 'assets/img/work/soc-altavoz-03.jpg',     cat: 'social', g: 'g.altavoz',  t: 'w.carousel', s: 'w.altavoz',  shape: 'sq',   fit: 1 },
    { src: 'assets/img/work/soc-altavoz-04.jpg',     cat: 'social', g: 'g.altavoz',  t: 'w.carousel', s: 'w.altavoz',  shape: 'sq',   fit: 1 },
    { src: 'assets/img/work/soc-altavoz-05.jpg',     cat: 'social', g: 'g.altavoz',  t: 'w.carousel', s: 'w.altavoz',  shape: 'sq',   fit: 1 },
    { src: 'assets/img/work/soc-altavoz-06.jpg',     cat: 'social', g: 'g.altavoz',  t: 'w.carousel', s: 'w.altavoz',  shape: 'sq',   fit: 1 },
    { src: 'assets/img/work/soc-altavoz-07.jpg',     cat: 'social', g: 'g.altavoz',  t: 'w.feedPost', s: 'w.altavoz',  shape: 'sq',   fit: 1 },

    { src: 'assets/img/work/soc-bplay-01.jpg',       cat: 'social', g: 'g.bplay',    t: 'w.ad',      s: 'w.bplay',    shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-bplay-02.jpg',       cat: 'social', g: 'g.bplay',    t: 'w.ad',      s: 'w.bplay',    shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-bplay-05.jpg',       cat: 'social', g: 'g.bplay',    t: 'w.ad',      s: 'w.bplay',    shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-bplay-08.jpg',       cat: 'social', g: 'g.bplay',    t: 'w.ad',      s: 'w.bplay',    shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-bplay-09.jpg',       cat: 'social', g: 'g.bplay',    t: 'w.ad',      s: 'w.bplay',    shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-bplay-12.jpg',       cat: 'social', g: 'g.bplay',    t: 'w.ad',      s: 'w.bplay',    shape: 'tall', fit: 1 },

    { src: 'assets/img/work/soc-kaishop-cc-02.jpg',      cat: 'social', g: 'g.kaishop', t: 'w.ad', s: 'w.kaishop', shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-kaishop-cc-04.jpg',      cat: 'social', g: 'g.kaishop', t: 'w.ad', s: 'w.kaishop', shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-kaishop-cc2-01.jpg',     cat: 'social', g: 'g.kaishop', t: 'w.ad', s: 'w.kaishop', shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-kaishop-cc2-03.jpg',     cat: 'social', g: 'g.kaishop', t: 'w.ad', s: 'w.kaishop', shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-kaishop-parches-01.jpg', cat: 'social', g: 'g.kaishop', t: 'w.ad', s: 'w.kaishopBr', shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-kaishop-parches-03.jpg', cat: 'social', g: 'g.kaishop', t: 'w.ad', s: 'w.kaishopBr', shape: 'tall', fit: 1 },

    { src: 'assets/img/work/soc-sygsa-edificio-01.jpg', cat: 'social', g: 'g.sygsa', t: 'w.feedPost', s: 'w.sygsaEd', shape: 'sq', fit: 1 },
    { src: 'assets/img/work/soc-sygsa-edificio-02.jpg', cat: 'social', g: 'g.sygsa', t: 'w.feedPost', s: 'w.sygsaEd', shape: 'sq', fit: 1 },
    { src: 'assets/img/work/soc-sygsa-edificio-03.jpg', cat: 'social', g: 'g.sygsa', t: 'w.carousel', s: 'w.sygsaEd', shape: 'sq', fit: 1 },
    { src: 'assets/img/work/soc-sygsa-edificio-05.jpg', cat: 'social', g: 'g.sygsa', t: 'w.carousel', s: 'w.sygsaEd', shape: 'sq', fit: 1 },
    { src: 'assets/img/work/soc-sygsa-edificio-07.jpg', cat: 'social', g: 'g.sygsa', t: 'w.feedPost', s: 'w.sygsaEd', shape: 'sq', fit: 1 },
    { src: 'assets/img/work/soc-sygsa-historia-01.jpg', cat: 'social', g: 'g.sygsaHist', t: 'w.story', s: 'w.sygsa', shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-sygsa-historia-02.jpg', cat: 'social', g: 'g.sygsaHist', t: 'w.story', s: 'w.sygsa', shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-sygsa-historia-03.jpg', cat: 'social', g: 'g.sygsaHist', t: 'w.story', s: 'w.sygsa', shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-sygsa-historia-04.jpg', cat: 'social', g: 'g.sygsaHist', t: 'w.story', s: 'w.sygsa', shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-sygsa-historia-05.jpg', cat: 'social', g: 'g.sygsaHist', t: 'w.story', s: 'w.sygsa', shape: 'tall', fit: 1 },

    { src: 'assets/img/work/soc-jupplies-01.jpg',    cat: 'social', g: 'g.jupplies', t: 'w.ad'      , s: 'w.jupplies', shape: 'sq', fit: 1 },
    { src: 'assets/img/work/soc-jupplies-02.jpg',    cat: 'social', g: 'g.jupplies', t: 'w.ad'      , s: 'w.jupplies', shape: 'sq', fit: 1 },
    { src: 'assets/img/work/soc-jupplies-micro-01.jpg', cat: 'social', g: 'g.jupplies', t: 'w.ad', s: 'w.jupplies', shape: 'sq', fit: 1 },
    { src: 'assets/img/work/soc-jupplies-micro-02.jpg', cat: 'social', g: 'g.jupplies', t: 'w.ad', s: 'w.jupplies', shape: 'sq', fit: 1 },
    { src: 'assets/img/work/soc-jupplies-03.jpg',    cat: 'social', g: 'g.jupplies', t: 'w.ad'      , s: 'w.jupplies', shape: 'sq', fit: 1 },
    { src: 'assets/img/work/soc-jupplies-04.jpg',    cat: 'social', g: 'g.jupplies', t: 'w.ad'      , s: 'w.jupplies', shape: 'sq', fit: 1 },
    { src: 'assets/img/work/soc-jupplies-micro-03.jpg', cat: 'social', g: 'g.jupplies', t: 'w.ad', s: 'w.jupplies', shape: 'sq', fit: 1 },
    { src: 'assets/img/work/soc-jupplies-micro-04.jpg', cat: 'social', g: 'g.jupplies', t: 'w.ad', s: 'w.jupplies', shape: 'sq', fit: 1 },
    { src: 'assets/img/work/soc-jupplies-hist-01.jpg', cat: 'social', g: 'g.juppliesHist', t: 'w.story', s: 'w.jupplies', shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-jupplies-hist-02.jpg', cat: 'social', g: 'g.juppliesHist', t: 'w.story', s: 'w.jupplies', shape: 'tall', fit: 1 },
    { src: 'assets/img/work/soc-jupplies-hist-03.jpg', cat: 'social', g: 'g.juppliesHist', t: 'w.story', s: 'w.jupplies', shape: 'tall', fit: 1 },

    /* ---------- 03 · De lo digital a lo físico ---------- */
    { src: 'assets/img/work/brand-tote-real.jpg',    cat: 'phys', g: 'g.merch',   t: 'w.tote',     s: 'w.sygsa',   shape: 'tall' },
    { src: 'assets/img/work/phys-lentes-renovae.jpg', cat: 'phys', g: 'g.merch', t: 'w.lentes', s: 'w.renovae', shape: 'tall' },
    { src: 'assets/img/work/phys-merch-aura.jpg', cat: 'phys', g: 'g.merch', t: 'w.merchAura', s: 'w.aura', shape: 'tall' },

    { src: 'assets/img/work/brand-print.jpg',        cat: 'phys', g: 'g.print',   t: 'w.print',    s: 'w.aura',    shape: 'sq'   },
    { src: 'assets/img/work/brand-desk.jpg',         cat: 'phys', g: 'g.print',   t: 'w.desk',     s: 'w.sygsa',   shape: 'sq'   },
    { src: 'assets/img/work/phys-diptico-amelia-01.jpg', cat: 'phys', g: 'g.print', t: 'w.diptico', s: 'w.amelia', shape: 'sq'   },
    { src: 'assets/img/work/phys-diptico-amelia-02.jpg', cat: 'phys', g: 'g.print', t: 'w.dipticoInt', s: 'w.amelia', shape: 'sq'   },
    { src: 'assets/img/work/phys-diptico-amelia-03.jpg', cat: 'phys', g: 'g.print', t: 'w.dipticoDorso', s: 'w.amelia', shape: 'sq'   },

    { src: 'assets/img/work/phys-cartel-amelia.png', cat: 'phys', g: 'g.signage', t: 'w.cartel',   s: 'w.amelia',  shape: 'wide', fit: 1 },
    { src: 'assets/img/work/brand-pieces.jpg',       cat: 'phys', g: 'g.signage', t: 'w.pieces',   s: 'w.renovae', shape: 'sq'   },
    { src: 'assets/img/work/brand-signage.jpg',      cat: 'phys', g: 'g.signage', t: 'w.signage',  s: 'w.sygsa',   shape: 'sq'   },

    /* ---------- Pruebas de Los Chihuahuas ---------- */
    { src: 'assets/img/work/lc-tiktok-perfil.jpg', cat: 'lc', t: 'w.lcPerfil', s: 'w.lcPerfilSub', shape: 'wide', fit: 1 },
    { src: 'assets/img/work/lc-google.jpg',        cat: 'lc', t: 'w.lcGoogle', s: 'w.lcGoogleSub', shape: 'sq',   fit: 1 },
    { src: 'assets/img/work/lc-tiktok-video.jpg',  cat: 'lc', t: 'w.lcVideo',  s: 'w.lcVideoSub',  shape: 'wide', fit: 1 },

    /* ---------- 04 · Datos y performance ---------- */
    { src: 'assets/img/work/data-views.jpg',         cat: 'data', t: 'w.views',  s: 'w.viewsSub',  shape: 'tall', phone: true },
    { src: 'assets/img/work/data-panel.jpg',         cat: 'data', t: 'w.panel',  s: 'w.panelSub',  shape: 'tall', phone: true },
    { src: 'assets/img/work/data-interactions.jpg',  cat: 'data', t: 'w.inter',  s: 'w.interSub',  shape: 'tall', phone: true },
    { src: 'assets/img/work/data-followers.jpg',     cat: 'data', t: 'w.follow', s: 'w.followSub', shape: 'tall', phone: true }
  ];

  /* ==========================================================
     1b. REEL — catálogo de videos
     Los archivos viven en assets/video/reel/. Cada video tiene
     un .mp4 y un .jpg con el mismo nombre, que es la portada.
     ========================================================== */

  /* 1c. PICKS — el popurrí que abre Trabajos.
     Una selección corta y mezclada: no repite marca seguida y muestra
     las cuatro disciplinas. Se nombran por archivo; el resto del dato
     posición en el lightbox) sale de WORKS. El nombre bajo cada pieza es
     el de su proyecto; con { f, n } se le pone uno más corto, porque en
     una tira que pasa no entra un subtítulo largo. */
  const PICKS = [
    'soc-renovae-01.jpg',
    'phys-cartel-amelia.png',
    'soc-altavoz-01.jpg',
    'soc-sygsa-historia-01.jpg',
    'soc-bplay-01.jpg',
    'brand-tote-real.jpg',
    'soc-jupplies-micro-01.jpg',
    'soc-kaishop-cc-02.jpg',
    'phys-diptico-amelia-01.jpg',
    'soc-renovae-hist-04.jpg',
    { f: 'soc-sygsa-edificio-01.jpg', n: 'w.sygsa' },
    'brand-print.jpg',
    'brand-signage.jpg'
  ];

  const REEL = [
    { id: 'ia-nektar',            cat: 'ia',   t: 'r.nektar',     s: 'r.nektarSub' },
    { id: 'inst-sygsa',           cat: 'inst', t: 'r.sygsa',      s: 'r.sygsaSub',      wide: true },
    { id: 'inst-amelia-evento',    cat: 'inst', t: 'r.amelia',     s: 'r.ameliaSub' },
    { id: 'inst-renovae-petroleo', cat: 'inst', t: 'r.petroleo',   s: 'r.petroleoSub' },
    { id: 'inst-beneficios',      cat: 'inst', t: 'r.benef',      s: 'r.benefSub' },
    { id: 'inst-renovae-autoconsumo', cat: 'inst', t: 'r.autoconsumo', s: 'r.autoconsumoSub' },
    { id: 'inst-renovae-ia',          cat: 'inst', t: 'r.renovaeIa',  s: 'r.renovaeIaSub' },
    { id: 'ugc-envasadora',       cat: 'ugc',  t: 'r.envas',      s: 'r.prodSub' },
    { id: 'ugc-perchero',         cat: 'ugc',  t: 'r.perchero',   s: 'r.prodSub' },
    { id: 'ugc-proyector',        cat: 'ugc',  t: 'r.proyector',  s: 'r.prodSub' },
    { id: 'ugc-idraet',           cat: 'ugc',  t: 'r.idraet',     s: 'r.cosmSub' },
    { id: 'ugc-conservador',      cat: 'ugc',  t: 'r.conserv',    s: 'r.prodSub' },
    { id: 'ugc-filtro',           cat: 'ugc',  t: 'r.filtro',     s: 'r.prodSub' },
    { id: 'ugc-funnyfuzzy',       cat: 'ugc',  t: 'r.funny',      s: 'r.petSub' },
    { id: 'ugc-barkly',           cat: 'ugc',  t: 'r.barkly',     s: 'r.petSub' },
    { id: 'ugc-wigzy',            cat: 'ugc',  t: 'r.wigzy',      s: 'r.petSub' },
    { id: 'ia-avatar-bronceador', cat: 'ia',   t: 'r.avatar',     s: 'r.avatarSub' },
    { id: 'ia-shapeher',          cat: 'ia',   t: 'r.shapeher',   s: 'r.iaSub' },
    { id: 'ia-dualcast-ojeras',   cat: 'ia',   t: 'r.dualcast',   s: 'r.dualcastSub' },
    { id: 'ia-podcast-aura',      cat: 'ia',   t: 'r.podcast',    s: 'r.podcastSub' }
  ];

  /* ==========================================================
     1c. CLIENTES POR PROYECTO
     Para sumar una marca: copiá una línea y cambiá el nombre.
     El segundo valor es la clave del servicio, que vive en
     i18n.js bajo "cli.*". Si el servicio no existe todavía,
     agregalo ahí en español y en inglés.
     ========================================================== */

  /* go: a dónde lleva el nombre cuando se lo toca.
     { grupo: 'g.x' }  baja al subgrupo de esa marca.
     { doc: [...] }    abre el documento en el visor.
     { video: 'id' }   reproduce ese video del reel.
     Sin go, el nombre queda como texto: esa marca todavía no
     tiene material cargado en el sitio. */
  const CLIENTS = [
    { name: 'Kausa',     s: 'cli.s.brand',     go: { doc: ['manual-kausa', 19, 'man.kausa'] } },
    { name: 'Altavoz',   s: 'cli.s.content',   go: { grupo: 'g.altavoz' } },
    { name: 'Bplay',     s: 'cli.s.ads',       go: { grupo: 'g.bplay' } },
    { name: 'Kaishop',   s: 'cli.s.adcontent', go: { grupo: 'g.kaishop' } },
    { name: 'Meme',      s: 'cli.s.personal',  go: { doc: ['identidad-meme', 5, 'man.meme'] } },
    { name: 'Barkly',    s: 'cli.s.ugc',       go: { video: 'ugc-barkly' } },
    { name: 'Wigzy',     s: 'cli.s.ugc',       go: { video: 'ugc-wigzy' } },
    { name: 'Idraet',    s: 'cli.s.ugc',       go: { video: 'ugc-idraet' } },
    { name: 'Shapeher',  s: 'cli.s.metavideo', go: { video: 'ia-shapeher' } },
    { name: 'Aura Beauty Lab', s: 'cli.s.metavideo', go: { video: 'ia-podcast-aura' } },
    { name: 'Galaktica', s: 'cli.s.visual',    go: { doc: ['calendario-galaktica', 4, 'man.calGal'] } }
  ];

  /* ==========================================================
     2. IDIOMA
     ========================================================== */

  let lang = (localStorage.getItem('bs-lang')) ||
             ((navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es');

  function t(key) {
    const d = I18N[lang] || I18N.es;
    return d[key] !== undefined ? d[key] : (I18N.es[key] !== undefined ? I18N.es[key] : key);
  }

  function applyLang() {
    document.documentElement.lang = lang;

    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-title]').forEach(el => {
      const v = t(el.dataset.i18nTitle);
      el.title = v; el.setAttribute('aria-label', v);
    });
    $$('[data-i18n-alt]').forEach(el => { el.alt = t(el.dataset.i18nAlt); });
    $$('[data-i18n-aria]').forEach(el => {
      el.setAttribute('aria-label', t(el.dataset.i18nAria));
    });

    $$('.langswitch__btn').forEach(b => b.classList.toggle('is-on', b.dataset.lang === lang));
    $('.langswitch').classList.toggle('is-en', lang === 'en');

    /* El marquee se duplica: hay que re-sincronizar la copia */
    syncMarquees();
    splitHero();

    /* La galería, el reel y el lightbox se arman por JS: re-etiquetar */
    if (gallery && gallery.children.length) labelGallery();
    if ($('.popurri__track')) { labelPicks(); syncPicks(); }
    if (reelGrid && reelGrid.children.length) labelReel();
    if (clientGrid && clientGrid.children.length) labelClients();
    if (lbox && lbox.classList.contains('is-open')) paintLightbox();

    localStorage.setItem('bs-lang', lang);
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    applyLang();
  }

  $$('.langswitch__btn').forEach(b => {
    b.addEventListener('click', () => setLang(b.dataset.lang));
  });

  /* ==========================================================
     3. TEMA CLARO / OSCURO
     ========================================================== */

  const savedTheme = localStorage.getItem('bs-theme');
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;

  $('#themeBtn').addEventListener('click', () => {
    const now = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = now;
    localStorage.setItem('bs-theme', now);
  });

  /* ==========================================================
     4. HERO — separar el título en letras animables
     ========================================================== */

  /* Se separa por palabras y recién dentro por letras, para que
     un salto de línea nunca parta una palabra al medio. */
  function splitHero() {
    $$('.hero__title .split').forEach(el => {
      const text = el.textContent;
      if (!text) return;
      el.innerHTML = '';
      let i = 0;
      const words = text.trim().split(/\s+/);
      words.forEach((word, wi) => {
        const wrap = document.createElement('span');
        wrap.className = 'word';
        word.split('').forEach(ch => {
          const span = document.createElement('span');
          span.className = 'char';
          span.style.setProperty('--i', i++);
          span.textContent = ch;
          wrap.appendChild(span);
        });
        el.appendChild(wrap);
        if (wi < words.length - 1) { el.appendChild(document.createTextNode(' ')); i++; }
      });
    });
  }

  /* ==========================================================
     5. MARQUEES — duplicar el contenido para loop infinito
     ========================================================== */

  function syncMarquees() {
    $$('.marquee__track, .toolrow__track').forEach(track => {
      const sets = Array.from(track.children);
      const first = sets[0];
      sets.slice(1).forEach(n => n.remove());
      const clone = first.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }

  /* ==========================================================
     6. GALERÍA — render + filtros + lightbox
     ========================================================== */

  const gallery = $('.chapterbody[data-chapter]');

  /* Cada capítulo tiene su propia galería. Se llena con las piezas
     cuya categoría coincide con data-chapter. */
  /* Flechas del carrusel. Avanzan una pieza por clic. */
  function addCarouselNav(car, track) {
    ['prev', 'next'].forEach(dir => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'carousel__nav carousel__nav--' + dir;
      b.setAttribute('aria-label', t(dir === 'prev' ? 'car.prev' : 'car.next'));
      b.textContent = dir === 'prev' ? '‹' : '›';
      b.addEventListener('click', () => {
        const first = track.firstElementChild;
        if (!first) return;
        const step = first.getBoundingClientRect().width + 14;
        track.scrollBy({ left: dir === 'prev' ? -step : step, behavior: REDUCED ? 'auto' : 'smooth' });
      });
      car.appendChild(b);
    });
  }

  function renderGallery() {
    $$('.chapterbody[data-chapter]').forEach(body => {
      const cat = body.dataset.chapter;
      body.innerHTML = '';

      /* Un subgrupo por cada valor de g, en el orden en que aparecen.
         Las piezas sin g van en un bloque único sin título. */
      const order = [];
      WORKS.forEach(w => {
        if (w.cat !== cat) return;
        const key = w.g || '';
        if (order.indexOf(key) === -1) order.push(key);
      });

      order.forEach(key => {
        if (key) {
          const h = document.createElement('p');
          h.className = 'wgroup';
          h.dataset.i18n = key;
          h.textContent = t(key);
          body.appendChild(h);
        }
        /* Carrusel: se ve una pieza por vez y se pasa con el dedo,
           con la rueda del mouse o con las flechas. */
        const car = document.createElement('div');
        car.className = 'carousel';
        const track = document.createElement('div');
        track.className = 'carousel__track';
        car.appendChild(track);
        addCarouselNav(car, track);

        body.appendChild(car);
        fillGrid(track, cat, key);
      });
    });
    labelGallery();
    observeCards('.gitem');
  }

  function fillGrid(grid, cat, key) {
      WORKS.forEach((w, idx) => {
        if (w.cat !== cat || (w.g || '') !== key) return;

        const fig = document.createElement('figure');
        fig.className = 'gitem gitem--' + w.shape + (w.phone ? ' gitem--phone' : '') + (w.fit ? ' gitem--fit' : '');
        fig.dataset.idx = idx;
        fig.setAttribute('role', 'button');
        fig.setAttribute('tabindex', '0');

        const img = document.createElement('img');
        img.src = w.src;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.alt = t(w.t);

        const cap = document.createElement('figcaption');
        cap.className = 'gitem__cap';
        cap.innerHTML = '<span class="gitem__t"></span><span class="gitem__s"></span>';

        fig.append(img, cap);
        grid.appendChild(fig);

        fig.addEventListener('click', () => openLightbox(idx));
        fig.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(idx); }
        });
      });
  }

  /* El popurrí: una tira que se mueve sola, como el marquee de arriba.
     Cada pieza lleva debajo el nombre del proyecto y al tocarla se abre
     en grande. Se duplica el set para que el bucle no tenga corte. */
  /* Capítulos plegables: la página abre con el popurrí y los títulos, y
     cada disciplina se despliega si te interesa. Los chips del índice
     abren el capítulo que nombran antes de bajar hasta él. */
  function initChapters() {
    $$('.chapter').forEach(ch => {
      const head = $('.chapter__head', ch);
      const fold = $('.chapter__fold', ch);
      if (!head || !fold) return;
      head.addEventListener('click', () => toggleChapter(ch));
    });

    $$('.chapidx a').forEach(a => {
      a.addEventListener('click', () => {
        const ch = $(a.getAttribute('href'));
        if (ch && ch.classList.contains('chapter')) openChapter(ch);
      });
    });

    /* Si alguien llega con #ch-phys en la URL, ese capítulo tiene que estar abierto */
    if (location.hash) {
      const ch = document.getElementById(location.hash.slice(1));
      if (ch && ch.classList.contains('chapter')) openChapter(ch);
    }
  }

  function openChapter(ch) {
    if (!ch.classList.contains('is-open')) toggleChapter(ch);
  }

  function toggleChapter(ch) {
    const head = $('.chapter__head', ch);
    const fold = $('.chapter__fold', ch);
    const open = !ch.classList.contains('is-open');
    ch.classList.toggle('is-open', open);
    head.setAttribute('aria-expanded', String(open));
    fold.hidden = !open;
    /* Las tarjetas de adentro nunca entraron en pantalla: mostrarlas ya */
    if (open) $$('.reveal', fold).forEach(e => e.classList.add('is-in'));
  }

  function renderPicks() {
    const track = $('.popurri__track');
    if (!track) return;
    const set = document.createElement('div');
    set.className = 'popurri__set';

    PICKS.forEach(pick => {
      const file = pick.f || pick;
      const idx = WORKS.findIndex(w => w.src.endsWith('/' + file));
      if (idx < 0) return;
      const w = WORKS[idx];
      const fig = document.createElement('figure');
      fig.className = 'popitem';
      fig.dataset.idx = idx;
      if (pick.n) fig.dataset.name = pick.n;
      fig.tabIndex = 0;
      fig.setAttribute('role', 'button');
      fig.innerHTML =
        '<img src="' + w.src + '" loading="lazy" alt="">' +
        '<figcaption class="popitem__n"></figcaption>';
      fig.addEventListener('click', () => openLightbox(idx));
      fig.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(idx); }
      });
      set.appendChild(fig);
    });

    track.innerHTML = '';
    track.appendChild(set);
    labelPicks();
    syncPicks();
  }

  /* La copia es decorativa: no debe ser clickeable ni salir en el lector. */
  function syncPicks() {
    const track = $('.popurri__track');
    if (!track || !track.firstElementChild) return;
    Array.from(track.children).slice(1).forEach(n => n.remove());
    const clone = track.firstElementChild.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    $$('.popitem', clone).forEach(f => { f.removeAttribute('tabindex'); f.removeAttribute('role'); });
    track.appendChild(clone);
  }

  function labelPicks() {
    $$('.popurri__track .popitem').forEach(fig => {
      const w = WORKS[+fig.dataset.idx];
      $('.popitem__n', fig).textContent = t(fig.dataset.name || w.s);
      $('img', fig).alt = t(w.t) + ' · ' + t(w.s);
    });
  }

  function labelGallery() {
    $$('.gitem').forEach(fig => {
      const w = WORKS[+fig.dataset.idx];
      $('.gitem__t', fig).textContent = t(w.t);
      $('.gitem__s', fig).textContent = t(w.s);
      $('img', fig).alt = t(w.t);
    });
  }

  /* Aparición escalonada de tarjetas al entrar en pantalla */
  function observeCards(sel) {
    if (REDUCED) { $$(sel).forEach(g => g.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en, i) => {
        if (en.isIntersecting) {
          setTimeout(() => en.target.classList.add('is-in'), i * 60);
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    $$(sel).forEach(g => io.observe(g));
  }

  /* ---- Lightbox ---- */

  const lbox = $('#lbox');
  const lboxImg = $('#lboxImg');
  let lboxList = [];
  let lboxPos = 0;

  function currentList() {
    const shown = $$('.gitem').filter(f => !f.classList.contains('is-hidden'));
    return shown.map(f => +f.dataset.idx);
  }

  function openLightbox(idx) {
    lboxList = currentList();
    lboxPos = Math.max(0, lboxList.indexOf(idx));
    paintLightbox();
    lbox.classList.add('is-open');
    lbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
  }

  function paintLightbox() {
    const w = WORKS[lboxList[lboxPos]];
    if (!w) return;
    lboxImg.style.opacity = 0;
    const pre = new Image();
    pre.onload = () => { lboxImg.src = w.src; lboxImg.style.opacity = 1; };
    pre.src = w.src;
    lboxImg.alt = t(w.t);
    $('#lboxTitle').textContent = t(w.t);
    $('#lboxSub').textContent = t(w.s);
  }

  function closeLightbox() {
    lbox.classList.remove('is-open');
    lbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
  }

  function step(n) {
    if (!lboxList.length) return;
    lboxPos = (lboxPos + n + lboxList.length) % lboxList.length;
    paintLightbox();
  }

  $('#lboxClose').addEventListener('click', closeLightbox);
  $('#lboxPrev').addEventListener('click', () => step(-1));
  $('#lboxNext').addEventListener('click', () => step(1));
  lbox.addEventListener('click', e => { if (e.target === lbox) closeLightbox(); });

  /* ==========================================================
     6a. CLIENTES POR PROYECTO — render
     ========================================================== */

  const clientGrid = $('#clientGrid');

  function renderClients() {
    if (!clientGrid) return;
    clientGrid.innerHTML = '';
    CLIENTS.forEach(c => {
      const li = document.createElement('li');
      li.className = 'client' + (c.go ? ' client--go' : '');
      li.dataset.s = c.s;
      li.innerHTML = '<span class="client__name"></span><span class="client__s"></span>' +
                     (c.go ? '<span class="client__go" aria-hidden="true">→</span>' : '');
      $('.client__name', li).textContent = c.name;

      if (c.go) {
        li.setAttribute('role', 'button');
        li.setAttribute('tabindex', '0');
        const act = () => goToWork(c.go, t('nav.exp'), li);
        li.addEventListener('click', act);
        li.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); }
        });
      }

      clientGrid.appendChild(li);
    });
    labelClients();
  }

  /* Lleva del nombre de una marca a su trabajo: baja al subgrupo
     o abre el documento, según lo que tenga cargado. */
  /* ==========================================================
     VUELTA ATRÁS
     Los botones de casos, clientes y dossiers saltan a otra parte de
     la página. Antes de saltar se guarda dónde estaba la persona y
     aparece un botón para volver a ese punto exacto.
     ========================================================== */

  const volverBtn = $('#volver');
  let vuelta = null;

  /* Se guarda el elemento del que salió la persona, no un número de scroll:
     así el regreso funciona igual sin importar qué contenedor scrollea. */
  function marcarVuelta(etiqueta, origen, restaurar) {
    vuelta = { origen: origen || null, etiqueta: etiqueta, restaurar: restaurar || null };
    $('.volver__txt', volverBtn).textContent = t('nav.volverA') + ' ' + etiqueta;
    volverBtn.hidden = false;
    /* Se muestra recién cuando el salto terminó, para que no tape el destino */
    setTimeout(() => volverBtn.classList.add('is-on'), 700);
  }

  function limpiarVuelta() {
    vuelta = null;
    volverBtn.classList.remove('is-on');
    setTimeout(() => { if (!vuelta) volverBtn.hidden = true; }, 300);
  }

  if (volverBtn) {
    volverBtn.addEventListener('click', () => {
      if (!vuelta) return;
      const origen = vuelta.origen;
      const restaurar = vuelta.restaurar;
      limpiarVuelta();
      if (restaurar) { restaurar(); return; }
      if (!origen) return;
      /* Se vuelve al elemento, no a una coordenada: si al saltar se abrió
         un capítulo, la página creció y el número viejo ya no serviría. */
      origen.scrollIntoView({ block: 'center', behavior: REDUCED ? 'auto' : 'smooth' });
    });

    /* Si la persona ya volvió sola al punto de partida, el botón sobra.
       Recién cuenta después de que el origen se fue de pantalla: si no,
       un salto corto lo escondería apenas aparece. */
    window.addEventListener('scroll', () => {
      if (!vuelta || vuelta.restaurar || !vuelta.origen) return;
      const r = vuelta.origen.getBoundingClientRect();
      const aLaVista = r.bottom > 0 && r.top < window.innerHeight;
      if (!aLaVista) { vuelta.seFue = true; return; }
      if (vuelta.seFue) limpiarVuelta();
    }, { passive: true });
  }

  function goToWork(go, desde, origen) {
    if (desde) marcarVuelta(desde, origen);
    if (go.doc) { openDoc(go.doc[0], go.doc[1], go.doc[2]); return; }
    if (go.video) {
      const v = REEL.find(x => x.id === go.video);
      openVideo('assets/video/reel/' + go.video + '.mp4', !(v && v.wide));
      return;
    }
    const h = $('.wgroup[data-i18n="' + go.grupo + '"]');
    if (h) { const ch = h.closest('.chapter'); if (ch) openChapter(ch); }
    if (!h) return;
    const y = h.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: y, behavior: REDUCED ? 'auto' : 'smooth' });
    h.classList.remove('is-target');
    void h.offsetWidth;
    h.classList.add('is-target');
    setTimeout(() => h.classList.remove('is-target'), 1800);
  }

  function labelClients() {
    $$('.client').forEach(li => { $('.client__s', li).textContent = t(li.dataset.s); });
  }

  /* ==========================================================
     6b. REEL — render, filtros y reproducción
     ========================================================== */

  const reelGrid = $('#reelBody');

  const REEL_GROUPS = [
    { cat: 'inst', key: 'g.inst' },
    { cat: 'ugc',  key: 'g.ugcV' },
    { cat: 'ia',   key: 'g.iaV'  }
  ];

  /* Mismo patrón que los otros capítulos: un subgrupo por tipo de
     video y un carrusel en cada uno. */
  function renderReel() {
    if (!reelGrid) return;
    reelGrid.innerHTML = '';

    REEL_GROUPS.forEach(grp => {
      const h = document.createElement('p');
      h.className = 'wgroup';
      h.dataset.g = grp.cat;
      h.dataset.i18n = grp.key;
      h.textContent = t(grp.key);
      reelGrid.appendChild(h);

      const car = document.createElement('div');
      car.className = 'carousel';
      const track = document.createElement('div');
      track.className = 'carousel__track';
      car.appendChild(track);
      addCarouselNav(car, track);
      reelGrid.appendChild(car);

      REEL.forEach((v, idx) => {
        if (v.cat !== grp.cat) return;
        const card = document.createElement('figure');
        card.className = 'rcard' + (v.wide ? ' rcard--wide' : '');
        card.dataset.idx = idx;
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');

        card.innerHTML =
          '<img src="assets/video/reel/' + v.id + '.jpg" alt="" loading="lazy" decoding="async">' +
          '<span class="rcard__play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>' +
          '<figcaption class="rcard__cap"><span class="rcard__t"></span><span class="rcard__s"></span></figcaption>';

        const play = () => openVideo('assets/video/reel/' + v.id + '.mp4', !v.wide);
        card.addEventListener('click', play);
        card.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); }
        });

        track.appendChild(card);
      });
    });

    labelReel();
    observeCards('.rcard');
  }

  function labelReel() {
    $$('.rcard').forEach(card => {
      const v = REEL[+card.dataset.idx];
      $('.rcard__t', card).textContent = t(v.t);
      $('.rcard__s', card).textContent = t(v.s);
      $('img', card).alt = t(v.t);
    });
  }

  /* ==========================================================
     6c. VISOR DE DOSSIERS
     Las páginas están pre-renderizadas como imágenes en
     assets/docs/pages/<slug>/. Así se leen dentro del sitio,
     sin depender del visor de PDF del navegador. El PDF queda
     como descarga aparte.
     ========================================================== */

  const docmodal = $('#docmodal');
  const docPages = $('#docPages');

  /* Los botones que el PDF traía como enlaces se vuelven a colocar
     encima de la imagen de la página. Las medidas son porcentajes
     de la página, así funcionan en cualquier tamaño de pantalla. */
  /* El dossier de UGC se imprimió con botones que decían "Reels en Drive".
     Acá esos botones se tapan con uno propio que baja al reel del sitio,
     así nadie sale del portafolio ni cae en una carpeta ajena. */
  const DOC_LINKS = {
    ugc: [
      { page: 4, reel: 'ugc', x: 3.8, y: 25.1, w: 21.2, h: 6.3, label: 'docs.verReels' },
      { page: 5, reel: 'ugc', x: 3.8, y: 29.0, w: 21.2, h: 6.3, label: 'docs.verReels' },
      { page: 6, reel: 'ia',  x: 4.2, y: 32.7, w: 21.2, h: 6.5, label: 'docs.verReels' }
    ]
  };

  function openDoc(slug, pages, titleKey) {
    docPages.innerHTML = '';
    const links = DOC_LINKS[slug] || [];

    for (let i = 1; i <= pages; i++) {
      const n = (i < 10 ? '0' : '') + i;

      const fig = document.createElement('figure');
      fig.className = 'docpage';

      const img = document.createElement('img');
      img.src = 'assets/docs/pages/' + slug + '/p' + n + '.jpg';
      img.loading = i <= 2 ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.alt = t(titleKey) + ' · ' + i + '/' + pages;
      fig.appendChild(img);

      links.filter(l => l.page === i).forEach(l => {
        const a = document.createElement('a');
        a.className = 'docpage__link' + (l.label ? ' docpage__link--pill' : '');
        a.href = '#reel';
        if (l.label) a.textContent = t(l.label);
        a.setAttribute('aria-label', t(l.label || 'docs.linkLabel'));
        a.style.cssText = 'left:' + l.x + '%;top:' + l.y + '%;width:' + l.w + '%;height:' + l.h + '%';
        a.addEventListener('click', e => {
          e.preventDefault();
          const pagina = i;
          goToReel(l.reel, {
            etiqueta: t(titleKey),
            restaurar: () => {
              openDoc(slug, pages, titleKey);
              setTimeout(() => {
                const f = $$('.docpage', docPages)[pagina - 1];
                if (f) f.scrollIntoView({ block: 'start', behavior: 'auto' });
              }, 120);
            }
          });
        });
        fig.appendChild(a);
      });

      docPages.appendChild(fig);
    }
    $('#docTitle').textContent = t(titleKey);
    /* Los manuales de marca se leen en el visor y no se descargan:
       el PDF original pesa más de 13 MB. */
    const dl = $('#docDl');
    const row = $('.doc__main[data-doc="' + slug + '"]').closest('.doc');
    dl.hidden = row.classList.contains('doc--nodl');
    dl.href = 'assets/docs/' + slug + '.pdf';
    docPages.scrollTop = 0;
    docmodal.classList.add('is-open');
    docmodal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
  }

  /* Cierra el dossier y baja al grupo del reel que corresponde, en
     vez de mandar a la persona fuera del sitio. */
  function goToReel(cat, volverAlDoc) {
    if (volverAlDoc) marcarVuelta(volverAlDoc.etiqueta, null, volverAlDoc.restaurar);
    closeDoc();
    setTimeout(() => {
      const h = $('.wgroup[data-g="' + cat + '"]');
      if (!h) return;
      /* El capítulo de video arranca plegado: sin abrirlo no hay adónde bajar */
      const ch = h.closest('.chapter');
      if (ch) openChapter(ch);
      const y = h.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: REDUCED ? 'auto' : 'smooth' });
    }, 220);
  }

  function closeDoc() {
    docmodal.classList.remove('is-open');
    docmodal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    setTimeout(() => { if (!docmodal.classList.contains('is-open')) docPages.innerHTML = ''; }, 500);
  }

  $$('.doc__main').forEach(btn => {
    btn.addEventListener('click', () => {
      openDoc(btn.dataset.doc, +btn.dataset.pages, btn.dataset.title);
    });
  });

  /* Los casos también entran al trabajo de esa marca */
  $$('.case__go').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.goDoc) {
        const p = btn.dataset.goDoc.split(',');
        goToWork({ doc: [p[0], +p[1], p[2]] }, t('nav.exp'), btn);
      } else {
        goToWork({ grupo: btn.dataset.goGroup }, t('nav.exp'), btn);
      }
    });
  });

  $('#docClose').addEventListener('click', closeDoc);
  docmodal.addEventListener('click', e => { if (e.target === docmodal) closeDoc(); });

  /* ==========================================================
     7. VIDEO MODAL
     ========================================================== */

  const vmodal = $('#vmodal');
  const vvideo = $('#vmodalVideo');

  function openVideo(src, vertical) {
    vvideo.src = src;
    vmodal.classList.toggle('vmodal--wide', vertical === false);
    vmodal.classList.add('is-open');
    vmodal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    vvideo.play().catch(() => {});
  }

  $$('[data-video]').forEach(btn => {
    btn.addEventListener('click', () => openVideo(btn.dataset.video, true));
  });

  function closeVideo() {
    vvideo.pause();
    vvideo.removeAttribute('src');
    vvideo.load();
    vmodal.classList.remove("is-open", "vmodal--wide");
    vmodal.setAttribute("aria-hidden", "true");
    document.body.classList.remove('is-locked');
  }

  $('#vmodalClose').addEventListener('click', closeVideo);
  vmodal.addEventListener('click', e => { if (e.target === vmodal) closeVideo(); });

  /* ---- Teclado global ---- */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (lbox.classList.contains('is-open')) closeLightbox();
      if (vmodal.classList.contains("is-open")) closeVideo();
      if (docmodal.classList.contains("is-open")) closeDoc();
      if (drawer.classList.contains('is-open')) toggleDrawer(false);
    }
    if (lbox.classList.contains('is-open')) {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft')  step(-1);
    }
  });

  /* ==========================================================
     8. REVEAL AL SCROLL
     ========================================================== */

  function initReveal() {
    const items = $$('.reveal, .tl');
    if (REDUCED) { items.forEach(i => i.classList.add('is-in')); return; }
    items.forEach(el => {
      if (el.dataset.delay) el.style.setProperty('--rd', el.dataset.delay);
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    items.forEach(el => io.observe(el));
  }

  /* ==========================================================
     9. CONTADORES
     ========================================================== */

  const DEC = () => (lang === 'en' ? '.' : ',');

  function formatNum(n, compact) {
    if (compact) {
      /* 654294 -> 654,3K · 24500 -> 24,5K */
      const k = n / 1000;
      const s = (k >= 100 ? Math.round(k) : Math.round(k * 10) / 10);
      return String(s).replace('.', DEC()) + 'K';
    }
    return lang === 'en' ? n.toLocaleString('en-US') : n.toLocaleString('es-AR');
  }

  /* Debajo de cada cifra va una curva que sube y se dibuja sola, al mismo
     tiempo que corre el contador. La forma sale del propio número, así cada
     tarjeta tiene su curva y siempre es la misma. */
  function dibujarGrafico(stat, semilla) {
    if ($('.stat__graf', stat)) return;
    const N = 11;
    let r = (semilla % 9973) + 7;
    const paso = () => { r = (r * 1103515245 + 12345) % 2147483648; return r / 2147483648; };

    const ys = [];
    for (let i = 0; i < N; i++) {
      const base = 0.16 + (i / (N - 1)) * 0.74;      // la tendencia siempre sube
      const ruido = (paso() - 0.5) * 0.16;            // pero no en línea recta
      ys.push(Math.min(0.97, Math.max(0.06, base + (i === N - 1 ? 0.04 : ruido))));
    }
    const pts = ys.map((v, i) => [ (i / (N - 1)) * 100, 30 - v * 30 ]);
    const linea = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
    const area  = linea + ' L100,30 L0,30 Z';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'stat__graf');
    svg.setAttribute('viewBox', '0 0 100 30');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML =
      '<path class="stat__area" d="' + area + '"></path>' +
      '<path class="stat__linea" d="' + linea + '" pathLength="1"></path>';
    stat.insertBefore(svg, $('.stat__lab', stat));
  }

  function runCounter(el) {
    const target = +el.dataset.count;
    const pre = el.dataset.prefix || '';
    const suf = el.dataset.suffix || '';
    const compact = el.dataset.compact === '1';
    if (REDUCED) { el.textContent = pre + formatNum(target, compact) + suf; return; }

    const dur = 1900;
    const start = performance.now();
    function frame(now) {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = pre + formatNum(Math.round(target * eased), compact) + suf;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function initCounters() {
    $$('[data-count]').forEach(el => {
      const stat = el.closest('.stat');
      if (stat && $('.stat__lab', stat)) dibujarGrafico(stat, +el.dataset.count || 1);
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        runCounter(en.target);
        const stat = en.target.closest('.stat');
        if (stat) stat.classList.add('is-graf');
        io.unobserve(en.target);
      });
    }, { threshold: 0.4 });
    $$('[data-count]').forEach(el => io.observe(el));
  }

  /* ==========================================================
     10. NAV — sticky, sección activa, drawer
     ========================================================== */

  const nav = $('#nav');
  const drawer = $('#drawer');
  const burger = $('#burger');

  function toggleDrawer(force) {
    const open = force !== undefined ? force : !drawer.classList.contains('is-open');
    drawer.classList.toggle('is-open', open);
    burger.classList.toggle('is-on', open);
    burger.setAttribute('aria-expanded', String(open));
    drawer.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('is-locked', open);
  }

  burger.addEventListener('click', () => toggleDrawer());
  $$('.drawer__nav a, .drawer__cv').forEach(a => a.addEventListener('click', () => toggleDrawer(false)));

  const sections = $$('main section[id]');
  const navLinks = $$('.nav__links a');

  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('is-stuck', y > 40);

    const h = document.documentElement.scrollHeight - window.innerHeight;
    $('.scrollbar__fill').style.width = (h > 0 ? (y / h) * 100 : 0) + '%';

    let active = '';
    sections.forEach(s => {
      if (s.offsetTop - window.innerHeight * 0.35 <= y) active = s.id;
    });
    navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + active));
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ==========================================================
     11. CURSOR + MAGNÉTICOS + TILT + AURA
     ========================================================== */

  function initPointer() {
    if (REDUCED || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const cur = $('.cursor');
    const dot = $('.cursor__dot');
    const ring = $('.cursor__ring');
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });

    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();

    const hotSel = 'a, button, .gitem, [data-magnetic], .filter, input, .tags li';
    document.addEventListener('mouseover', e => {
      if (e.target.closest(hotSel)) cur.classList.add('is-hot');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(hotSel)) cur.classList.remove('is-hot');
    });

    /* Botones magnéticos */
    $$('[data-magnetic]').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.22}px, ${y * 0.28}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });

    /* Tilt 3D en fotos */
    $$('[data-tilt]').forEach(el => {
      const parent = el.parentElement;
      parent.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`;
      });
      parent.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });

    /* Destello: le pasa a cada tarjeta dónde está el puntero.
       Se actualiza una vez por cuadro, no en cada movimiento. */
    const GLOW = '.gitem, .rcard, .case, .client, .value, .srvcard, .stat, .pcard, .own__link, .doc__main, .tags li';
    let glowEl = null, glowX = 0, glowY = 0, glowQueued = false;

    document.addEventListener('mousemove', e => {
      const card = e.target.closest(GLOW);
      if (!card) { glowEl = null; return; }
      glowEl = card; glowX = e.clientX; glowY = e.clientY;
      if (glowQueued) return;
      glowQueued = true;
      requestAnimationFrame(() => {
        glowQueued = false;
        if (!glowEl) return;
        const r = glowEl.getBoundingClientRect();
        glowEl.style.setProperty('--gx', (glowX - r.left) + 'px');
        glowEl.style.setProperty('--gy', (glowY - r.top) + 'px');
      });
    }, { passive: true });

    /* Aura que sigue el mouse */
    const blobs = $$('.aura__blob');
    document.addEventListener('mousemove', e => {
      const nx = (e.clientX / window.innerWidth - 0.5);
      const ny = (e.clientY / window.innerHeight - 0.5);
      blobs[0].style.transform = `translate(${nx * 70}px, ${ny * 70}px)`;
      blobs[1].style.transform = `translate(${nx * -90}px, ${ny * -90}px)`;
    });
  }

  /* ==========================================================
     12. PARALLAX SUAVE EN LA FOTO DEL HERO
     ========================================================== */

  function initParallax() {
    if (REDUCED) return;
    const photo = $('.hero__photo');
    if (!photo) return;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        photo.style.transform = `translateY(${y * 0.09}px)`;
      }
    }, { passive: true });
  }

  /* ==========================================================
     13. PRELOADER
     ========================================================== */

  /* La notebook se abre una sola vez por visita. Si ya la viste y
     volvés a otra parte del sitio, entrás directo. */
  function initLoader() {
    const loader = $('#loader');
    let seen = false;
    try { seen = sessionStorage.getItem('bs-intro') === '1'; } catch (e) {}

    const end = () => {
      loader.classList.add('is-done');
      document.body.classList.add('is-ready');
      try { sessionStorage.setItem('bs-intro', '1'); } catch (e) {}
    };

    if (seen || REDUCED) {
      loader.style.transitionDuration = '0.2s';
      setTimeout(end, REDUCED ? 60 : 250);
      return;
    }
    setTimeout(end, 1750);
  }

  /* ==========================================================
     14. ARRANQUE
     ========================================================== */

  function boot() {
    $('#year').textContent = new Date().getFullYear();
    renderGallery();
    renderPicks();
    initChapters();
    renderReel();
    renderClients();
    applyLang();
    initReveal();
    initCounters();
    initPointer();
    initParallax();
    onScroll();
    initLoader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
