import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import ProjectCreateForm from "../components/ProjectCreateForm";
import photo from "../assets/Screenshot_2025-01-21_004011-removebg-preview.png";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [project, setProject] = useState([]);
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    console.log(user);
    axios
      .get("/projects/all")
      .then((res) => {
        console.log(res.data);
        setProject(res.data.projects);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get("/users/profile").then((res) => {
      console.log(res.data);
      setUser(res.data);
      console.log(user);
    });
  }, []);

  return (
    <main className="bg-primary h-screen flex flex-col  text-white">
      <header className="text-black sticky top-0 z-50  flex bg-white items-center max-h-20 ">
        <div>
          <img className=" h-20 " src={photo} alt="logo" />
        </div>
        <div className="flex gap-4 text-gray-800 h-full   text-lg justify-end grow ">
          <div className="font-mono flex items-center  w-24 border-red-400">
            Home
          </div>
          <div className="font-mono flex items-center w-24">
            Public Projects
          </div>
          <div
            onClick={() => {
              navigate("/profile");
            }}
            className="bg-orange cursor-pointer flex items-center justify-center  font-mono w-32 hover:bg-yellow  "
          >
            Profile
          </div>
        </div>
      </header>
      <div className="p-4 pt-12 gap-y-16 h-full projects grow bg-primary flex flex-wrap flex-row">
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-yellow project p-4 border h-40 w-44 text-black hover:bg-orange border-slate-300 rounded-md"
          >
            New Project
            <i className="ri-link ml-2"></i>
          </button>
        </div>

        <div className="flex flex-row  flex-wrap gap-y-12 bg-primary gap-x-8">
          {project.map((project) => (
            <div 
            key={project._id}
            onClick={() => {
                navigate(`/project`, {
                    state: { project }
                });
            }}
            className="project flex-wrap flex flex-col h-52 w-72 gap-2 cursor-pointer p-4 border border-gray-300 rounded-md max-w-52 
                       transition-transform transform hover:scale-105 hover:shadow-[12px_12px_0px_0px_rgba(255,215,0,0.8)] 
                       hover:z-10 hover:bg-darkblue"
          >
            <h2 className="font-semibold font-mono text-lg">
              {project.name}
            </h2>
          
            <div className="flex gap-2">
              <p>
                <small> <i className="ri-user-line"></i> Collaborators</small> :
              </p>
              {project.users.length}
            </div>
          </div>
          
          ))}
        </div>
      </div>
      {isModalOpen && <ProjectCreateForm setIsModalOpen={setIsModalOpen} />}
    </main>
  );
};

export default Home;
