import { useCallback, useEffect, useRef, useState } from "react";

type CatProps = {
  defaultSrc?: string;
  hoverSrc?: string;
  soundSrc?: string;
  alt?: string;
  className?: string; // position + size, e.g. "bottom-6 right-6 w-40"
  volume?: number; // 0 to 1
};

type Mode = "hover" | "tap";

/**
 * Desktop: hover the cat -> sound loops until the mouse leaves.
 * Phone:   tap the cat -> cat changes and the sound plays ONCE.
 *          When the sound finishes, the cat returns to normal.
 *          Tap the cat again, or anywhere else, to stop it instantly.
 */
export default function Cat({
  defaultSrc = "/cats/catnormal.png",
  hoverSrc = "/cats/catfight.png",
  soundSrc = "/cats/cataudio.mp3",
  alt = "cat",
  className = "bottom-6 right-6 w-40",
  volume = 1,
}: CatProps) {
  const [active, setActive] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activeRef = useRef(false); // "should the cat be in its active state?"
  const modeRef = useRef<Mode>("hover");
  const watchdogRef = useRef<number | null>(null);
  const lastPointerType = useRef<string>("mouse");

  const clearWatchdog = () => {
    if (watchdogRef.current) {
      window.clearInterval(watchdogRef.current);
      watchdogRef.current = null;
    }
  };

  const stop = useCallback(() => {
    if (!activeRef.current) return;

    activeRef.current = false;
    setActive(false);
    clearWatchdog();

    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  // Create the audio element once
  useEffect(() => {
    const audio = new Audio(soundSrc);
    audio.preload = "auto";
    audio.volume = volume;
    audio.load();
    audioRef.current = audio;

    // Phone (tap mode): when the sound finishes, reset the cat
    const onEnded = () => {
      if (activeRef.current && modeRef.current === "tap") stop();
    };
    audio.addEventListener("ended", onEnded);

    return () => {
      clearWatchdog();
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, [soundSrc, volume, stop]);

  const start = useCallback((mode: Mode) => {
    const audio = audioRef.current;
    if (!audio || activeRef.current) return;

    activeRef.current = true;
    modeRef.current = mode;
    setActive(true);

    audio.loop = mode === "hover"; // hover repeats, tap plays once
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Tap is always a real gesture, so this only matters for hover
      // before the visitor's first click (the watchdog below retries).
    });

    if (mode === "hover") {
      // Keep the sound going while hovered:
      // - restarts it if it ever ends or stops (loop fallback)
      // - retries if the browser blocked it before the first click/tap
      watchdogRef.current = window.setInterval(() => {
        if (!activeRef.current) return;
        if (audio.paused || audio.ended) {
          audio.play().catch(() => {});
        }
      }, 200);
    }
  }, []);

  // Phone: tapping anywhere outside the cat stops the sound instantly
  useEffect(() => {
    const onOutsidePointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      if (!activeRef.current) return;
      if (rootRef.current?.contains(e.target as Node)) return; // cat handles its own taps
      stop();
    };

    window.addEventListener("pointerdown", onOutsidePointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onOutsidePointerDown);
  }, [stop]);

  return (
    <div
      ref={rootRef}
      className={`absolute ${className}`}
      style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
      onPointerDown={(e) => {
        lastPointerType.current = e.pointerType;
      }}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") start("hover");
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") stop();
      }}
      onClick={() => {
        // Mouse is handled by hover. Touch / pen: tap to play once, tap again to stop.
        if (lastPointerType.current === "mouse") return;
        if (activeRef.current) stop();
        else start("tap");
      }}
    >
      <style>{`
        @keyframes cat-wiggle {
          0%   { transform: rotate(-6deg); }
          50%  { transform: rotate(6deg); }
          100% { transform: rotate(-6deg); }
        }
      `}</style>

      <img
        src={defaultSrc}
        alt={alt}
        draggable={false}
        className={`block h-full w-full select-none object-cover transition-opacity duration-300 ${
          active ? "opacity-0" : "opacity-100"
        }`}
      />

      <img
        src={hoverSrc}
        alt=""
        aria-hidden="true"
        draggable={false}
        className={`pointer-events-none absolute inset-0 h-full w-full origin-bottom select-none object-cover transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
        style={{
          animation: "cat-wiggle 1.2s ease-in-out -0.3s infinite",
          animationPlayState: active ? "running" : "paused",
        }}
      />
    </div>
  );
}