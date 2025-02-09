import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// pages
import Home from "./Pages/Home"
import LoginUser from "./Pages/LoginUser"
import RegisterUser from './Pages/RegisterUser'
import Events from "./Pages/Events"
// Admin Component
import DashBoard from "./AdminView/DashBoard"
// Component
import Layout from "./Components/Layout"
import EventDetails from "./Pages/EventDetails"
import AboutUs from './Pages/AboutUs'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginUser />} />
      <Route path="/register" element={<RegisterUser />} />

       {/* Admin DashBoard */}
       <Route path="/admin" element={<DashBoard />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path='/about' element={<AboutUs/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />

      </Route>
    </Routes>
  </BrowserRouter>
  )
}
