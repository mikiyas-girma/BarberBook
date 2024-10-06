import express, { Application } from 'express';
import 'dotenv/config';
import helmet from 'helmet';
import connectDB from './db/db.js';
import authRoutes from './routes/authRoutes.js';
import { globalErrorMiddleware } from './utils/errorMiddleware.js';


const app: Application = express();

// Middleware
app.use(helmet());
app.use(express.json({ limit: '10mb' }));

// Routes
app.get('/', (_req, res) => {
    res.send('Root endpoint check ');
});

// auth routes
app.use('/api/auth', authRoutes);

app.use(globalErrorMiddleware);


// Connect to DB
connectDB();

export default app;
