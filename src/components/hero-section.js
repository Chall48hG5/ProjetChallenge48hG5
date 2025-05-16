"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Shield, ArrowRight } from "lucide-react"

export default function HeroSection() {
  const [currentAlert, setCurrentAlert] = useState(0)
  const alerts = [
    { type: "Inondation", zone: "Confluence", level: "Critique", color: "bg-blue-500" },
    { type: "Tremblement de terre", zone: "Croix-Rousse", level: "Modéré", color: "bg-orange-500" },
    { type: "Cyberattaque", zone: "Part-Dieu", level: "Sévère", color: "bg-purple-500" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlert((prev) => (prev + 1) % alerts.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Background with futuristic city */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-30"></div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black"></div>

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/20 border border-red-500 text-red-300 mb-6">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span>
              Alerte en cours: {alerts[currentAlert].type} - {alerts[currentAlert].zone}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Protégeons <span className="text-cyan-400 glow-text">Lyon 2180</span> des catastrophes
          </h1>

          <p className="text-xl text-gray-300 mb-8">
            Notre équipe d'experts surveille et protège la mégapole contre les inondations, tremblements de terre,
            cyberattaques et autres cataclysmes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-cyan-400 hover:bg-cyan-500 text-black h-11 px-8 text-base">
              Voir les alertes actuelles
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-white/20 hover:bg-white/10 h-11 px-8 text-base text-white">
              <Shield className="mr-2 h-5 w-5" />
              En savoir plus
            </button>
          </div>
        </div>
      </div>

      {/* Alert ticker at bottom */}
      <div className="absolute bottom-0 left-0 right-0 py-3 px-4 bg-black/80 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${alerts[currentAlert].color} mr-3 disaster-pulse`}></div>
            <span className="text-white font-medium">
              {alerts[currentAlert].type} • {alerts[currentAlert].zone} • Niveau: {alerts[currentAlert].level}
            </span>
          </div>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-cyan-400 underline-offset-4 hover:underline h-auto px-0 py-0">
            Détails
            <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
