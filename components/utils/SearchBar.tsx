'use client'

import React, { useState } from 'react'
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

type Props = {}

const SearchBar = (props: Props) => {
    const [eventSearch, setEventSearch] = useState("");
  const [location, setLocation] = useState("");
  
  return (
    <div className="flex items-center bg-[#004aad]/2 p-2 rounded-full border border-[#004aad] w-full md:max-w-md lg:max-w-lg">
      <div className="flex items-center pl-4 pr-8 w-full border-r border-[#004aad]">
        <FaSearch className="text-[#004aad]/80 mr-2" />
        <input 
          type='text'
          placeholder='Search events'
          value={eventSearch}
          onChange={(e) => setEventSearch(e.target.value)}
          className="bg-transparent outline-none w-full text-[#004aad]/90"
        />
      </div>

      <div className="flex items-center px-4 w-full">
        <FaMapMarkerAlt className="text-[#004aad]/80 mr-2" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-transparent outline-none w-full text-[#004aad]/90"
        />
      </div>

      <button className="bg-[#004aad]/90 text-white p-2 rounded-full ml-2 hover:[#004aad] cursor-pointer">
        <FaSearch />
      </button>
    </div>
  )
}

export default SearchBar