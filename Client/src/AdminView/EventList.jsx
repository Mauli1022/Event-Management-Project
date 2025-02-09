import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"

// Async Thunk
import { fetchEventsAdmin } from "../Store/Public-Slice/PublicSlice.js"



export default function EventList({}) {
   
    // const [events, setEvents] = useState([]);
    const dispatch = useDispatch();
    const { events } = useSelector(state=>state.public)

    useEffect(() => {
      dispatch(fetchEventsAdmin())
    },[dispatch]);
  
    return (
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">All Events</h2>
        {events?.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <ul className="space-y-3">
            {events.map((event) => (
              <li key={event?._id} className="border p-3 rounded-lg">
                <h3 className="text-xl font-bold">{event?.title}</h3>
                <p>{event.description}</p>
                <p className="text-sm text-gray-500">📍 {event?.location}</p>
                {/* <p className="text-sm text-gray-500">📅 {event?.date}</p> */}
                <p className="text-sm text-gray-500">📅 
                {new Date(event?.date).toISOString().split("T")[0]}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      
    )
}
