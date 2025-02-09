import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Store/Auth-Slice/AuthSlice';

export default function LoginUser() {

  const initialState = {
    email: "",
    password: ""
  }
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState)

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(loginUser(formData))
      .then((data) => {
        if (data?.payload?.success) {

          if (data?.payload?.user?.role === "admin") {
            toast.success(`${data?.payload?.message}`);
            navigate("/admin")
            setFormData(initialState)
          } else {
            toast.success(`${data?.payload?.message}`);
            navigate("/");
            setFormData(initialState)
          }
        }else{
           toast.error(`${data?.payload?.message}`)
        }
      })
      .catch((error) => {
        toast.error(`${error?.message}`)
      })

    // setFormData(initialState)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-300 font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-2 
            focus:ring-yellow-500 border border-gray-600 focus:outline-none"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-gray-300 font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-2 
            focus:ring-yellow-500 border border-gray-600 focus:outline-none"
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-medium py-2 
          rounded-md hover:bg-yellow-400 transition"
          >
            Sign In
          </button>
        </form>

        {/* Additional Links */}
        <div className="text-center mt-4 text-gray-400 text-sm">
          <p>
            Don't have an account? <a href="/register" className="text-yellow-400 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  )
}
