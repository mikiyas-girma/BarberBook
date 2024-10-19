import express from "express";
import AppointmentController from "../controllers/appointment/appointmentController.js";
import { authMiddleware, optionalAuthMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/book", optionalAuthMiddleware, AppointmentController.bookAppointment);

export default router;
