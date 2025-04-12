// controllers/stockController.js
import Stock from '../models/stockModel.js';

export const getAllStocks = async (req, res) => {
  try {
    const { industry } = req.query;
    const query = industry ? { industry } : {};
    const stocks = await Stock.find(query);
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search stocks by symbol or name
export const searchStocks = async (searchTerm) => {
    try {
        if (!searchTerm || typeof searchTerm !== 'string') {
            return [];
        }

        const cleanSearchTerm = searchTerm.trim();
        if (cleanSearchTerm.length === 0) {
            return [];
        }

        // First try exact symbol match
        const symbolMatch = await Stock.findOne({
            symbol: cleanSearchTerm.toUpperCase()
        }).select('-__v');

        if (symbolMatch) {
            return [symbolMatch];
        }

        // Then try partial matches on symbol and name
        const regex = new RegExp(cleanSearchTerm, 'i');
        const stocks = await Stock.find({
            $or: [
                { symbol: regex },
                { name: regex }
            ]
        })
        .select('-__v')
        .limit(10)
        .lean();

        return stocks.map(stock => ({
            symbol: stock.symbol,
            name: stock.name,
            industry: stock.industry,
            sector: stock.sector,
            currentPrice: stock.currentPrice,
            marketCap: stock.marketCap,
            lastUpdated: stock.lastUpdated
        }));
    } catch (error) {
        console.error('Search error:', error);
        return [];
    }
};

// Get stock by symbol
export const getStockBySymbol = async (symbol) => {
    try {
        if (!symbol || typeof symbol !== 'string') {
            return null;
        }

        const stock = await Stock.findOne({
            symbol: symbol.trim().toUpperCase()
        }).select('-__v');

        if (!stock) {
            return null;
        }

        return {
            symbol: stock.symbol,
            name: stock.name,
            industry: stock.industry,
            sector: stock.sector,
            currentPrice: stock.currentPrice,
            marketCap: stock.marketCap,
            lastUpdated: stock.lastUpdated
        };
    } catch (error) {
        console.error('Get stock error:', error);
        return null;
    }
};
