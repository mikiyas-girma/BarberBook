import express from 'express';
import AuthController from '../controllers/authController.js';


const router = express.Router();

// Routes
router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);

export default router;
