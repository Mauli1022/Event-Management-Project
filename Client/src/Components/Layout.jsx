import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from "./Headers"
import Footer from "./Footer"

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-gray-800 to-black">
    <Header />
      <main className="flex-grow mt-[64px]">
        <Outlet />
      </main>
      <Footer />
  </div>
  )
}
