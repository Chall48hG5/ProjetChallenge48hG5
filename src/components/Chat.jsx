import React, { useState, useEffect, useRef } from 'react';

const Chat = ({ messages, onSendMessage, arrondissement }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  const scrollToBottom = () => {
    // if (shouldScroll) {
    //   messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    //   setShouldScroll(false);
    // }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setShouldScroll(true);
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="h-[500px] flex flex-col">
      <div className="p-3 bg-gray-100 border-b">
        <h3 className="text-sm font-medium text-gray-700">
          Communications - {arrondissement}
        </h3>
      </div>

      <div className="h-[calc(500px-7rem)] overflow-y-auto p-3 space-y-3">
        {messages
          .filter(
            (message) =>
              (arrondissement && message.room_id === arrondissement) ||
              (!arrondissement && message.room_id === 'general')
          )
          .map((message, index) => (
            <div
              key={message.id || index}
              className={`flex ${
                message.pseudo === 'anonymous' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded px-3 py-2 ${
                  message.pseudo === 'anonymous'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="text-sm break-words">
                  {message.message}
                </div>
                <div className={`text-xs mt-1 ${
                  message.user_id === 'anonymous'
                    ? 'text-blue-100'
                    : 'text-gray-500'
                }`}>
                  {new Date(message.created_at).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 bg-gray-50 border-t mt-auto">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Votre message..."
            className="flex-1 px-3 py-1.5 bg-white text-gray-800 text-sm rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;