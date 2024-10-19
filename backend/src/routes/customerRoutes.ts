import express from 'express';
import CustomerController from '../controllers/customers/customerController.js';
import { authMiddleware, optionalAuthMiddleware } from '../middlewares/auth.middleware.js';
import AppointmentController from "../controllers/appointment/appointmentController.js";

const router = express.Router();

// route for booking an appointment
router.post("/book", optionalAuthMiddleware, AppointmentController.bookAppointment);

// Route for non-logged-in users to search for their bookings
router.get('/search-bookings', CustomerController.searchBookings);

// Route for logged-in users to retrieve their bookings
// router.get('/my-bookings', authMiddleware, CustomerController.getMyBookings);

export default router;
