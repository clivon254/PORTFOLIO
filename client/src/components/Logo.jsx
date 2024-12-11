


import React from 'react'
import { Link } from 'react-router-dom'

export default function Logo() {

  return (
    
    <div className="cursor-pointer">

      <Link to="/" >

        <span className="font-logo text-PrimaryLight  text-2xl lg:text-4xl">
            CLIVON
        </span>

      </Link>

    </div>
    
  )

}
