import React from 'react'
import SkillsPage from './skills/SkillsPage'

const Skills = () => {
  return (
    <div className='  md:py-10   w-full h-fit flex justify-center'>
         
        <div className="sm:min-w-[60vw]  w-full items-center     p-1 md:mt-20" >
        
             <SkillsPage />
        </div>
    </div>
  )
}

export default Skills