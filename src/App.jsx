import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx"
import Home from "./components/Home.jsx";
import StockDetails from "./components/StockDetails.jsx";
import Watchlist from "./components/Watchlist.jsx";
import Compare from "./components/Compare.jsx";
import Register from "./components/Register.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path = "/home" element={<Home />} />
        <Route path = "/stock-details" element={<StockDetails />} />
        <Route path = "/watchlist" element={<Watchlist />} />
        <Route path = "/compare" element={<Compare />} />
        <Route path = "/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
