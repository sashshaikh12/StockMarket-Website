  // models/stockModel.js
  import mongoose from 'mongoose';

  const stockSchema = new mongoose.Schema({
    symbol: String,
    industry: String,
    stockData: [{}] 
  });

  const Stock = mongoose.model('Stock', stockSchema);

  export default Stock;
