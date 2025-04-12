import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function StockDetails() {
  const [stock, setStock] = useState(null);

  useEffect(() => {
    const storedStock = localStorage.getItem('selectedStock');
    if (storedStock) {
      setStock(JSON.parse(storedStock));
    }
  }, []);

  return (
    <div>
      <Navbar />
      {stock ? (
        <div className="p-4 max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-white">{stock.name}</h1>
                <p className="text-2xl text-purple-400 font-semibold">{stock.symbol}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400">Industry</p>
                <p className="text-white font-semibold">{stock.industry}</p>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-400">Current Price</p>
                <p className="text-white font-semibold text-xl">${stock.currentPrice}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-400">Market Cap</p>
                <p className="text-white font-semibold text-xl">${stock.marketCap.toLocaleString()}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-400">Sector</p>
                <p className="text-white font-semibold text-xl">{stock.sector}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-400">Last Updated</p>
                <p className="text-white font-semibold text-xl">
                  {new Date(stock.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Placeholder for chart */}
            <div className="mt-8 bg-gray-700 rounded-lg p-4 h-64">
              <p className="text-gray-400 text-center">Stock Chart Coming Soon</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 text-white text-center">
          <p>No stock selected</p>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default StockDetails;