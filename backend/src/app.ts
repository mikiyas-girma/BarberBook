import express, { Application } from 'express';
import 'dotenv/config';
import helmet from 'helmet';
import connectDB from './db/db.js';
import authRoutes from './routes/authRoutes.js';
import { globalErrorMiddleware } from './utils/errorMiddleware.js';
import barbersRoutes from './routes/barbersRoute.js';
import cookieParser from 'cookie-parser';


const app: Application = express();

// Middleware
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/', (_req, res) => {
    res.send('Root endpoint check ');
});

// auth routes
app.use('/api/auth', authRoutes);

// barbers routes
app.use('/api/barbers', barbersRoutes);

app.use(globalErrorMiddleware);


// Connect to DB
connectDB();

export default app;
