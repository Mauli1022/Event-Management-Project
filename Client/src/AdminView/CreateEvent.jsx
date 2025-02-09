import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify';


// Redux thunk
import { createNewEvent } from "../Store/Admin-Slice/Admin-Slice.js"

export default function CreateEvent() {
  const initialState = {
    title: "",
    description: "",
    date: "",
    location: "",
    image: null,
    category : ""
  }
  const [formData, setFormData] = useState(initialState);
  const fileInputRef = useRef(null);
  const { isLoading } = useSelector(state => state.admin);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    
    const formDataWithFile = new FormData()
    formDataWithFile.append("title", formData.title);
    formDataWithFile.append("description", formData.description);
    formDataWithFile.append("date", formData.date);
    formDataWithFile.append("location", formData.location);
    formDataWithFile.append("image", formData.image);
    formDataWithFile.append("category", formData.category);

    dispatch(createNewEvent(formDataWithFile))
      .then((data) => {
        if (data?.payload?.success) {
          toast.success(data?.payload?.message || "Event Added Successfully!")
          setFormData(initialState)
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      })
      .catch((error) => {
        toast.error(`${error?.message}`)
      })
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Event Description"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white"
          required
        >
          <option value="" disabled>Select Category</option>
          <option value="conference">Conference</option>
          <option value="workshop">Workshop</option>
          <option value="webinar">Webinar</option>
          <option value="meetup">Meetup</option>
        </select>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white"
          required
          ref={fileInputRef}
        />
        <button
          type="submit"
          className={`text-white p-2 rounded w-full disabled:cursor-not-allowed
          hover:bg-yellow-400 transition ${
            isLoading == true ?
            "bg-white text-yellow-500 border border-yellow-500 px-4 py-2 rounded-lg hover:text-white transition" 
            : "bg-yellow-500 hover:bg-yellow-400 transition "
          }`}
          disabled={isLoading} // ✅ Disable during API request
        >
          {isLoading ? "Pending..." : "Submit"}
        </button>
      </form>
    </div>

  )
}
