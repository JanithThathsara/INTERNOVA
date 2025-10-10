import React from "react";

export default function MessageList({ messages, currentUser }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
          <p className="text-gray-500">Start the conversation by sending a message.</p>
        </div>
      </div>
    );
  }

  let lastDate = null;

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => {
        const isCurrentUser = message.from === currentUser;
        const messageDate = formatDate(message.createdAt || message.updatedAt);
        const showDateSeparator = messageDate !== lastDate;
        lastDate = messageDate;

        return (
          <div key={message._id || index}>
            {/* Date Separator */}
            {showDateSeparator && (
              <div className="flex items-center justify-center my-4">
                <div className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                  {messageDate}
                </div>
              </div>
            )}

            {/* Message */}
            <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md ${isCurrentUser ? 'order-1' : 'order-2'}`}>
                {/* Sender name for non-current user */}
                {!isCurrentUser && (
                  <div className="text-sm text-gray-600 mb-1 px-3">
                    {message.from}
                  </div>
                )}

                {/* Message bubble */}
                <div
                  className={`px-4 py-2 rounded-lg shadow-sm ${isCurrentUser
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm'
                    }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <div className={`text-xs mt-1 ${isCurrentUser ? 'text-indigo-100' : 'text-gray-500'}`}>
                    {formatTime(message.createdAt || message.updatedAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
