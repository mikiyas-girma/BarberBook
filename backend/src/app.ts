import express, { Application } from 'express';

import 'dotenv/config';


const app: Application = express();

// Middleware
app.use(express.json({ limit: '10mb' }));

// Routes
app.get('/', (_req, res) => {
  res.send('Root endpoint check ');
});




export default app;
