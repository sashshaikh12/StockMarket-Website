import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import stockRoutes from './routes/stockRoutes.js';
// import stockRoutes from './routes/stockRoutes.js';
import watchlistRoutes from './routes/watchlist_routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/stocks', stockRoutes);
app.use('/api/watchlist', watchlistRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});