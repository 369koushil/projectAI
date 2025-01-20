import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axios";
import photo from '../assets/154089176.png';
import ProjectDisplay from "../components/ProjectDisplay";
import ProjectProfile from "../components/ProjectProfile";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const UserProfile = () => { 
  const navigate=useNavigate();
  
  const [user, setUser] = useState({
    username: "",
    bio: "",
    socialProfiles: {
      linkedIn: "www",
      twitter: "www",
      reddit: "www",
    },
    profileUrl: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [projects,setProjects]=useState([]);

  useEffect(() => {
    axiosInstance.get("users/profile").then((res) => {
      setUser(res.data.user);
    });

    axiosInstance.get('/projects/getuserprojects').then(res=>{
      setProjects(res.data.userProjects)
      console.log(res.data)
    }).finally(err=>{
      console.log(err);
    })
  }, []);

  const handleSave = () => {
    try {
      axiosInstance.put("/users/update-profile", user).then((res) => {
        console.log(res.data);
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  return (
    <main className="flex flex-row overflow-y-hidden ">
       <div onClick={()=>navigate('/')} className="fixed text-white top-2 left-4   cursor-pointer  h-12 w-12 rounded-full bg-darkblue flex items-center justify-center  "><i className="  ri-arrow-left-fill"></i></div>
      <div className="fixed top-2 right-8 text-white   cursor-pointer  h-12 w-12 rounded-full bg-darkblue flex items-center justify-center "><i onClick={()=>{
          navigate('/login');
          axiosInstance.get('/users/logout').then(res=>console.log(res.data)).finally(err=>console.log(err))
          localStorage.removeItem('token')
          localStorage.removeItem('user')

      }} class="ri-logout-box-r-line  "></i></div>
      <section className=" border-r-2 w-1/6 grow  border-r-gray-400 h-screen  px-16 py-8  bg-primary text-gray-200 flex flex-col  space-y-8">

      
      <div className="flex flex-col  justify-start">
        
        {isEditing ? (

          <>
            <div className="mt-48 max-w-80">
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, username: e.target.value }))
              }
              className="text-3xl  text-white bg-darkblue border rounded-lg px-3 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="bio"
              value={user.bio}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, bio: e.target.value }))
              }
              className="text-gray-300 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 mt-3 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
            </div>
          </>
        ) : (
          <div className="flex gap-4 flex-col">
           <img className="w-72 h-72 rounded-full" src={photo} alt="" />

            <h1 className="text-3xl  text-white">
              {"@"+user.username || "Anonymous"}
            </h1>
            <p className="text-gray-300 text-left mt-3 px-4 max-w-2xl">
              {user.bio || "No bio available"}
            </p>
          </div>
        )}
      </div>

      {/* Social Links */}
      {isEditing ? (
        
        <div className="w-full max-w-80 space-y-1">
           <div>


           </div>
          {["linkedIn", "twitter", "reddit"].map((platform) => (
            <input
              key={platform}
              type="url"
              name={platform}
              value={user.socialProfiles[platform]}
              placeholder={`${
                platform.charAt(0).toUpperCase() + platform.slice(1)
              } URL`}
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  socialProfiles: {
                    ...prev.socialProfiles,
                    [platform]: e.target.value,
                  },
                }))
              }
              className="w-full text-gray-200 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 space-y-2">
          {Object.entries(user.socialProfiles || {}).map(
            ([platform, url]) =>
              url && (
                <p key={platform}>
                  <span className="font-bold text-white">
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}:
                  </span>{" "}
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:underline"
                  >
                    {url}
                  </a>
                </p>
              )
          )}
        </div>
      )}

      {/* Edit Button */}
      <button
        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        className={`mt-6 px-6 py-2 max-w-72 bg-green rounded-lg font-semibold ${
          isEditing
            ? "bg-green-500 hover:bg-green-600"
            : "bg-blue-500 "
        } text-white shadow-md transition-all`}
      >
        {isEditing ? "Save Changes" : "Edit Profile"}
      </button>
    </section>
    <section className="flex flex-col pt-2 bg-primary h-screen w-4/6 gap-y-8">
    <div className="w-full text-center"><h2 className="font-mono text-2xl text-white">Your Projects</h2></div>
    <div className=" overflow-y-auto  flex flex-row pl-20 p-6 gap-y-12 gap-x-12 flex-wrap bg-primary ">
    
    {
  projects.length > 0 ? (
    projects.map((obj) => <ProjectDisplay title={obj.name}  />)
  ) : (
    <div className=" "><h3 className="text-white font-mono text-3xl">No projects found</h3></div>
  )
}
      
      </div>
    </section>
      
    </main>
  );
};

export default UserProfile;
