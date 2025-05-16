"use client"

import { useState } from "react"
import { Waves, Mountain, Shield, ArrowRight } from "lucide-react"

export default function ActivitySuggestions() {
  const [currentActivity, setCurrentActivity] = useState(0)

  const activities = [
    {
      id: 1,
      title: "Surf urbain",
      location: "Confluence",
      icon: Waves,
      color: "bg-blue-500",
      description: "Profitez des inondations pour surfer sur les vagues urbaines. Équipement fourni.",
      difficulty: "Intermédiaire",
      time: "14:00 - 17:00",
    },
    {
      id: 2,
      title: "Escalade de débris",
      location: "Croix-Rousse",
      icon: Mountain,
      color: "bg-orange-500",
      description: "Escaladez les structures fragilisées par les tremblements de terre. Sensations fortes garanties.",
      difficulty: "Avancé",
      time: "10:00 - 12:00",
    },
    {
      id: 3,
      title: "Visite des bunkers",
      location: "Part-Dieu",
      icon: Shield,
      color: "bg-purple-500",
      description: "Découvrez les bunkers anti-catastrophes et leurs technologies futuristes.",
      difficulty: "Facile",
      time: "Toute la journée",
    },
  ]

  const nextActivity = () => {
    setCurrentActivity((prev) => (prev + 1) % activities.length)
  }

  const prevActivity = () => {
    setCurrentActivity((prev) => (prev - 1 + activities.length) % activities.length)
  }

  const activity = activities[currentActivity]

  return (
    <div className="glass-card rounded-xl p-4">
      <h3 className="text-xl font-bold text-white mb-4">Activités Suggérées</h3>

      <div className="relative">
        <div className="rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-white/10">
          <div className="h-32 bg-[url('/placeholder.svg?height=200&width=400')] bg-cover bg-center relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-3 left-3 flex items-center">
              <div className={`h-8 w-8 rounded-full ${activity.color} flex items-center justify-center`}>
                <activity.icon className="h-4 w-4 text-white" />
              </div>
              <div className="ml-2">
                <h4 className="text-white font-bold">{activity.title}</h4>
                <p className="text-xs text-gray-300">{activity.location}</p>
              </div>
            </div>
          </div>

          <div className="p-3">
            <p className="text-sm text-gray-300 mb-3">{activity.description}</p>

            <div className="flex justify-between text-xs text-gray-400 mb-3">
              <span>Difficulté: {activity.difficulty}</span>
              <span>{activity.time}</span>
            </div>

            <button className="inline-flex items-center justify-center w-full rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-cyan-400 hover:bg-cyan-500 text-black h-9 px-4">
              Réserver
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center mt-3 space-x-1">
          {activities.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentActivity ? "bg-cyan-400" : "bg-gray-600"}`}
              onClick={() => setCurrentActivity(index)}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevActivity}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70"
        >
          ‹
        </button>
        <button
          onClick={nextActivity}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70"
        >
          ›
        </button>
      </div>
    </div>
  )
}
