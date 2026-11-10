#!/usr/bin/env python3
"""Monta index.html y las páginas legales a partir de tools/index.src.html.
Uso: python3 tools/build.py   (desde la raíz del repo)
Solo hace falta volver a ejecutarlo si cambias la plantilla, los cócteles
destacados, la galería o los textos legales. La carta se edita en menu.js.
"""
import json, os, re, subprocess, datetime
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
V = datetime.date.today().strftime("%Y%m%d")

menu = json.loads(subprocess.check_output(
    ["node", "-e", "global.window={};require('./menu.js');process.stdout.write(JSON.stringify(window.M7_MENU))"]))

def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

# ---------- Cócteles destacados ----------
DRINKS = [
    ("coc-daiquiri-fresa", "Daiquiri Fresa", "10,00€", "Ron, fresa, jugo de limón y licor de naranja, bien frío."),
    ("coc-espresso-martini", "Expresso Martini", "8,50€", "Café, almíbar, vodka y licor de café."),
    ("coc-margarita", "Margarita", "8,50€", "Jugo de limón, almíbar, tequila y licor de naranja."),
    ("coc-pina-colada", "Piña Colada", "9,00€", "Piña, leche condensada, ron blanco, malibú y sirope de coco."),
    ("coc-cosmopolitan", "Cosmopolitan", "10,00€", "Lima, licor de mora y frambuesa, fresa, vodka y naranja."),
    ("coc-daiquiri-mango", "Daiquiri Mango", "10,00€", "Ron, mango, jugo de limón y licor de naranja."),
    ("coc-crema", "Baby 43", "8,00€", "Licor 43, licor de café, Baileys y leche."),
]
drinks = "\n".join(
    f'''      <article class="drink">
        <img src="assets/img/{f}.webp" alt="Cóctel {esc(n)} de M7 Lounge" loading="lazy">
        <span class="drink__n">{i+1:02d}</span><span class="drink__p">{p}</span>
        <div class="drink__b"><h3 class="drink__t">{esc(n)}</h3><p class="drink__d">{esc(d)}</p></div>
      </article>''' for i, (f, n, p, d) in enumerate(DRINKS))

# ---------- Shishas (sale de menu.js) ----------
SH_IMG = ["shisha-corona", "shisha-cristal", "shisha-pareja", "shisha-campana", "shisha-mastil"]
SH_TXT = {
    "Afrutado": "Fruta madura, hielo y mezclas tropicales. La familia más pedida.",
    "Cítrico": "Pomelo, limón y mandarina: frescas, vivas y con un punto ácido.",
    "Dulces": "Tarta de queso, galleta, coco. Postre en forma de humo.",
    "Mentoladas": "Menta dulce y fruta. Limpias, frías y fáciles de fumar.",
    "Tabaco Negro": "Más cuerpo y más intensidad, para quien ya sabe lo que busca.",
}
ON = ' class="on"'
sh_imgs = "\n".join(
    f'        <img src="assets/img/{f}.webp" alt="" loading="lazy"{ON if i == 0 else ""}>' for i, f in enumerate(SH_IMG))
sh = []
for i, g in enumerate(menu["Shishas"]):
    chips = "".join(f'<li class="chip">{esc(it["n"])}<small>{esc(it.get("d", ""))}</small></li>' for it in g["items"])
    note = f'<p class="grp__note">{esc(g["note"])}</p>' if g.get("note") else ""
    sh.append(f'''        <article class="flav{" on" if i == 0 else ""}" data-flav>
          <figure><img src="assets/img/{SH_IMG[i]}.webp" alt="Cachimba de M7 Lounge" loading="lazy"></figure>
          <div class="flav__h"><h3 class="flav__t">{esc(g["title"])}</h3><span class="flav__p">{esc(g.get("price", ""))}</span></div>
          <p class="flav__d">{SH_TXT.get(g["title"], "")}</p>
          <ul class="chips">{chips}</ul>{note}
        </article>''')

# ---------- Galería ----------
GAL = [
    ("tgn-sala", "Tarragona · La sala"), ("amb-vertido", "La barra en marcha"), ("real-0", "Noche de luna"),
    ("sal-pared-verde", "Salou · La terraza"), ("shisha-corona-detalle", "La de corona"), ("tgn-barra", "Tarragona · La barra"),
    ("VIDEO", ""), ("amb-brindis", "Brindis"), ("sal-barra", "Salou · La barra"), ("real-2", "Oh Baby"),
    ("tgn-vinilos", "Pared de vinilos"), ("amb-mojito", "Mojito clásico"), ("sal-lampara", "Salou · Detalle"),
    ("real-3", "Sin prisa"), ("tgn-luna", "Tarragona · La luna"), ("sal-mojitos", "Recién hechos"),
    ("amb-goodtime", "Good Time"), ("sal-neon", "Salou · Neón"),
]
gal = []
for f, cap in GAL:
    if f == "VIDEO":
        gal.append('      <div class="gal__i gal__i--video"><video data-autoplay muted loop playsinline preload="none" poster="assets/img/video-poster.webp" data-src="assets/video/ambiente.mp4" aria-label="Vídeo del ambiente en M7 Lounge"></video></div>')
    else:
        gal.append(f'      <button class="gal__i" type="button" data-lb-src="assets/img/{f}.webp" data-lb-cap="{esc(cap)}"><img src="assets/img/{f}.webp" alt="{esc(cap)} — M7 Lounge" loading="lazy"><span>{esc(cap)}</span></button>')

