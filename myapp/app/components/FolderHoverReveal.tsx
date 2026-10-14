import React, { useState } from "react";
import { motion } from "framer-motion";

 

interface FileConfig {
  id: string;
  title: string;
  meta: string;
  href: string;
  restX: number;
  restY: number;
  rotate: number;
  delay: number;
}


// Only two files now, bigger cards, gently fanned.

const FILES: FileConfig[] = [
  {
    id: "resume",
    title: "Resume.pdf",
    meta: "Updated Oct 2026",
    href: "/resume.pdf",
    restX: -46,
    restY: -168,
    rotate: -7,
    delay: 0,
  },
  {
    id: "portfolio",
    title: "Portfolio.pdf",
    meta: "Case studies",
    href: "/resume.pdf",
    restX: 46,
    restY: -168,
    rotate: 7,
    delay: 0.06,
  },
];

 

const openSpring = { type: "spring" as const, stiffness: 320, damping: 15, mass: 0.85 };
const closeSpring = { type: "spring" as const, stiffness: 420, damping: 23, mass: 0.7 };
const lidSpring = { type: "spring" as const, stiffness: 220, damping: 19, mass: 1 };

export default function GlassyFolder() {
  const [open, setOpen] = useState(false);

  return (
    <div
className="min-h-[40vh] md:min-h-[70vh] w-full flex items-center justify-center"
    >
      <div
        role="button"
        tabIndex={0}
        aria-pressed={open}
        aria-label="Open folder to reveal files"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "relative",
          width: 300,
          height: 260,
          cursor: "pointer",
          outline: "none",
          perspective: 1000,
        }}
      >
        {/* ---------------------------------------------------------- */}
        {/* BACK PANEL — sits behind everything. Its gradient bottoms   */}
        {/* out at the same tone the front glass bottoms out at, plus   */}
        {/* an inset fade, so if it bleeds through the blur it blends   */}
        {/* into shadow instead of showing as a mismatched seam.        */}
        {/* ---------------------------------------------------------- */}
         {/* The tab / grip on top */}
  
        <div
          style={{
            position: "absolute",
            left: 22,
            right: 22,
            top: 52,
            height: 186,
            borderRadius: "16px 16px 6px 6px",
            background: "linear-gradient(180deg, #8FD3FE 0%, #5CB6F5 40%, #3B9AE0 70%, #2678BE 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -50px 60px -20px rgba(15,70,120,0.85)",
            zIndex: 5,
            
          }}
        />

        {/* ---------------------------------------------------------- */}
        {/* FILES — mounted once, always at least partly visible;       */}
        {/* sit behind the glass front (blurred through it) when        */}
        {/* closed, then rise clear of it, sharp, when open. z-index    */}
        {/* is CONSTANT (see note above) — no jump, no glitch.          */}
        {/* ---------------------------------------------------------- */}
        <div style={{ position: "absolute", left: "50%", bottom: 118, width: 0, height: 0 }}>
          {FILES.map((f) => (
          <motion.a
  key={f.id}
  href={f.href}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={`Open ${f.title} in a new tab`}
  initial={false}
  animate={
    open
      ? {
          x: f.restX,
          y: f.restY,
          rotate: f.rotate,
          scale: 1,
          opacity: 1,
        }
      : {
          x: 0,
          y: -14,
          rotate: 0,
          scale: 0.86,
          opacity: 0.92,
        }
  }
  transition={
    open
      ? { ...openSpring, delay: f.delay }
      : { ...closeSpring, delay: 0 }
  }
  style={{
    position: "absolute",
    width: 190,
    height: 192,
    marginLeft: -95,
    marginTop: -92,
    borderRadius: 13,
    background:
      "linear-gradient(165deg, #ffffff 0%, #f1f3f8 60%, #e6e9f2 100%)",
    boxShadow: "0 5px 10px rgba(1, 3, 2, 0.2)",
    transformOrigin: "50% 100%",
    zIndex: 15,
    willChange: "transform, opacity",
    padding: "20px 16px",
    boxSizing: "border-box",
    pointerEvents: "auto",
    display: "block",
    textDecoration: "none",
    cursor: "pointer",
    color: "inherit",
  }}
>
              <div style={{ width: "70%", height: 9, borderRadius: 4, background: "linear-gradient(90deg,#c3c9d6,#d7dbe4)", marginBottom: 12 }} />
              <div style={{ width: "88%", height: 5, borderRadius: 2, background: "#dde1e9", marginBottom: 8 }} />
              <div style={{ width: "78%", height: 5, borderRadius: 2, background: "#dde1e9", marginBottom: 8 }} />
              <div style={{ width: "83%", height: 5, borderRadius: 2, background: "#dde1e9", marginBottom: 8 }} />
              <div style={{ width: "60%", height: 5, borderRadius: 2, background: "#dde1e9" }} />
              <div style={{ position: "absolute", bottom: 14, left: 16, right: 16 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#4b5468",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {f.title}
                </div>
                <div style={{ fontSize: 9, color: "#9aa1b0", marginTop: 2 }}>{f.meta}</div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* ---------------------------------------------------------- */}
        {/* FOLDER FRONT — frosted glass, hinges at the BOTTOM and       */}
        {/* swings forward/down (toward the viewer) like a real cover   */}
        {/* ---------------------------------------------------------- */}
        <motion.div
          initial={false}
          animate={{
            rotateX: open ? -30 : 0,
            y: open ? 2 : 0,
            z: open ? 40 : 0,
          }}
          transition={lidSpring}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 176,
            borderRadius: 22,
            // hard, mostly-opaque sky-blue glass: masks the back panel
            // completely, but is still just translucent enough (+ blur)
            // to let the files ghost through as soft shapes
            background: "linear-gradient(165deg, rgba(150,212,255,0.96) 0%, rgba(88,178,244,0.93) 45%, rgba(38,120,190,0.97) 100%)",
            backdropFilter: "blur(10px) saturate(160%)",
            WebkitBackdropFilter: "blur(10px) saturate(160%)",
            border: "1px solid rgba(255,255,255,0.4)",
            // boxShadow: "0 2px rgba(10, 60, 110, 0.4), inset 0 1px 0 rgba(255,255,255,0.4)",
            transformOrigin: "50% 100%",
            transformStyle: "preserve-3d",
            zIndex: 20,
            
             
          }}
        />
      </div>

       
    </div>
  );
}