import React from 'react'
import { Link } from 'react-router-dom'

function ProjectSummary({gistUrl}) {
    console.log('new',gistUrl)
  return (
    <div className='flex m-5 gap-2 bg-lime-300
             py-4'>
        <p>Project summary Created View your Project Summary at</p>
        <Link to= {gistUrl} className=' text-blue-800'>view</Link> 
    </div>
  )
}

export default ProjectSummary