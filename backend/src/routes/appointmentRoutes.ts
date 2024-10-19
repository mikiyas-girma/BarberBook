import express from 'express';
import { authMiddleware, optionalAuthMiddleware } from '../middlewares/auth.middleware.js';
import AppointmentController from "../controllers/appointment/appointmentController.js";

const router = express.Router();

// route for booking an appointment
router.post("/book", optionalAuthMiddleware, AppointmentController.bookAppointment);

// Route to cancel an appointment
router.delete("/cancel/:slotId", authMiddleware, AppointmentController.cancelAppointment);


export default router;
