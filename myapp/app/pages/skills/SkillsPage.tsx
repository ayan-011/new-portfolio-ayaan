import React from "react";

type Skill = {
  name: string;
  category: string;
  description: string;
  icon: string;
  color: string;
  rotation: string;
};

const skills: Skill[] = [
  {
    name: "JavaScript",
    category: "Language",
    description: "Building interactive and dynamic web experiences.",
    icon: "JS",
    color: "#f7df1e",
    rotation: "-2deg",
  },
  {
    name: "TypeScript",
    category: "Language",
    description: "Writing safer, scalable, and maintainable code.",
    icon: "TS",
    color: "#3178c6",
    rotation: "2deg",
  },
  {
    name: "React",
    category: "Frontend",
    description: "Creating reusable component-based interfaces.",
    icon: "⚛",
    color: "#61dafb",
    rotation: "-1deg",
  },
  {
    name: "Next.js",
    category: "Framework",
    description: "Developing fast, production-ready web applications.",
    icon: "N",
    color: "#111111",
    rotation: "1.5deg",
  },
  {
    name: "Node.js",
    category: "Backend",
    description: "Building server-side applications and APIs.",
    icon: "JS",
    color: "#68a063",
    rotation: "-2.5deg",
  },
  {
    name: "Express.js",
    category: "Backend",
    description: "Creating lightweight and flexible backend services.",
    icon: "EX",
    color: "#222222",
    rotation: "2deg",
  },
  {
    name: "MongoDB",
    category: "Database",
    description: "Working with flexible, document-based data.",
    icon: "M",
    color: "#47a248",
    rotation: "-1.5deg",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    description: "Designing reliable relational data systems.",
    icon: "PG",
    color: "#336791",
    rotation: "2.5deg",
  },
  {
    name: "Prisma",
    category: "ORM",
    description: "Managing type-safe database access.",
    icon: "◇",
    color: "#2d3748",
    rotation: "-2deg",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    description: "Crafting clean and responsive user interfaces.",
    icon: "TW",
    color: "#06b6d4",
    rotation: "1deg",
  },
  {
    name: "Git & GitHub",
    category: "Tools",
    description: "Tracking changes and collaborating on projects.",
    icon: "GH",
    color: "#24292f",
    rotation: "-1deg",
  },
  {
    name: "REST APIs",
    category: "Backend",
    description: "Connecting applications through clean APIs.",
    icon: "API",
    color: "#8b5cf6",
    rotation: "2deg",
  },
];

function PushPin({ color }: { color: string }) {
  return (
    <span
      aria-hidden="true"
      className="absolute top-1  left-2/3 z- h-3 w-3 -translate-x-1/2 rounded-full shadow-[2px_4px_5px_rgba(0,0,0,0.35)]"
      style={{
        background: `radial-gradient(circle at 32% 25%, #ffffff99 0 10%, ${color} 28%, #1118 100%)`,
      }}
    >
      {/* <span className="absolute left-1/2 top-5 h-3 w-1 -translate-x-1/2 rounded-b-full bg-black/30" /> */}
    </span>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <article
      className="group relative  h-[107px]  sm:min-h-[130px] lg:min-h-[190px] cursor-default bg-[#f7f0dc] p-2 py-6 sm:py-0 md:p-5 text-[#263326]
       shadow-[5px_8px_12px_rgba(0,0,0,0.22),inset_0_0_18px_rgba(125,95,45,0.08)] 
       transition duration-300 ease-out hover:-translate-y-2 hover:rotate-2 hover:shadow-[8px_18px_22px_rgba(0,0,0,0.3)]"
      style={{
        transform: `rotate(${skill.rotation})`,
        clipPath:
          "polygon(0.5% 1%, 98.5% 0%, 100% 98%, 1% 100%, 0% 50%)",
      }}
    > 

      <PushPin color={skill.color} />


      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-3 top-3 h-px w-12 rotate-[-8deg] bg-[#8d7651] hidden md:flex" />
        <div className="absolute bottom-2 sm:bottom-5 right-4 h-[0.5px] w-10 rotate-[12deg] bg-[#8d7651] " />
      </div>

      <div className="relative flex h-full flex-col">
        <div className=" mb-2 sm:mb-5 flex items-start justify-between gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-md font-mono text-sm font-black shadow-inner"
            style={{
              backgroundColor: skill.color,
              color:
                skill.color === "#f7df1e" || skill.color === "#61dafb"
                  ? "#172217"
                  : "#ffffff",
            }}
          >
            {skill.icon}
          </div>

          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6c725f] hidden lg:flex">
            {skill.category}
          </span>
        </div>

        <h3 className="font-mono text-[10px] sm:text-sm  lg:text-xl font-bold tracking-tight ">
          {skill.name}
        </h3>

        <p className="mt-2 max-w-[220px] text-sm leading-5 text-[#626653] hidden lg:flex">
          {skill.description}
        </p>

        <div className="mt-auto pt-5 hidden lg:flex">
          <div className="h-px w-full bg-[#d9cdb0]" />
          <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.2em] text-[#8a806a]">
            currently learning
          </span>
        </div>
      </div>
    </article>
  );
}

export default function SkillsPage() {
  return (
    <main className="   min-h-screen overflow-hidden  px-0 py-12 text-white sm:px-8 lg:px-12">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 w-full   ">
          {/* <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-white/70">
            tools of the trade
          </p> */}
      
 <div className="relative mx-auto w-fit px-10 py-2 -rotate-5 select-none pointer-events-none">

    <img
      src="/pngs/paperstrip.png"
      alt=""
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] opacity-80"
    />

    <h1 className="relative z-10 text-lg md:text-4xl font-semibold text-white/60 tracking-[-0.04em] sm:text-4xl ">
      Things I Build With
    </h1>

  </div>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
            {/* A collection of technologies, tools, and skills pinned to my
            developer workspace. */}
            <br />
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[22px] border-[4px] md:border-[14px] border-[#6b452b] bg-[#245c3c] p-4 shadow-[0_9px_15px_rgba(0,0,0,0.88),inset_0_0_0_3px_#9a6b43] sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,255,255,0.025) 4px, transparent 5px),
                repeating-linear-gradient(90deg, transparent 0px, transparent 4px, rgba(0,0,0,0.08) 5px, transparent 7px),
                radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 28%),
                radial-gradient(circle at 80% 75%, rgba(0,0,0,0.12), transparent 35%)
              `,
              backgroundBlendMode: "overlay",
            }}
          />

          <div className="pointer-events-none absolute inset-0 rounded-[8px] shadow-[inset_0_0_55px_rgba(0,0,0,0.3)]" />

          <div className="relative grid grid-cols-3 gap-4 md:gap-7 sm:grid-cols-4 ">
            {skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>

          <div className="relative mt-10 flex items-center justify-center gap-3">
            {/* <span className="h-2 w-2 rounded-full bg-[#d5a94f] shadow-[0_1px_4px_#0008]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#c9dbc7]">
              pinned to the board
            </span>
            <span className="h-2 w-2 rounded-full bg-[#d5a94f] shadow-[0_1px_4px_#0008]" /> */}
          </div>
        </div>
      </section>
    </main>
  );
}
