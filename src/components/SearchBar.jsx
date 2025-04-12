import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaHistory, FaTimes } from 'react-icons/fa';

const SearchBar = ({ onCompanySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Load search history on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('searchHistory');
      if (savedHistory) {
        setSearchHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  }, []);

  // Handle search with debounce
  useEffect(() => {
    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Reset states if search term is empty
    if (!searchTerm.trim()) {
      setSuggestions([]);
      setError(null);
      setActiveIndex(-1);
      return;
    }

    setLoading(true);
    setError(null);

    // Set new timeout for search
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/stocks/search?q=${encodeURIComponent(searchTerm.trim())}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch suggestions');
        }

        const data = await response.json();
        
        if (Array.isArray(data)) {
          // Filter out duplicates based on symbol
          const uniqueResults = data.filter((stock, index, self) =>
            index === self.findIndex((s) => s.symbol === stock.symbol)
          );
          setSuggestions(uniqueResults);
          setActiveIndex(-1);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Search error:', error);
        setError('Failed to fetch suggestions. Please try again.');
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    // Cleanup function
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowHistory(false);
    setError(null);
  };

  const handleSuggestionClick = (stock) => {
    if (!stock || !stock.symbol) return;

    try {
      // Update search history
      const newHistory = [
        {
          name: stock.name,
          symbol: stock.symbol,
          timestamp: new Date().toISOString()
        },
        ...searchHistory.filter(item => item.symbol !== stock.symbol)
      ].slice(0, 5);

      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      
      // Update UI state
      setSearchTerm(stock.name);
      setSuggestions([]);
      setError(null);
      setShowHistory(false);
      
      // Notify parent component
      onCompanySelect(stock);
    } catch (error) {
      console.error('Error handling suggestion click:', error);
      setError('Failed to process selection. Please try again.');
    }
  };

  const handleHistoryClick = (historyItem) => {
    if (!historyItem || !historyItem.symbol) return;
    
    setSearchTerm(historyItem.name);
    setShowHistory(false);
    setError(null);
    onCompanySelect(historyItem);
  };

  const handleKeyDown = (e) => {
    const items = showHistory ? searchHistory : suggestions;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => (prev < items.length - 1 ? prev + 1 : prev));
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
        
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && items[activeIndex]) {
          if (showHistory) {
            handleHistoryClick(items[activeIndex]);
          } else {
            handleSuggestionClick(items[activeIndex]);
          }
        }
        break;
        
      case 'Escape':
        e.preventDefault();
        setSuggestions([]);
        setShowHistory(false);
        setError(null);
        break;
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    setError(null);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const highlightMatch = (text, query) => {
    if (!text || !query) return text;
    try {
      const regex = new RegExp(`(${query})`, 'gi');
      return text.split(regex).map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="font-bold text-purple-500">
            {part}
          </span>
        ) : part
      );
    } catch (error) {
      return text;
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto my-16">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setShowHistory(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a company..."
          className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10 placeholder-gray-400"
        />
        <div className="absolute right-3 top-3 flex space-x-2">
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>
          )}
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500" />
          ) : (
            <>
              <FaSearch className="text-gray-400 cursor-pointer" />
              {searchHistory.length > 0 && (
                <FaHistory
                  className="text-gray-400 cursor-pointer hover:text-purple-500"
                  onClick={() => setShowHistory(!showHistory)}
                />
              )}
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="absolute z-20 w-full mt-1 p-2 bg-red-900 text-white rounded-lg shadow-lg">
          {error}
        </div>
      )}

      {showHistory && searchHistory.length > 0 && (
        <ul
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          <div className="px-4 py-2 bg-gray-900 text-gray-400 font-semibold">
            Recent Searches
          </div>
          {searchHistory.map((item, index) => (
            <li
              key={item.symbol}
              onClick={() => handleHistoryClick(item)}
              className={`px-4 py-2 hover:bg-gray-700 cursor-pointer text-white border-b border-gray-700 last:border-b-0 ${
                index === activeIndex ? 'bg-gray-700' : ''
              }`}
            >
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-gray-400">{item.symbol}</div>
            </li>
          ))}
        </ul>
      )}

      {suggestions.length > 0 && !showHistory && (
        <ul
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((stock, index) => (
            <li
              key={stock.symbol}
              onClick={() => handleSuggestionClick(stock)}
              className={`px-4 py-2 hover:bg-gray-700 cursor-pointer text-white border-b border-gray-700 last:border-b-0 ${
                index === activeIndex ? 'bg-gray-700' : ''
              }`}
            >
              <div className="font-semibold">
                {highlightMatch(stock.name, searchTerm)}
              </div>
              <div className="text-sm text-gray-400">
                {highlightMatch(stock.symbol, searchTerm)}
              </div>
              {stock.industry && (
                <div className="text-sm text-gray-400">{stock.industry}</div>
              )}
              {stock.currentPrice && (
                <div className="text-sm text-green-400 mt-1">
                  ${stock.currentPrice.toLocaleString()}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;