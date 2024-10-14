import express from 'express';
import BarberController from '../controllers/barbers/barberController.js';


const router = express.Router();

// Routes
router.get('/', BarberController.getAllBarbers);
router.get('/:id', BarberController.getBarberById);

export default router;
