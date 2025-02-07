import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] bg-cover bg-center 
      bg-[url('https://img.pikbest.com/backgrounds/20220119/technology-business-line-purple-blue-sci-tech-style-event-exhibition_6244671.jpg!w700wp')] 
      flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold drop-shadow-lg text-white">Discover Amazing Events</h1>
          <p className="mt-2 text-lg text-gray-200">Join, organize, and explore upcoming events near you.</p>
          <div className="mt-4 flex justify-center">
            <input
              type="text"
              placeholder="Search for events..."
              className="p-2 w-80 text-white rounded-l-md focus:outline-none border-white"
            />
            <button className="bg-fuchsia-600 px-4 py-2 rounded-r-md text-white hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white">
        <h2 className="text-center text-2xl font-semibold mb-4">Explore Categories</h2>
        <div className="flex justify-center space-x-4">
          {["Tech", "Business", "Music", "Workshops", "Sports"].map((category) => (
            <button key={category} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-8">
        <h2 className="text-center text-2xl font-semibold mb-4">Upcoming Events</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">

          {[1, 2, 3].map((event) => (
            <div key={event} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://png.pngtree.com/background/20210716/original/pngtree-technical-hud-display-with-futuristic-digital-interface-background-picture-image_1404881.jpg"
                alt="Event"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">Event Title</h3>
                <p className="text-sm text-gray-500">Date: March 10, 2025</p>
                <p className="mt-2 text-sm text-gray-600">
                  Short event description goes here...
                </p>
                <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-4 mt-8">
        <p>© 2025 EventHub. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

