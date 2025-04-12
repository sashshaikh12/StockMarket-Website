import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema({
    
    stockId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Watchlist = mongoose.model('Watchlist', watchlistSchema);
export default Watchlist;
