

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import {Toaster} from "sonner"
import SignIn from "./pages/SignIn"
import ResetPassword from "./pages/ResetPassword"
import ForgotPassword from "./pages/ForgotPassword"
import Home from "./pages/Home"
import Header from "./components/Header"
import Footer from "./components/Footer"
import CV from "./pages/CV"
import AddProject from "./pages/AddProject"
import Projects from "./pages/Projects"
import Skills from "./pages/Skills"
import AddSkill from "./pages/AddSkill"
import Profile from "./pages/Profile"


export default function App()
{

  const Layout = () => {

    return(

      <div className="min-h-screen flex flex-col ">

        <Header/>
        
        <div className="w-full flex-1">
          
           <Outlet/>

        </div>

        <Footer/>

      </div>

    )

  }

  return (

    <BrowserRouter>

        <Toaster richColors/>

        <main className="w-full min-h-screen">

          <Routes>

            <Route element={<Layout/>}>

                <Route path="/" element={<Home/>} />

                <Route path="/profile" element={<Profile/>} />

                <Route path="/cv" element={<CV/>} />

                <Route path="/add-project" element={<AddProject/>} />

                <Route path="/projects" element={<Projects/>} />

                <Route path="/skills" element={<Skills/>} />

                <Route path="/add-skill" element={<AddSkill/>} />

            </Route>

            <Route path="/sign-in" element={<SignIn/>} />

            <Route path="/forgot-password" element={<ForgotPassword/>} />

            <Route path="/reset-password/:token" element={<ResetPassword/>} />

          </Routes>

        </main>

    </BrowserRouter>

  )
}