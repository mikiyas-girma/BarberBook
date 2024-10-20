import express from 'express';
import BarberController from '../controllers/barbers/barberController.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { isBarber } from '../middlewares/isBarber.middleware.js';
import PortfolioController from '../controllers/barbers/portfolioController.js';
import { upload, uploadToCloudinary } from '../middlewares/fileUpload.middleware.js';

const router = express.Router();

// Routes
router.get('/', BarberController.getAllBarbers);
// Route for retrieving weekly schedule for the logged-in barber
router.get("/weekly-schedule", authMiddleware, isBarber, BarberController.getWeeklySchedule);
// route for listing the barbers booking
router.get('/bookings',authMiddleware, isBarber, BarberController.viewBookings);

// routes for adding availability slots
router.post('/availability',authMiddleware, BarberController.addAvailability);

// routes for getting portfolios
router.get('/portfolios/:barberId', PortfolioController.getPortfolios);

// routes for uploading portfolios
router.post('/portfolios', authMiddleware, 
    isBarber, upload.array("images", 10), 
    uploadToCloudinary, 
    PortfolioController.uploadPortfolios);

// routes for deleting portfolios
router.delete('/portfolios/delete', authMiddleware, isBarber, PortfolioController.deletePortfolioImage);
    
// routes for getting barber by id
router.get('/:id', BarberController.getBarberById);
    

export default router;
