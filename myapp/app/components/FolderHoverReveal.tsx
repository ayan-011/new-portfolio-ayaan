import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  DESIGN SPACE                                                              */
/*  Everything below is drawn in "design pixels" on a fixed 320 x 370 stage.  */
/*  The stage is then scaled as ONE unit to fit the device, so folder, files, */
/*  shadows, fonts and animation distances all stay perfectly proportional.   */
/* -------------------------------------------------------------------------- */

const STAGE_W = 320;
const STAGE_H = 370;

const FOLDER_W = 300;
const FOLDER_H = 230;
const FRONT_H = 160;

const FILE_W = 150;
const FILE_H = 190;

/** Scale limits: tweak these to control min / max size on small / large screens. */
const MIN_SCALE = 0.65;
const MAX_SCALE = 0.9;

interface FileConfig {
  id: string;
  title: string;
  meta: string;
  href: string;
  /** closed (tucked inside) pose */
  tuckX: number;
  tuckY: number;
  tuckRotate: number;
  /** open (fanned out) pose */
  openX: number;
  openY: number;
  openRotate: number;
  delay: number;
  z: number;
}

const FILES: FileConfig[] = [
  {
    id: "resume",
    title: "Resume.pdf",
    meta: "Updated Oct 2026",
    href: "/resume.pdf",
    tuckX: -9,
    tuckY: -4,
    tuckRotate: -1.5,
    openX: -54,
    openY: -140,
    openRotate: -8,
    delay: 0,
    z: 10,
  },
  {
    id: "portfolio",
    title: "Portfolio.pdf",
    meta: "Case studies",
    href: "/resume.pdf",
    tuckX: 9,
    tuckY: -12,
    tuckRotate: 1.5,
    openX: 54,
    openY: -140,
    openRotate: 8,
    delay: 0.06,
    z: 11,
  },
];

const openSpring = { type: "spring" as const, stiffness: 260, damping: 19, mass: 0.9 };
const closeSpring = { type: "spring" as const, stiffness: 380, damping: 28, mass: 0.8 };
const lidSpring = { type: "spring" as const, stiffness: 230, damping: 22, mass: 1 };

// subtle paper/leather grain, tiled, blended over the front panel
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

