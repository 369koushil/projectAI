import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'
import Project from '../screens/Project'
import UserAuth from '../auth/UserAuth'
import UserProfile from '../screens/UserProfile'
import FileUpload from '../screens/FileUpload'
import FileuploadImagekit from '../../upload/FileuploadImagekit'
import ProjectDisplay from '../components/ProjectDisplay'

const AppRoutes = () => {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<UserAuth><Home /></UserAuth>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='/profile' element={<UserProfile/>}/>
                <Route path='/upload' element={<FileuploadImagekit/>}/>
                <Route path="/project" element={<UserAuth><Project /></UserAuth>} />
                <Route path='/box' element={<ProjectDisplay></ProjectDisplay>}/>
            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes