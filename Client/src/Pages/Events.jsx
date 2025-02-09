import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"

// Async Thunk
import { fetchEventsAdmin, fetchEventsWithFilterValue } from "../Store/Public-Slice/PublicSlice.js"

export default function Events() {
  // const [events, setEvents] = useState([]);

  const dispatch = useDispatch();
  const { events } = useSelector(state => state.public)

  const [category, setCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // useEffect(() => {
  //   dispatch(fetchEventsAdmin())
  //   console.log(events);
  // }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEventsWithFilterValue({ category, date: selectedDate }))
  }, [category, selectedDate, dispatch])


  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-5">
        <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>

        {/* 🔽 Category Filter Dropdown */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {/* Category Dropdown */}
          <div>
            <label htmlFor="category" className="text-lg font-semibold mr-2">
              Category:
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-md focus:ring focus:ring-yellow-400"
            >
              <option value="">All Categories</option>
              <option value="conference">Conference</option>
              <option value="workshop">Workshop</option>
              <option value="webinar">Webinar</option>
              <option value="meetup">Meetup</option>
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label htmlFor="date" className="text-lg font-semibold mr-2">
              Date:
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-md focus:ring focus:ring-yellow-400"
            />
          </div>
        </div>


        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event?._id} className="bg-gray-800 p-5 rounded-lg shadow-lg">
                <img
                  src={event?.image || "https://via.placeholder.com/300"}
                  alt={event?.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold">{event?.title}</h2>
                <p className="text-gray-400 text-sm mt-1">
                  {new Date(event.date).toLocaleDateString()} - {event?.location}
                </p>
                <p className="mt-2 text-sm">{event?.description.slice(0, 100)}...</p>
                <Link
                  to={`/events/${event?._id}`}
                  className="block mt-4 bg-yellow-500 text-black text-center py-2 
                rounded-md font-medium hover:bg-yellow-400 transition"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No events found.</p>
          )}
        </div>
      </div>
    </div>
  )
}
