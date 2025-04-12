import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Stock from './models/stockModel.js';

// Load environment variables
dotenv.config();

// Sample stock data
const sampleStocks = [
    {
        symbol: "AAPL",
        name: "Apple Inc.",
        industry: "Technology",
        sector: "Consumer Electronics",
        currentPrice: 175.34,
        marketCap: 2800000000000,
        historicalData: [
            {
                date: new Date("2024-01-01"),
                open: 170.00,
                high: 176.00,
                low: 169.50,
                close: 175.00,
                volume: 1000000
            },
            {
                date: new Date("2024-01-02"),
                open: 175.50,
                high: 177.00,
                low: 174.00,
                close: 175.34,
                volume: 1200000
            }
        ]
    },
    {
        symbol: "MSFT",
        name: "Microsoft Corporation",
        industry: "Technology",
        sector: "Software",
        currentPrice: 420.72,
        marketCap: 3120000000000,
        historicalData: [
            {
                date: new Date("2024-01-01"),
                open: 415.00,
                high: 422.00,
                low: 414.00,
                close: 420.00,
                volume: 800000
            },
            {
                date: new Date("2024-01-02"),
                open: 420.50,
                high: 421.00,
                low: 419.00,
                close: 420.72,
                volume: 900000
            }
        ]
    },
    {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        industry: "Technology",
        sector: "Internet Services",
        currentPrice: 150.25,
        marketCap: 1900000000000,
        historicalData: [
            {
                date: new Date("2024-01-01"),
                open: 148.00,
                high: 151.00,
                low: 147.50,
                close: 150.00,
                volume: 700000
            },
            {
                date: new Date("2024-01-02"),
                open: 150.50,
                high: 151.00,
                low: 149.00,
                close: 150.25,
                volume: 750000
            }
        ]
    }
];

// Connect to MongoDB and populate data
const populateDatabase = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        // Clear existing data
        await Stock.deleteMany({});
        console.log('Cleared existing stock data');

        // Insert new data
        await Stock.insertMany(sampleStocks);
        console.log('Successfully populated stock data');

        process.exit(0);
    } catch (error) {
        console.error('Error populating database:', error);
        process.exit(1);
    }
};

populateDatabase(); 