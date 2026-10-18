"use client";

import { useEffect, useRef } from "react";

/**
 * Rain that stays INSIDE its parent. Put it inside a `relative overflow-hidden`
 * element (the desktop footer) and it fills that element only.
 *
 * What makes it look natural:
 *  - three depth layers (far = short/slow/faint, near = long/fast/bright)
 *  - a wind that drifts and gusts instead of a fixed slant
 *  - drops land at different heights, so splashes feel like they're at different depths
 *  - small ripple splashes where nearer drops land
 *  - soft fade in / fade out and a faint overcast tint
 */

type Drop = {
  x: number;
  y: number;
  len: number;
  speed: number;
  width: number;
  color: string;
  landY: number;
  splashR: number; // 0 = no splash
};

type Splash = {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
};

const RAIN_RGB = "96,128,168"; // slate blue: readable on the light page and the sky

export default function RainOverlay({ active }: { active: boolean }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRef = useRef(active);
  const startRef = useRef<(() => void) | null>(null);

  // main engine
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let drops: Drop[] = [];
    const splashes: Splash[] = [];
    let raf = 0;
    let last = 0;
    let t = 0;
    let intensity = 0;

    const spawn = (d: Drop, initial: boolean) => {
      const r = Math.random();
      const z = r < 0.45 ? 0 : r < 0.82 ? 1 : 2; // far, mid, near
      const jitter = () => 0.85 + Math.random() * 0.3;

      d.len = [10, 18, 28][z] * jitter();
      d.speed = [650, 950, 1350][z] * jitter();
      d.width = [0.6, 1, 1.5][z];
      const alpha = [0.2, 0.34, 0.52][z] * jitter();
      d.color = `rgba(${RAIN_RGB},${alpha.toFixed(2)})`;

      // far drops "land" higher up, near drops lower
      d.landY = Math.min(h, h * [0.8, 0.9, 0.97][z] + Math.random() * h * 0.05);
      d.splashR = z === 0 || Math.random() < 0.35 ? 0 : [0, 5, 9][z] * jitter();

      d.x = -0.3 * h + Math.random() * (w + 0.3 * h);
      d.y = initial ? Math.random() * d.landY : -d.len - Math.random() * 120;
    };

    const resize = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;

      // hidden (e.g. mobile) or not laid out yet
      if (w === 0 || h === 0) {
        drops = [];
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      let count = Math.round((w * h) / 7000);
      count = Math.max(120, Math.min(520, count));
      if (reduced) count = Math.round(count * 0.5);

      drops = Array.from({ length: count }, () => {
        const d = {} as Drop;
        spawn(d, true);
        return d;
      });
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;

      const target = activeRef.current ? 1 : 0;
      intensity += (target - intensity) * Math.min(1, dt * 2.2);

      if (!activeRef.current && intensity < 0.01) {
        intensity = 0;
        splashes.length = 0;
        ctx.clearRect(0, 0, w, h);
        raf = 0;
        return;
      }

      // wind drifts slowly and gusts a little
      const wind = 0.16 + 0.07 * Math.sin(t * 0.35) + 0.04 * Math.sin(t * 1.1 + 2);

      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      ctx.globalAlpha = intensity;

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        d.y += d.speed * dt;
        d.x += d.speed * wind * dt;

        if (d.y >= d.landY) {
          if (d.splashR > 0 && splashes.length < 90) {
            splashes.push({ x: d.x, y: d.landY, r: 1, maxR: d.splashR, alpha: 0.4 });
          }
          spawn(d, false);
          continue;
        }

        ctx.strokeStyle = d.color;
        ctx.lineWidth = d.width;
        ctx.beginPath();
        ctx.moveTo(d.x - d.len * wind, d.y - d.len);
        ctx.lineTo(d.x, d.y);
        ctx.stroke();
      }

      // ripples where drops hit the ground
      ctx.lineWidth = 1;
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        s.r += dt * s.maxR * 3.5;
        if (s.r >= s.maxR) {
          splashes.splice(i, 1);
          continue;
        }
        const a = (1 - s.r / s.maxR) * s.alpha;
        ctx.strokeStyle = `rgba(${RAIN_RGB},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.ellipse(s.x, s.y, s.r, s.r * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    startRef.current = start;
    resize();

    // follow the size of the footer, not the window
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    if (activeRef.current) start();

    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      startRef.current = null;
    };
  }, []);

  // react to the toggle
  useEffect(() => {
    activeRef.current = active;
    if (active) startRef.current?.();
  }, [active]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="absolute inset-0 z-40 overflow-hidden pointer-events-none"
    >
      {/* faint overcast tint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(40,60,90,0.14), rgba(40,60,90,0.06))",
          opacity: active ? 1 : 0,
          transition: "opacity 1.4s ease",
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}