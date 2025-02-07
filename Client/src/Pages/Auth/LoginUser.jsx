import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../Store/Auth-Slice/AuthSlice';

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

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(formData))
    setFormData(initialState)
  }

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoCapitalize='email'
            className='border border-black rounded-md'
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            className='border border-black rounded-md'
          />
        </div>
        <button type="submit" onClick={handleSubmit}>Sign In</button>
      </form>
    </div>
  )
}
