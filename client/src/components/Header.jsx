

import React, { useContext } from 'react'
import Logo from './Logo'
import {FaAddressBook, FaHome, FaServer} from "react-icons/fa"
import { MdClose, MdContacts, MdDarkMode, MdLightMode, MdLogout, MdMenu } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { Avatar, Drawer, Dropdown } from "flowbite-react"
import {Link, useNavigate} from "react-router-dom"
import { signOutUserSuccess } from '../redux/user/userSlice'
import {toast} from "sonner"
import { StoreContext } from '../context/store'
import Sidebar from './Sidebar'




export default function Header() {

    const {open ,setOpen} = useContext(StoreContext)

    const NavLinks = [
        {
            title:"Home",
            icon:<FaHome />,
            href:"#"
        },
        {
            title:"About",
            icon:<FaAddressBook />,
            href:"#about"
        },
        {
            title:"services",
            icon:<FaServer />,
            href:"#services"
        },
        {
            title:"Contact",
            icon:<MdContacts />,
            href:"#contact"
        }
        ]

    const {theme} = useSelector(state => state.theme)

    const {currentUser} = useSelector(state => state.user)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    // handleSignOut
    const handleSignout = () => {

        dispatch(signOutUserSuccess())

        localStorage.removeItem("token")

        toast.success("You have signed out")

        navigate('/')
    }

  return (

    <>

        <header className="p-3">

            <div className="flex items-center justify-between">

                <Logo/>
                
                {/* navLink */}
                <nav className="lg:flex items-center justify-between  hidden gap-x-12">

                    {NavLinks.map((nav,index) => (

                        <a 
                            key={index}
                            href={nav.href} 
                            className={"active-nav-link"}
                        >
                            {nav.title} 
                        </a>

                    ))}

                </nav>
                
                {/* actions */}
                <div className="flex items-center gap-x-2">

                    {/* theme */}
                    <div className="">
                        {theme === "light" ? 
                            <button 
                                className="themeButton"
                                onClick={() => dispatch(toggleTheme())}
                            >
                                <MdDarkMode/>
                            </button>
                            :
                            <button 
                                className="themeButton"
                                onClick={() => dispatch(toggleTheme())}
                            >
                                <MdLightMode/>
                            </button>
                        }
                    </div>
                    
                    {/*drop down */}
                    {currentUser && (

                        <div className="">

                            <Dropdown
                                inline
                                arrowIcon={false}
                                label={
                                    <Avatar 
                                        alt="user"
                                        img={currentUser?.profilePicture}
                                        rounded
                                    />
                                }
                            >

                                <Dropdown.Header>
                                    
                                    <span className="block text-sm">{currentUser.email}</span>
                                    
                                    <span className="block text-sm">{currentUser.username}</span>
                                
                                </Dropdown.Header>

                                <Link to='/profile'>

                                    <Dropdown.Item>Profile</Dropdown.Item>

                                </Link>

                                {currentUser.isAdmin && (

                                    <>

                                      <Link to='/cv'>

                                        <Dropdown.Item>CV</Dropdown.Item>

                                      </Link>

                                      <Link to='/projects'>

                                        <Dropdown.Item>Projects</Dropdown.Item>

                                      </Link>

                                      <Link to='/add-project'>

                                        <Dropdown.Item>Add Project</Dropdown.Item>

                                      </Link>

                                      <Link to='/skills'>

                                        <Dropdown.Item>Skills</Dropdown.Item>

                                      </Link>

                                      <Link to='/add-skill'>

                                        <Dropdown.Item>Add Skills</Dropdown.Item>

                                      </Link>
                                    
                                    </>

                                )}

                                <Dropdown.Item 
                                    onClick={handleSignout} 
                                    className="flex items-center gap-x-2"
                                >
                                    Sign out <MdLogout/>
                                </Dropdown.Item>

                            </Dropdown>

                        </div>

                    )}

                    {/* menu icon */}
                    <div className="lg:hidden cursor-pointer">
                        
                        {open ? 
                            (
                                <MdClose onClick={() => setOpen(false)} size={40}/>
                            ) 
                            : 
                            (
                                <MdMenu onClick={() => setOpen(true)} size={40} />
                            )
                        }

                    </div>

                </div>

            </div>

        </header>
        
        <Sidebar open={open} setOpen={setOpen}/>

    </>

  )

}
