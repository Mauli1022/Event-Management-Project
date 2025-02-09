import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Async thunk
import { registerUser } from '../Store/Auth-Slice/AuthSlice'

export default function RegisterUser() {
    const initialState = {
        name: "",
        email: "",
        password: ""
    }
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState)
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    };

    function handleSubmit(e) {
        e.preventDefault();

        let {name, email, password } = formData;
        if (!name || !email || !password) {
          return alert("All Fields Are Required!")
        }
        
        dispatch(registerUser(formData))
        .then((data)=>{
          if (data?.payload?.success) {

            if(data?.payload?.user?.role === "admin"){
              navigate("/admin")
            }          
            toast.success(`${data?.payload?.message}`);
            navigate("/");
            setFormData(initialState)

          }else{
            // console.log("Component",data?.payload);
            toast.error(`${data?.payload?.message}`)
          }
        })
        .catch((error)=>{
          console.log("Register Error",error);
          toast.error(`${error?.message}`)
        })
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-bold text-white text-center mb-6">Sign Up</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-gray-300 font-medium mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData?.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-yellow-500 border border-gray-600 focus:outline-none"
              />
            </div>
  
            <div>
              <label htmlFor="email" className="block text-gray-300 font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData?.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-yellow-500 border border-gray-600 focus:outline-none"
              />
            </div>
  
            <div>
              <label htmlFor="password" className="block text-gray-300 font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData?.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-yellow-500 border border-gray-600 focus:outline-none"
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black font-medium py-2 rounded-md hover:bg-yellow-400 transition"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </form>
  
          <div className="text-center mt-4 text-gray-400 text-sm">
            <p>
              Already have an account? <a href="/login" className="text-yellow-400 hover:underline">Sign In</a>
            </p>
          </div>
        </div>
      </div>

    )
}
