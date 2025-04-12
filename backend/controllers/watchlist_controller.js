import Watchlist from '../models/watchlist_model.js';

// Get all stocks in the watchlist
export const getWatchlist = async (req, res) => {
    try {
        const stocks = await Watchlist.find();
        if (!stocks || stocks.length === 0)
            return res.status(404).json({ message: 'No stocks found in watchlist' });
        res.json(stocks);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add stock to watchlist
export const addToWatchlist = async (req, res) => {
    try {
        const { stockId } = req.body;
        const existing = await Watchlist.findOne({ stockId });

        if (existing)
            return res.status(400).json({ message: 'Stock already in watchlist' });

        const newStock = new Watchlist({ stockId });
        await newStock.save();

        res.status(201).json({ newStock, message: 'Stock added to watchlist' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete stock from watchlist
export const deleteFromWatchlist = async (req, res) => {
    try {
        const { stockId } = req.body;
        const deleted = await Watchlist.findOneAndDelete({ stockId });

        if (!deleted)
            return res.status(404).json({ message: 'Stock not found in watchlist' });

        res.status(200).json({ message: 'Stock removed from watchlist' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
