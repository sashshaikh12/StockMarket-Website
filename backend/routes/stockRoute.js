// import express from 'express';
// import { searchStocks, getStockBySymbol } from '../controllers/stockController.js';

// const router = express.Router();

// // Search stocks
// router.get('/search', async (req, res) => {
//     try {
//         const { q } = req.query;
//         if (!q) {
//             return res.status(400).json({ error: 'Search query is required' });
//         }
        
//         const stocks = await searchStocks(q);
//         if (!stocks || stocks.length === 0) {
//             return res.status(404).json({ error: 'No stocks found matching the search criteria' });
//         }
        
//         res.json(stocks);
//     } catch (error) {
//         console.error('Search error:', error);
//         res.status(500).json({ error: error.message || 'Internal server error' });
//     }
// });

// // Get stock by symbol
// router.get('/:symbol', async (req, res) => {
//     try {
//         const stock = await getStockBySymbol(req.params.symbol.toUpperCase());
//         if (!stock) {
//             return res.status(404).json({ error: 'Stock not found' });
//         }
//         res.json(stock);
//     } catch (error) {
//         console.error('Stock fetch error:', error);
//         res.status(500).json({ error: error.message || 'Internal server error' });
//     }
// });

// export default router; 