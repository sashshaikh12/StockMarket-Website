import React, { useState } from "react";
import { Link } from "react-router-dom";
import ChatPanel from "./ChatPanel";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [isChatPanelOpen, setIsChatPanelOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Implement your theme switching logic here
  };

  const toggleChatPanel = () => {
    setIsChatPanelOpen(!isChatPanelOpen);
  };

  return (
    <>
      <nav className="bg-black text-white sticky top-0 z-50 font-[Poppins]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="navbar">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Home */}
            <div className="flex items-center flex-shrink-0">
              <a 
                href="/home" 
                className="text-3xl font-bold text-purple-400 hover:text-purple-300 transition duration-300"
              >
                Stockers
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/watchlist">
                <p className="px-3 py-2 hover:text-purple-400 transition duration-300 text-lg">Watchlist</p>
              </Link>

              <Link to="/compare">
                <p className="px-3 py-2 hover:text-purple-400 transition duration-300 text-lg">Compare</p>
              </Link>
              
              {/* CTA Button - Modified */}
              <button
                onClick={toggleChatPanel}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-md transition duration-300"
              >
                ChatBot
              </button>

              {/* Dark/Light Mode Toggle */}
              <button 
                onClick={toggleDarkMode}
                className="p-2 ml-2 rounded-full hover:bg-gray-800 transition duration-300"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              
              {/* Profile Icon */}
              <button className="p-2 ml-1 rounded-full hover:bg-gray-800 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-purple-400 focus:outline-none transition duration-300"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-black pb-4`}>
          <div className="px-4 pt-2 space-y-2">
            <Link to="/watchlist">
              <p className="block px-3 py-2 rounded-md text-white hover:text-purple-400 hover:bg-gray-900 transition duration-300">
                Watchlist
              </p>
            </Link>
            <Link to="/compare">
              <p className="block px-3 py-2 rounded-md text-white hover:text-purple-400 hover:bg-gray-900 transition duration-300">
                Compare
              </p>
            </Link>
            
            <button
              onClick={() => {
                toggleChatPanel();
                setIsOpen(false);
              }}
              className="block bg-purple-600 hover:bg-purple-700 text-white text-center px-4 py-2 rounded-full transition duration-300 mt-2"
            >
              ChatBot
            </button>
            
            <div className="flex items-center justify-between px-3 py-2">
              <button 
                onClick={() => {
                  toggleDarkMode();
                  setIsOpen(false);
                }}
                className="flex items-center text-white hover:text-purple-400 transition duration-300"
              >
                {darkMode ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                    Light Mode
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                    Dark Mode
                  </>
                )}
              </button>
              
              <button 
                className="flex items-center text-white hover:text-purple-400 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Profile
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Chat Panel Component */}
      <ChatPanel isOpen={isChatPanelOpen} onClose={toggleChatPanel} />
    </>
  );
};

export default Navbar;