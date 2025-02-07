import React, { useState } from 'react'
import { useDispatch } from 'react-redux'


// Async thunk
import { loginUser } from '../../Store/Auth-Slice/AuthSlice'

export default function RegisterUser() {
    const initialState = {
        name: "",
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
        dispatch(registerUser(formData))
        setFormData(initialState)
    }

    return (
        <div>

            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
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
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
    )
}
