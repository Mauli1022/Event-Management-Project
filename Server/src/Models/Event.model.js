import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image : {type : String},
  date: { type: Date },
  location: { type: String, default: "Online" },
  category: {type : String}, 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
});

export const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

