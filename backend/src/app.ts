import express, { Application } from 'express';
import 'dotenv/config';
import helmet from 'helmet';
import connectDB from './db/db.js';
import authRoutes from './routes/authRoutes.js';
import { globalErrorMiddleware } from './middlewares/error.middleware.js';
import barbersRoutes from './routes/barbersRoute.js';
import cookieParser from 'cookie-parser';
import morganMiddleware from './middlewares/morgan.middleware.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import customerRoutes from './routes/customerRoutes.js';

const app: Application = express();

// Middleware
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morganMiddleware);

// Routes
app.get('/', (_req, res) => {
    res.send('Root endpoint check ');
});

// auth routes
app.use('/api/auth', authRoutes);

// barbers routes
app.use('/api/barbers', barbersRoutes);

// appointment routes
app.use('/api/customer', customerRoutes);

// appointment routes
app.use('/api/appointment', appointmentRoutes);

app.use(globalErrorMiddleware);


// Connect to DB
connectDB();

export default app;
