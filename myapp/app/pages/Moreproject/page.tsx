import React from "react";

import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

const cards = [
 {
    bg: "/projectThumbnails/porsche2.png",
    title: "PORSCHE",
    description:
      "A premium automotive experience featuring Porsche’s iconic design through cinematic transitions, smooth scrolling, and immersive animations.",
      
      link: "https://porsche-five-alpha.vercel.app/"
  },
  {
    bg: "/projectThumbnails/krsna.png",
    title: "KR$NA",
    description:
      "A bold digital experience inspired by Indian hip-hop artist KR$NA, blending dark aesthetics, cool effects, and cinematic visuals.",
      link: "https://realkrsna.vercel.app/"
  },
  {
    bg: "/projectThumbnails/timer.png",
    title: "LIFE TIMER",
    description:
      "An interactive life timer that visualizes how quickly time passes, turning your age into a powerful reminder of life’s limited moments.",
      link: "https://timer-lrqd.vercel.app/signup"
  },
  {
    bg: "/projectThumbnails/undo.png",
    title: "UNDO",
    description:
      "A clean, minimal documentation interface designed for effortless navigation, readability, and a distraction-free learning experience.",
      link: "https://undo-one.vercel.app/dashboard"
  },
  {
    bg: "/projectThumbnails/grocery.png",
    title: "GROCERY_UI",
    description:
      "A modern grocery shopping interface that makes discovering fresh essentials and everyday products simple and enjoyable.",
      link: "https://grocery-24d3.vercel.app/"
  },
  {
    bg: "/projectThumbnails/portfolio.png",
    title: "Simple portfolio",
    description:
      "A modern, visually engaging single-page portfolio featuring a bento grid layout to showcase projects, skills, and creativity through clean design and smooth animations.",
      link: "https://ayaans-portfolio.onrender.com/"
  },
];

const Page = () => {
  return (
    <section className="w-full bg-[#EEECE6] min-h-screen ">


<div className="w-full py-5 sticky top-0 z-50 px-8 bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-sm " >

  <Link href="/" className="backPage font-semibold flex gap-2 items-center">
  <IoMdArrowRoundBack />
    Back
  </Link>
</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-r-2 border-b-2 border-[#0F6292]">
        {cards.map((card, index) => (
          <div
            key={index}
            className="border-l-2 border-t-2 border-[#0F6292] overflow-hidden group cursor-pointer"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <a href={card.link} target="_blank" rel="noopener noreferrer">
              <img
                src={card.bg}
                 
                className="w-full md:h-[40vh] object-cover transition-transform duration-700 group-hover:scale-105"
              /></a>
            </div>

            {/* Content */}
            <div className="bg-[#EEECE6] px-4  min-h-[220px] flex flex-col justify-center">
              <span className="text-orange-500 text-sm font-medium">
                Featured Project
              </span>

              <h2 className="mt-5 text-3xl font-semibold text-black">
                {card.title}
              </h2>

              <p className="mt-5 text-neutral-600 ">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;