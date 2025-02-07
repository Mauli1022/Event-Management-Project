import express from "express"
import { getAllEvents, getSingleEvent } from "../Controllers/Public/Public.controller.js";

const router = express.Router()

router.get("/get-all-event",getAllEvents);
router.get("/single-event/:id", getSingleEvent);

export default router;