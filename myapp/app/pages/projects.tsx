
import React from "react";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

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
    title: "Agency Website",
    description:
      "A modern, visually engaging single-page portfolio featuring a bento grid layout to showcase projects, skills, and creativity through clean design and smooth animations.",
      link: "https://ayaans-portfolio.onrender.com/"
  },
];

const Projects = () => {
  // Row math per breakpoint:
  // grid-cols-1 -> 2 rows = first 2 cards
  // md:grid-cols-2 -> 2 rows = first 4 cards
  // lg:grid-cols-3 -> 2 rows = all 6 cards (so nothing needs hiding at lg)
  const getVisibilityClass = (index: number) => {
    if (index < 2) return "";                // always visible
    if (index < 4) return "hidden md:block"; // row 2 on md/lg
    return "hidden lg:block";                // row 2 on lg only
  };

  return (
    <section className="w-full bg-[#EEECE6]">
      <div className="relative">
       
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-r-2 border-b-2 border-[#0F6292]">
  {cards.map((card, index) => (
    <div
      key={index}
      className={`border-l-2 border-t-2 border-[#0F6292] overflow-hidden flex flex-col ${
        getVisibilityClass(index)
      }`}
    >
      {/* Image */}
      <div
        className="bg-black p-5 select-none"
        style={{
          backgroundImage: "url('/homebg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full bg-black overflow-hidden shadow-2xl shadow-black">
          <a
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={card.bg}
              alt={card.title}
              className="w-full aspect-[5/3] object-cover transition-transform duration-700 hover:scale-105 hover:opacity-95 cursor-pointer"
            />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#EEECE6] p-6 md:p-8 flex-1 flex flex-col aspect-[2/1]">
        <span className="text-orange-500 text-sm font-medium">
          Featured Project
        </span>

        <h2 className="mt-5 text-2xl xl:text-3xl font-semibold text-black">
          {card.title}
        </h2>

        <p className="mt-5 text-neutral-600 leading-8">
          {card.description}
        </p>
      </div>
    </div>
  ))}
</div>
 

        {/* View More overlay — only on grid-cols-1 / grid-cols-2 devices */}
        <div
          className="lg:hidden absolute inset-x-0 bottom-0 h-90 sm:h-110
                     bg-gradient-to-t from-black   to-transparent
                     flex items-end justify-center pb-10"
        >
          <Link
            href="/pages/Moreproject"
            className="px-8 py-3 bg-white text-black font-medium tracking-wide flex gap-2 items-center rounded-full 
                       hover:bg-[#0F6292] hover:text-white transition-colors duration-300"
          >
            View More Projects
            <MdArrowOutward />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;