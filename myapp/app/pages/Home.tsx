"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import About from "./about";




interface DraggableImageProps {
    src: string;
    alt?: string;
    className?: string;
    initialXPct: number; // starting position, % of container width
    initialYPct: number; // starting position, % of container height
    parallaxSpeed?: number; // fraction of scroll speed the image moves at (lower = slower)
    returnToOrigin?: boolean; // if true, image snaps back to its original spot on release
    magnetRadius?: number; // px around the image center in which the magnetic field is active
    magnetStrength?: number; // 0-1, how strongly the image is pulled toward the cursor
}

function DraggableImage({
    src,
    alt = "",
    className = "",
    initialXPct,
    initialYPct,
    parallaxSpeed = 0.04,
    returnToOrigin = false,
    magnetRadius = 160,
    magnetStrength = 0.3,
}: DraggableImageProps) {
    const [offset, setOffset] = useState({ x: 0, y: 0 }); // user drag offset
    const [scrollY, setScrollY] = useState(0);
    const [isSnapping, setIsSnapping] = useState(false);
    const [magnet, setMagnet] = useState({ x: 0, y: 0 }); // magnetic pull offset
    const imgRef = useRef<HTMLImageElement>(null);
    const magnetRef = useRef({ x: 0, y: 0 });
    const dragging = useRef(false);
    const pointerStart = useRef({ x: 0, y: 0 });
    const offsetStart = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Magnetic field: pull the image toward the cursor while it is inside magnetRadius
    useEffect(() => {
        const updateMagnet = (next: { x: number; y: number }) => {
            if (next.x === magnetRef.current.x && next.y === magnetRef.current.y) return;
            magnetRef.current = next;
            setMagnet(next);
        };

        const onPointerMove = (e: PointerEvent) => {
            const el = imgRef.current;
            if (!el || e.pointerType === "touch" || dragging.current) {
                updateMagnet({ x: 0, y: 0 });
                return;
            }
            const rect = el.getBoundingClientRect();
            // subtract the current magnet offset so the pull doesn't feed back on itself
            const cx = rect.left + rect.width / 2 - magnetRef.current.x;
            const cy = rect.top + rect.height / 2 - magnetRef.current.y;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.hypot(dx, dy);

            if (dist >= magnetRadius) {
                updateMagnet({ x: 0, y: 0 });
                return;
            }
            const falloff = 1 - dist / magnetRadius; // 1 at center, 0 at edge of field
            updateMagnet({
                x: Math.round(dx * magnetStrength * falloff * 10) / 10,
                y: Math.round(dy * magnetStrength * falloff * 10) / 10,
            });
        };

        const onLeave = () => updateMagnet({ x: 0, y: 0 });

        window.addEventListener("pointermove", onPointerMove, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
        return () => {
            window.removeEventListener("pointermove", onPointerMove);
            document.documentElement.removeEventListener("pointerleave", onLeave);
        };
    }, [magnetRadius, magnetStrength]);

    const handlePointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
        dragging.current = true;
        setIsSnapping(false);
        magnetRef.current = { x: 0, y: 0 };
        setMagnet({ x: 0, y: 0 });
        pointerStart.current = { x: e.clientX, y: e.clientY };
        offsetStart.current = { ...offset };
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
        if (!dragging.current) return;
        const dx = e.clientX - pointerStart.current.x;
        const dy = e.clientY - pointerStart.current.y;
        setOffset({ x: offsetStart.current.x + dx, y: offsetStart.current.y + dy });
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLImageElement>) => {
        dragging.current = false;
        e.currentTarget.releasePointerCapture(e.pointerId);
        if (returnToOrigin) {
            setIsSnapping(true);
            setOffset({ x: 0, y: 0 });
        }
    };

    return (
        <img
            ref={imgRef}
            src={src}
            alt={alt}
            draggable={false}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onTransitionEnd={(e) => {
                if (e.propertyName === "transform") setIsSnapping(false);
            }}
            className={`absolute z-10 select-none touch-none cursor-grab active:cursor-grabbing ${className}`}
            style={{
                left: `${initialXPct}%`,
                top: `${initialYPct}%`,
                transform: `translate(${offset.x}px, ${offset.y - scrollY * parallaxSpeed}px)`,
                // magnetic pull uses the separate `translate` property so it never interferes with drag/parallax/rotation
                translate: `${magnet.x}px ${magnet.y}px`,
                transition: `${isSnapping ? "transform 0.5s ease-out, " : ""}translate 0.25s ease-out`,
            }}
        />
    );
}

export default function Home() {

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 10]); // moves down 30px 



    return (
        <>


            <main className="z-20  relative bg-red- min-h-screen sm:min-h-[120vh] w-full bg-black overflow-visible ">

                {/* Grid */}
                <div
                    className="absolute inset-0 z-0 px-9"
                    style={{
                        backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
      `,
                        backgroundSize: "1vw 1vw ",
                    }}
                />

                {/* Grid fade */}
                <div
                    className="absolute inset-0 z-20"
                    style={{
                        background: "linear-gradient(to bottom, transparent 0%, black 70%)",
                    }}
                />

                {/* Background image */}
                <div
                    className="absolute left-1/2  mt-2  md:mt-0 top-3/7 sm:top-3/8 md:top-2/5 lg:top-3/7 xl:top-[25vw] -translate-x-1/2 -translate-y-1/2 z-10   w-[80vh]  lg:w-[92vh] xl:w-[95vw]  h-[90vw] lg:h-[95vw] xl:h-[40vw] rounded-2xl xl:rotate-none rotate-90 "
                    style={{
                        backgroundImage: "url('/homebg.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />

                <motion.div
                    style={{ y }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30   bg-red- w-full md:w-fit text-center"
                >
                    <h1 className="tracking-tight   select-none leading-[7vw] sm:leading-[5vw]  md:leading-[5vw] lg:leading-[5vw] text-[10vw] sm:text-[7vw] font-sansfont drop-shadow-[0_6px_4px_rgba(0,0,0,0.5)]">
                        The Portfolio <br /> Website
                    </h1>

                    <h1 className="text-[10px] lg:text-[1vw]  text-white/40 mt-5 md:mt-10">Ayaan Saifi</h1>
                </motion.div>

                <DraggableImage
                    src="/pngs/mouse.png"
                    initialXPct={12}
                    initialYPct={5}
                    parallaxSpeed={0.3}
                    className="w-[35vw] sm:w-[20vw]  rotate-12 z-20 drop-shadow-2xl"
                />



                <DraggableImage
                    src="pngs/diary3.png"
                    initialXPct={68}
                    initialYPct={30}
                    parallaxSpeed={0.2}
                    className="w-[50vw]  sm:w-[30vw] -rotate-12 z-20"
                />
                <DraggableImage
                    src="pngs/pencil.webp"
                    initialXPct={85}
                    initialYPct={36}
                    parallaxSpeed={-0.3}
                    className="w-[5vw] sm:w-[2.5vw]  rotate-12 z-30"
                />

                <DraggableImage
                    src="pngs/cloud.webp"
                    initialXPct={5}
                    initialYPct={70}
                    parallaxSpeed={-0.2}
                    returnToOrigin
                    className="w-[40vw] sm:w-[20vw] z-50 absolute    "
                />
                <DraggableImage
                    src="pngs/chip.webp"
                    initialXPct={85}
                    initialYPct={15}
                    parallaxSpeed={0.5}
                    className="w-[9vw] sm:w-[7vw] z-30 -rotate-12"
                />
            </main>

            <About />

        </>
    );
}