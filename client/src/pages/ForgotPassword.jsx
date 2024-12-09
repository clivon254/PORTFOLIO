

import React, { useContext, useState } from 'react'
import Logo from '../components/Logo'
import { StoreContext } from '../context/store'
import {Alert} from "flowbite-react"
import axios from "axios"
import {toast} from "sonner"



export default function ForgotPassword() {

  const {url,setToken} = useContext(StoreContext)

  const  [loading , setLoading] = useState(false)

  const [error ,setError] = useState(null)

  const [formData, setFormData] = useState({})


  // handleChange
  const handleChange = (e) => {

    setFormData({...formData , [e.target.name]: e.target.value})
    
  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {

      setLoading(true)

      setError(null)

      const res = await axios.post(url + "/api/auth/forgot-password",formData)

      if(res.data.success)
      {

        setLoading(false)

        setError(null)
        
        toast.success("Link sent to your email")

        setFormData({})

      }

    }
    catch(error)
    {

      if(error.response)
      {
        const errorMessage = error.response.data.message

        setError(errorMessage)

        console.log(errorMessage)

        setLoading(false)
      }
      else
      {
        setError(error)

        console.log(error)

        setLoading(false)
      }

    }

  }

  console.log(formData)


  return (
    
    <section className="w-full flex items-center justify-center min-h-screen p-5">


      <div className="w-full flex flex-col items-center gap-y-10 ">

        {/* logo */}
        <Logo />

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto w-full space-y-6">

          <p className="text-xl text-center">Enter your signed up email and a link will be sent to youn email to reset the password</p>

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
              : ("submit")}
            </button>
              
            
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
