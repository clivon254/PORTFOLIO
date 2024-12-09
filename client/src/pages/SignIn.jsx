

import React, { useContext, useState } from 'react'
import Logo from '../components/Logo'
import { StoreContext } from '../context/store'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import {Alert} from "flowbite-react"
import axios from "axios"
import {toast} from "sonner"



export default function SignIn() {

  const {url,setToken} = useContext(StoreContext)

  const {error,loading} = useSelector(state => state.user)

  const [formData, setFormData] = useState({})

  const dispatch = useDispatch()

  const navigate = useNavigate()


  // handleChange
  const handleChange = (e) => {

    setFormData({...formData , [e.target.name]: e.target.value})
    
  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {

      dispatch(signInStart())

      const res = await axios.post(url + "/api/auth/sign-in",formData)

      if(res.data.success)
      {
        dispatch(signInSuccess(res.data.rest))

        setToken(res.data.token)

        localStorage.setItem("token" ,res.data.token)

        navigate('/')
      }

    }
    catch(error)
    {
      if(error.response)
      {
        const errorMessage = error.response.data.message

        dispatch(signInFailure(errorMessage))

        console.log(errorMessage)
      }
      else
      {
        dispatch(signInFailure(error))

        console.log(error)
      }

    }

  }

  console.log(formData)

  console.log(url)

  return (
    
    <section className="w-full flex items-center justify-center min-h-screen p-5">


      <div className="w-full flex flex-col items-center gap-y-10 ">

        {/* logo */}
        <Logo />

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto w-full space-y-6">

          <h1 className="title3 text-center">sign in</h1>

          <div className="space-y-4">

            {/* email */}
            <div className="w-full flex flex-col">

              <label htmlFor="" className="label">Email</label>

              <input 
                type="email" 
                className="input w-full"
                placeholder='name@example.com'
                value={formData.email}
                name="email"
                onChange={handleChange}
              />

            </div>

            {/* password */}
            <div className="w-full flex flex-col">

              <label htmlFor="" className="label">Password</label>

              <input
                type="password" 
                className="input w-full"
                placeholder='**********'
                value={formData.password}
                name="password"
                onChange={handleChange} 
              />

            </div>

            {/* button */}
            <button 
              type="submit" 
              className="btn w-full rounded-md"
              disabled={loading}
            >
              {loading ? 
              (
                <div className="flex justify-center items-center gap-x-4 text-sm">
                  <span className="loading"/> please wait . . . .
                </div>
              )
              : ("sign in")}
            </button>
              

            <p className="text-xs font-semibold text-SecondaryLight">

              <Link to="/forgot-password">Forgot password?</Link>

            </p> 
            
            {error && (

              <Alert color='failure' className="">
                {error}
              </Alert>

            )}

          </div>

        </form>

      </div>


    </section>

  )

}
