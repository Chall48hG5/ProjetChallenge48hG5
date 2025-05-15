import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="flex justify-between items-center h-12 px-4">
        <div className="text-sm text-gray-600">
          Système d'Alertes - Métropole de Lyon
        </div>
        <div className="text-sm text-gray-600">
          Numéro d'urgence : <span className="text-red-500 font-medium">112</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 