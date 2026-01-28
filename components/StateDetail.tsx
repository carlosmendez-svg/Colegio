
import React, { useEffect, useState } from 'react';
import { StateData, DetailedStateInfo, PlaceSuggestion } from '../types';
import { fetchStateDetails, fetchMapPlaces } from '../services/gemini';

interface StateDetailProps {
  state: StateData;
  onClose: () => void;
}

const StateDetail: React.FC<StateDetailProps> = ({ state, onClose }) => {
  const [details, setDetails] = useState<DetailedStateInfo | null>(null);
  const [places, setPlaces] = useState<PlaceSuggestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [info, mapData] = await Promise.all([
          fetchStateDetails(state.name),
          fetchMapPlaces(state.name)
        ]);
        setDetails(info);
        setPlaces(mapData);
      } catch (error) {
        console.error("Error loading state details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [state]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* Left Sidebar - Basic Info */}
        <div className="w-full md:w-1/3 bg-blue-50 p-8 border-r border-blue-100 flex flex-col">
          <button 
            onClick={onClose}
            className="self-start mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2 font-bold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Volver
          </button>
          
          <img src={state.flagUrl} alt={state.name} className="w-full rounded-xl shadow-lg mb-6" />
          <h2 className="text-4xl font-extrabold text-blue-900 mb-2">{state.name}</h2>
          <p className="text-xl text-blue-700 font-semibold mb-6 italic">Capital: {state.capital}</p>
          
          <div className="bg-blue-600 text-white p-4 rounded-2xl mb-4">
            <h4 className="font-bold text-sm uppercase tracking-wider mb-2">Región</h4>
            <p className="text-lg">{state.region}</p>
          </div>
          
          <div className="mt-auto space-y-4">
            <h4 className="font-bold text-gray-700">Fuentes Verificadas:</h4>
            {details?.sources.slice(0, 3).map((source, idx) => (
              <a 
                key={idx} 
                href={source.uri} 
                target="_blank" 
                rel="noreferrer"
                className="block text-xs text-blue-600 hover:underline truncate"
              >
                • {source.title || source.uri}
              </a>
            ))}
          </div>
        </div>

        {/* Right Content - Detailed AI Info */}
        <div className="w-full md:w-2/3 p-8 overflow-y-auto bg-gray-50">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
              <p className="text-blue-900 font-bold text-xl">Consultando a los satélites...</p>
              <p className="text-gray-500">Estamos recopilando datos sociales, económicos y políticos.</p>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-500">
              <section className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-yellow-400">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">👥</span> Aspectos Sociales
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{details?.social}</p>
              </section>

              <section className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">💰</span> Economía y Recursos
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{details?.economic}</p>
              </section>

              <section className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-red-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🏛️</span> Política e Historia
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{details?.political}</p>
              </section>

              <section className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">📍</span> Lugares sugeridos (Google Maps)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {places.map((place, idx) => (
                    <a 
                      key={idx} 
                      href={place.uri} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-4 border border-gray-100 rounded-xl hover:bg-blue-50 transition-colors block"
                    >
                      <h4 className="font-bold text-blue-700">{place.name}</h4>
                      {place.snippet && <p className="text-xs text-gray-500 mt-1 line-clamp-2 italic">"{place.snippet}"</p>}
                    </a>
                  ))}
                </div>
              </section>

              <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
                <h3 className="text-lg font-bold text-yellow-800 mb-2">💡 ¿Sabías qué? (Dato Curioso)</h3>
                <p className="text-yellow-900">{details?.currentNews}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StateDetail;
