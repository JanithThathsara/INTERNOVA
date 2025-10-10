import React, { useEffect, useState } from "react";
import ChatBox from "../components/messages/ChatBox";
import MessageList from "../components/messages/MessageList";
import { getMessages, sendMessage } from "../services/messageService";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [from, setFrom] = useState("student1");
  const [to, setTo] = useState("company1");

  const loadMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMessages(from, to);
      setMessages(data || []);
    } catch (err) {
      console.error("Failed to load messages:", err);
      setError("Failed to load messages. Please try again.");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [from, to]);

  const handleSend = async (content) => {
    try {
      await sendMessage({ from, to, content });
      await loadMessages(); // Reload to get the latest messages
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Failed to send message. Please try again.");
    }
  };

  const handleUserChange = (newFrom, newTo) => {
    setFrom(newFrom);
    setTo(newTo);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-white">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading messages...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-lg">
                💬
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Chat: {from} ↔ {to}
                </h3>
                <p className="text-sm text-green-600">● Active</p>
              </div>
            </div>

            {/* User Selection */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">From:</label>
                <select
                  value={from}
                  onChange={(e) => handleUserChange(e.target.value, to)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="student1">student1</option>
                  <option value="company1">company1</option>
                  <option value="admin">admin</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">To:</label>
                <select
                  value={to}
                  onChange={(e) => handleUserChange(from, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="student1">student1</option>
                  <option value="company1">company1</option>
                  <option value="admin">admin</option>
                </select>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-red-700 text-sm">{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-red-400 hover:text-red-600"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Messages Area */}
        <div className="flex-1 bg-gray-50 overflow-hidden">
          <MessageList messages={messages} currentUser={from} />
        </div>

        {/* Chat Input */}
        <ChatBox onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
}
