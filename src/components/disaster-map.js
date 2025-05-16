"use client"

import { useState } from "react"
import { Droplets, Zap, Wifi, Flame } from "lucide-react"

export default function DisasterMap() {
  const [selectedZone, setSelectedZone] = useState(null)

  const zones = [
    {
      id: 1,
      name: "Confluence",
      status: "danger",
      type: "inondation",
      icon: Droplets,
      position: { top: "60%", left: "30%" },
      details: "Inondation majeure en cours. Niveau d'eau: 2.4m au-dessus de la normale.",
    },
    {
      id: 2,
      name: "Part-Dieu",
      status: "warning",
      type: "cyber",
      icon: Wifi,
      position: { top: "40%", left: "60%" },
      details: "Cyberattaque détectée. Systèmes de sécurité compromis à 32%.",
    },
    {
      id: 3,
      name: "Croix-Rousse",
      status: "warning",
      type: "tremblement",
      icon: Zap,
      position: { top: "25%", left: "40%" },
      details: "Activité sismique détectée. Magnitude: 4.2 sur l'échelle de Richter.",
    },
    {
      id: 4,
      name: "Gerland",
      status: "safe",
      type: "normal",
      icon: Flame,
      position: { top: "75%", left: "50%" },
      details: "Aucune menace détectée. Zone sécurisée.",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "danger":
        return "bg-red-500"
      case "warning":
        return "bg-amber-500"
      case "safe":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="glass-card rounded-xl p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Carte des Menaces</h3>
        <div className="flex space-x-2">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
            <span className="text-xs text-gray-300">Critique</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-amber-500 mr-1"></div>
            <span className="text-xs text-gray-300">Alerte</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
            <span className="text-xs text-gray-300">Sécurisé</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[400px] bg-slate-800 rounded-lg overflow-hidden border border-white/10">
        {/* Map background */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center opacity-40"></div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* Zones */}
        {zones.map((zone) => (
          <div
            key={zone.id}
            className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${selectedZone === zone.id ? "z-20" : "z-10"}`}
            style={{ top: zone.position.top, left: zone.position.left }}
            onClick={() => setSelectedZone(zone.id === selectedZone ? null : zone.id)}
          >
            <div
              className={`flex items-center justify-center h-10 w-10 rounded-full ${getStatusColor(zone.status)} ${zone.status === "danger" ? "disaster-pulse" : ""}`}
            >
              <zone.icon className="h-5 w-5 text-white" />
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded whitespace-nowrap">
              {zone.name}
            </div>

            {/* Details popup */}
            {selectedZone === zone.id && (
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-64 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-3 z-30">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-white">{zone.name}</h4>
                    <p className="text-xs text-gray-300 mt-1">{zone.details}</p>
                  </div>
                  <div className={`h-3 w-3 rounded-full ${getStatusColor(zone.status)} mt-1`}></div>
                </div>
                <div className="mt-3 flex justify-end">
                  <button className="inline-flex items-center justify-center rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 h-7 px-3">
                    Détails
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-400">
          <span className="text-cyan-400 font-medium">4</span> zones surveillées •
          <span className="text-red-400 font-medium"> 1</span> alerte critique
        </div>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-white/20 hover:bg-white/10 h-8 px-3 py-2">
          Vue complète
        </button>
      </div>
    </div>
  )
}
