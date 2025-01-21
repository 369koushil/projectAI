import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../config/axios';
import photo from "../assets/Screenshot_2025-01-21_004011-removebg-preview.png";
import { useNavigate } from 'react-router-dom';
import ProjectProfile from '../components/ProjectProfile';


const PublicProjectsPage = () => {

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

const navigate=useNavigate();
  const [projectSearch,setProjectSearch]=useState();
  const [searchResults,setSearchResultsArr]=useState([]);
  const [publicProjects,setPublicProjects]=useState([]);

  useEffect(()=>{
    axiosInstance.get('/projects/public-projects',{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    }).then(res=>{
      setPublicProjects(res.data.publicProjects);
      console.log(res.data)
    }).catch(err=>{
      console.log(err)
    })
  },[])

  useEffect(()=>{
    const name=encodeURIComponent(projectSearch)
    axiosInstance.get(`/projects/get-project-name/${name}`,{
       headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    }).then(res=>{
      setSearchResultsArr(Array.isArray(res.data) ? res.data : []);
      console.log(res.data)
    }).catch(err=>{
      console.log(err)
    })
  },[projectSearch])
 
  return (
    <section className="bg-primary flex flex-col  h-screen relative">
      <header className="text-black sticky top-0 z-50 flex bg-white items-center max-h-20">
        <div className="flex flex-row items-center justify-around gap-x-28 relative w-full">
          <img className="h-20" src={photo} alt="logo" />
          <div className="relative w-full max-w-md">
            <div className="flex flex-row">
              <i className="flex items-center w-10 justify-center rounded-sm text-2xl border-2 border-red-300 ri-search-line"></i>
              <input
                onChange={(e) => setProjectSearch(e.target.value)}
                placeholder="Enter project name"
                className="font-mono text-lg border-t-2 border-b-2 border-r-2 border-red-300 rounded-tr-sm rounded-br-2 w-full px-2 h-12 outline-none"
              />
            </div>
            {projectSearch && (
              <div className="absolute top-full left-0 z-20 w-full bg-white shadow-lg rounded-md mt-1 border border-gray-300 max-h-60 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((obj) => (
                    <div
                      key={obj.id}
                      onClick={() => {
                        navigate(`/project/${obj.id}`, {
                          state: obj,
                        });
                      }}
                      className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                    >
                      {obj.name}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 px-4 py-2">No results found</div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4 text-gray-800 h-full items-center text-lg justify-end grow">
          <div
            onClick={() => navigate('/')}
            className="font-mono cursor-pointer hover:text-orange flex items-center h-full w-24"
          >
            Home
          </div>
          <div
            onClick={() => {
              navigate('/profile');
            }}
            className="bg-orange cursor-pointer h-full flex items-center justify-center font-mono w-32 hover:bg-yellow"
          >
            Profile
          </div>
        </div>
      </header>
      <main className="bg-primary w-full grow flex pt-8">
        <div className="flex gap-y-12 flex-col w-full pl-6 pr-6">
          <div className="font-mono text-white text-lg flex items-center justify-center">
            <p className="text-3xl">Public Projects</p> 
          </div>
          <div className="flex flex-wrap flex-col w-full overflow-y-auto gap-y-12 gap-x-12">
            {publicProjects.map((obj) => (
              <ProjectProfile 
                key={obj._id}
                onClick={() =>
                  navigate(`/${obj._id}`, {
                    state: obj,
                  })
                }
                title={obj.name}
                description={obj.description}
              />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
  
}  

export default PublicProjectsPage
