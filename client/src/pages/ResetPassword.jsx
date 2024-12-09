

import React, { useContext, useState } from 'react'
import Logo from '../components/Logo'
import { StoreContext } from '../context/store'
import {Alert} from "flowbite-react"
import axios from "axios"
import {toast} from "sonner"
import { useParams } from 'react-router-dom'



export default function ResetPassword() {

  const {url,setToken} = useContext(StoreContext)

  const  [loading , setLoading] = useState(false)

  const [error ,setError] = useState(null)

  const [formData, setFormData] = useState({})

  const token = useParams()


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

      const res = await axios.post(url + `/api/auth/reset-password/${token}`,formData)

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

          <h1 className="text-center title3">Reset password</h1>

          <div className="space-y-4">

            {/* password */}
            <div className="w-full flex flex-col gap-y-2">

              <label htmlFor="" className="label">password</label>

              <input 
                type="password" 
                className="input w-full"
                placeholder='***************'
                value={formData.password}
                name="password"
                onChange={handleChange}
              />

            </div>

            {/* confirm password */}
            <div className="w-full flex flex-col gap-y-2">

              <label htmlFor="" className="label">confirm password</label>

              <input 
                type="password" 
                className="input w-full"
                placeholder='***************'
                value={formData.confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
              />

            </div>

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
