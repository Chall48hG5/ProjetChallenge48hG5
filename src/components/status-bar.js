"use client"

import { useState, useEffect } from "react"
import { Clock, Wifi, ThermometerSnowflake, Droplets } from "lucide-react"

export default function StatusBar() {
  const [time, setTime] = useState(new Date())
  const [weatherData, setWeatherData] = useState({
    temperature: -5,
    humidity: 85,
    connectivity: "Stable",
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDate = (date) => {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <div className="bg-black/80 backdrop-blur-sm border-b border-white/10 text-xs text-gray-300">
      <div className="container mx-auto px-4 py-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1 text-cyan-400" />
              <span>{formatTime(time)}</span>
            </div>
            <div className="hidden sm:block">{formatDate(time)}</div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <ThermometerSnowflake className="h-3 w-3 mr-1 text-blue-400" />
              <span>{weatherData.temperature}°C</span>
            </div>
            <div className="flex items-center">
              <Droplets className="h-3 w-3 mr-1 text-blue-400" />
              <span>{weatherData.humidity}%</span>
            </div>
            <div className="flex items-center">
              <Wifi className="h-3 w-3 mr-1 text-green-400" />
              <span>{weatherData.connectivity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
