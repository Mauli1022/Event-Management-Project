import React from 'react'
import { Link } from "react-router-dom";


export default function Headers() {

  return (
    <>
    <nav className="fixed top-0 left-0 w-full bg-white/10 backdrop-blur-md text-white font-sans shadow-lg z-50 rounded-b-lg p-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <h1 className="text-2xl tracking-wide font-semibold">TechVista</h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 font-semibold">
          <Link to="/" className="text-lg hover:text-gray-300 p-1 hover:bg-white/20 transition rounded-md">
            Home
          </Link>
          <Link to="/events" className="text-lg hover:text-gray-300 p-1 hover:bg-white/20 transition rounded-md">
            Events
          </Link>
          <Link to="/about" className="text-lg hover:text-gray-300 p-1 hover:bg-white/20 transition rounded-md">
            About Us
          </Link>
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex space-x-4">
          <Link to="/login" className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg 
          shadow-md hover:bg-yellow-600 transition font-semibold">
            Sign In
          </Link>
          <Link to="/register" className="bg-white text-yellow-500 border border-yellow-500 px-4 py-2 rounded-lg shadow-md 
          hover:bg-yellow-500 hover:text-white transition font-semibold">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
    </>

  )
}
