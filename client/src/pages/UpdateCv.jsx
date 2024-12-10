

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { Alert, Table } from 'flowbite-react'
import {toast} from "sonner"
import axios from 'axios'
import { StoreContext } from '../context/store'



export default function UpdateCv() {

  const {cvId} = useParams()

  const {url,token,Cvs,setCvs} = useContext(StoreContext)

  const [file ,setFile] = useState(null)

  const [uploading ,setUploading] = useState(false)

  const [fileUploadProgress ,setFileUploadProgress] = useState(null)

  const [fileUploadError ,setfileUploadError] = useState(null)

  const [formData ,setFormData] = useState({})

  const [loading , setLoading] = useState(false)

  const [error , setError] = useState(false)

  const navigate = useNavigate()

   // handleUploadFile
   const handleUploadFile = () => {

    setUploading(true)

    setFileUploadProgress(null)

    setfileUploadError(null)

    if(!file)
    {
      setfileUploadError("Please select a cv")

      return 
    }

    const storage = getStorage(app)

    const fileName = new Date().getTime() + "-" + file.name 

    const storageRef = ref(storage ,fileName)

    const uploadTask = uploadBytesResumable(storageRef , file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

        setFileUploadProgress(progress.toFixed(0))

      },
      (error) => {

        setFileUploadProgress(null)

        setUploading(false)

        setfileUploadError("There was an issuu uploading the cv")

      },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

          setFileUploadProgress(null)

          setfileUploadError(null)

          setUploading(false)

          setFormData({...formData , fileUrl : downloadURL})

          toast.success("cv uploaded successfully")
        })
      }
    )

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    setError(null)

    if(!formData.fileUrl)
    {
      setError("please upload cv")

      return
    }

    try
    {

      const res = await axios.put(url + `/api/cv/update-cv/${cvId}`,formData,{headers:{token}})

      if(res.data.success)
      {
         setLoading(false)

         toast.success("cv file updated successfully")

        navigate('/cv')
      }

    }
    catch(error)
    {
      console.log(error)

      setError(error.message)

      setLoading(false)
    }

  }

  console.log(formData)

  //  fetchCv
  const fetchCv = async () => {

    try
    {
        const res = await axios.get(url + `/api/cv/get-cv/${cvId}`,formData,{headers : {token}})

        if(res.data.success)
        {
            setFormData(res.data.cv)
        }
    }
    catch(error)
    {
        console.log(error.message)
    }

  }

  useEffect(() => {

    fetchCv()

  },[])

  return (

    <section className="section">

        <h1 className="title2 text-center">Update CV</h1>

        <div className="space-y-5">
        
        <h1 className="title3">Upload cv</h1>

        <form onSubmit={handleSubmit} className="space-y-5">

            {/* title */}
            <div className="flex flex-col gap-y-2">

                <label htmlFor="" className="label">Title</label>

                <input 
                type="text" 
                className="input" 
                onChange={(e) => setFormData({...formData , title : e.target.value})}
                value={formData.title}
                placeholder='title . . . . .'
                />

            </div>

            {/* upload cv */}
            <div className="flex flex-col gap-y-2">

                <input 
                    type="file" 
                    className="input" 
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <button 
                    className="btn2 w-full rounded-full"
                    onClick={() => handleUploadFile()}
                    type="button"
                    disabled={uploading}
                >
                {uploading ? 
                    (
                    <div className="flex items-center justify-center gap-x-2">
                        <span className="loading"/> {`${fileUploadProgress} % uploaded`}
                    </div>
                    ) 
                    : 
                    ("upload cv ")
                }
                </button>

                {fileUploadError && (

                <Alert color="failure">{fileUploadError}</Alert>

                )}

            </div>

            {/* button */}
            <button 
                type="submit"
                className="btn rounded w-full"
                disabled={loading || uploading}
            >
                {loading ? 
                (
                    <div className="flex items-center justify-center gap-x-3">
                        <span className="loading"/> please wait . . .
                    </div>
                ) 
                : 
                ("update file") 
                }
            </button>

            {error && (

                <Alert color="failure">{error}</Alert>

            )}

        </form>

        </div>

    </section>

  )

}
