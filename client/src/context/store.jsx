import { createContext, useState } from "react";



export const StoreContext = createContext(null)


export default function StoreContextProvider(props){

    const url = "http://localhost:2000" 

    const [token ,setToken ] = useState(localStorage.getItem("token"))

    const [open ,setOpen] = useState(false)

    const contextValue = {
        url,
        token,setToken,
        open,setOpen,
    }

    return (

    <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>

    )
}