import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

// Async Thunk
import { fetchEventsAdmin } from "../Store/Public-Slice/PublicSlice.js"

export default function Home() {

  const dispatch = useDispatch();
  const { events } = useSelector(state => state.public)

  useEffect(() => {
    dispatch(fetchEventsAdmin())
    console.log( "Home Page",events );
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 to-black text-white">
      <section className="text-center py-20 px-5">
        <h1 className="text-5xl font-bold">Discover & Manage Amazing Events</h1>
        <p className="mt-4 text-lg text-gray-300">
          Join, create, and manage events effortlessly with our platform.
        </p>
        <div className="mt-6">
          <Link to="/events" className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition">
            Explore Events
          </Link>
        </div>
      </section>

      <section className="px-5 py-12">
        <h2 className="text-3xl font-semibold text-center mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {
            events.length > 0 ?
              (
                events.map((event) => {
                 return (<div key={event?._id}
                    className="bg-gray-800 p-5 rounded-lg shadow-lg"
                  >
                    <h3 className="text-xl font-semibold">{event?.title}</h3>
                    <p className="text-gray-400">{event?.description}</p>
                    <Link 
                    to={`/events/${event?._id}`} 
                    className="text-yellow-400 hover:underline mt-3 inline-block">
                      View Details →
                    </Link>
                  </div>)
                })
              ) :
              (<p className="text-center text-gray-400">No events found.</p>)
          }
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-900">
        <h2 className="text-3xl font-semibold text-center mb-6">What People Say</h2>
        <div className="max-w-4xl mx-auto px-5">
          <blockquote className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-lg italic">"This platform made managing my events so easy. Highly recommended!"</p>
            <span className="block mt-3 text-yellow-400">— User, Event Organizer</span>
          </blockquote>
        </div>
      </section>

      <footer className="text-center py-6 bg-black mt-10">
        <p className="text-gray-400">© 2025 Event Management Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

