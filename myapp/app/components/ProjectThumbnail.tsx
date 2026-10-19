"use client";

import React, { useRef, useState, useEffect } from "react";

type Props = {
  image: string;
  video: string;
  alt: string;
};

const ProjectThumbnail = ({ image, video, alt }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [hovered, setHovered] = useState(false);

  // Smoothly update the red bar every frame (timeupdate is too choppy)
  const tick = () => {
    const v = videoRef.current;
    const bar = barRef.current;
    if (v && bar && v.duration) {
      bar.style.width = `${(v.currentTime / v.duration) * 100}%`;
    }
    rafRef.current = requestAnimationFrame(tick);
  };

  const stopTick = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  const handleEnter = () => {
    setHovered(true);
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {}); // ignore autoplay/interrupt errors
    stopTick();
    rafRef.current = requestAnimationFrame(tick);
  };

  const handleLeave = () => {
    setHovered(false);
    stopTick();
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
    if (barRef.current) barRef.current.style.width = "0%";
  };

  useEffect(() => stopTick, []); // cleanup on unmount

  return (
    <div
      className="relative w-full aspect-[5/3] overflow-hidden bg-black cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Thumbnail */}
      <img
        src={image}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          hovered ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video (no controls) */}
      <video
        ref={videoRef}
        src={video}
        muted
        loop
        playsInline
        preload="metadata"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Red progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-black/30">
        <div ref={barRef} className="h-full bg-red-600" style={{ width: "0%" }} />
      </div>
    </div>
  );
};

export default ProjectThumbnail;