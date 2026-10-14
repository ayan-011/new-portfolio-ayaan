import React from 'react'

const About = () => {
  return (
    <div className="  relative z-10 h-[90vh] sm:h-[45vh] md:h-[50vh] lg:h-[100vh] bg-black  justify-center items-center  flex px-"  >

      
      <div className="w-full max-w-300 h-150 flex items-center   bg-red-  relative  px-20">

      <video src="/silver.mp4" className='w-32 absolute right-10 top-10 lg:flex hidden' autoPlay loop></video>
      <div className="relative    px-4 sm:px-15 py-2  items-center flex flex-col gap-y-4  
        lg:py-10 lg:rounded-4xl lg:border border-white/10 lg:bg-black/20 lg:backdrop-blur-lg lg:shadow-[0_8px_30px_rgba(0,0,0,0.15)] bg-none">





        <span className='text-white/65 sm:text-lg lg:text-xl font-bold underline'>About !</span>
        <span className="block max-w-3xl lg:max-w-6xl mx-auto text- text-white/65 text-base sm:text-lg lg:text-xl font-bold leading-7 sm:leading-9 tracking-tight">
          I'm Ayaan, computer science student and a website developer focused on design, code, 
          and the details that make a website stand out.
           I build websites with thoughtful layouts, clean interfaces,
            and motion that serves a purpose. When I'm not building something,
             I'm usually experimenting with new ideas or finding better ways to approach my work.
        </span>
      </div>
      </div>
    </div>
  )
}

export default About