import express from 'express';
import BarberController from '../controllers/barbers/barberController.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { isBarber } from '../middlewares/isBarber.middleware.js';

const router = express.Router();

// Routes
router.get('/', BarberController.getAllBarbers);
// Route for retrieving weekly schedule for the logged-in barber
router.get("/weekly-schedule", authMiddleware, isBarber, BarberController.getWeeklySchedule);
// Barber bookings route
router.get('/bookings',authMiddleware, isBarber, BarberController.viewBookings);
// routes for getting barber by id
router.get('/:id', BarberController.getBarberById);

// routes for adding availability slots
router.post('/availability',authMiddleware, BarberController.addAvailability);



export default router;
