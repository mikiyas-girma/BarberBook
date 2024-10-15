import express from 'express';
import BarberController from '../controllers/barbers/barberController.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Routes
router.get('/', BarberController.getAllBarbers);
router.get('/:id', BarberController.getBarberById);

// routes for adding availability slots
router.post('/availability',authMiddleware, BarberController.addAvailability);

export default router;