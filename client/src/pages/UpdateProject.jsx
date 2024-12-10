

import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { StoreContext } from '../context/store'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from 'flowbite-react'
import axios from "axios"
import { BsCheck, BsChevronExpand } from "react-icons/bs"
import clsx from "clsx"



export default function UpdateProject() {

  const {url ,token}  = useContext(StoreContext)

  const [loading ,setLoading] = useState(false)

  const [error , setError] = useState(null)

  const [formData ,setFormData] = useState({})

  const [file ,setFile] = useState(null) 

  const [uploading ,setUploading] = useState(false) 
  
  const [imageUploadProgress , setImageUploadProgress] = useState(null)

  const [imageUploadError , setImageUploadError] = useState(null)

  const navigate = useNavigate()

  const [tags ,setTags] = useState(['React','Mongo db','Express','Node js','Next js','PostgressQL','Django'])

  const [selected ,setSelected] = useState([])

  console.log(formData)

  const {projectId} = useParams()

  // handleSelected
  const handleSelectedChange = (el) => {

    setSelected(el)

    setFormData({...formData , tags : el})

  }

  // handleUploadImage
  const handleUploadImage = () => {

    setUploading(true)

    setImageUploadProgress(null)

    setImageUploadError(null)

    if(!file)
    {
      setImageUploadError("no file selected")

      setUploading(false)

      return
    }

    try
    {
      const storage  = getStorage(app)

      const fileName = new Date().getTime() + "-"  + file.name 

      const storageRef = ref(storage ,fileName)

      const uploadTask = uploadBytesResumable(storageRef , file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {

          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

          setImageUploadProgress(progress.toFixed(0))
        },
        (error) => {

          console.log(error)

          setImageUploadError("there was an error uploading your image")

          setUploading(false)

          setImageUploadProgress(null)
        },
        () => {

          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

            setUploading(false)

            setImageUploadProgress(null)

            setFormData({ ...formData , image : downloadURL})
          })

        },
      )

    }
    catch(error)
    {
      console.log(error.message)

      setImageUploadError("image upload failed")

      setImageUploadProgress(null)

      setUploading(false)
    }

  }


  useEffect(() => {

    if(formData?.tags?.length < 1)
    {
      tags && setSelected([tags[0]])
    }
    else
    {
      setSelected(formData?.tags)
    }

  },[])


  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()
    
    setLoading(true)

    setError(null)

    try
    {

      const res = await axios.put(url + `/api/project/update-project/${projectId}`,formData ,{headers:{token}})

      if(res.data.success)
      {
        setLoading(false)

        toast.success("project updated successfully")

        navigate('/projects')

      }

    }
    catch(error)
    {
      console.log(error.message)

      setLoading(false)
    }

  }


  // handleChange 
  const handleChange = (e) => {

    setFormData({...formData , [e.target.name]:e.target.value})

  }

  // fetchProject
  const fetchProject = async () => {

    try
    {
      const res = await axios.get(url + `/api/project/get-project/${projectId}`)

      if(res.data.success)
      {
        setFormData(res.data.project)
      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  useEffect(() => {

    fetchProject()

  },[])

  return (

    <section className="section max-w-xl mx-auto">

      <h1 className="title2 text-center">Update Project</h1>


      <form onSubmit={handleSubmit} className="space-y-4">

          {/* title */}
          <div className="flex flex-col gap-y-2">

            <label htmlFor="" className="">Title</label>

            <input 
              type="text" 
              className="input"
              placeholder='title '
              name="title"
              value={formData.title}
              onChange={handleChange}
            />

          </div>

          {/* link */}
          <div className="flex flex-col gap-y-2">

            <label htmlFor="" className="label">Link</label>

            <input 
              type="text" 
              className="input"
              placeholder='url'
              name="link"
              value={formData.link}
              onChange={handleChange}
            />

          </div>

          {/* description */}
          <div className="flex flex-col gap-y-2">

            <label htmlFor="" className="label">Descriptipn</label>

            <textarea  
              className="input"
              placeholder='type here . . . . '
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

          </div>

          {/* tags */}
          <div className="">

            <p className="">Tags</p>

            <Listbox
              value={selected}
              onChange={(el) => handleSelectedChange(el)}
              multiple
            >

              <div className="relative mt-1">

               <ListboxButton className="relative w-full cursor-default rounded bg-transparent pl-3 pr-3 text-left px-3 py-2.5 2xl:py-3 border border-zinc-500 sm:text-sm">

                  <span className="block truncate">
                    {selected?.map((user) => user).join(",")}
                  </span>

                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <BsChevronExpand
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>

               </ListboxButton>


               <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >

                <ListboxOptions className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 foucus:outline-none sm:text-sm">
                  {tags?.map((user,index) => (

                    <ListboxOption
                      key={index}
                      className={({active}) => 
                        `relative cursor-default select-none py-2 pl-10 pr-4 
                       ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"} `
                      }
                      value={user}
                    >
                      {({selected}) => (

                        <>
                            <div className={clsx(
                              "flex items-center gap-2 truncate",
                              selected ? "font-medium" : "font-normal"
                            )}>

                              <span className="">{user}</span>

                            </div>
                            {selected ? 
                              (

                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <BsCheck className="h-5 w-5 " aria-hidden="true"/>
                                </span>
                              ) 
                              : 
                              (null)
                           }
                        </>

                      )}
                    </ListboxOption>

                  ))}
                </ListboxOptions>

               </Transition>

              </div>

            </Listbox>

          </div>

          {/* image */}
          <div className="flex flex-col gap-y-1">

            <input 
              type="file" 
              className="input"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {formData?.image && (

              <div className="h-[300px] w-full flex items-center justify-center">

                <img 
                  src={formData?.image}
                  alt="" 
                  className="h-full w-[3/4] object-cover" 
                />

              </div>

            )}


            <button 
              type='button'
              className="btn2 w-full rounded-full"
              disabled={uploading}
              onClick={() => handleUploadImage()}
            >
             {uploading ? 
             (
              <div className="flex justify-center items-center gap-x-4 text-sm">
                    <span className="loading"/> {`${imageUploadProgress} % uploaded`}
              </div>
             ) 
             : 
             ("upload image")
             }
            </button>

            {imageUploadError && (

              <Alert color="failure">{imageUploadError}</Alert>

            )}

          </div>

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
                : ("Update Skill")}
          </button>

          {error && (

            <Alert>{error}</Alert>

          )}

      </form>

    </section>

  )
}
