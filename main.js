import express from 'express';
import cors from 'cors';
import { router as calculatorRouter } from './apps/calculator/route.js';
import { SERVER_URL, PORT, ENV, CORS_ORIGIN } from './constants.js';

const app = express();
 
// Middleware setup
app.use(cors({
  origin: CORS_ORIGIN,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Basic request logging
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware to parse JSON data
//app.use(express.json());

// Increase the limit to 50mb to accept large image data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Root endpoint to check if the server is running
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Include the calculator routes
app.use('/calculate', calculatorRouter); // The prefix `/calculate` matches the `/calculate` in the Python backend

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on ${SERVER_URL}:${PORT} in ${ENV} mode`);
});
