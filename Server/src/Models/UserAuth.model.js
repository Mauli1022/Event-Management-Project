
import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  profileImage : String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, 
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User",UserSchema);