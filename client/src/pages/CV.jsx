

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useContext, useState } from 'react'
import { app } from '../firebase'
import { Alert, Table } from 'flowbite-react'
import {toast} from "sonner"
import axios from 'axios'
import { StoreContext } from '../context/store'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import {HiExclamationCircle} from "react-icons/hi"


export default function CV() {

  const {url,token,Cvs,setCvs} = useContext(StoreContext)

  const [file ,setFile] = useState(null)

  const [uploading ,setUploading] = useState(false)

  const [fileUploadProgress ,setFileUploadProgress] = useState(null)

  const [fileUploadError ,setfileUploadError] = useState(null)

  const [formData ,setFormData] = useState({})

  const [loading , setLoading] = useState(false)

  const [error , setError] = useState(false)

  const [open ,setOpen] = useState(false)

  const [cvIdToDelete , setCvIdToDelete] = useState(null)


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

        const res = await axios.post(url + "/api/cv/add-cv",formData,{headers:{token}})

        if(res.data.success)
        {
           setLoading(false)

           toast.success("cv file created successfully")
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

    // handleDelete
    const handleDelete = async () => {

      try
      {

        const res = await axios.delete(url + `/api/cv/delete-cv/${cvIdToDelete}`,{headers : {token}})

        if(res.data.success)
        {
          toast.success("cv file deleted successfully")

          setCvs((prev) => 
            prev.filter((cv) => cv._id !== cvIdToDelete)
          )

        }

      }
      catch(error)
      {
        console.log(error)

        setOpen(false)
      }

    }


  return (
    
    <>

        <section className="section space-y-10 max-w-xl mx-auto">

          <h1 className="title2 text-center">MY CV</h1>

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
                    ("Add file") 
                  }
                </button>

                {error && (

                  <Alert color="failure">{error}</Alert>

                )}

            </form>

          </div>

          <div className="space-y-5">
            
            <h1 className="title3">CV</h1>

            <div className="">

              <Table>

                <Table.Body className="table-title">

                  <Table.Row>

                    <Table.Cell></Table.Cell>

                    <Table.Cell>Title</Table.Cell>

                    <Table.Cell>Actions</Table.Cell>

                  </Table.Row>

                </Table.Body>

                  {Cvs?.length > 0 ? 
                    (
                      <>

                        {Cvs.map((cv,index) => (

                            <Table.Body key={index} className="">

                              <Table.Row>

                                <Table.Cell>{index+1}.</Table.Cell>

                                <Table.Cell>{cv.title}</Table.Cell>

                                <Table.Cell>

                                  <div className="flex items-center  gap-x-3">

                                    <span className="">
                                      <Link to={`/update-cv/${cv._id}`}> <FaEdit size={30}/> </Link>
                                    </span>

                                    <span className="">
                                      <FaTrashAlt 
                                          size={30} 
                                          className="text-PrimaryLight"
                                          onClick={() => {

                                            setCvIdToDelete(cv._id)

                                            setOpen(true)

                                          }}
                                      />
                                    </span>

                                  </div>

                                </Table.Cell>

                              </Table.Row>

                          </Table.Body>

                        ))}

                      </>
                    )
                    : 
                    (
                      <p className="">There are no cvs yet</p>
                    )
                  }
              

              </Table>

            </div>

          </div>

        </section>

        {open && (

            <div className="w-full h-full grid place-content-center fixed top-0 left bg-black/50 backdrop-blur-sm">

              <div className="space-y-5 p-4 w-[90%] mx-auto shadow-md bg-BackgroundLight dark:bg-BackgroundDark transtion-all duration-500 ease-in rounded">

                  <HiExclamationCircle size={44} className="mx-auto"/>

                  <h2 className="text-center">Are you sure you want to delete this cv</h2>

                  <div className="flex justify-between items-center">

                    <button 
                      className="btn rounded-full"
                      onClick={() => handleDelete()}
                    >
                      Yes I'm sure
                    </button>

                    <button 
                      className="btn2 rounded-full"
                      onClick={() => setOpen(false)}
                    >
                      cancel
                    </button>

                  </div>

              </div>

            </div>

        )}

    </>

  )

}
