import express from 'express';
import cors from 'cors';
import { router as calculatorRouter } from './apps/calculator/route.js';
import { SERVER_URL, ENV, CORS_ORIGIN } from './constants.js';

const app = express();

// Middleware setup
app.use(cors({
  origin: CORS_ORIGIN || "*",   // fallback to * so everyone can access
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Basic request logging
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Parse JSON + handle large requests
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Root endpoint to check if the server is running
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Calculator routes
app.use('/calculate', calculatorRouter);

// ✅ Start the server with Render's PORT
const PORT = process.env.PORT || 8900;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${ENV} mode`);
});
