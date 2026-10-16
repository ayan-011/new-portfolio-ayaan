import React from "react";

interface NoiseOverlayProps {
  /** Path of the noise file inside your /public folder. Change to match your file name. */
  src?: string;
  /** 0 to 1. Around 0.05 to 0.12 looks subtle; higher gets grainy. */
  opacity?: number;
  /** Size (px) each noise tile is drawn at. Smaller = finer grain. */
  tileSize?: number;
}

export default function NoiseOverlay({
  src = "/noise.gif",
  opacity = 0.08,
  tileSize = 200,
}: NoiseOverlayProps) {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed", // stays in place while the page scrolls
        inset: 0,
        zIndex: 9999, // above everything
        pointerEvents: "none", // clicks and hovers pass straight through
        backgroundImage: `url(${src})`,
        backgroundRepeat: "repeat",
        backgroundSize: `${tileSize}px ${tileSize}px`,
        opacity,
      }}
    />
  );
}