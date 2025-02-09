import { Event } from "../../Models/Event.model.js";

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    console.error("Get All Events", error);

    res.status(500).json({
      success: false,
      message: "Get All Events Error",
    });
  }
}

export const getSingleEvent = async (req, res) => {

  try {
    const { id } = req.params;
    const singleEvent = await Event.findById(id);

    res.status(200).json({
      success: true,
      singleEvent,
    });

  } catch (error) {

    console.error("Get All Events", error);

    res.status(500).json({
      success: false,
      message: "Get All Events Error",
    });
  }

}

// Filter Event Controller
export const filterEvents = async (req, res) => {
  try {
    const { category, date } = req.query; 

    let query = {};

    if (category) {
      query.category = category; 
    }

    if (date) {
      const startOfDay = new Date(date).setHours(0, 0, 0, 0);
      const endOfDay = new Date(date).setHours(23, 59, 59, 999);
      query.date = { $gte: startOfDay, $lte: endOfDay }; 
    }

    const events = await Event.find(query);

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};


