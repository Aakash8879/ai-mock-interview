"use client";

import { GoogleGenerativeAI } from '@google/generative-ai';
import { useEffect, useRef, useState } from 'react';
import { FaPaperPlane, FaRobot, FaTimes } from 'react-icons/fa';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);

  const systemPrompt = `You are a helpful and professional AI support assistant for an online platform.

Your role is to assist users with common issues related to accounts, features, billing, usage, or general inquiries. Always stay friendly, polite, and concise. Use simple language and avoid jargon. Guide users clearly to the correct solution, page, or action.

Support areas include:
- Account creation, login, and password reset
- Subscription plans and billing
- How to use specific features of the platform
- Troubleshooting common errors
- Directing users to documentation or support contact if needed

If the user asks something outside your scope, respond with:
"I'm not sure about that. Please contact our support team for more help."

Do not give personal opinions, do not make assumptions, and do not share any personal information about yourself or the company.

Stay in character as a helpful support assistant at all times.
`;

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = `${systemPrompt}\n\nUser: ${inputMessage}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const botMessage = { role: 'bot', content: response.text() };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, the server is busy. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-end">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 h-96 mr-4 flex flex-col animate-slideIn backdrop-blur-sm bg-opacity-95 border border-gray-300">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaRobot className="text-white animate-pulse" />
              <h3 className="text-white font-bold">AI Interview Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:rotate-90 transition-transform duration-300"
            >
              <FaTimes />
            </button>
          </div>

          <div ref={chatBoxRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${msg.role === 'user'
                    ? 'ml-auto bg-gradient-to-r from-blue-100 to-blue-200'
                    : 'mr-auto bg-gradient-to-r from-gray-100 to-gray-200'
                  } p-3 rounded-lg max-w-[80%] shadow-md hover:shadow-lg transition-shadow duration-300 animate-fadeIn`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="flex space-x-2 mr-auto bg-gray-100 p-3 rounded-lg animate-pulse">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Start your mock interview..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 rounded-lg hover:opacity-90 transition-opacity duration-300 focus:ring-2 focus:ring-blue-400 cursor-pointer"
              >
                <FaPaperPlane className="transform hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group animate-floating relative cursor-pointer"
        onMouseEnter={(e) => e.currentTarget.querySelector('svg').classList.add('animate-wiggle')}
        onMouseLeave={(e) => e.currentTarget.querySelector('svg').classList.remove('animate-wiggle')}
      >
        <FaRobot
          size={24}
          className={`transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
        {!isOpen && (
          <span className="absolute -top-2 -right-2 h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
        )}
      </button>
    </div>
  );
};

export default ChatBot;
