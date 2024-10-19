import express from 'express';
import CustomerController from '../controllers/customers/customerController.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();


// Route for non-logged-in users to search for their bookings
router.get('/search-bookings', CustomerController.searchBookings);

// Route for logged-in users to retrieve their bookings
router.get('/my-bookings', authMiddleware, CustomerController.getMyBookings);

export default router;
