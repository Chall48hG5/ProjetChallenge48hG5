import React, { useState, useEffect, useRef } from "react";

const Chat = ({ messages, onSendMessage, arrondissement, user }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  // const [user, setUser] = useState(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const scrollContainer = messagesEndRef.current.closest(".aaaaaaaaaaaas");
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    // scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;
    onSendMessage(newMessage.trim());
    setNewMessage("");
    scrollToBottom();
  };

  if (arrondissement === "Général") {
    return null;
  }

  return (
    <div className="h-[500px] flex flex-col ">
      <div className="p-3 bg-gray-100 border-b"></div>
      <h3 className="text-sm font-medium text-gray-700"></h3>
      <div className="h-[calc(500px-7rem)] overflow-y-auto p-3 space-y-3 aaaaaaaaaaaas">
        {messages
          .filter(
            (message) =>
              (arrondissement && message.room_id === arrondissement) ||
              (!arrondissement && message.room_id === "general")
          )
          .map((message, index) => {
            const isOwnMessage = user && message.user_id === user.id;
            return (
              <div
                key={message.id || index}
                className={`flex ${
                  isOwnMessage ? "justify-end" : "justify-start"
                } flex-col`}
              >
                {!isOwnMessage && (
                  <div className="text-xs font-semibold text-gray-600 mb-1 px-1">
                    {message.pseudo || "Utilisateur"}
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded px-3 py-2 ${
                    isOwnMessage
                      ? "bg-blue-500 text-white self-end"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="text-sm break-words">{message.message}</div>
                  <div
                    className={`text-xs mt-1 ${
                      isOwnMessage ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {new Date(message.created_at).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            );
          })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 bg-gray-50 border-t mt-auto">
        {!user ? (
          <p className="text-sm text-gray-500">
            Connectez-vous pour participer au chat.
          </p>
        ) : arrondissement !== "Général" ? (
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
        ) : (
          <p className="text-sm text-gray-500">
            Sélectionnez un arrondissement pour envoyer un message.
          </p>
        )}
      </div>
    </div>
  );
};

export default Chat;
