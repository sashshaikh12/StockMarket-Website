import React from 'react';
import { FaAngleDoubleUp } from "react-icons/fa";
import {Link} from "react-router-dom";

function Footer() {
  
  return (
    <footer className="bg-black text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Links - styled differently than navbar */}
        <div className="flex flex-wrap justify-center gap-6 mb-6">

          <Link to="/watchlist">
            <p className="text-sm font-medium hover:text-purple-400 transition duration-300">
              Watchlist
            </p>
          </Link>
          <Link to="/compare">
            <p className="text-sm font-medium hover:text-purple-400 transition duration-300">
              Compare
            </p>
          </Link>
          <Link to="/profile">
            <p className="text-sm font-medium hover:text-purple-400 transition duration-300">
              Profile
            </p>
          </Link>

            

          <FaAngleDoubleUp size={20} className='hover:cursor-pointer'  onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }}/>
        </div>
        
        {/* Copyright and simple info */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Stockers • Hackathon Project • Not real financial advice
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;