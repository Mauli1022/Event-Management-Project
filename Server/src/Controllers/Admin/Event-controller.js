
import { Event } from "../../Models/Event.model.js"
import fs from "fs"
import cloudinary from "../../config/cloudinaryConfig.js";

export const createEvent = async (req, res) => {
  const { title, description, date, location, category } = req.body;
  try {

    console.log("Category From Backend", category);
    
    let imageUrl = ""
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "event_images",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
      });
      imageUrl = result.secure_url;
      setTimeout(() => {
        fs.unlinkSync(req.file.path)
      }, 10000);
    }

    console.log("File On Cloudinary: ", imageUrl);

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      category,
      image: imageUrl,
      createdBy: req.user._id,
    });


    await newEvent.save();

    return res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event: newEvent
    });

  } catch (error) {
    console.error("Create Event Controller : ", error)
    res.status(500).json({ message: 'Error creating event' });
  }
};

export const deleteEvent = async (req, res) => {

  try {
    const { id } = req.params;

    const deleteEvent = await Event.findByIdAndDelete(id);

    if (!deleteEvent) {
      return res.status(400).json({
        success: false,
        message: "Event Not Get deleted"
      });
    }

    res.status(200).json({
      success: true,
      message: "Event Deleted Successfully."
    });


  } catch (error) {

    console.error("Get All Events", error);

    res.status(500).json({
      success: false,
      message: "Get All Events Error",
    });
  }
}
