import { useEffect, useRef } from "react";

type CatProps = {
  defaultSrc?: string;
  hoverSrc?: string;
  soundSrc?: string;
  alt?: string;
  className?: string; // position + size, e.g. "bottom-6 right-6 w-40"
  stopOnLeave?: boolean;
  volume?: number; // 0 to 1
};

export default function Cat({
  defaultSrc = "/cats/catnormal.png",
  hoverSrc = "/cats/catfight.png",
  soundSrc = "/cats/cataudio.mp3",
  alt = "cat",
  className = "bottom-6 right-6 w-40",
  stopOnLeave = true,
  volume = 1,
}: CatProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isHoveringRef = useRef(false);
  const unlockedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(soundSrc);
    audio.preload = "auto";
    audio.volume = volume;
    audio.load(); // start buffering immediately
    audioRef.current = audio;

    // First real user gesture anywhere on the page unlocks audio.
    const onFirstGesture = () => {
      unlockedRef.current = true;
      // If the cursor is already sitting on the cat, play now.
      if (isHoveringRef.current) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
      removeListeners();
    };

    const events = ["pointerdown", "keydown", "touchstart"] as const;
    const removeListeners = () =>
      events.forEach((e) => window.removeEventListener(e, onFirstGesture));
    events.forEach((e) =>
      window.addEventListener(e, onFirstGesture, { passive: true })
    );

    return () => {
      removeListeners();
      audio.pause();
      audioRef.current = null;
    };
  }, [soundSrc, volume]);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Blocked by autoplay policy; onFirstGesture will retry
      // if the cursor is still on the cat.
    });
  };

  const handleEnter = () => {
    isHoveringRef.current = true;
    play();
  };

  const handleLeave = () => {
    isHoveringRef.current = false;
    const audio = audioRef.current;
    if (!audio || !stopOnLeave) return;
    audio.pause();
    audio.currentTime = 0;
  };

  return (
    <div
      className={`group absolute ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={play} // touch devices have no hover
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
        className="block h-full w-full select-none object-cover opacity-100 transition-opacity duration-300 group-hover:opacity-0"
      />

      <img
        src={hoverSrc}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full origin-bottom select-none object-cover opacity-0 transition-opacity duration-300 [animation:cat-wiggle_1.2s_ease-in-out_-0.3s_infinite_paused] group-hover:opacity-100 group-hover:[animation-play-state:running]"
      />
    </div>
  );
}