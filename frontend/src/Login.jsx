import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = ({ setToken, setUserInfo }) => {
    const navigate = useNavigate();
    const [currentState, setCurrentState] = useState("Login")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Get backendUrl from window/global or pass as prop if needed
    const backendUrl = "http://localhost:5001";

    const handleFormSubmission = async (event) => {
        event.preventDefault()
        try {
            if (currentState === "Sign Up") {
                const response = await axios.post("http://localhost:5001/api/users/register", { name, email, password })
                if (response.data.success) {
                    toast.success(response.data.message)
                    setCurrentState("Login")
                    navigate('/login') // If using React Router, or just switch state
                } else {
                    toast.error(response.data.message)
                }
            } else {
                const response = await axios.post("http://localhost:5001/api/users/login", { email, password })
                if (response.data.success) {
                    setToken(response.data.token)
                    setUserInfo({ name: response.data.name || '', email: response.data.email || email })
                    localStorage.setItem('token', response.data.token); // Store token in localStorage
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            }
        } catch (error) {
            console.log(error)
            // Show backend error message if available
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Something went wrong")
            }
        }
    }


  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form onSubmit={handleFormSubmission} className='bg-white w-full max-w-md mx-auto mt-10 p-8 rounded-2xl shadow-lg space-y-6'>
        <div className='text-center'>
            <p className='text-2xl font-bold text-gray-800'>{currentState}</p>
        </div>
        {
            currentState === "Login" ? null : (
                <input type = "text" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Name' required className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500'/>
            )
        }

        <input type = "email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email' required className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500'/>
        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Password' required className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500' />
        
        <div className='flex justify-between text-sm text-blue-600'>
            <p className='cursor-pointer hover:underline'>Forgot password</p>
            {
                currentState === "Login" ? (
                    <p className='cursor-pointer hover:underline' onClick={()=> setCurrentState("Sign Up")}>Create account</p>
                ): (
                    <p className='cursor-pointer hover:underline' onClick={()=> setCurrentState("Login")}>Login Here</p>
                )
            }
        </div>
        <button type="submit" className='w-full bg-green-600 hover:bg-green-800 text-white font-semibold py-3 rounded-md transition duration-300'>{currentState === "Login" ? "Sign In ":"Sign Up"}</button>
      </form>
    </div>
  )
}

export default Login
