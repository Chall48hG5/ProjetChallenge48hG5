import React from "react";
import { supabase } from '@/lib/supabase';
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

const Header = ({ onLoginClick, onRegisterClick, user, onLogout }) => {

  const handleLogout = async () => {
    await supabase.auth.signOut();
    if (onLogout) onLogout();
  };

  return (
    <header className="bg-white border-b-4 border-gray-200 mb-4 z-50 relative">
      <div className="w-full">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center pl-4">
            <div className="text-xl font-semibold text-gray-800 flex items-center">
              <svg
                className="w-7 h-7 mr-3 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="tracking-tight">V.I.G.I.L</span>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 bg-gray-50 border-l border-gray-200 h-16">
            {!user ? (
              <>
                <button
                  onClick={onLoginClick}
                  className="bg-gray-200 text-gray-800 px-4 py-1.5 rounded-md text-sm hover:bg-gray-300"
                >
                  Connexion
                </button>
                <button
                  onClick={onRegisterClick}
                  className="bg-gray-200 text-gray-800 px-4 py-1.5 rounded-md text-sm hover:bg-gray-300"
                >
                  Créer un compte
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-700 text-sm pr-4">Connecté : {user.email}</p>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-red-600 transition-colors"
                >
                  Déconnexion
                </button>
              </>
            )}

            <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors text-sm font-medium shadow-sm flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              Signaler une alerte
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;