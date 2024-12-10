

import { Table } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { Link } from 'react-router-dom'
import {HiExclamationCircle} from "react-icons/hi"
import axios from 'axios'
import { toast } from 'sonner'



export default function Projects() {

  const {url,token} = useContext(StoreContext)

  const {projects ,setProjects} = useContext(StoreContext)

  const [open ,setOpen] = useState(false)

  const [projectIdToDelete ,setProjectIdToDelete] = useState(null)

  const handleDelete = async () => {

    try
    {
      const res = await axios.delete(url + `/api/project/delete-project/${projectIdToDelete}`,{headers:{token}})

      if(res.data.success)
      {

        setProjects((prev) => 
          prev.filter((project) => project._id !== projectIdToDelete)
        )

        toast.success("project has been deleted")

        setOpen(false)
      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  return (
    
    <>

      <section className="section">

        <h1 className="title2 text-center">Projects</h1>

        <div className="tabler">

          <Table>

            <Table.Body className="table-title">

              <Table.Row>

                <Table.Cell></Table.Cell>

                <Table.Cell>image</Table.Cell>

                <Table.Cell>title</Table.Cell>

                <Table.Cell>Link</Table.Cell>

                <Table.Cell>Action</Table.Cell>

              </Table.Row>

            </Table.Body>

            {projects.length > 0 ? 
              (
                <>
                  {projects.map((project,index) => (

                    <Table.Body key={index}>

                      <Table.Row >

                        <Table.Cell>{index + 1}.</Table.Cell>

                        <Table.Cell className='h-20 w-20'>

                          <img 
                            src={project.image} 
                            alt="imge" 
                            className="w-full h-full" 
                          />

                        </Table.Cell>

                        <Table.Cell>
                          {project?.title}
                        </Table.Cell>

                        <Table.Cell>
                          <a 
                            href={project.link}
                            className=""
                          >
                            site link
                          </a>
                          {project?.link}
                        </Table.Cell>

                        <Table.Cell>

                          <div className="flex items-center gap-x-4">

                            <span className="cursor-pointer">
                              <Link to={`/update-project/${project._id}`}> <FaEdit size={30}/> </Link>
                            </span>

                            <span className="cursor-pointer">
                              <FaTrashAlt 
                                  size={30} 
                                  className="text-PrimaryLight"
                                  onClick={() => {
                                    setOpen(true)
                                    setProjectIdToDelete(project._id)
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
                <p className="">There are no projects yet</p>
              )
            }

          </Table>

        </div>

      </section>

      {open && (

          <div className="w-full h-full grid place-content-center fixed top-0 left bg-black/50 backdrop-blur-sm">

            <div className="space-y-5 p-4 w-[90%] mx-auto shadow-md bg-BackgroundLight dark:bg-BackgroundDark transtion-all duration-500 ease-in rounded">

                <HiExclamationCircle size={44} className="mx-auto"/>

                <h2 className="text-center">Are you sure you want to delete this Project</h2>

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
