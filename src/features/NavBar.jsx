import React from "react";
import {Link} from 'react-router-dom';

function NavBar() {
  const HoverClass = "p-2 rounded-lg hover:text-neutral-200 hover:text-3xl duration-200 ease-(--my-beizer) hover:font-bold hover:bg-neutral-500";
  return (
    <div className="fixed z-50 w-full flex flex-row items-center justify-between bg-neutral-100  shadow-lg/10 shadow-black m-0 p-2 ">
      <nav className="flex flex-row justify-around space-x-4 text-xl text-neutral-700 w-full">
        <Link to="/" className={`${HoverClass}`}>Home</Link>
        <Link to="/ViewData" className={`${HoverClass}`}>View Data</Link>
        <Link to="/Assignment/Initialization" className={`p-2 rounded-lg text-neutral-100 font-extrabold hover:text-4xl duration-200 ease-(--my-beizer) hover:font-extrabold bg-neutral-600 shadow-xl hover:bg-neutral-200 hover:text-neutral-600`}>Assignment</Link>
        <Link to="#" className={`${HoverClass}`}>Overview</Link>
        <Link to="/AboutUs" className={`${HoverClass}`}>About Us</Link>
      </nav>
    </div>
  )
}

export default NavBar;