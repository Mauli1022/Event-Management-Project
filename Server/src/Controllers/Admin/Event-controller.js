
import { Event } from "../../Models/Event.model.js"

export const createEvent = async (req, res) => {
    const { title, description, date, location, category } = req.body;
    try {

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            category,
            createdBy: req.user._id, 
        });
        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        console.error("Create Event Controller : ", error)
        res.status(500).json({ message: 'Error creating event'});
    }
};
