"use client";

import React from "react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
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
      <footer className="hidden md:block relative w-full min-h-[700px] overflow-hidden">
        <img
          src="/sky.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#EEECE6] via-[#EEECE6]/40 to-transparent z-10 pointer-events-none" />

        <img
          src="/pngs/cloude.webp"
          alt=""
          className="absolute top-[28%] left-[5%] w-[20vw] z-20 animate-cloud-1"
        />

        <img
          src="/clouds/cloud1.webp"
          alt=""
          className="absolute top-[3%] left-[50%] w-[18vw] z-10 animate-cloud-2"
        />

        <img
          src="/clouds/cloud2.webp"
          alt=""
          className="absolute top-[35%] right-[5%] w-[15vw] z-20 animate-cloud-3"
        />

        <div className="relative z-30 flex items-end justify-center w-full h-screen p-10 overflow-hidden">
          <div className="contact relative w-full h-[320px] rounded-[2rem] border border-white/40 bg-white/10 backdrop-blur-[20px] backdrop-saturate-150 overflow-hidden bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:20px_20px]">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/25 via-transparent to-white/5 pointer-events-none" />

            <div className="content relative flex flex-row justify-between px-10 py-5 w-full h-full">
              <div className="w-fit">
                <span className="text-[4vw] font-extrabold text-white">
                  Contact!
                </span>

                <div className="address flex flex-row gap-2 text-[32px] text-white">
                  <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/ayaan_saifi__1/">
                    <FaInstagram className="cursor-pointer hover:text-zinc-200" />
                  </a>
                  <a target="_blank" rel="noopener noreferrer" href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=jrjtWvMnTVvCwCQFfJcwZkSXGlZbVhSsXHlPSHRHrwCQbLXGRsdkXWHQhFQzXMGzhzKdBRXr">
                    <MdEmail className="cursor-pointer hover:text-zinc-200" />
                  </a>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/ayaan-saifi-782505319/">
                    <FaLinkedin className="cursor-pointer hover:text-zinc-200" />
                  </a>
                  <a target="_blank" rel="noopener noreferrer" href="https://x.com/ayaan_saifi_1">
                    <FaSquareXTwitter className="cursor-pointer hover:text-zinc-200" />
                  </a>
                  <a target="_blank" rel="noopener noreferrer" href="https://github.com/ayan-011">
                    <FaGithub className="cursor-pointer hover:text-zinc-200" />
                  </a>
                  <a target="_blank" rel="noopener noreferrer" href="https://wa.me/919899729915">
                    <FaWhatsapp className="cursor-pointer hover:text-zinc-200" />
                  </a>
                </div>
              </div>

              <div className="thanks flex flex-col justify-center w-fit text-[7vw] leading-[75px] tracking-wide">
                <span className="font-opener">
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