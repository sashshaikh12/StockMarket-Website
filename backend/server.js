import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDB} from './config/db.js';
import stockRoutes from './routes/stockRoutes.js';

dotenv.config({ path: '../.env' });
const app = express();

app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));

// Stock routes
app.use('/api/stocks', stockRoutes);

app.listen(5000, () => {
    connectDB();
    console.log("backend server is running on port 5000");
});