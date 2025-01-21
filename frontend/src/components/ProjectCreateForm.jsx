import React from 'react'
import { useState } from 'react';
import axiosInstance from '../config/axios';

const ProjectCreateForm = (props) => {

         const [ projectName, setProjectName ] = useState("")
        const [projectBio,setProjectBio]=useState("");
        const [projectVisibility,setProjectVisibility]=useState("private");
        function createProject(e){
            e.preventDefault();
            axiosInstance.post('/projects/create',{
                name:projectName,
                description:projectBio,
                visibility:projectVisibility
            },{
              headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            }).then(res=>{
                console.log(res.data)
            }).finally(err=>console.log(err))
            props.setIsModalOpen(false)
            props.onProjectCreated(res.data.project); 
        }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className=" p-6 rounded-md shadow-md w-1/3 bg-form">
      <h2 className="text-xl mb-4">Create New Project</h2>
      <form onSubmit={createProject}>
        <div className="mb-4">
          <label className="block text-sm font-medium ">
            Project Name
          </label>
          <input
            onChange={(e) => setProjectName(e.target.value)}
            value={projectName}
            type="text"
            className="mt-1 block w-full p-2 border bg-form border-gray-300 rounded-md"
            required
          />

          <label className="block text-sm font-medium  mt-4">
            Project Description
          </label>
          <textarea
            onChange={(e) => setProjectBio(e.target.value)}
            value={projectBio}
            type="text"
            className="mt-1 block bg-form w-full p-2 border border-gray-300 rounded-md"
            required
          />

          <label className="block text-sm font-medium  mt-4">
            Project Visibility
          </label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
              defaultChecked
                type="radio"
                name="visibility"
                value="private"
                className="form-radio h-4 w-4 text-blue-600"
                onChange={(e) => setProjectVisibility(e.target.value)}
              />
              <span className="ml-2 ">Private</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
              
                type="radio"
                name="visibility"
                value="public"
                className="form-radio h-4 w-4 text-blue-600"
                onChange={(e) => setProjectVisibility(e.target.value)}
              />
              <span className="ml-2 ">Public</span>
            </label>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
            onClick={() => props.setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
         
            type="submit"
            className="px-4 py-2 bg-green text-white rounded-md"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default ProjectCreateForm
