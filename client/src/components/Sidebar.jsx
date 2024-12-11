

import React from 'react'
import { FaAddressBook, FaHome, FaServer } from 'react-icons/fa'
import { MdClose, MdContacts } from 'react-icons/md'

export default function Sidebar({open,setOpen}) {

    const NavLinks = [
        {
            title:"Home",
            icon:<FaHome size={28} />,
            href:"#"
        },
        {
            title:"About",
            icon:<FaAddressBook size={28}/>,
            href:"#about"
        },
        {
            title:"services",
            icon:<FaServer size={28}/>,
            href:"#services"
        },
        {
            title:"Contact",
            icon:<MdContacts size={28} />,
            href:"#contact"
        }
        ]

  return (

    <aside 
        className={`fixed z-50 lg:hidden h-screen w-full bg-black/50 backdrop-blur-sm ${open ? "right-0" :"right-[-100%]"}`}
        onClick={() => setOpen(!open)}
    >

        <div className="absolute right-0 w-[70%] h-full dark:bg-BackgroundDark bg-BackgroundLight space-y-10 p-3">

            <div className="flex justify-end ">

                <span className="">
                    <MdClose size={42} onClick={() => setOpen(false)} />
                </span>

            </div>

            <nav className="flex  flex-col gap-y-10">

                {NavLinks.map((nav,index) => (

                    <a 
                        key={index}
                        href={nav.href} 
                        className={"flex items-center gap-x-3 text-base font-semibold"}
                    >
                        {nav.icon} {nav.title} 
                    </a>

                ))}

            </nav>

        </div>


    </aside>

  )

}
