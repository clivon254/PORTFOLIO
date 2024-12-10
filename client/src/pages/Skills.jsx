
import { Table } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { HiExclamationCircle } from "react-icons/hi"
import { Link } from 'react-router-dom'
import axios from 'axios'
import {toast} from "sonner"


export default function Skills() {

  const {skills,setSkills , url ,token} = useContext(StoreContext)

  const [open ,setOpen] = useState(false)

  const [postIdToDelete , setPostIdToDelete] = useState(null)

  // handleDelete
  const handleDelete = async () => {

    try
    {

      const res = await axios.delete(url + `/api/skill/delete-skill/${postIdToDelete}`,{headers:{token}})

      if(res.data.success)
      {

        setSkills((prev) => 
          prev.filter((post) => post._id !== postIdToDelete)
        )

        toast.success('skill deleted successfully')

        setOpen(false)

      }

    }
    catch(error)
    {
      console.log(error.message)

      setOpen(true)
    }

  }

  return (

    <>

        <section className="section ">

          <h1 className="title2 text-center">Skills</h1>

          <div className="">

              <Table>

                  
                    <Table.Body className="table-title">

                        <Table.Row>

                          <Table.Cell>Image</Table.Cell>

                          <Table.Cell>title</Table.Cell>

                          <Table.Cell>Actions</Table.Cell>

                        </Table.Row>

                    </Table.Body>
                

                    {skills.length > 0 ? 
                        (
                          <>

                          {skills.map((skill,index) => (

                              <Table.Body key={index}>

                                  <Table.Row>

                                    <Table.Cell className="h-20 w-20">

                                      <img 
                                        src={skill?.image}
                                        alt="" 
                                        className="w-full h-full object-cover" 
                                      />

                                    </Table.Cell>

                                    <Table.Cell>
                                      {skill.title}
                                    </Table.Cell>

                                    <Table.Cell>

                                      <div className="flex items-center gap-x-2">

                                        <span className="">
                                          <Link to={`/update-skill/${skill._id}`}> <FaEdit size={24}/> </Link>
                                        </span>

                                        <span className="">
                                          <FaTrashAlt 
                                            size={24} 
                                            className="text-PrimaryLight"
                                            onClick={() => {
                                              setPostIdToDelete(skill._id)

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
                          <p className="text-center">There are not skill yet</p>
                        )
                      }

              </Table>

          </div>

        </section>

        {open && (

          <div className="w-full h-full grid place-content-center fixed top-0 left bg-black/50 backdrop-blur-sm">

            <div className="space-y-5 p-4 w-[90%] mx-auto shadow-md bg-BackgroundLight dark:bg-BackgroundDark transtion-all duration-500 ease-in rounded">

                <HiExclamationCircle size={44} className="mx-auto"/>

                <h2 className="text-center">Are you sure you want to delete this post</h2>

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
