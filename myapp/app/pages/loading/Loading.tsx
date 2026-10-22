"use client";

import { useEffect, useState } from "react";

// How long the name takes to write. The website appears right after this.
const DRAW_MS = 800;

/**
 * Full-screen loader that writes "ayaan" left to right, then immediately
 * fades out to reveal the website. It does NOT wait for images.
 *
 * The writing animation only uses `transform`, which runs on the browser's
 * compositor thread, so it stays smooth even while the page is busy
 * hydrating.
 *
 * Usage (app/layout.tsx):
 *   <body>
 *     <Loading />
 *     {children}
 *   </body>
 */
export default function Loading() {
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(false);

  // Fallback in case the animation event never fires (e.g. reduced motion)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), DRAW_MS + 700);
    return () => clearTimeout(t);
  }, []);

  // Remove from the DOM after the fade-out finishes
  if (hidden) return null;

  return (
    <div
      onTransitionEnd={(e) => {
        // ignore transitionend events bubbling from children
        if (e.target === e.currentTarget && !loading) setHidden(true);
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-200 ${
        loading ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <style>{`
        @keyframes ayaan-reveal {
          from { transform: translate3d(-16.667%, 0, 0); }
          to   { transform: translate3d(83.333%, 0, 0); }
        }
        .ayaan-cover {
          position: absolute;
          top: -10%;
          bottom: -10%;
          left: 0;
          width: 120%;
          /* soft left edge so the writing fades in like a pen stroke */
          background: linear-gradient(to right, rgba(0,0,0,0) 0%, #000 16.667%);
          transform: translate3d(-16.667%, 0, 0);
          will-change: transform;
          animation: ayaan-reveal ${DRAW_MS}ms cubic-bezier(0.4, 0, 0.6, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .ayaan-cover { animation: none; transform: translate3d(100%, 0, 0); }
        }
      `}</style>

      <div className="relative w-44 overflow-hidden sm:w-56">
        <svg
          viewBox="0 0 420 170"
          className="block h-auto w-full"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="ayaan"
        >
          <path
            fill="none"
            stroke="#ffffff"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 20 102 C 28 98, 42 80, 58 66
               C 40 54, 16 70, 18 92 C 20 112, 50 112, 62 72
               C 64 90, 64 102, 76 102 C 86 102, 90 90, 98 80
               C 102 70, 106 64, 112 64
               C 114 84, 120 102, 132 102 C 146 102, 150 80, 152 64
               C 154 96, 154 126, 148 142 C 144 154, 126 152, 130 138 C 134 124, 152 108, 170 98
               C 180 92, 196 78, 214 66
               C 196 54, 172 70, 174 92 C 176 112, 206 112, 218 72
               C 220 90, 220 102, 232 102 C 242 102, 246 90, 254 80
               C 262 70, 270 66, 278 66
               C 260 54, 236 70, 238 92 C 240 112, 270 112, 282 72
               C 284 90, 284 102, 296 102 C 306 102, 310 90, 318 80
               C 322 68, 326 64, 332 64
               C 334 80, 334 100, 336 102 C 338 90, 340 66, 354 64 C 368 62, 370 80, 372 102 C 374 108, 384 104, 396 92"
          />
        </svg>

        {/* Black cover that slides right to reveal the name */}
        <div className="ayaan-cover" onAnimationEnd={() => setLoading(false)} />
      </div>
    </div>
  );
}