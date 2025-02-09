import express from "express"
import { getAllEvents, getSingleEvent, filterEvents } from "../Controllers/Public/Public.controller.js";

const router = express.Router()

router.get("/get-all-event",getAllEvents);
router.get("/single-event/:id", getSingleEvent);
router.get("/filter",filterEvents)

export default router;