/* -------------------------------------------------------------------------- */
/*  Fit-to-container hook                                                     */
/* -------------------------------------------------------------------------- */

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useFitScale() {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const byWidth = el.clientWidth / (STAGE_W * 1.45); // leave breathing room
      const byHeight = (window.innerHeight * 0.7) / STAGE_H; // never taller than the screen
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, Math.min(byWidth, byHeight)));
      setScale((prev) => (Math.abs(prev - next) < 0.005 ? prev : next));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return [ref, scale] as const;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function GlassyFolder() {
  const [open, setOpen] = useState(false);
  const [wrapRef, scale] = useFitScale();
  const reduceMotion = useReducedMotion();
  const lastPointer = useRef<string>("mouse");

  const instant = { duration: 0 };

  return (
    <div
      ref={wrapRef}
      className="w-full flex items-end justify-center py-6"
    >
      {/* sizer: takes the real, scaled space in the layout */}
      <div
        style={{
          position: "relative",
          width: STAGE_W * scale,
          height: STAGE_H * scale,
          flexShrink: 0,
        }}
      >
        {/* stage: fixed design size, scaled as one piece */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: STAGE_W,
            height: STAGE_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {/* ground shadow */}
          <motion.div
            aria-hidden
            initial={false}
            animate={{ scaleX: open ? 1.08 : 1, opacity: open ? 0.5 : 0.38 }}
            transition={reduceMotion ? instant : lidSpring}
            style={{
              position: "absolute",
              left: 30,
              right: 30,
              bottom: 4,
              height: 26,
              borderRadius: "50%",
              background: "radial-gradient(closest-side, rgba(5,25,55,0.7), rgba(5,25,55,0) 100%)",
              filter: "blur(6px)",
            }}
          />

          {/* FOLDER GROUP (interactive area) */}
          <div
            role="group"
            tabIndex={0}
            aria-expanded={open}
            aria-label="Folder with resume and portfolio files"
            onPointerDown={(e) => {
              lastPointer.current = e.pointerType;
            }}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") setOpen(true);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") setOpen(false);
            }}
            onClick={() => {
              // mouse already handled by hover; touch/pen toggles on tap
              if (lastPointer.current !== "mouse") setOpen((v) => !v);
            }}
            onFocus={() => setOpen(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
              if (e.key === " " && e.target === e.currentTarget) {
                e.preventDefault();
                setOpen((v) => !v);
              }
            }}
            style={{
              position: "absolute",
              left: (STAGE_W - FOLDER_W) / 2,
              bottom: 14,
              width: FOLDER_W,
              height: FOLDER_H,
              cursor: "pointer",
              outline: "none",
              perspective: 900,
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {/* ------------------------------------------------------ */}
            {/* BACK PANEL — tabbed silhouette, darker than the front, */}
            {/* with an inner shadow so the files read as "inside"     */}
            {/* ------------------------------------------------------ */}
            <svg
              aria-hidden
              width={FOLDER_W}
              height={FOLDER_H}
              viewBox={`0 0 ${FOLDER_W} ${FOLDER_H}`}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 5,
                overflow: "visible",
              }}
            >
              <defs>
                <linearGradient id="gf-back" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4A9BE0" />
                  <stop offset="55%" stopColor="#2F7CC6" />
                  <stop offset="100%" stopColor="#1F5C9C" />
                </linearGradient>
                <linearGradient id="gf-inner" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0A2A52" stopOpacity="0.38" />
                  <stop offset="45%" stopColor="#0A2A52" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#0A2A52" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 16 Q0 0 16 0 L88 0 Q100 0 107 10 L114 20 Q120 28 132 28 L284 28 Q300 28 300 44 L300 194 Q300 210 284 210 L16 210 Q0 210 0 194 Z"
                fill="url(#gf-back)"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1"
              />
              {/* inner cavity shade */}
              <path
                d="M0 16 Q0 0 16 0 L88 0 Q100 0 107 10 L114 20 Q120 28 132 28 L284 28 Q300 28 300 44 L300 120 L0 120 Z"
                fill="url(#gf-inner)"
              />
            </svg>

            {/* ------------------------------------------------------ */}
            {/* FILES — sit between back and front panels              */}
            {/* ------------------------------------------------------ */}
            {FILES.map((f) => (
              <motion.a
                key={f.id}
                href={f.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${f.title} in a new tab`}
                tabIndex={open ? 0 : -1}
                initial={false}
                animate={
                  open
                    ? { x: f.openX, y: f.openY, rotate: f.openRotate, scale: 1 }
                    : { x: f.tuckX, y: f.tuckY, rotate: f.tuckRotate, scale: 0.94 }
                }
                transition={
                  reduceMotion
                    ? instant
                    : open
                    ? { ...openSpring, delay: f.delay }
                    : { ...closeSpring, delay: 0 }
                }
                whileHover={open && !reduceMotion ? { y: f.openY - 8 } : undefined}
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: 0,
                  marginLeft: -FILE_W / 2,
                  width: FILE_W,
                  height: FILE_H,
                  borderRadius: 10,
                  background: "linear-gradient(170deg, #ffffff 0%, #f4f6fa 55%, #e8ecf4 100%)",
                  border: "1px solid rgba(20,40,80,0.08)",
                  boxShadow: "none",
                  transformOrigin: "50% 100%",
                  zIndex: f.z,
                  willChange: "transform",
                  padding: "18px 16px",
                  boxSizing: "border-box",
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  pointerEvents: open ? "auto" : "none",
                }}
              >
                {/* PDF badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    fontSize: 8,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    color: "#fff",
                    background: "#E5484D",
                    borderRadius: 3,
                    padding: "2px 5px",
                  }}
                >
                  PDF
                </div>

                <div style={{ width: "52%", height: 9, borderRadius: 4, background: "linear-gradient(90deg,#b9c0cf,#d3d8e3)", marginBottom: 14 }} />
                <div style={{ width: "100%", height: 5, borderRadius: 2, background: "#dde1e9", marginBottom: 8 }} />
                <div style={{ width: "88%", height: 5, borderRadius: 2, background: "#dde1e9", marginBottom: 8 }} />
                <div style={{ width: "94%", height: 5, borderRadius: 2, background: "#dde1e9", marginBottom: 8 }} />
                <div style={{ width: "62%", height: 5, borderRadius: 2, background: "#dde1e9", marginBottom: 14 }} />
                <div style={{ width: "100%", height: 5, borderRadius: 2, background: "#e6e9f0", marginBottom: 8 }} />
                <div style={{ width: "80%", height: 5, borderRadius: 2, background: "#e6e9f0" }} />

                <div style={{ position: "absolute", bottom: 12, left: 16, right: 16 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#3d465a",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {f.title}
                  </div>
                  <div style={{ fontSize: 10, color: "#8b93a5", marginTop: 2 }}>{f.meta}</div>
                </div>
              </motion.a>
            ))}

            {/* ------------------------------------------------------ */}
            {/* FRONT PANEL — opaque, lit from above, hinged at bottom */}
            {/* ------------------------------------------------------ */}
            <motion.div
              initial={false}
              animate={{ rotateX: open ? -26 : 0 }}
              transition={reduceMotion ? instant : lidSpring}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: FRONT_H,
                borderRadius: "14px 14px 18px 18px",
                // translucent frosted glass: files and back panel ghost through
                background:
                  "linear-gradient(180deg, rgba(165,220,255,0.88) 0%, rgba(105,187,247,0.84) 30%, rgba(64,155,232,0.88) 68%, rgba(40,120,200,0.94) 100%)",
                backdropFilter: "blur(12px) saturate(150%)",
                WebkitBackdropFilter: "blur(12px) saturate(150%)",
                border: "1px solid rgba(255,255,255,0.4)",
                boxShadow: [
                  "inset 0 1.5px 0 rgba(255,255,255,0.7)", // top lip highlight
                  "inset 0 -20px 28px -16px rgba(8,45,95,0.4)", // bottom depth
                  "inset 1px 0 0 rgba(255,255,255,0.25)",
                  "inset -1px 0 0 rgba(255,255,255,0.12)",
                ].join(", "),
                transformOrigin: "50% 100%",
                backfaceVisibility: "hidden",
                zIndex: 20,
                overflow: "hidden",
              }}
            >
              {/* grain */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: NOISE,
                  backgroundSize: "140px 140px",
                  mixBlendMode: "soft-light",
                  opacity: 0.22,
                }}
              />
              {/* diagonal sheen */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(115deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 32%, rgba(255,255,255,0) 55%)",
                }}
              />
              {/* stitched paper-edge line under the lip */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: 14,
                  right: 14,
                  top: 12,
                  height: 0,
                  borderTop: "1px solid rgba(255,255,255,0.28)",
                  boxShadow: "0 1px 0 rgba(10,60,120,0.18)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}