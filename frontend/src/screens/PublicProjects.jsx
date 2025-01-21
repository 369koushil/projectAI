import React, { useEffect, useState } from 'react'
import axios from "../config/axios"


const PublicProjects = () => {

    const[publicProjects,setPublicProjects]=useState([]);

    useEffect(()=>{
        axios.get('/projects/public-projects',{
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        }).then(res=>{
            setPublicProjects(res.data.publicProjects);
        }).finally(err=>{
            setPublicProjects([{name:"error",description:"error while loading the data"}])
            console.log(err);
        })
    })

  return (
    <div>
      
    </div>
  )
}

export default PublicProjects
