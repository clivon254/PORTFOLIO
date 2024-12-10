import axios from "axios";
import { createContext, useEffect, useState } from "react";



export const StoreContext = createContext(null)


export default function StoreContextProvider(props){

    const url = "http://localhost:2000" 

    const [token ,setToken ] = useState(localStorage.getItem("token"))

    const [open ,setOpen] = useState(false)

    const [skills ,setSkills] = useState([])


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

    console.log(skills)

    useEffect(() => {

        fetchSkills()
        
    },[])

    const contextValue = {
        url,
        token,setToken,
        open,setOpen,
        skills,setSkills,
        fetchSkills
    }

    return (

    <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>

    )
}