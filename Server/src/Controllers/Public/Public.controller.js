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
