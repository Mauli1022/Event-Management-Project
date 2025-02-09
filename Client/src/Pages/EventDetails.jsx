import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

// Async Thunk
import { fetchSingleEvent } from "../Store/Public-Slice/PublicSlice.js"


export default function EventDetails() {
  const [event, setEvent] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { singleEvent } = useSelector(state=>state.public)

  useEffect(()=>{
    dispatch(fetchSingleEvent(id))    
  },[dispatch])
  
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-5">
        <img src={singleEvent?.image || "https://via.placeholder.com/600"} alt={singleEvent?.title} 
        className="w-full h-80 object-cover rounded-lg shadow-lg" />
        <h1 className="text-3xl font-bold mt-6">{singleEvent?.title}</h1>
        <p className="text-gray-400 text-sm mt-2">{new Date(singleEvent?.date).toLocaleDateString()} - {singleEvent?.location}</p>
        <p className="mt-4">{singleEvent?.description}</p>

        {/* Join Button */}
        <button className="mt-6 bg-yellow-500 text-black px-6 py-2 rounded-md font-medium hover:ring-yellow-400 transition">
          Join Event
        </button>
      </div>
    </div>
    
  )
}
