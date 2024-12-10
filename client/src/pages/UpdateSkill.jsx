

import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Alert } from "flowbite-react"

export default function UpdateSkill() {

  const [loading , setLoading] = useState(false)

  const [error , setError] = useState(false)

  const {url ,token} = useContext(StoreContext)

  const [uploading , setUploading] = useState(false)

  const [imageUploadProgress ,setImageUploadProgress] = useState(null)

  const [imageUploadError ,setImageUploadError] = useState(null)

  const [formData ,setFormData] = useState({})

  const [file ,setFile] = useState(null)

  const navigate = useNavigate()

  console.log(formData)

  const [skillLoading ,setSkillLoading] = useState(false)

  const {skillId} = useParams()


  // handleImageUpload
  const handleUploadImage = async () => {

    try
    {

      if(!file)
      {
        setImageUploadError("Please select an image")

        return
      }

      setUploading(true)

      const storage = getStorage(app)

      const fileName = new Date().getTime() + '-' + file.name 

      const storageRef = ref(storage , fileName)

      const uploadTask = uploadBytesResumable(storageRef , file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {

          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

          setImageUploadProgress(progress.toFixed(0))
        },
        (error) => {

          setImageUploadProgress(null)

          setUploading(false)

          setImageUploadError('Image upload failed')
        },
        () => {

          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

            setImageUploadProgress(null)

            setUploading(false)

            setImageUploadError(null)

            setFormData({...formData , image : downloadURL})
          })
        }
      )
    }
    catch(error)
    {

      setImageUploadError('Image upload Error failed')

      setImageUploadProgress(null)

      console.log(error)
    }

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {

      const res = await axios.put(url + `/api/skill/update-skill/${skillId}`, formData,{headers:{token}})

      if(res.data.success)
      {
        navigate('/skills')

        setLoading(false)

        toast.success("skill updated successfully")
      }
     

    }
    catch(error)
    {
      console.log(error)
    }

  }

  // handleChange
  const handleChange = (e) => {

    setFormData({...formData , [e.target.name]:e.target.value})

  }

  // fetchSkill
  const fetchSkill = async () => {

    try
    {
        setSkillLoading(true)

        const res = await axios.get(url + `/api/skill/get-skill/${skillId}`)

        if(res.data.success)
        {
            setFormData(res.data.skill)

            setSkillLoading(false)
        }

    }
    catch(error)
    {
        console.log(error.message)
    }

  }


  useEffect(() => {

    fetchSkill()

  },[])


  return (

   <section className="section max-w-xl mx-auto space-y-10">

    <h1 className="title2 text-center">Update Skill</h1>

    <form onSubmit={handleSubmit} className="space-y-5">
      
      {/* title */}
      <div className="flex flex-col gap-y-2">

        <label htmlFor="" className="label">Title</label>

        <input 
          type="text" 
          className="input"
          onChange={handleChange}
          placeholder='title'
          name="title"
          value={formData.title}
        />

      </div>

      {/* description */}
      <div className="flex flex-col gap-y-2">

        <label htmlFor="" className="label">Description</label>

        <textarea 
          onChange={handleChange}
          placeholder='type something . . . . . . '
          name="description"
          value={formData.description}
          className="input"
        />

      </div>

      {/* image */}
      <div className="flex flex-col gap-y-2">

        <label htmlFor="" className="label">Images</label>

        <input 
          type="file" 
          className="input" 
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button 
          type="button" 
          disabled={uploading}
          className="bg-black py-2 px-1 rounded-full text-white disabled:op"
          onClick={handleUploadImage}
        >
          {uploading ? (

            <div className="flex items-center justify-center gap-x-4">

              <span className="loading"/> {`${imageUploadProgress} % uploaded`}

            </div>

          ) : ("upload image ")}
        </button>

      </div>

      {imageUploadError && (

        <Alert>{imageUploadError}</Alert>

      )}

      {formData?.image && (

        <div className="h-[300px] w-full flex items-center justify-center">

          <img 
            src={formData?.image}
            alt="" 
            className="h-full w-[3/4] object-cover" 
          />

        </div>

      )}

       {/* button */}
       <button 
          type="submit" 
          className="btn w-full rounded-md"
          disabled={loading || uploading}
        >
            {loading ? 
            (
              <div className="flex justify-center items-center gap-x-4 text-sm">
                <span className="loading"/> please wait . . . .
              </div>
            )
            : ("update Skill")}
      </button>

      {error && (

        <Alert>{error}</Alert>
      )}

    </form>

   </section>

  )
}
