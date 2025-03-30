"use client";

import Image from "next/image";
import SearchBar from "./utils/SearchBar";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

// # logo_colors = #004aad
// box_shadow_color = #81a7e3

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-10 shadow-[0_2px_2px_rgba(129,167,227,1)] py-2">
      <div className="flex md:items-center justify-center flex-col md:flex-row items-start space-x-2">
        <div>
          <Image src="/logo.png" alt="Logo" width={74} height={74} />
        </div>
        <div>
          <SearchBar />
        </div>
      </div>

      <div className="flex items-center space-x-4 uppercase text-[#004aad] -mt-12 md:mt-0">
        <div className="hidden xl:block">Contact</div>
        <div className="hidden lg:block">Events</div>
        <div className="hidden lg:block">Tickets</div>
        <div className="hidden md:block">Login</div>
        <div className="hidden md:block">SignUp</div>
        <div
          className="cursor-pointer text-[#004aad]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-16 right-0  bg-white shadow-lg rounded-lg flex flex-col items-center space-y-4 py-4 px-16 text-[#004aad] uppercase border">
          <div className="xl:hidden block">Contact</div>
          <div className="lg:hidden block">Events</div>
          <div className="lg:hidden block">Tickets</div>
          <div className="md:hidden block">Login</div>
          <div className="md:hidden block">SignUp</div>
        </div>
      )}
    </header>
  );
};

export default Header;
