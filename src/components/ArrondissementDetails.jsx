import React from 'react';

const ArrondissementDetails = ({ arrondissement, data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {arrondissement}ème arrondissement
            </h2>
            <p className="text-gray-500 mt-1">
              Dernière mise à jour: {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {/* changer le niveau d'alerte pour un vrai truc */}
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Niveau d'alerte: Normal
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <section className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Prévisions Sismiques
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              {data.seismes.map((seisme, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                    <span className="text-gray-600">{seisme.date}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm bg-gray-200 px-2 py-1 rounded">
                      Magnitude {seisme.magnitude}
                    </span>
                    <span className="text-sm text-gray-500">
                      Probabilité: {seisme.probabilite}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Alertes en cours
            </h3>
            <div className="space-y-3">
              {data.alertes.map((alerte, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 border-l-4 border-yellow-400"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-medium text-gray-800">{alerte.type}</span>
                      <p className="text-gray-600 mt-1">{alerte.message}</p>
                    </div>
                    <button className="text-blue-500 hover:text-blue-600">
                      En savoir plus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Activités à venir
          </h3>
          <div className="space-y-4">
            {data.activites.map((activite, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">{activite.nom}</h4>
                    <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {activite.date}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {activite.lieu}
                      </span>
                    </div>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600 text-sm">
                    Participer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="p-6 bg-gray-50 border-t">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Données fournies par la Métropole de Lyon
          </div>
          <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
            Télécharger le rapport complet
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArrondissementDetails; 