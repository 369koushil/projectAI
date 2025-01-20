import React from 'react'


const ProjectProfile = (props) => {
  return (
   
     <div className= 'flex flex-col font-mono    rounded-lg bg-box h-96 w-64 border-red-100 border-x-2 border-y-2'>
        <div className='border-b-2 border-red-100 h-1/6 flex items-center text-xl font-medium justify-center text-white'>{props.title}</div>
        <div className='grow  bg-primary    font-mono text-white  border-b-2 border-red-100'><p className='flex p-10 flex-wrap '>{props.description}</p></div>
        <div className='  flex flex-row w-full h-1/6 items-center   text-white h-2/12'>
        <div className='w-1/2 border-r-2 border-red-100 h-full rounded-bl-lg flex justify-center items-center hover:bg-red-500'>Delete</div><div className='h-full w-1/2 flex rounded-br-lg  justify-center items-center hover:bg-green '>Edit</div>
        </div>
    </div>
  )
}

export default ProjectProfile
