"use client";

import { useEffect, useRef } from "react";

export type Logo = { title: string; path: string };

// ASCII background: sine noise everywhere, denser characters inside the current logo.
const RAMP = " .:-=+*#%@";
const FPS = 30;
const HOLD = 4200; // ms
const MORPH = 1400; // ms
const LENS = 110; // px
const TONES = ["--glyph-1", "--glyph-2", "--glyph-3", "--glyph-4", "--accent"];

const ease = (x: number) => x * x * (3 - 2 * x);
const crisp = (m: number) =>
  m <= 0.15 ? 0 : m >= 0.55 ? 1 : ease((m - 0.15) / 0.4);

export const LogoField = ({ logos }: { logos: Logo[] }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || logos.length === 0) return;

    const root = getComputedStyle(document.documentElement);
    const tones = TONES.map((v) => root.getPropertyValue(v).trim());
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

    let w = 0;
    let h = 0;
    // character cell; smaller on phones so the logo keeps its shape
    let cw = 6;
    let ch = 12;
    let glyphFont = "";
    let cols = 0;
    let rows = 0;
    let masks: Float32Array[] = [];
    let px = -1e4;
    let py = -1e4;
    let raf = 0;
    let last = 0;
    let onScreen = true;
    const t0 = performance.now();

    // random order on every load
    const order = logos.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    // Simple Icons pad their 24x24 viewBox differently; measure the real bounds so all logos render the same size.
    const probe = document.createElement("canvas");
    probe.width = probe.height = 240;
    const p = probe.getContext("2d", { willReadFrequently: true })!;
    const bounds = logos.map((logo) => {
      p.setTransform(1, 0, 0, 1, 0, 0);
      p.clearRect(0, 0, 240, 240);
      p.setTransform(10, 0, 0, 10, 0, 0);
      p.fill(new Path2D(logo.path));
      const a = p.getImageData(0, 0, 240, 240).data;
      let x0 = 240,
        y0 = 240,
        x1 = 0,
        y1 = 0;
      for (let y = 0; y < 240; y++)
        for (let x = 0; x < 240; x++)
          if (a[(y * 240 + x) * 4 + 3] > 64) {
            x0 = Math.min(x0, x);
            x1 = Math.max(x1, x);
            y0 = Math.min(y0, y);
            y1 = Math.max(y1, y);
          }
      return x1 < x0
        ? { x: 0, y: 0, w: 24, h: 24 }
        : {
            x: x0 / 10,
            y: y0 / 10,
            w: (x1 - x0 + 1) / 10,
            h: (y1 - y0 + 1) / 10,
          };
    });

    // 1 mask pixel = 1 character cell
    const buildMasks = () => {
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const o = off.getContext("2d", { willReadFrequently: true })!;

      const c = canvas.getBoundingClientRect();
      const above = canvas.parentElement
        ?.querySelector("[data-field-above]")
        ?.getBoundingClientRect();
      const below = canvas.parentElement
        ?.querySelector("[data-field-below]")
        ?.getBoundingClientRect();
      const bandTop = above ? above.bottom - c.top + 24 : h * 0.4;
      const bandBottom = below ? below.top - c.top - 24 : h * 0.85;
      const narrow = w < 640;
      const size = Math.max(
        80,
        Math.min(bandBottom - bandTop, w * (narrow ? 0.55 : 0.42), 220)
      );
      const cy = (bandTop + bandBottom) / 2;
      const maxW = w * (narrow ? 0.9 : 0.8);
      const maxH = Math.max(80, bandBottom - bandTop);

      masks = logos.map((logo, n) => {
        const b = bounds[n];
        // same area for every logo, so wide ones (Go) don't look smaller than square ones
        // 0.8: leave breathing room around the logo
        const s =
          0.8 * Math.min(size / Math.sqrt(b.w * b.h), maxW / b.w, maxH / b.h);
        const half = (b.w * s) / 2;
        const cx = narrow ? w / 2 : Math.max(half + 16, Math.min(w * 0.7, w - half - 16));
        const ox = cx - (b.x + b.w / 2) * s;
        const oy = cy - (b.y + b.h / 2) * s;
        o.setTransform(1, 0, 0, 1, 0, 0);
        o.clearRect(0, 0, cols, rows);
        o.setTransform(s / cw, 0, 0, s / ch, ox / cw, oy / ch);
        const path = new Path2D(logo.path);
        o.fill(path);
        // thicken thin strokes so they don't break up at character resolution
        o.lineWidth = (cw / s) * 0.6;
        o.stroke(path);
        const data = o.getImageData(0, 0, cols, rows).data;
        const m = new Float32Array(cols * rows);
        for (let i = 0; i < m.length; i++) m[i] = crisp(data[i * 4 + 3] / 255);
        return m;
      });
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      if (!w || !h) return false;
      const narrow = w < 640;
      cw = narrow ? 5 : 6;
      ch = narrow ? 10 : 12;
      glyphFont = `600 ${narrow ? 8.5 : 10}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      cols = Math.ceil(w / cw);
      rows = Math.ceil(h / ch);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildMasks();
      return true;
    };

    const draw = (now: number) => {
      const ms = now - t0;
      const t = ms / 1000;
      const k = Math.floor(ms / (HOLD + MORPH));
      const phase = ms % (HOLD + MORPH);
      const a = masks[order[k % order.length]];
      const b = masks[order[(k + 1) % order.length]];
      const mix = phase < HOLD ? 0 : ease((phase - HOLD) / MORPH);
      const buckets: number[][] = TONES.map(() => []);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const noise =
            (Math.sin(x * 0.21 + t * 0.9) +
              Math.sin(y * 0.33 - t * 0.6) +
              Math.sin((x + y) * 0.11 + t * 0.4)) /
            3;
          let d = 0.15 + noise * 0.13;
          const m = a[i] * (1 - mix) + b[i] * mix;
          if (m > 0)
            d += m * (0.8 + 0.07 * Math.sin(t * 2 + x * 0.3 + y * 0.2));
          const dx = x * cw + cw / 2 - px;
          const dy = y * ch + ch / 2 - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LENS) d += (1 - dist / LENS) ** 2 * 0.55;
          const c = Math.min(RAMP.length - 1, Math.floor(d * RAMP.length));
          if (c <= 0) continue;
          const tone =
            d > 0.94 ? 4 : d > 0.72 ? 3 : d > 0.48 ? 2 : d > 0.28 ? 1 : 0;
          buckets[tone].push(x, y, c);
        }
      }

      ctx.clearRect(0, 0, w, h);
      ctx.font = glyphFont;
      ctx.textBaseline = "top";
      buckets.forEach((cells, tone) => {
        ctx.fillStyle = tones[tone];
        for (let j = 0; j < cells.length; j += 3)
          ctx.fillText(RAMP[cells[j + 2]], cells[j] * cw, cells[j + 1] * ch);
      });
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 1000 / FPS) return;
      last = now;
      draw(now);
    };
    const play = () => {
      if (!raf && !still && onScreen && !document.hidden && w)
        raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
    };
    const onLeave = () => {
      px = py = -1e4;
    };
    const onVisibility = () => (document.hidden ? pause() : play());

    const ro = new ResizeObserver(() => {
      if (resize()) {
        draw(t0);
        play();
      } else pause();
    });
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen) play();
      else pause();
    });
    ro.observe(canvas);
    io.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    if (!still && canHover) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [logos]);

  return <canvas ref={ref} aria-hidden className="logo-field" />;
};
