// models/stockModel.js
import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  industry: {
    type: String,
    required: true,
    trim: true
  },
  sector: {
    type: String,
    trim: true
  },
  currentPrice: {
    type: Number,
    required: true,
    min: 0
  },
  marketCap: {
    type: Number,
    required: true,
    min: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for better search performance
stockSchema.index({ symbol: 1 });
stockSchema.index({ name: 'text' });

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
//models/stockModel.js
// import mongoose from 'mongoose';

// const stockSchema = new mongoose.Schema({
//   symbol: String,
//   industry: String,
//   stockData: [{}] 
// });

// const Stock = mongoose.model('Stock', stockSchema);

// export default Stock;