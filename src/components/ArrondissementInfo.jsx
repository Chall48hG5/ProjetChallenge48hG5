import React from 'react';

const ArrondissementInfo = ({ arrondissement, onClose }) => {
  // Données simulées pour l'exemple
  const data = {
    seismes: [
      { date: '2171-03-20', magnitude: 2.1, probabilite: '15%' },
      { date: '2171-03-25', magnitude: 1.8, probabilite: '10%' },
    ],
    alertes: [
      { type: 'Météo', message: 'Risque de fortes pluies ce dddddddddddddddddddddddddd' },
      { type: 'Travaux', message: 'Rénovation de la rue principale du 15 au 20 avril' },
    ],
    activites: [
      { nom: 'Festival de Jazz', date: '2024-04-01', lieu: 'Place centrale' },
      { nom: 'Marché Bio', date: '2024-04-02', lieu: 'Place du marché' },
      { nom: 'Exposition d\'art', date: '2024-04-05', lieu: 'Galerie municipale' },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Arrondissement {arrondissement}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Prévisions Sismiques
          </h3>
          <div className="bg-gray-50 rounded-md p-4 space-y-2">
            {data.seismes.map((seisme, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{seisme.date}</span>
                <span className="text-gray-800">
                  Magnitude {seisme.magnitude} (Probabilité: {seisme.probabilite})
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Alertes en cours
          </h3>
          <div className="space-y-2">
            {data.alertes.map((alerte, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-md p-4 border-l-4 border-yellow-400"
              >
                <span className="font-medium text-gray-700">{alerte.type}:</span>
                <p className="text-gray-600 mt-1">{alerte.message}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Activités à venir
          </h3>
          <div className="grid gap-4">
            {data.activites.map((activite, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-md p-4 hover:bg-gray-100 transition-colors"
              >
                <h4 className="font-medium text-gray-800">{activite.nom}</h4>
                <p className="text-gray-600 text-sm mt-1">
                  {activite.date} - {activite.lieu}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArrondissementInfo; 