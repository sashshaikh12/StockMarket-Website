import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchBar from "./SearchBar";

function Home() {
  const navigate = useNavigate();
  const [selectedStock, setSelectedStock] = useState(null);

  const handleCompanySelect = (stock) => {
    setSelectedStock(stock);
    // Store the stock data in localStorage for StockDetails to access
    localStorage.setItem('selectedStock', JSON.stringify(stock));
    navigate('/stock-details');
  };

  return (
    <div>
      <Navbar />
      <SearchBar onCompanySelect={handleCompanySelect} />
      <Footer />
    </div>
  );
}

export default Home;