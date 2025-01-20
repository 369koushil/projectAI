import React from 'react'
import photo from '../assets/Screenshot 2025-01-20 181226.png';


const ProjectDisplay = (props) => {
  return (
   
     <div className= 'flex flex-col font-mono    rounded-lg bg-box h-96 w-64 border-red-100 border-x-2 border-y-2'>
        <div className='border-b-2 border-red-100 h-1/6 flex text-xl font-semibold items-center justify-center text-white'>{props.title}</div>
        <div className='grow text-white   border-b-2 border-red-100'><img className='w-full h-full object-cover' src={photo} alt="" /></div>
        <div className='  flex flex-row w-full h-1/6 items-center   text-white h-2/12'>
        <div className='w-1/2 border-r-2 font-bold border-red-100 transition-all h-full rounded-bl-lg flex justify-center items-center hover:bg-red-500  '>Delete</div><div className='h-full  transition-all w-1/2 flex rounded-br-lg font-bold  justify-center items-center hover:bg-green  '>Edit</div>
        </div>
    </div>
  )
}

export default ProjectDisplay
