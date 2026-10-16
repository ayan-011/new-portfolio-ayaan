'use client';

import { useEffect } from "react";
import Home from "./pages/Home";
import Projects from "./pages/projects";
import Colorchanger from "./pages/Colorchanger";
import Details from "./pages/Details";
import Footer from "./pages/Footer";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import NoiseOverlay from "./components/Noiseoverlay";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // --- THE MISSING SYNC ---
    // Whenever ScrollTrigger recalculates (fonts/images/late content),
    // tell Lenis to recompute its scroll limit too. Without this,
    // Lenis can stay capped at a stale (too-short) max scroll height.
    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    // Do one authoritative refresh once everything is actually loaded
    // (images, fonts, late client content) instead of guessing with delays.
    const handleLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      window.removeEventListener("load", handleLoad);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="overflow-hidden font-inter">
      <NoiseOverlay />
      <Home />
      {/* <Details /> */}
      <Projects />
      <Colorchanger />
      <Footer />
    </div>
  );
};

export default Page;