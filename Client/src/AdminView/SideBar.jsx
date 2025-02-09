import React from 'react'

export default function SideBar({setActiveTab}) {
  return (
    <div className="w-64 bg-gray-900 text-white h-full flex flex-col p-4">
    <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
    <button 
      onClick={() => setActiveTab("events")} 
      className="p-2 hover:bg-gray-700 rounded transition"
    >
      View Events
    </button>
    <button 
      onClick={() => setActiveTab("create-event")} 
      className="p-2 hover:bg-gray-700 rounded transition mt-2"
    >
      Create Event
    </button>
  </div>
  )
}
