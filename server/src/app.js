import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db.js';
import ensureDbConnected from './middleware/db.js';
import auth from './routes/auth.js';
import mongoose from 'mongoose';

dotenv.config();

// Start database connection on startup
connectDB();

const app = express();


app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:8080',
    'https://cli-sentio.vercel.app'
  ],
  credentials: true,
}));
app.use(helmet({ crossOriginResourcePolicy: false }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Apply DB connection middleware to all API routes
app.use('/api', ensureDbConnected);
app.use('/api/auth', auth);


app.get('/health', async (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.status(isConnected ? 200 : 503).json({
    status: isConnected ? 'healthy' : 'unhealthy',
    database: isConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Sentio Authentication API',
    status: 'online',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting/disconnected'
  });
});

export default app;
