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

export const getStockBySymbol = async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const stock = await Stock.findOne({ symbol });
    
    if (!stock) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
