// ===== Liquid Glass refraction (progressive enhancement) =====
// Chromium can run SVG filters inside backdrop-filter. For each [data-refract]
// element we bake a displacement map shaped like the element's rounded rect:
// pixels inside the bezel are pushed along the edge normal, so the wallpaper
// bends at the rim the way it does through Apple's Liquid Glass.
// Other browsers keep the plain blur material from glass.css.
(function () {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const BEZEL = 16;        // px of rim that bends light
  const STRENGTH = 56;     // feDisplacementMap scale
  let defs = null;
  let seq = 0;
  const observed = new Map();

  function supportsRefraction() {
    const brands = navigator.userAgentData?.brands || [];
    return brands.some((b) => /Chromium/i.test(b.brand));
  }

  function ensureDefs() {
    if (defs) return defs;
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.position = 'absolute';
    defs = document.createElementNS(SVG_NS, 'defs');
    svg.appendChild(defs);
    document.body.appendChild(svg);
    return defs;
  }

  // Signed distance to a rounded rect centred at the origin, plus its outward normal.
  function roundedRectField(px, py, hw, hh, r) {
    const qx = Math.abs(px) - (hw - r);
    const qy = Math.abs(py) - (hh - r);
    let nx;
    let ny;
    let dist;
    if (qx > 0 && qy > 0) {
      const len = Math.hypot(qx, qy) || 1;
      dist = len - r;
      nx = qx / len;
      ny = qy / len;
    } else if (qx > qy) {
      dist = qx - r;
      nx = 1;
      ny = 0;
    } else {
      dist = qy - r;
      nx = 0;
      ny = 1;
    }
    return { dist, nx: nx * Math.sign(px || 1), ny: ny * Math.sign(py || 1) };
  }

  function buildMap(w, h, radius) {
    const scale = 0.5; // half resolution is plenty; feImage stretches it back
    const cw = Math.max(1, Math.round(w * scale));
    const ch = Math.max(1, Math.round(h * scale));
    const canvas = document.createElement('canvas');
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext('2d');
    const img = ctx.createImageData(cw, ch);
    const hw = w / 2;
    const hh = h / 2;
    const r = Math.min(radius, hw, hh);
    for (let y = 0; y < ch; y++) {
      for (let x = 0; x < cw; x++) {
        const px = (x + 0.5) / scale - hw;
        const py = (y + 0.5) / scale - hh;
        const f = roundedRectField(px, py, hw, hh, r);
        const inside = -f.dist;
        let m = 0;
        if (inside >= 0 && inside < BEZEL) {
          const t = 1 - inside / BEZEL;
          m = t * t; // strongest at the rim, fading to flat glass
        }
        const i = (y * cw + x) * 4;
        // Sample toward the centre: the rim magnifies what lies just inside it.
        img.data[i] = 128 - f.nx * m * 127;
        img.data[i + 1] = 128 - f.ny * m * 127;
        img.data[i + 2] = 128;
        img.data[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    return canvas.toDataURL();
  }

  function applyTo(el) {
    // Layout size, not getBoundingClientRect(): the latter is scaled by CSS
    // zoom (the app zooms <html>), which would leave part of the element unfiltered.
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (!w || !h) return;
    const css = getComputedStyle(el);
    const radius = parseFloat(css.borderTopLeftRadius) || 0;
    const blur = parseFloat(css.getPropertyValue('--glass-refract-blur')) || 10;
    const saturate = parseFloat(css.getPropertyValue('--glass-saturate')) || 1.8;
    let entry = observed.get(el);
    if (!entry) {
      const id = 'lg-refract-' + (++seq);
      const filter = document.createElementNS(SVG_NS, 'filter');
      filter.setAttribute('id', id);
      filter.setAttribute('filterUnits', 'userSpaceOnUse');
      filter.setAttribute('primitiveUnits', 'userSpaceOnUse');
      filter.setAttribute('color-interpolation-filters', 'sRGB');
      // Chrome ignores url() when it is chained with blur()/saturate() in
      // backdrop-filter, so the whole material lives inside the SVG filter.
      filter.innerHTML =
        '<feGaussianBlur in="SourceGraphic" edgeMode="duplicate" result="blur"/>' +
        '<feColorMatrix in="blur" type="saturate" result="vivid"/>' +
        '<feImage result="map" preserveAspectRatio="none"/>' +
        '<feDisplacementMap in="vivid" in2="map" xChannelSelector="R" yChannelSelector="G"/>';
      ensureDefs().appendChild(filter);
      entry = { id, filter, key: '' };
      observed.set(el, entry);
    }
    const key = [w, h, radius, blur, saturate].join('|');
    if (entry.key === key) return;
    entry.key = key;
    const { filter } = entry;
    filter.setAttribute('x', '0');
    filter.setAttribute('y', '0');
    filter.setAttribute('width', String(w));
    filter.setAttribute('height', String(h));
    const feImage = filter.querySelector('feImage');
    feImage.setAttribute('href', buildMap(w, h, radius));
    feImage.setAttribute('width', String(w));
    feImage.setAttribute('height', String(h));
    filter.querySelector('feGaussianBlur').setAttribute('stdDeviation', String(blur));
    filter.querySelector('feColorMatrix').setAttribute('values', String(saturate));
    filter.querySelector('feDisplacementMap').setAttribute('scale', String(STRENGTH));
    el.style.setProperty('--lg-refract', `url(#${entry.id})`);
  }

  const resizeObserver = typeof ResizeObserver === 'function'
    ? new ResizeObserver((entries) => entries.forEach((e) => applyTo(e.target)))
    : null;

  function enable() {
    if (!supportsRefraction()) return false;
    document.documentElement.classList.add('lg-refraction');
    document.querySelectorAll('[data-refract]').forEach((el) => {
      applyTo(el);
      resizeObserver?.observe(el);
    });
    return true;
  }

  function disable() {
    document.documentElement.classList.remove('lg-refraction');
  }

  window.LiquidGlass = { enable, disable, supported: supportsRefraction, refresh: (el) => applyTo(el) };
})();
