import express from 'express';
import {
    getWatchlist,
    addToWatchlist,
    deleteFromWatchlist
} from '../controllers/watchlist_controller.js';

const router = express.Router();

router.get('/', getWatchlist);
router.post('/', addToWatchlist);
router.delete('/delete', deleteFromWatchlist);

export default router;
