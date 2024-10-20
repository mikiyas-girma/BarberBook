import express from 'express';
import AuthController from '../controllers/authController.js';

const router = express.Router();

// check if the user is logged in
router.get('/check', AuthController.checkAuth);

// Routes
router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);


export default router;
