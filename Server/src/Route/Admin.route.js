import express from 'express';
import { createEvent } from '../Controllers/Admin/Event-controller.js';
import { protect, isAdmin } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, isAdmin, createEvent);  // Only admins can create events

export default router;
