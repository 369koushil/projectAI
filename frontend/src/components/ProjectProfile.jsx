import React from 'react';
import photo from '../assets/Screenshot 2025-01-20 181226.png';
import { useNavigate } from 'react-router-dom';

const ProjectProfile = (props) => {
 const navigate=useNavigate();
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  
  return (
    <div className="flex flex-row p-6 gap-6">
      {/* Left Section */}
      <section className="w-3/12 transition-transform transform hover:scale-105 hover:shadow-[12px_12px_0px_0px_rgba(255,215,0,0.8)] 
                   cursor-pointer    hover:z-10">
        <div className="flex flex-col font-mono rounded-tl-lg rounded-bl-lg bg-box h-96 border-red-100 border-x-2 border-y-2 shadow-lg">
          <div className="grow text-white border-b-2">
            <img className="w-full h-full object-cover rounded-tl-lg rounded-bl-lg" src={photo} alt="Project" />
          </div>
        </div>
      </section>

      {/* Right Section */}
      <section className="bg-primary border-t-2 transition-transform transform hover:shadow-[12px_12px_0px_0px_rgba(255,215,0,0.8)]  flex flex-col border-b-2 border-r-2 rounded-tr-lg rounded-br-lg grow p-6 ">
        {/* Title */}
        <div className="h-1/6 flex items-center mb-4">
          <h1 className="text-4xl font-extrabold text-white font-mono tracking-wide">
            {capitalizeFirstLetter(props.title)}
          </h1>
        </div>

        {/* Description */}
        <div className="text-white grow text-lg font-mono leading-relaxed">
          <p className="text-xl font-semibold mb-2">Description</p>
          <p className="text-lg font-light tracking-wide">{props.description}</p>
        </div>

        <div className='flex flex-row h-16 justify-start items-center gap-x-24'>
        <div className='flex flex-col  text-white text-md'><i onClick={()=>navigate('/developing')} className="text-white flex justify-center cursor-pointer text-3xl ri-user-line"></i><p>Owner</p></div>
        <div className='flex flex-col  text-white text-md'><i onClick={()=>navigate('/developing')} className="text-white flex justify-center cursor-pointer text-3xl ri-thumb-up-line"></i><p>Like</p></div>
        <div className='flex flex-col  text-white text-md'><i onClick={()=>navigate('/developing')} className="text-white flex justify-center cursor-pointer text-3xl ri-star-line"></i><p>Follow</p></div>
        <div className='flex flex-col text-white text-md'><i onClick={()=>navigate('/developing')} className="flex justify-center cursor-pointer text-3xl text-white  ri-group-line"></i><p>Join as Collab</p></div>
        <button onClick={()=>navigate('/developing')} className='w-44 h-10 rounded-lg text-white text-lg bg-green'>Explore</button>
        
        </div>
      </section>
    </div>
  );
};

export default ProjectProfile;
