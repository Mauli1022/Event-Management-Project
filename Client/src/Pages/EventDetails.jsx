import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import socket from "../Utils/Socket.js";

// Async Thunk
import { fetchSingleEvent } from "../Store/Public-Slice/PublicSlice.js"
import { setAttendees, addAttendee, removeAttendee } from "../Store/Socket-Slice/SocketSlice.js";


export default function EventDetails() {
  // const [event, setEvent] = useState(null);
  // const [attendees, setAttendees] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { singleEvent } = useSelector(state => state.public)
  const { user } = useSelector((state) => state.auth);
  const { attendees } = useSelector((state) => state.socket);

  useEffect(() => {
    dispatch(fetchSingleEvent(id))

    socket.on("updateAttendance", (data) => {
      if (data.eventId === id) {
        dispatch(setAttendees(data));
      }
      console.log("Event Details: ",user);

    },[dispatch]);

    socket.emit("joinEvent", { 
      userId : user?._id, 
      eventId : id, 
      userName : user?.name });

    return () => {
      socket.off("updateAttendance");
    }
  }, [dispatch, id])


  function handleJoinEvent() {
    console.log("function",user);
    
    if (!user) {
      alert("Please log in to join the event!");
      return;
    }

    socket.emit("joinEvent", {
      userId: user?._id,
      eventId: id,
      userName: user?.name
    });
  };

  useEffect(()=>{
    console.log(user);
    
  },[user])
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-5">
        <img src={singleEvent?.image || "https://via.placeholder.com/600"} alt={singleEvent?.title}
          className="w-full h-80 object-cover rounded-lg shadow-lg" />
        <h1 className="text-3xl font-bold mt-6">{singleEvent?.title}</h1>
        <p className="text-gray-400 text-sm mt-2">{new Date(singleEvent?.date).toLocaleDateString()} - {singleEvent?.location}</p>
        <p className="mt-4">{singleEvent?.description}</p>

        <button
          onClick={handleJoinEvent}
          className="mt-6 bg-yellow-500 text-black px-6 py-2 rounded-md font-medium hover:ring-yellow-400 transition">
          Join Event
        </button>


        <div className="mt-6 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-bold">Live Attendees:</h2>
          {attendees.length > 0 ? (
            <ul className="mt-2">
              {attendees.map(attendee => (
                <li key={attendee.userId} className="text-gray-300">{attendee.userName}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No attendees yet.</p>
          )}
        </div>

      </div>
    </div>
  )
}
