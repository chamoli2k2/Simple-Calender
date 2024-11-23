import { Router } from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { getEvents, createEvent, updateEvent, deleteEvent, getEventById, searchEvent } from '../controllers/event.controller.js';

const router = Router();

// Get all events
router.get('/get-all-events', protect, getEvents);

// Create a new event
router.post('/create', protect, createEvent);

// Update an event
router.put('/update/:id', protect, updateEvent);

// Delete an event
router.delete('/delete/:id', protect, deleteEvent);

// Get an event
router.get('/get-event/:id', protect, getEventById);

// Search event
router.get('/search', protect, searchEvent);

export default router;