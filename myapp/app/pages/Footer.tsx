"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { BsCloudRainFill } from "react-icons/bs";
import RainOverlay from "../components/Rainoverlay";

/** Put your rain sound file in the public folder and set its path here. */
const RAIN_SOUND_SRC = "/sound/rain.mp3";
const RAIN_VOLUME = 0.5; // 0 to 1

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ayaan_saifi__1/",
    Icon: FaInstagram,
  },
  {
    label: "Email",
    href: "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=jrjtWvMnTVvCwCQFfJcwZkSXGlZbVhSsXHlPSHRHrwCQbLXGRsdkXWHQhFQzXMGzhzKdBRXr",
    Icon: MdEmail,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ayaan-saifi-782505319/",
    Icon: FaLinkedin,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/ayaan_saifi_1",
    Icon: FaSquareXTwitter,
  },
  {
    label: "GitHub",
    href: "https://github.com/ayan-011",
    Icon: FaGithub,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919899729915",
    Icon: FaWhatsapp,
  },
];

const Footer = () => {
  /* ---------------------------- rain mode ---------------------------- */
  const [rain, setRain] = useState(false);
  const rainRef = useRef(false); // always matches `rain`, safe to read inside observers
  const footerRef = useRef<HTMLElement | null>(null);
  const rainAudio = useRef<HTMLAudioElement | null>(null);
  const fadeTimer = useRef<number | null>(null);

  useEffect(() => {
    const a = new Audio(RAIN_SOUND_SRC);
    a.loop = true;
    a.preload = "auto";
    a.volume = 0;
    rainAudio.current = a;

    return () => {
      if (fadeTimer.current) window.clearInterval(fadeTimer.current);
      a.pause();
      rainAudio.current = null;
    };
  }, []);

  const fadeTo = (target: number, ms: number, onDone?: () => void) => {
    const a = rainAudio.current;
    if (!a) return;
    if (fadeTimer.current) window.clearInterval(fadeTimer.current);

    const from = a.volume;
    const steps = Math.max(1, Math.round(ms / 50));
    let i = 0;

    fadeTimer.current = window.setInterval(() => {
      i++;
      a.volume = Math.min(1, Math.max(0, from + (target - from) * (i / steps)));
      if (i >= steps) {
        if (fadeTimer.current) window.clearInterval(fadeTimer.current);
        fadeTimer.current = null;
        onDone?.();
      }
    }, 50);
  };

  const startRain = () => {
    rainRef.current = true;
    setRain(true);
    const a = rainAudio.current;
    if (!a) return;
    a.play().catch(() => {}); // runs inside the click, so the browser allows it
    fadeTo(RAIN_VOLUME, 1500);
  };

  const stopRain = () => {
    rainRef.current = false;
    setRain(false);
    const a = rainAudio.current;
    if (!a) return;
    fadeTo(0, 900, () => a.pause());
  };

  const toggleRain = () => (rain ? stopRain() : startRain());

  // Scrolled away from the footer -> turn the rain (and its sound) off
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // "out of the footer" = less than ~15% of it is still on screen
        if (!entry.isIntersecting || entry.intersectionRatio < 0.15) {
          if (rainRef.current) stopRain();
        }
      },
      { threshold: [0, 0.15] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The toggle only exists on tablet/desktop, so stop the rain if the screen shrinks to mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => {
      if (mq.matches) stopRain();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  /* ------------------------------------------------------------------ */

  return (
    <>
      {/* Mobile Footer */}
      <footer className="md:hidden h-[33.333vh] min-h-[160px] w-full bg-[#EEECE6] border-black/20 border-t-[1px] text-white flex flex-col justify-center items-center gap-5">
        <h2 className="text-2xl font-bold tracking-wide">CONTACTS</h2>

        <div className="flex items-center justify-center gap-5 text-2xl">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/ayaan_saifi__1/"
            aria-label="Instagram"
          >
            <FaInstagram className="hover:text-zinc-400 transition-colors" />
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=jrjtWvMnTVvCwCQFfJcwZkSXGlZbVhSsXHlPSHRHrwCQbLXGRsdkXWHQhFQzXMGzhzKdBRXr"
            aria-label="Email"
          >
            <MdEmail className="hover:text-zinc-400 transition-colors" />
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/ayaan-saifi-782505319/"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="hover:text-zinc-400 transition-colors" />
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://x.com/ayaan_saifi_1"
            aria-label="X"
          >
            <FaSquareXTwitter className="hover:text-zinc-400 transition-colors" />
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ayan-011"
            aria-label="GitHub"
          >
            <FaGithub className="hover:text-zinc-400 transition-colors" />
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://wa.me/919899729915"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="hover:text-zinc-400 transition-colors" />
          </a>
        </div>
      </footer>

      {/* Original Footer — Tablet and Desktop */}
      <footer
        ref={footerRef}
        className="hidden md:block relative w-full min-h-[700px] overflow-hidden"
      >
        <img
          src="/pngs/sky.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#EEECE6] via-[#EEECE6]/40 to-transparent z-10 pointer-events-none" />

        <img
          src="/pngs/cloud.webp"
          alt=""
          className="absolute top-[28%] left-[5%] w-[20vw] z-20 animate-cloud-1"
        />

        <img
          src="/pngs/cloud1.webp"
          alt=""
          className="absolute top-[3%] left-[50%] w-[18vw] z-10 animate-cloud-2"
        />

        <img
          src="/pngs/cloud2.webp"
          alt=""
          className="absolute top-[35%] right-[5%] w-[15vw] z-20 animate-cloud-3"
        />

        {/* Rain: fills this footer only (it can't leave the footer's bounds) */}
        <RainOverlay active={rain} />

        {/* wrapper: grows with the screen, card sits at the bottom */}
        <div className="relative z-30 flex items-end justify-center w-full min-h-screen p-6 lg:p-[2vw]">
          {/* card: height now follows its content instead of a fixed 320px */}
          <div className="contact relative w-full  min-h-[20vw] rounded-[2rem] border border-white/40 bg-white/10 backdrop-blur-[20px] backdrop-saturate-150 overflow-hidden bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:20px_20px]">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/25 via-transparent to-white/5 pointer-events-none" />

            <div className="content relative flex flex-row items-stretch justify-between gap-6 lg:gap-[2vw] w-full h-full min-h-[inherit] px-6 py-6 lg:px-[2vw] lg:py-[2vw] b">
              {/* LEFT: contact + icons + rain toggle */}
              <div className="flex flex-col justify-start w-fit min-w-0 shrink">
                <span className="text-[4vw] leading-none font-extrabold text-white">
                  Contact!
                </span>

                <div className="address mt-[1vw] flex flex-row flex-wrap gap-2 lg:gap-[1vw] text-[2vw] text-white">
                  {SOCIALS.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={href}
                      aria-label={label}
                    >
                      <Icon className="cursor-pointer hover:text-zinc-200" />
                    </a>
                  ))}
                </div>

                {/* RAIN MODE toggle */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={rain}
                  aria-label="Rain mode"
                  onClick={toggleRain}
                  className="rain-toggle mt-[1.4vw] inline-flex w-fit items-center gap-[0.8vw] text-white select-none cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                >
                  <BsCloudRainFill
                    className={`text-[2vw] transition-colors duration-300 ${
                      rain ? "text-sky-200" : "text-white"
                    }`}
                  />
                  <span className="font-semibold text-[max(13px,1.2vw)] leading-none">
                    Rain mode
                  </span>

                  {/* switch track */}
                  <span
                    className={`relative inline-block rounded-full border border-white/50 backdrop-blur transition-colors duration-300 ${
                      rain ? "bg-sky-400/80" : "bg-white/20"
                    }`}
                    style={{
                      height: "max(20px, 1.8vw)",
                      width: "max(38px, 3.4vw)",
                    }}
                  >
                    {/* knob */}
                    <span
                      className="absolute top-1/2 rounded-full bg-white shadow-md transition-all duration-300 ease-out"
                      style={{
                        height: "calc(100% - 6px)",
                        aspectRatio: "1",
                        left: rain ? "calc(100% - 3px)" : "3px",
                        transform: rain
                          ? "translate(-100%, -50%)"
                          : "translate(0, -50%)",
                      }}
                    />
                  </span>
                </button>
              </div>

              {/* RIGHT: big text. Font size scales with the screen AND the line
                  height is relative (em), so the lines can never overlap. */}
              <div className="thanks flex flex-col justify-center shrink-0 w-fit tracking-wide">
                <span className="font-opener whitespace-nowrap text-[6vw] leading-[0.8]">
                  THANKSSS
                  <br />
                  FORRRRRR
                  <br />
                  WATCHING
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;