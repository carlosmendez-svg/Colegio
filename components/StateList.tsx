
import React from 'react';
import { VENEZUELA_STATES } from '../constants';
import { StateData } from '../types';

interface StateListProps {
  onSelectState: (state: StateData) => void;
}

const StateList: React.FC<StateListProps> = ({ onSelectState }) => {
  return (
    <div id="mapa" className="p-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 border-l-8 border-yellow-400 pl-4 uppercase tracking-tight">Explora los Estados</h2>
        <p className="text-gray-500 ml-6">Haz clic en cualquier estado para conocer su información detallada, economía y cultura.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {VENEZUELA_STATES.map((state) => (
          <button
            key={state.id}
            onClick={() => onSelectState(state)}
            className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-2 text-left flex flex-col h-full"
          >
            {/* Cabecera con "Imagen" de color o efecto */}
            <div className="h-32 bg-blue-50 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-transparent opacity-50"></div>
               <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg className="w-24 h-24 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
               </div>
               <div className="absolute bottom-4 left-6">
                 <span className="bg-white/90 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                   {state.region}
                 </span>
               </div>
            </div>

            <div className="p-6 relative bg-white flex-grow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-700 transition-colors tracking-tight">{state.name}</h3>
                </div>
                
                <p className="text-sm font-bold text-blue-500 mb-4 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {state.capital}
                </p>
                
                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed italic border-t border-gray-50 pt-4">
                  "{state.description}"
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between text-blue-400 group-hover:text-blue-600 transition-colors text-xs font-bold uppercase tracking-widest">
                <span>Ver Detalles</span>
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StateList;
