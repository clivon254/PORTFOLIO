import axios from "axios";
import { createContext, useEffect, useState } from "react";



export const StoreContext = createContext(null)


export default function StoreContextProvider(props){

    const url = "http://localhost:2000" 

    const [token ,setToken ] = useState(localStorage.getItem("token"))

    const [open ,setOpen] = useState(false)

    const [skills ,setSkills] = useState([])

    const [projects ,setProjects] = useState([])


    // fetch Skills
    const fetchSkills = async () => {

        try
        {
            const res = await axios.get(url + "/api/skill/get-skills")

            if(res.data.success)
            {
                setSkills(res.data.skills)
            }

        }
        catch(error)
        {
            console.log(error.message)
        }

    }

    // fetchProjects
    const fetchProjects = async () => {

        try
        {
            const res = await axios.get(url + "/api/project/get-projects")

            if(res.data.success)
            {
                setProjects(res.data.projects)
            }

        }
        catch(error)
        {
            console.log(error)
        }

    }


    useEffect(() => {

        fetchSkills()

        fetchProjects()
        
    },[])

    const contextValue = {
        url,
        token,setToken,
        open,setOpen,
        skills,setSkills,
        fetchSkills,
        projects,setProjects,
        fetchProjects,
    }

    return (

    <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>

    )
}