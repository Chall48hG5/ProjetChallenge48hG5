"use client"

import { useState } from "react"
import { Send, User, Shield } from "lucide-react"

export default function LocalChat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    { id: 1, user: "Système", text: "Bienvenue dans le chat local de Lyon 2180.", isSystem: true, time: "09:15" },
    {
      id: 2,
      user: "Alex",
      text: "Est-ce que quelqu'un sait si la ligne de métro B fonctionne encore ?",
      isSystem: false,
      time: "09:17",
    },
    {
      id: 3,
      user: "Système",
      text: "ALERTE: Inondation détectée dans le secteur Confluence.",
      isSystem: true,
      time: "09:20",
    },
    {
      id: 4,
      user: "Léa",
      text: "Je suis à Part-Dieu, tout est normal ici pour l'instant.",
      isSystem: false,
      time: "09:22",
    },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: "Vous",
        text: message,
        isSystem: false,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="glass-card rounded-xl p-4 h-[300px] flex flex-col">
      <h3 className="text-xl font-bold text-white mb-3">Chat Local</h3>

      <div className="flex-grow overflow-y-auto mb-3 space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent pr-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isSystem ? "justify-center" : "justify-start"}`}>
            {msg.isSystem ? (
              <div className="bg-red-500/20 text-red-300 text-xs py-1 px-3 rounded-full border border-red-500/30 max-w-[90%]">
                <Shield className="inline-block h-3 w-3 mr-1" />
                {msg.text}
              </div>
            ) : (
              <div className="flex max-w-[90%]">
                <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center mr-2 flex-shrink-0">
                  <User className="h-4 w-4 text-gray-300" />
                </div>
                <div>
                  <div className="flex items-baseline">
                    <span className="font-medium text-sm text-cyan-400">{msg.user}</span>
                    <span className="ml-2 text-xs text-gray-500">{msg.time}</span>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-2 text-sm text-gray-200 mt-1">{msg.text}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex-grow relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Envoyer un message..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
          />
        </div>
        <button
          onClick={handleSendMessage}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-cyan-400 hover:bg-cyan-500 text-black h-9 w-9 p-0"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
