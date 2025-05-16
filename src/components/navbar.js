"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Bell, Shield, Activity } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-cyan-400" />
              <span className="text-xl font-bold text-white">
                LYON<span className="text-cyan-400">2180</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              Alertes
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              Zones
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              Activités
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              Chat
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              À propos
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 h-9 px-3">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-cyan-400 text-black hover:bg-cyan-500 h-9 px-3">
              <Activity className="h-4 w-4 mr-2" />
              État du système
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#" className="block px-3 py-2 text-gray-300 hover:text-white">
              Alertes
            </Link>
            <Link href="#" className="block px-3 py-2 text-gray-300 hover:text-white">
              Zones
            </Link>
            <Link href="#" className="block px-3 py-2 text-gray-300 hover:text-white">
              Activités
            </Link>
            <Link href="#" className="block px-3 py-2 text-gray-300 hover:text-white">
              Chat
            </Link>
            <Link href="#" className="block px-3 py-2 text-gray-300 hover:text-white">
              À propos
            </Link>
            <div className="pt-4 flex flex-col space-y-2">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-cyan-400 text-cyan-400 h-9 px-3">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-cyan-400 text-black h-9 px-3">
                <Activity className="h-4 w-4 mr-2" />
                État du système
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
