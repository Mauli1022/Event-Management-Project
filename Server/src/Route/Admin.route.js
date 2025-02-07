import express from 'express';
import { createEvent, deleteEvent } from '../Controllers/Admin/Event-controller.js';
import { protect, isAdmin } from '../Middleware/authMiddleware.js';
import { upload } from '../Middleware/uploadFile.js';


const router = express.Router();

router.post('/create', protect, isAdmin, upload.single("image"), createEvent);
router.delete('/delete-event/:id',deleteEvent)

export default router;
