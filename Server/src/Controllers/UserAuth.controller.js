

import bcrypt from "bcryptjs"
import { User } from "../Models/UserAuth.model.js"
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt); 

        
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const user = await User.create({ name, email, password : hashedPassword });
        
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "User Register Error", error });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(password);
    
    try {
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                message : "User Not Found"
            })
        }
        
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        
        
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
        
    } catch (error) {
        console.error("User Login Error",error);
        res.status(500).json({ message: "User Login Error", error });
    }
}

