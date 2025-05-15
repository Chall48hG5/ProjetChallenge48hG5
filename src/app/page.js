'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AlertTriangle, MessageCircle, MapPin, Activity, Users, Sun, Cloud, CloudRain, Wind } from 'lucide-react';

export default function Home() {
  const [activeZone, setActiveZone] = useState('zone1');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showEmergencyPanel, setShowEmergencyPanel] = useState(false);
  const [currentAlert, setCurrentAlert] = useState(null);
  
  const zones = {
    zone1: { 
      name: 'Côte Atlantique', 
      status: 'warning', 
      alerts: [
        { id: 1, type: 'inondation', level: 'élevé', details: 'Montée des eaux prévue dans les prochaines 24h', time: '10:30' },
        { id: 2, type: 'vent', level: 'modéré', details: 'Rafales à 90km/h attendues', time: '09:15' }
      ],
      activities: [
        { id: 1, name: 'Surf adapté', location: 'Plage Nord', risk: 'modéré', participants: 12 },
        { id: 2, name: 'Observation des vagues', location: 'Falaise Est', risk: 'faible', participants: 25 }
      ]
    },
    zone2: { 
      name: 'Massif Alpin', 
      status: 'danger', 
      alerts: [
        { id: 3, type: 'avalanche', level: 'critique', details: 'Risque maximal sur les pentes Nord', time: '11:45' },
        { id: 4, type: 'tempête', level: 'élevé', details: 'Tempête de neige attendue en soirée', time: '08:00' }
      ],
      activities: [
        { id: 3, name: 'Randonnée sécurisée', location: 'Vallée Sud', risk: 'modéré', participants: 8 },
        { id: 4, name: 'Refuge hivernal', location: 'Chalet Montagne', risk: 'faible', participants: 30 }
      ]
    },
    zone3: { 
      name: 'Sud Méditerranéen', 
      status: 'safe', 
      alerts: [
        { id: 5, type: 'incendie', level: 'faible', details: 'Vigilance maintenue, situation stable', time: '14:20' }
      ],
      activities: [
        { id: 5, name: 'Excursion découverte', location: 'Calanques', risk: 'minimal', participants: 45 },
        { id: 6, name: 'Atelier prévention', location: 'Centre-ville', risk: 'aucun', participants: 60 }
      ]
    }
  };

  const [messages, setMessages] = useState([
    { id: 1, user: 'Sophie M.', text: 'Est-ce que la route D45 est praticable ?', time: '11:30' },
    { id: 2, user: 'Système', text: 'Alerte: Zone Ouest maintenant en vigilance orange', time: '11:35' },
    { id: 3, user: 'Marc L.', text: 'Centre d\'hébergement ouvert à la salle municipale', time: '11:42' }
  ]);
  
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { 
        id: messages.length + 1, 
        user: 'Vous', 
        text: newMessage, 
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
      }]);
      setNewMessage('');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const showAlert = (alert) => {
    setCurrentAlert(alert);
    setShowEmergencyPanel(true);
  };

  const closeAlert = () => {
    setShowEmergencyPanel(false);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'danger': return 'bg-red-500';
      case 'warning': return 'bg-amber-400';
      case 'safe': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getAlertIcon = (type) => {
    switch(type) {
      case 'inondation': return <CloudRain className="h-6 w-6" />;
      case 'vent': return <Wind className="h-6 w-6" />;
      case 'avalanche': return <AlertTriangle className="h-6 w-6" />;
      case 'tempête': return <Cloud className="h-6 w-6" />;
      case 'incendie': return <AlertTriangle className="h-6 w-6" />;
      default: return <AlertTriangle className="h-6 w-6" />;
    }
  };

  const getLevelClass = (level) => {
    switch(level) {
      case 'critique': return 'bg-red-600 text-white';
      case 'élevé': return 'bg-red-500 text-white';
      case 'modéré': return 'bg-amber-400 text-black';
      case 'faible': return 'bg-yellow-200 text-black';
      default: return 'bg-green-400 text-black';
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} transition-colors duration-300`}>
      <Head>
        <title>Alert Sentinel | Surveillance en temps réel</title>
        <meta name="description" content="Système d'alerte et d'information en temps réel pour les catastrophes naturelles" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header*/}
      <header className={`fixed w-full top-0 z-30 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <AlertTriangle className={`h-8 w-8 ${isDarkMode ? 'text-amber-400' : 'text-red-500'}`} />
              <span className="ml-2 text-xl font-bold tracking-tight">Alert Sentinel</span>
            </div>
            
            <nav className="hidden md:flex space-x-8 items-center">
              <Link href="/" className={`font-medium ${isDarkMode ? 'text-amber-400' : 'text-blue-600'} hover:opacity-80`}>
                Accueil
              </Link>
              <Link href="/carte" className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:opacity-80`}>
                Carte
              </Link>
              <Link href="/ressources" className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:opacity-80`}>
                Ressources
              </Link>
              <Link href="/activites" className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:opacity-80`}>
                Activités
              </Link>
            </nav>
            
            <div className="flex items-center">
              <button 
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-amber-400' : 'bg-gray-200 text-gray-800'}`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Cloud className="h-5 w-5" />}
              </button>
              
              <button className={`ml-4 py-2 px-4 rounded-full ${isDarkMode ? 'bg-amber-500' : 'bg-red-500'} text-white font-medium shadow-lg hover:shadow-xl transition-shadow`}>
                Signaler
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 pt-24 pb-16">
        
        {/* carte stylisée */}
        <section className={`mb-12 rounded-xl overflow-hidden shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} relative`}>
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Surveillance des zones à risque</h1>
            <p className="text-lg mb-6 max-w-3xl">Informations en temps réel sur les événements climatiques et catastrophes naturelles. Restez informés, restez en sécurité.</p>
            
            {/* statut des alertes */}
            <div className="flex flex-wrap gap-3 mb-8">
              {Object.keys(zones).map((zoneKey) => (
                <button
                  key={zoneKey}
                  onClick={() => setActiveZone(zoneKey)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all ${activeZone === zoneKey ? (isDarkMode ? 'bg-amber-500 text-black' : 'bg-blue-600 text-white') : (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')} hover:scale-105`}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{zones[zoneKey].name}</span>
                  <span className={`ml-2 w-3 h-3 rounded-full ${getStatusColor(zones[zoneKey].status)}`}></span>
                </button>
              ))}
            </div>
            
            {/* Carte stylisée*/}
            <div 
              className={`w-full h-64 md:h-96 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'} relative overflow-hidden`}
              style={{
                backgroundImage: isDarkMode ? 
                  'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1), transparent 70%), linear-gradient(30deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)' : 
                  'radial-gradient(circle at 30% 50%, rgba(219, 234, 254, 0.8), rgba(147, 197, 253, 0.4) 70%), linear-gradient(120deg, rgba(239, 246, 255, 0.6) 0%, rgba(191, 219, 254, 0.8) 100%)'
              }}
            >
              {/* Marqueurs de zones */}
              <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`w-6 h-6 rounded-full ${getStatusColor(zones.zone1.status)} animate-pulse shadow-lg flex items-center justify-center cursor-pointer`}>
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
              </div>
              
              <div className="absolute top-1/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`w-6 h-6 rounded-full ${getStatusColor(zones.zone2.status)} animate-pulse shadow-lg flex items-center justify-center cursor-pointer`}>
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
              </div>
              
              <div className="absolute bottom-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`w-6 h-6 rounded-full ${getStatusColor(zones.zone3.status)} animate-pulse shadow-lg flex items-center justify-center cursor-pointer`}>
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className={`md:col-span-2 rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-blue-600'} text-white p-4`}>
              <h2 className="text-xl font-bold flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Alertes en cours - {zones[activeZone].name}
              </h2>
            </div>
            
            <div className="p-4">
              {zones[activeZone].alerts.length > 0 ? (
                <div className="space-y-4">
                  {zones[activeZone].alerts.map(alert => (
                    <div 
                      key={alert.id} 
                      className={`flex items-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} cursor-pointer transition-colors`}
                      onClick={() => showAlert(alert)}
                    >
                      <div className={`p-3 rounded-full mr-4 ${getLevelClass(alert.level)}`}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold capitalize">{alert.type}</h3>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{alert.details}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 rounded ${getLevelClass(alert.level)} text-xs font-medium`}>
                          {alert.level}
                        </span>
                        <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p>Aucune alerte active dans cette zone</p>
                </div>
              )}
            </div>
            
            {/* Section Activités */}
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-blue-600'} text-white p-4 mt-6`}>
              <h2 className="text-xl font-bold flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Activités adaptées
              </h2>
            </div>
            
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {zones[activeZone].activities.map(activity => (
                <div 
                  key={activity.id}
                  className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} transition-transform hover:scale-105`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg">{activity.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${activity.risk === 'modéré' ? 'bg-amber-400 text-black' : activity.risk === 'faible' ? 'bg-yellow-200 text-black' : 'bg-green-400 text-black'}`}>
                      Risque: {activity.risk}
                    </span>
                  </div>
                  <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <MapPin className="h-4 w-4 inline mr-1" />
                    {activity.location}
                  </p>
                  <div className="flex items-center">
                    <Users className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`ml-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {activity.participants} participants
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat local */}
          <div className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg flex flex-col`}>
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-blue-600'} text-white p-4`}>
              <h2 className="text-xl font-bold flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat local
              </h2>
            </div>
            
            <div className="flex-grow p-4 overflow-y-auto h-96">
              {messages.map(msg => (
                <div key={msg.id} className={`mb-4 ${msg.user === 'Vous' ? 'text-right' : ''}`}>
                  <div className={`inline-block max-w-xs rounded-lg p-3 ${
                    msg.user === 'Système' 
                      ? (isDarkMode ? 'bg-amber-500 text-black' : 'bg-amber-100 text-amber-800') 
                      : msg.user === 'Vous'
                        ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                        : (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800')
                  }`}>
                    {msg.user !== 'Vous' && (
                      <p className="font-semibold text-sm">{msg.user}</p>
                    )}
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.user === 'Système' 
                        ? 'text-amber-800' 
                        : msg.user === 'Vous'
                          ? 'text-blue-100'
                          : (isDarkMode ? 'text-gray-400' : 'text-gray-500')
                    }`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={sendMessage} className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Votre message..."
                  className={`flex-grow p-2 rounded-l-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'} focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-amber-500' : 'focus:ring-blue-500'}`}
                />
                <button 
                  type="submit"
                  className={`py-2 px-4 rounded-r-lg ${isDarkMode ? 'bg-amber-500 text-black' : 'bg-blue-500 text-white'} font-medium hover:opacity-90`}
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-white text-gray-600 border-gray-200'} border-t`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <AlertTriangle className={`h-6 w-6 ${isDarkMode ? 'text-amber-400' : 'text-red-500'}`} />
              <span className="ml-2 text-lg font-bold">Alert Sentinel</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="hover:underline">À propos</a>
              <a href="#" className="hover:underline">Confidentialité</a>
              <a href="#" className="hover:underline">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm">
            <p>Projet réalisé dans le cadre d'un cours sur les systèmes d'information d'urgence</p>
            <p className="mt-2">© 2025 Alert Sentinel. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Panneau d'urgence */}
      {showEmergencyPanel && currentAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} max-w-md w-full overflow-hidden shadow-2xl`}>
            <div className={`p-4 ${getLevelClass(currentAlert.level)}`}>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center">
                  {getAlertIcon(currentAlert.type)}
                  <span className="ml-2 capitalize">{currentAlert.type} - Niveau {currentAlert.level}</span>
                </h2>
                <button onClick={closeAlert} className="rounded-full p-1 hover:bg-black hover:bg-opacity-20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-lg mb-4">{currentAlert.details}</p>
              <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Alerte émise à {currentAlert.time} dans la zone {zones[activeZone].name}
              </p>
              
              <div className="space-y-4">
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <h3 className="font-semibold mb-2">Conseils de sécurité</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Restez à l'intérieur si possible</li>
                    <li>Suivez les consignes des autorités locales</li>
                    <li>Préparez un kit d'urgence</li>
                    <li>Gardez votre téléphone chargé</li>
                  </ul>
                </div>
                
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <h3 className="font-semibold mb-2">Points d'évacuation</h3>
                  <p className="text-sm">Centre sportif municipal (ouvert 24h/24)</p>
                  <p className="text-sm">École Jean Moulin (capacité: 200 personnes)</p>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-4">
                <button className={`flex-1 py-2 rounded-lg ${isDarkMode ? 'bg-amber-500 text-black' : 'bg-blue-600 text-white'} font-medium`}>
                  S'inscrire aux alertes
                </button>
                <button className={`py-2 px-4 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  Partager
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
