/* M7 Lounge — interacciones. Sin dependencias. */
(function () {
  "use strict";

  var doc = document, root = doc.documentElement, win = window;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var fine = win.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduced = win.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function safe(fn, name) {
    try { fn(); } catch (e) { if (win.console) console.warn("[M7] " + name, e); }
  }

  /* ---------- Bucle de scroll único ---------- */
  var scrollFns = [], ticking = false;
  function onScroll(fn) { scrollFns.push(fn); }
  function runScroll() {
    ticking = false;
    var y = win.pageYOffset, vh = win.innerHeight;
    for (var i = 0; i < scrollFns.length; i++) scrollFns[i](y, vh);
  }
  function requestScroll() { if (!ticking) { ticking = true; requestAnimationFrame(runScroll); } }
  win.addEventListener("scroll", requestScroll, { passive: true });
  win.addEventListener("resize", requestScroll);

  /* ---------- Splash ---------- */
  function initSplash() {
    var splash = $("[data-splash]");
    var done = false;
    function hide() {
      if (done) return; done = true;
      if (splash) splash.classList.add("is-out");
      root.classList.add("is-loaded");
      win.dispatchEvent(new Event("m7:ready"));
    }
    if (!splash) { hide(); return; }
    var seen = false;
    try { seen = sessionStorage.getItem("m7_seen") === "1"; sessionStorage.setItem("m7_seen", "1"); } catch (e) {}
    var min = seen ? 250 : 1500;
    var t0 = Date.now();
    function go() { setTimeout(hide, Math.max(0, min - (Date.now() - t0))); }
    if (doc.readyState === "complete") go(); else win.addEventListener("load", go);
    setTimeout(hide, 3500);
  }

  /* ---------- Titular del hero: letra a letra ---------- */
  function initChars() {
    $$("[data-chars]").forEach(function (el) {
      var i = 0;
      function wrap(text) {
        return text.split(/(\s+)/).map(function (w) {
          if (!w) return "";
          if (/^\s+$/.test(w)) return " ";
          return '<span class="wd" aria-hidden="true">' + w.split("").map(function (c) {
            return '<span class="ch" style="--i:' + (i++) + '">' + (c === "&" ? "&amp;" : c) + "</span>";
          }).join("") + "</span>";
        }).join("");
      }
      var html = Array.prototype.map.call(el.childNodes, function (n) {
        if (n.nodeType === 3) return wrap(n.textContent);
        if (n.nodeType === 1) { var t = n.tagName.toLowerCase(); return "<" + t + ">" + wrap(n.textContent) + "</" + t + ">"; }
        return "";
      }).join("");
      el.innerHTML = html;
    });
  }

  /* ---------- Revelados al entrar en pantalla ---------- */
  function initReveal() {
    var els = $$("[data-reveal],[data-clip],[data-lines]");
    if (!("IntersectionObserver" in win)) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (e) { io.observe(e); });
    setTimeout(function () {
      els.forEach(function (e) {
        if (!e.classList.contains("is-in") && e.getBoundingClientRect().top < win.innerHeight) e.classList.add("is-in");
      });
    }, 6000);
  }

  /* ---------- Navegación ---------- */
  function initNav() {
    var nav = $("[data-nav]"); if (!nav) return;
    var last = 0, burger = $("[data-burger]"), mnav = $("[data-mnav]");
    onScroll(function (y) {
      nav.classList.toggle("is-solid", y > 40);
      var open = mnav && mnav.classList.contains("is-open");
      var hide = !open && y > 500 && y > last + 4;
      var show = y < last - 4 || y < 500;
      if (hide) { nav.classList.add("is-hidden"); root.classList.add("nav-hidden"); }
      else if (show) { nav.classList.remove("is-hidden"); root.classList.remove("nav-hidden"); }
      last = y;
    });
    function setMenu(open) {
      mnav.classList.toggle("is-open", open);
      mnav.setAttribute("aria-hidden", open ? "false" : "true");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      doc.body.style.overflow = open ? "hidden" : "";
      if (open) nav.classList.remove("is-hidden");
    }
    if (burger && mnav) {
      burger.addEventListener("click", function () { setMenu(!mnav.classList.contains("is-open")); });
      $$("a", mnav).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
      doc.addEventListener("keydown", function (e) { if (e.key === "Escape" && mnav.classList.contains("is-open")) setMenu(false); });
      win.matchMedia("(min-width:1080px)").addEventListener("change", function (e) { if (e.matches) setMenu(false); });
    }
    /* enlace activo */
    var links = $$(".nav__links a");
    var map = {};
    links.forEach(function (a) { var s = $(a.getAttribute("href")); if (s) map[s.id] = a; });
    if ("IntersectionObserver" in win) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a) { a.classList.remove("is-active"); });
          map[e.target.id].classList.add("is-active");
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      Object.keys(map).forEach(function (id) { io.observe(doc.getElementById(id)); });
    }
  }

  /* ---------- Barra de progreso, barra móvil y volver arriba ---------- */
  function initChrome() {
    var bar = $("[data-progress]"), mbar = $("[data-mbar]"), top = $("[data-totop]"), cta = $("#reservar");
    onScroll(function (y, vh) {
      var max = doc.documentElement.scrollHeight - vh;
      if (bar) bar.style.transform = "scaleX(" + (max > 0 ? clamp(y / max, 0, 1) : 0) + ")";
      var nearEnd = cta ? cta.getBoundingClientRect().top < vh * 0.8 : false;
      if (mbar) mbar.classList.toggle("is-on", y > vh * 0.7 && !nearEnd);
      if (top) top.classList.toggle("is-on", y > vh * 1.2);
    });
    var yr = $("[data-year]"); if (yr) yr.textContent = new Date().getFullYear();
  }

  /* ---------- Vídeos: carga diferida y pausa fuera de pantalla ---------- */
  function initVideos() {
    var hero = $("[data-hero-video]");
    if (hero) {
      var start = function () {
        if (hero.src || reduced) return;
        var saveData = navigator.connection && navigator.connection.saveData;
        if (saveData) return;
        hero.src = hero.getAttribute("data-src");
        hero.addEventListener("playing", function () { hero.classList.add("is-playing"); }, { once: true });
        var p = hero.play(); if (p && p.catch) p.catch(function () {});
      };
      if (root.classList.contains("is-loaded")) start(); else win.addEventListener("m7:ready", start, { once: true });
    }
    var vids = $$("video[data-autoplay]").concat(hero ? [hero] : []);
    if (!("IntersectionObserver" in win)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          if (!v.src && v.hasAttribute("data-autoplay")) v.src = v.getAttribute("data-src");
          if (v.src) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        } else if (!v.paused) v.pause();
      });
    }, { rootMargin: "200px 0px" });
    vids.forEach(function (v) { io.observe(v); });
  }

  /* ---------- Parallax ---------- */
  function initParallax() {
    var items = $$("[data-parallax]").map(function (el) { return { el: el, k: parseFloat(el.getAttribute("data-parallax")) || 0.1 }; });
    var media = $("[data-hero-media]");
    onScroll(function (y, vh) {
      if (media && y < vh * 1.2) media.style.transform = "translate3d(0," + (y * 0.28).toFixed(1) + "px,0) scale(" + (1 + y / vh * 0.08).toFixed(4) + ")";
      for (var i = 0; i < items.length; i++) {
        var r = items[i].el.parentNode.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) continue;
        var p = (r.top + r.height / 2 - vh / 2) / vh;
        items[i].el.style.transform = "translate3d(0," + (-p * items[i].k * 100).toFixed(2) + "%,0) scale(1.12)";
      }
    });
  }

  /* ---------- Manifiesto: palabras que se encienden ---------- */
  function initWords() {
    $$("[data-words]").forEach(function (el) {
      var out = [];
      Array.prototype.forEach.call(el.childNodes, function (n) {
        var tag = n.nodeType === 1 ? n.tagName.toLowerCase() : null;
        n.textContent.split(/(\s+)/).forEach(function (w) {
          if (!w) return;
          if (/^\s+$/.test(w)) { out.push(" "); return; }
          var s = '<span class="w">' + w + "</span>";
          out.push(tag ? "<" + tag + ">" + s + "</" + tag + ">" : s);
        });
      });
      el.innerHTML = out.join("");
      var ws = $$(".w", el);
      onScroll(function (y, vh) {
        var r = el.getBoundingClientRect();
        var p = clamp((vh * 0.88 - r.top) / (r.height + vh * 0.3), 0, 1);
        var n = Math.round(p * ws.length);
        for (var i = 0; i < ws.length; i++) ws[i].classList.toggle("on", i < n);
      });
    });
  }

  /* ---------- Contadores ---------- */
  function initCount() {
    var els = $$("[data-count]"); if (!els.length || !("IntersectionObserver" in win)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return; io.unobserve(e.target);
        var el = e.target, to = parseFloat(el.getAttribute("data-count")), dec = parseInt(el.getAttribute("data-dec") || "0", 10), t0 = null;
        function step(t) {
          if (!t0) t0 = t;
          var p = clamp((t - t0) / 1600, 0, 1), v = to * (1 - Math.pow(1 - p, 4));
          el.textContent = v.toFixed(dec).replace(".", ",");
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Paneles de experiencia ---------- */
  function initPanels() {
    var wrap = $("[data-panels]"); if (!wrap) return;
    var panels = $$(".panel", wrap);
    function act(p) { panels.forEach(function (x) { x.classList.toggle("is-active", x === p); }); }
    panels.forEach(function (p) {
      p.addEventListener("mouseover", function () { act(p); });
      p.addEventListener("focus", function () { act(p); });
      p.addEventListener("click", function () { act(p); });
    });
  }

  /* ---------- Carril horizontal de cócteles ---------- */
  function initRail() {
    var sec = $("[data-rail]"); if (!sec) return;
    var track = $("[data-rail-track]", sec), bar = $("[data-rail-bar]", sec), count = $("[data-rail-count]", sec);
    var cards = $$(".drink:not(.drink--end)", track), total = cards.length, dist = 0, pinned = false;
    var mq = win.matchMedia("(min-width: 1000px) and (min-height: 620px) and (hover: hover)");
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function setProgress(p) {
      if (bar) bar.style.transform = "scaleX(" + clamp(p, 0.06, 1) + ")";
      if (count) count.textContent = pad(clamp(Math.round(p * (total - 1)) + 1, 1, total)) + " / " + pad(total);
    }
    function measure() {
      pinned = mq.matches;
      sec.classList.toggle("is-pinned", pinned);
      if (!pinned) { sec.style.height = ""; track.style.transform = ""; return; }
      track.scrollLeft = 0;
      dist = Math.max(0, track.scrollWidth - win.innerWidth);
      sec.style.height = (win.innerHeight + dist) + "px";
    }
    measure();
    win.addEventListener("resize", measure);
    win.addEventListener("load", measure);
    setTimeout(measure, 1200);
    onScroll(function () {
      if (!pinned) return;
      var r = sec.getBoundingClientRect();
      var p = dist > 0 ? clamp(-r.top / dist, 0, 1) : 0;
      track.style.transform = "translate3d(" + (-p * dist).toFixed(1) + "px,0,0)";
      setProgress(p);
    });
    track.addEventListener("scroll", function () {
      if (pinned) return;
      var max = track.scrollWidth - track.clientWidth;
      setProgress(max > 0 ? track.scrollLeft / max : 0);
    }, { passive: true });
  }

  /* ---------- Shishas: imagen fija que cambia ---------- */
  function initShishas() {
    var wrap = $("[data-sh]"); if (!wrap) return;
    var imgs = $$(".sh__visual img", wrap), blocks = $$("[data-flav]", wrap), n = $("[data-sh-n]", wrap), cur = -1;
    function set(i) {
      if (i === cur) return; cur = i;
      imgs.forEach(function (im, k) { im.classList.toggle("on", k === i); });
      blocks.forEach(function (b, k) { b.classList.toggle("on", k === i); });
      if (n) n.textContent = "0" + (i + 1);
    }
    onScroll(function (y, vh) {
      var best = 0, bd = Infinity;
      for (var i = 0; i < blocks.length; i++) {
        var r = blocks[i].getBoundingClientRect(), d = Math.abs(r.top + r.height / 2 - vh / 2);
        if (d < bd) { bd = d; best = i; }
      }
      set(best);
    });
  }

  /* ---------- Carta ---------- */
  function initMenu() {
    var MENU = win.M7_MENU, tabsEl = $("[data-tabs]"), body = $("[data-menu-body]"), input = $("[data-menu-search]");
    if (!MENU || !tabsEl || !body) return;
    var keys = Object.keys(MENU), active = keys[0];
    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
    function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
    function hl(text, q) {
      if (!q) return esc(text);
      var i = norm(text).indexOf(q);
      if (i < 0) return esc(text);
      return esc(text.slice(0, i)) + "<mark>" + esc(text.slice(i, i + q.length)) + "</mark>" + esc(text.slice(i + q.length));
    }
    function group(g, i, q, section) {
      var items = g.items.map(function (it) {
        var p = it.p || g.price || "";
        return '<li class="it"><div class="it__r"><span class="it__n">' + hl(it.n, q) + '</span><span class="it__dots"></span><span class="it__p">' + esc(p) + "</span></div>" +
          (it.d ? '<p class="it__d">' + hl(it.d, q) + "</p>" : "") + "</li>";
      }).join("");
      return '<section class="grp" style="--i:' + i + '"><div class="grp__h"><h3 class="grp__t">' + (section ? "<small>" + esc(section) + "</small>" : "") + esc(g.title) + "</h3>" +
        (g.price ? '<span class="grp__p">' + esc(g.price) + "</span>" : "") + "</div><ul>" + items + "</ul>" +
        (g.note && !q ? '<p class="grp__note">' + esc(g.note) + "</p>" : "") + "</section>";
    }
    function render() {
      var q = input ? norm(input.value.trim()) : "", html = "", i = 0;
      if (q.length >= 2) {
        keys.forEach(function (k) {
          MENU[k].forEach(function (g) {
            var titleHit = norm(g.title).indexOf(q) >= 0;
            var items = g.items.filter(function (it) { return titleHit || norm(it.n).indexOf(q) >= 0 || (it.d && norm(it.d).indexOf(q) >= 0); });
            if (items.length) html += group({ title: g.title, price: g.price, items: items }, i++, q, k);
          });
        });
        if (!html) html = '<p class="menu__empty">No encontramos «' + esc(input.value.trim()) + "» en la carta. Prueba con otra palabra o pregúntanos en el local.</p>";
      } else {
        MENU[active].forEach(function (g) { html += group(g, i++, "", ""); });
      }
      body.innerHTML = html;
      $$(".tab", tabsEl).forEach(function (t) { t.setAttribute("aria-selected", (q.length < 2 && t.getAttribute("data-k") === active) ? "true" : "false"); });
    }
    tabsEl.innerHTML = keys.map(function (k) { return '<button class="tab" type="button" role="tab" data-k="' + esc(k) + '">' + esc(k) + "</button>"; }).join("");
    tabsEl.addEventListener("click", function (e) {
      var t = e.target.closest(".tab"); if (!t) return;
      active = t.getAttribute("data-k"); if (input) input.value = "";
      render();
      var sec = $("#carta"), barEl = $(".menu__bar");
      if (barEl && barEl.getBoundingClientRect().top <= 90) {
        var yTo = body.getBoundingClientRect().top + win.pageYOffset - 170;
        win.scrollTo({ top: yTo, behavior: "smooth" });
      }
      t.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    });
    if (input) input.addEventListener("input", render);
    render();
    /* enlaces profundos: #carta-shishas, etc. */
    $$('a[href="#shishas-carta"]').forEach(function (a) { a.addEventListener("click", function () { active = "Shishas"; render(); }); });
  }

  /* ---------- Horario en vivo ---------- */
  function initOpen() {
    var els = $$("[data-open]"), texts = $$("[data-open-text]");
    if (!texts.length) return;
    function madrid() {
      try {
        var parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Madrid", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
        var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
        var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
        return { d: days[o.weekday], m: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
      } catch (e) { var n = new Date(); return { d: n.getDay(), m: n.getHours() * 60 + n.getMinutes() }; }
    }
    function closeOf(day) { return (day === 5 || day === 6) ? 180 : 150; } /* 03:00 vie-sáb, 02:30 resto */
    function fmt(m) { var h = Math.floor(m / 60), mm = m % 60; return (h < 10 ? "0" : "") + h + ":" + (mm < 10 ? "0" : "") + mm; }
    function update() {
      var t = madrid(), open = false, label;
      var prev = (t.d + 6) % 7;
      if (t.m < closeOf(prev)) { open = true; label = "Abierto · hasta las " + fmt(closeOf(prev)); }
      else if (t.m >= 17 * 60) { open = true; label = "Abierto · hasta las " + fmt(closeOf(t.d)); }
      else label = "Cerrado · abrimos a las 17:00";
      texts.forEach(function (el) { el.textContent = label; });
      els.forEach(function (el) { el.classList.toggle("is-open-now", open); });
    }
    update(); setInterval(update, 60000);
  }

  /* ---------- Diálogos ---------- */
  function dlg(name) { return $('dialog[data-dlg="' + name + '"]'); }
  function openDlg(name) {
    var d = dlg(name); if (!d) return;
    if (d.showModal) { if (!d.open) d.showModal(); } else d.setAttribute("open", "");
  }
  function closeDlg(d) { if (d.close) d.close(); else d.removeAttribute("open"); }
  function initDialogs() {
    $$("dialog[data-dlg]").forEach(function (d) {
      d.addEventListener("click", function (e) {
        if (e.target === d || e.target.closest("[data-dlg-close]")) closeDlg(d);
      });
    });
    doc.addEventListener("click", function (e) {
      var r = e.target.closest("[data-reserve]");
      if (r) { e.preventDefault(); if (dlg("reserve")) openDlg("reserve"); else location.href = "index.html#reservar"; }
    });
    var res = dlg("reserve");
    if (res) $$("a", res).forEach(function (a) { a.addEventListener("click", function () { closeDlg(res); }); });
  }

  /* ---------- Cookies y consentimiento ---------- */
  var KEY = "m7_consent", CONSENT_V = 1, MAX_AGE = 365 * 24 * 3600 * 1000;
  var consent = null, consentFns = [];
  function readConsent() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY));
      if (c && c.v === CONSENT_V && Date.now() - c.t < MAX_AGE) return c;
    } catch (e) {}
    return null;
  }
  function saveConsent(external) {
    consent = { v: CONSENT_V, t: Date.now(), external: !!external };
    try { localStorage.setItem(KEY, JSON.stringify(consent)); } catch (e) {}
    consentFns.forEach(function (f) { f(consent); });
  }
  win.M7Consent = {
    get: function () { return consent; },
    allows: function (k) { return !!(consent && consent[k]); },
    onChange: function (f) { consentFns.push(f); }
  };
  function initCookies() {
    var banner = $("[data-ck]"), d = dlg("cookies"), opt = $('[data-ck-opt="external"]');
    consent = readConsent();
    function hideBanner() { if (banner) banner.classList.remove("is-on"); }
    function showBanner() { if (banner) banner.classList.add("is-on"); }
    if (!consent) {
      if (root.classList.contains("is-loaded")) setTimeout(showBanner, 900);
      else win.addEventListener("m7:ready", function () { setTimeout(showBanner, 1400); }, { once: true });
      setTimeout(showBanner, 5200);
    }
    doc.addEventListener("click", function (e) {
      if (e.target.closest("[data-ck-accept]")) { saveConsent(true); hideBanner(); if (d && d.open) closeDlg(d); }
      else if (e.target.closest("[data-ck-reject]")) { saveConsent(false); hideBanner(); if (d && d.open) closeDlg(d); }
      else if (e.target.closest("[data-ck-save]")) { saveConsent(opt && opt.checked); hideBanner(); if (d && d.open) closeDlg(d); }
      else if (e.target.closest("[data-cookie-open]")) { if (opt) opt.checked = !!(consent && consent.external); hideBanner(); openDlg("cookies"); }
    });
    if (d) d.addEventListener("close", function () { if (!consent) showBanner(); });
  }

  /* ---------- Mapas (solo con consentimiento) ---------- */
  function initMaps() {
    var maps = $$("[data-map]"); if (!maps.length) return;
    function fill(m) {
      var box = m.firstElementChild;
      if (win.M7Consent.allows("external")) {
        if (box.querySelector("iframe")) return;
        box.innerHTML = '<iframe title="' + m.getAttribute("data-map-title") + '" src="' + m.getAttribute("data-map") + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
      } else {
        box.innerHTML = '<div class="map__ask"><p><b>El mapa es de Google Maps.</b> Para mostrarlo aquí Google instala sus cookies. Puedes aceptarlo o abrirlo en una pestaña nueva con «Cómo llegar».</p><button class="btn btn--gold btn--sm" type="button" data-map-accept>Aceptar y ver el mapa</button></div>';
      }
    }
    $$("[data-map-toggle]").forEach(function (b) {
      var m = doc.getElementById(b.getAttribute("data-map-toggle")), label = $("span", b);
      b.addEventListener("click", function () {
        var open = !m.classList.contains("is-open");
        if (open) fill(m);
        m.classList.toggle("is-open", open);
        b.setAttribute("aria-expanded", open ? "true" : "false");
        if (label) label.textContent = open ? "Ocultar mapa" : "Ver mapa";
      });
    });
    doc.addEventListener("click", function (e) {
      if (e.target.closest("[data-map-accept]")) { saveConsent(true); var bn = $("[data-ck]"); if (bn) bn.classList.remove("is-on"); }
    });
    win.M7Consent.onChange(function () { maps.forEach(function (m) { if (m.classList.contains("is-open")) fill(m); else m.firstElementChild.innerHTML = ""; }); });
  }

  /* ---------- Galería ampliada ---------- */
  function initLightbox() {
    var lb = $("[data-lb]"); if (!lb) return;
    var items = $$("[data-lb-src]"), img = $("[data-lb-img]", lb), cap = $("[data-lb-cap]", lb), i = 0, lastFocus = null;
    function show(k) {
      i = (k + items.length) % items.length;
      img.src = items[i].getAttribute("data-lb-src");
      img.alt = items[i].getAttribute("data-lb-cap") || "";
      cap.textContent = (i + 1) + " / " + items.length + " · " + (items[i].getAttribute("data-lb-cap") || "");
    }
    function open(k) { lastFocus = doc.activeElement; show(k); lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false"); doc.body.style.overflow = "hidden"; $("[data-lb-close]", lb).focus(); }
    function close() { lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); doc.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }
    items.forEach(function (b, k) { b.addEventListener("click", function () { open(k); }); });
    lb.addEventListener("click", function (e) {
      if (e.target.closest("[data-lb-prev]")) show(i - 1);
      else if (e.target.closest("[data-lb-next]")) show(i + 1);
      else if (e.target === lb || e.target.closest("[data-lb-close]")) close();
    });
    doc.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") show(i - 1); else if (e.key === "ArrowRight") show(i + 1);
    });
    var x0 = null;
    lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1));
    });
  }

  /* ---------- Cursor, botones magnéticos y brillo ---------- */
  function initCursor() {
    var c = $("[data-cursor]"); if (!c || !fine) return;
    var x = 0, y = 0, rx = 0, ry = 0, first = false;
    win.addEventListener("mousemove", function (e) {
      x = e.clientX; y = e.clientY;
      if (!first) { first = true; rx = x; ry = y; c.classList.add("is-ready"); loop(); }
    }, { passive: true });
    function loop() {
      rx += (x - rx) * 0.2; ry += (y - ry) * 0.2;
      c.style.transform = "translate3d(" + rx.toFixed(1) + "px," + ry.toFixed(1) + "px,0)";
      requestAnimationFrame(loop);
    }
    doc.addEventListener("mouseover", function (e) {
      var t = e.target;
      c.classList.toggle("is-view", !!t.closest("[data-lb-src]"));
      c.classList.toggle("is-link", !t.closest("[data-lb-src]") && !!t.closest("a,button,summary,.panel,input,label"));
    });
    doc.addEventListener("mouseleave", function () { c.classList.remove("is-ready"); first = false; });
  }
  function initMagnetic() {
    if (!fine) return;
    $$("[data-magnetic]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.transform = "translate(" + ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + "px," + ((e.clientY - r.top - r.height / 2) * 0.28).toFixed(1) + "px)";
      });
      el.addEventListener("mouseout", function (e) { if (!el.contains(e.relatedTarget)) el.style.transform = ""; });
    });
    $$("[data-glow]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - r.left) + "px"); el.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* ---------- FAQ: uno abierto cada vez (navegadores sin name="") ---------- */
  function initFaq() {
    var qs = $$(".qa");
    qs.forEach(function (q) {
      q.addEventListener("toggle", function () { if (q.open) qs.forEach(function (o) { if (o !== q) o.open = false; }); });
    });
  }

  function boot() {
    safe(initChars, "chars");
    safe(initSplash, "splash");
    safe(initReveal, "reveal");
    safe(initNav, "nav");
    safe(initChrome, "chrome");
    safe(initVideos, "videos");
    safe(initParallax, "parallax");
    safe(initWords, "words");
    safe(initCount, "count");
    safe(initPanels, "panels");
    safe(initRail, "rail");
    safe(initShishas, "shishas");
    safe(initMenu, "menu");
    safe(initOpen, "open");
    safe(initDialogs, "dialogs");
    safe(initCookies, "cookies");
    safe(initMaps, "maps");
    safe(initLightbox, "lightbox");
    safe(initCursor, "cursor");
    safe(initMagnetic, "magnetic");
    safe(initFaq, "faq");
    runScroll();
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot); else boot();
})();
