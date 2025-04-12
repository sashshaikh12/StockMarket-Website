// routes/stockRoutes.js
import express from 'express';
import { getAllStocks, getStockBySymbol, searchStocks } from '../controllers/stockController.js';

const router = express.Router();

// Search route must come before /:symbol to prevent conflicts
router.get('/search', async (req, res) => {
    const results = await searchStocks(req.query.q);
    res.json(results);
});

router.get('/', getAllStocks);
router.get('/:symbol', async (req, res) => {
    const stock = await getStockBySymbol(req.params.symbol);
    if (stock) {
        res.json(stock);
    } else {
        res.status(404).json({ message: 'Stock not found' });
    }
});

export default router;
