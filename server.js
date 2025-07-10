import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/db.js'; 
import urlRoutes from './routes/urlRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import rateLimit from 'express-rate-limit';
const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20              // limit each IP to 20 requests per minute
});
app.use(limiter);


dotenv.config();
app.use(cors());
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', urlRoutes);
app.use('/analytics', analyticsRoutes);
app.use(errorHandler);
app.get('/', (req, res) => {
  res.send('Welcome to the URL Shortener API');
});


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

