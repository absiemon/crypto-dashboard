import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-0 z-30 -mx-4 py-3 bg-white shadow-lg flex">
      <Link to={"/"} href="" className="w-full ml-5 font-semibold text-xl flex xs:justify-center  sm:justify-center bdsm:justify-start">
          <span className="text-primary bg-red-600 px-1 text-white">Al</span> 
          <span className="text-primary">maBetter</span>
      </Link>
    </header>
  );
}

export default Header;
