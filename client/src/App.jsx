

import { BrowserRouter, Route } from "react-router-dom"
import {Toaster} from "sonner"
import SignIn from "./pages/SignIn"
import ResetPassword from "./pages/ResetPassword"
import ForgotPassword from "./pages/ForgotPassword"


export default function App()
{

  const LayOut = () => {

    return(

      <div className=""></div>

    )

  }

  return (

    <BrowserRouter>

        <Toaster richColors/>

        <main className="min-h-screen">
        
         <Route element={LayOut}></Route>

         <Route path="/sign-in" element={<SignIn/>} />

         <Route path="/forgot-password" element={<ForgotPassword/>} />

         <Route path="/reset-password/:token" element={<ResetPassword/>} />

        </main>

    </BrowserRouter>

  )
}