import { useState } from "react";
import { Plus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  
  {
    question: "What services do you offer?",
    answer:
      "I build modern, responsive websites with a strong focus on UI/UX, smooth animations, and performance. From portfolio websites to business landing pages and interactive web experiences, I turn ideas into functional digital products.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "It depends on the project's complexity, features, and design requirements. A simple landing page may take 3–7 days, while a more complex website can take several weeks. I'll provide a clear timeline before we begin.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Every project has different requirements, so pricing depends on the scope, design, functionality, and timeline. Share your idea with me, and I'll provide a tailored estimate that fits your project's needs.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Absolutely! I can help modernize your existing website with a fresh design, improved responsiveness, smoother interactions, and better performance while preserving the features your business needs.",
  },
  
];

export default function Questions() {
  const [openIndex, setOpenIndex] = useState<number | null>(-1);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="min-h-screen w-full bg-[] px-2 md:px-6 py-20 md:px-16 lg:px-24 flex items-center ">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 xl:grid-cols-[minmax(0,320px)_1fr] md:gap-16   items-center">
        {/* Left column */}
        <div>
          <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-5xl">
            Everything You Need to Know Before We Build!
          </h2>
          <p className="mt-8 max-w-xs text-[18px] font-semibold leading-relaxed text-neutral-800">
            Got questions? Here's what you need to know before we bring your 
            ideas to life. Still curious? Feel free to reach out.
          </p>
        </div>

        {/* Right column: accordion */}
        <div className="flex flex-col gap-1 md:gap-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                onClick={() => toggle(index)}
                className="cursor-pointer rounded-xl md:rounded-2xl border border-neutral-300/70 bg-[#F6F5F1] shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
              >
                <div
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-3 sm:px-8 py-5 text-left"
                >
                  <span className="text-lg sm:text-2xl font-medium  leading-snug text-neutral-900 md:text-[26px]">
                    {item.question}
                  </span>
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center text-neutral-900">
                    <Plus
                      className={`h-6 w-6 transition-transform duration-300 ease-in-out ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                      strokeWidth={1.75}
                    />
                  </span>
                </div>

                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-3 md:px-8 pb-8 text-[13px] md:text-[17px] leading-tight md:leading-relaxed text-neutral-500 md:pr-16">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}