# ---------- Cookies (común a todas las páginas) ----------
COOKIES = '''<!-- Cookies -->
<div class="ck" data-ck role="dialog" aria-live="polite" aria-labelledby="ck-t" aria-describedby="ck-d">
  <h2 id="ck-t">Cookies, las justas</h2>
  <p id="ck-d">Usamos almacenamiento técnico para que la web funcione y, solo si lo aceptas, cargamos los mapas de Google, que instalan sus propias cookies. Más detalles en la <a href="cookies.html">política de cookies</a>.</p>
  <div class="ck__b">
    <button class="btn btn--eq" type="button" data-ck-reject>Rechazar</button>
    <button class="btn btn--eq" type="button" data-ck-accept>Aceptar</button>
    <button class="btn btn--ghost" type="button" data-cookie-open>Configurar</button>
  </div>
</div>
<dialog data-dlg="cookies" aria-labelledby="dlg-ck-t">
  <div class="dlg">
    <button class="dlg__x" type="button" data-dlg-close aria-label="Cerrar"><svg><use href="#i-x"/></svg></button>
    <p class="eyebrow">Privacidad</p>
    <h2 id="dlg-ck-t">Tus preferencias</h2>
    <p>Tú decides. Puedes cambiarlo cuando quieras desde el enlace «Configurar cookies» del pie de página.</p>
    <div class="opt"><b>Necesarias</b><span class="sw"><input type="checkbox" checked disabled aria-label="Cookies necesarias, siempre activas"><i></i></span><p>Guardan tu elección sobre las cookies. Sin ellas la web no puede recordar lo que has decidido. Siempre activas.</p></div>
    <div class="opt"><b>Contenido externo</b><span class="sw"><input type="checkbox" data-ck-opt="external" aria-label="Contenido externo: mapas de Google"><i></i></span><p>Mapas de Google Maps integrados en la sección de locales. Google puede instalar cookies y recibir tu dirección IP.</p></div>
    <div class="dlg__b">
      <button class="btn btn--ghost" type="button" data-ck-reject>Rechazar todo</button>
      <button class="btn btn--ghost" type="button" data-ck-save>Guardar selección</button>
      <button class="btn btn--gold" type="button" data-ck-accept>Aceptar todo</button>
    </div>
  </div>
</dialog>'''

def add_dims(html):
    def rep(m):
        tag = m.group(0)
        if " width=" in tag:
            return tag
        src = re.search(r'src="([^"]+)"', tag)
        if not src or not os.path.exists(src.group(1)):
            return tag
        w, h = Image.open(src.group(1)).size
        return tag[:-1] + f' width="{w}" height="{h}">'
    return re.sub(r"<img\b[^>]*>", rep, html)

src = open("tools/index.src.html", encoding="utf-8").read()
out = (src.replace("{{DRINKS}}", drinks).replace("{{SH_IMGS}}", sh_imgs).replace("{{SHISHAS}}", "\n".join(sh))
          .replace("{{GALLERY}}", "\n".join(gal)).replace("{{COOKIES}}", COOKIES))
out = re.sub(r"\?v=\d{8}", "?v=" + V, out)
open("index.html", "w", encoding="utf-8").write(add_dims(out))

# ---------- Páginas legales ----------
head = src.split("<title>")[0]
sprite = re.search(r'<svg width="0".*?</svg>', src, re.S).group(0)
foot_base = re.search(r'<div class="foot__base">.*?</div>\n', src, re.S).group(0)

def page(fname, title, desc, body):
    html = f'''{head}<title>{title} · M7 Lounge</title>
<meta name="description" content="{desc}">
<meta name="robots" content="noindex,follow">
<meta name="theme-color" content="#0a0806">
<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
<script>document.documentElement.classList.add('js','is-loaded')</script>
<link rel="stylesheet" href="styles.css?v={V}">
</head>
<body>
<a class="skip" href="#main">Saltar al contenido</a>
{sprite}
<div class="grain" aria-hidden="true"></div>
<header class="nav is-solid">
  <a class="brand" href="index.html" aria-label="M7 Lounge, inicio"><span class="neon">M7</span><small>Lounge</small></a>
  <div class="nav__cta"><a class="btn btn--ghost btn--sm" href="index.html">Volver a la web</a></div>
</header>
<main id="main" class="legal"><div class="wrap">
{body}
</div></main>
<footer class="foot" style="padding-top:0;border-top:0"><div class="wrap">{foot_base}</div></footer>
{COOKIES}
<script defer src="main.js?v={V}"></script>
</body>
</html>
'''
    open(fname, "w", encoding="utf-8").write(html)

for f in os.listdir("tools/legal"):
    if f.endswith(".html"):
        raw = open(os.path.join("tools/legal", f), encoding="utf-8").read()
        meta, body = raw.split("\n---\n", 1)
        title, desc = meta.strip().split("\n")[:2]
        page(f, title, desc, body.replace("{{HOY}}", datetime.date.today().strftime("%d/%m/%Y")))

print("OK · index.html + páginas legales · v=" + V)
