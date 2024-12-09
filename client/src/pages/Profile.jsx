

import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreContext } from '../context/store'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from '../firebase'
import { signInFailure, signOutUserSuccess, updateUserStart, updateUserSuccess } from '../redux/user/userSlice'
import axios from "axios"
import {toast} from "sonner"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Alert } from "flowbite-react"

export default function Profile() {

  const {currentUser,loading,error} = useSelector(state => state.user)

  const {url ,token} = useContext(StoreContext)

  const [formData , setFormData] = useState({})

  const [imageFile , setImageFile] = useState(null)

  const [imageFileUrl ,setImageFileUrl] = useState(null)

  const [imageFileUploading ,setImageFileUploading] = useState(null)

  const [imageFileUploadProgress ,setImageFileUploadProgress] = useState(null)

  const [imageFileUploadError ,setImageFileUploadError] = useState(null)

  const [updateError ,setupdateError] = useState(null)

  const filePickerRef = useRef()

  const dispatch = useDispatch()

  const navigate =  useNavigate()


  // handleImageChange
  const handleImageChange  = (e) => {

    const file = e.target.files[0]

    if(file)
    {
        setImageFile(file)

        setImageFileUrl(URL.createObjectURL(file))
    }

  }


  useEffect(() => {

    if(imageFile)
    {
        uploadImage()
    }

  },[imageFile])


  // uploadImage
  const uploadImage = () => {

    setImageFileUploading(true)

    setImageFileUploadError(null)

    const storage = getStorage(app)

    const fileName = new Date().getTime() + imageFile.name 

    const storageRef = ref(storage , fileName)

    const uploadTask = uploadBytesResumable(storageRef , imageFile)

    uploadTask.on(
        'state_changed',
        (snapshot) => {

            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

            setImageFileUploadProgress(progress.toFixed(0))

        },
        (error) => {

            setImageFileUploadError('Could not upload an image (File must be less then 5 MB')

            setImageFile(null)

            setImageFileUrl(null)

            setImageFileUploadProgress(null)

            setImageFileUploading(true)
        },
        () => {

            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                setImageFileUrl(downloadURL)

                setFormData({...formData , profilePicture : downloadURL })

                setImageFileUploading(false)
            })
        }
    )
  }


  // handleChange
  const handleChange = (e) => {

    setFormData({...formData , [e.target.name]:e.target.value})

  }


  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    if(Object.keys(formData).length === 0)
    {
      setupdateError("No Changes made")

      return
    }

    if(imageFileUploading)
    {
      setupdateError('Please wait for the image to finish uploading')

      return
    }

    try
    {
      setupdateError(null)

      dispatch(updateUserStart())

      const res = await axios.put(url + `/api/user/update-user/${currentUser._id}`,formData,{headers:{token}})

      if(res.data.success)
      {
        dispatch(updateUserSuccess(res.data.rest))

        toast.success("profile updated successfulll")
      }
    }
    catch(error)
    {
      if(error.response)
      {
        const errorMessage = error.response.data.message 

        dispatch(signInFailure(errorMessage))
      }
      else
      {
        dispatch(signInFailure(error))
      }
    }
    

  }


  // handleSignOut
  const handleSignOut = () => {

    dispatch(signOutUserSuccess())

    toast.success("signout successfull")

    localStorage.removeItem("token")

    navigate('/')
  }


  return (

    <section className="section  max-w-xl mx-auto space-y-10">

      <h1 className="title2 text-center">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">

        <input 
          type="file" 
          onChange={handleImageChange} 
          accept="image/*"
          ref={filePickerRef}
          hidden
        />

        {/* image */}
        <div 
          className="relative h-32 w-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >

          {imageFileUploadProgress && (

            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress} %`}
              strokeWidth={5}
              styles={{
                root:{
                  width:'100%',
                  height:'100%',
                  position:'absolute',
                  top:0,
                  left:0
                },
                path:{
                  stroke:`rgba(62 ,152 , 199 ,${imageFileUploadProgress})`
                }
              }}
            />

          )}

          <img 
            src={imageFileUrl || currentUser?.profilePicture} 
            alt="user" 
            className={`rounded-full w-full h-full object-cover border-8 border-SecondaryLight dark:bg-SecondaryDark
              ${imageFileUploadProgress && imageFileUploadProgress < 100 && `opacity-${imageFileUploadProgress}`}`}
          />

        </div>

        {imageFileUploadError && (

            <Alert>{imageFileUploadError}</Alert>
          
        )}

        {/* username */}
        <input 
          type="text" 
          className="input" 
          name="username"
          placeholder='username'
          onChange={handleChange}
          defaultValue={currentUser?.username}
        />

        {/* email */}
        <input 
          type="email" 
          className="input" 
          name="email"
          placeholder='name@example.com'
          onChange={handleChange}
          defaultValue={currentUser?.email}
        />

        {/* password */}
        <input 
          type="password" 
          className="input" 
          name="password"
          placeholder='***********'
          onChange={handleChange}
        />
        
         {/* button */}
         <button 
            type="submit" 
            className="btn w-full rounded-md"
            disabled={loading || imageFileUploading}
          >
              {loading ? 
              (
                <div className="flex justify-center items-center gap-x-4 text-sm">
                  <span className="loading"/> please wait . . . .
                </div>
              )
              : ("update")}
          </button>
          
          <div className="text-PrimaryLight flex items-center justify-between">

            <span className="cursor-pointer">Delete Account</span>

            <span 
              className="cursor-pointer"
              onClick={handleSignOut}
            >
              Sign out
            </span>

          </div>

      </form>

    </section>

  )

}
