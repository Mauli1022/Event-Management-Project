import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-8">
    <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Column 1: Brand & About */}
      <div>
        <h2 className="text-xl font-bold text-white">EventManager</h2>
        <p className="mt-2 text-sm">
          Your all-in-one platform to create, manage, and attend events effortlessly.
        </p>
      </div>

      {/* Column 2: Quick Links */}
      <div>
        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
        <ul className="mt-2 space-y-2">
          <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
          <li><Link to="/events" className="hover:text-yellow-400 transition">Events</Link></li>
          <li><Link to="/login" className="hover:text-yellow-400 transition">Sign In</Link></li>
          <li><Link to="/register" className="hover:text-yellow-400 transition">Sign Up</Link></li>
        </ul>
      </div>

      {/* Column 3: Contact & Social Media */}
      <div>
        <h3 className="text-lg font-semibold text-white">Contact Us</h3>
        <p className="mt-2 text-sm">Email: support@eventmanager.com</p>
        <p className="text-sm">Phone: +123 456 7890</p>

        <div className="flex space-x-4 mt-4">
          <a href="#" className="hover:text-yellow-400 transition">Facebook</a>
          <a href="#" className="hover:text-yellow-400 transition">Twitter</a>
          <a href="#" className="hover:text-yellow-400 transition">LinkedIn</a>
        </div>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="text-center border-t border-gray-700 mt-6 pt-4 text-sm">
      © 2025 EventManager. All rights reserved.
    </div>
  </footer>
  )
}
