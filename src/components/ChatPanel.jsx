import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const sessionId = uuidv4();

const ChatPanel = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post('http://localhost:8000/chat', {
        session_id: sessionId,
        message: input,
      });

      const botReply = { sender: 'bot', text: res.data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error("❌ Error sending message:", err);
    }

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className={`fixed right-0 top-16 h-[calc(100vh-4rem)] w-full sm:w-96 bg-gray-950 text-white transform transition-transform duration-300 ease-in-out z-[60] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-4">
          <h2 className="text-xl font-bold text-purple-400">Stocker Bot</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 bg-gray-900 rounded-lg p-4 mb-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.sender === 'bot' ? 'text-green-400' : 'text-blue-400'}`}>
              <b>{msg.sender}:</b> {msg.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2 px-2 w-full">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..." 
            className="flex-1 bg-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500 min-w-0 w-full max-w-full"
          />
          <button 
            onClick={sendMessage} 
            className="bg-purple-700 hover:bg-purple-800 px-4 sm:px-6 py-3 rounded-lg transition duration-300 whitespace-nowrap flex-shrink-0"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;