import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserAuth = ({ children }) => {

    const [ loading, setLoading ] = useState(true)
    const token = localStorage.getItem('token')
    const userData=JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate()




    useEffect(() => {
        if (userData) {
            setLoading(false)
        }
    
        if (!token) {
            navigate('/login')
        }
        if(token){
            setLoading(false)
            navigate('/')
        }

        if (!userData) {
            navigate('/login')
        }

    }, [])

    if (loading) {
        return <div>Loading...</div>
    }


    return (
        <>
            {children}</>
    )
}

export default UserAuth