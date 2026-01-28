
import React, { useState } from 'react';
import Header from './components/Header';
import StateList from './components/StateList';
import StateDetail from './components/StateDetail';
import ImageWorkshop from './components/ImageWorkshop';
import Quiz from './components/Quiz';
import ChatAssistant from './components/ChatAssistant';
import { StateData } from './types';

const App: React.FC = () => {
  const [selectedState, setSelectedState] = useState<StateData | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center text-center px-4 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://picsum.photos/seed/venezuela_landscape/1920/1080" 
              alt="Venezuela Landscape" 
              className="w-full h-full object-cover brightness-50"
            />
          </div>
          <div className="relative z-10 animate-in fade-in slide-in-from-bottom duration-1000">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-2xl">
              ¡Bienvenido a Venezuela!
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 drop-shadow-lg font-medium">
              Aprende sobre la historia, economía y geografía de nuestros estados con el poder de la Inteligencia Artificial.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#mapa" 
                className="bg-yellow-400 text-yellow-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all shadow-xl hover:scale-105"
              >
                Ver Estados
              </a>
              <a 
                href="#quiz" 
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl hover:scale-105"
              >
                Probar Conocimientos 🎓
              </a>
            </div>
          </div>
        </section>

        {/* Content Modules */}
        <StateList onSelectState={setSelectedState} />

        {/* Chat Assistant Section */}
        <div className="bg-gradient-to-b from-slate-50 to-blue-50 py-12">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 border-l-8 border-blue-600 pl-4 uppercase tracking-tight">Pregúntale a Churuata</h2>
            <p className="text-gray-500 mb-8 ml-6">Tu guía virtual experto en geografía e historia nacional.</p>
          </div>
          <ChatAssistant />
        </div>
        
        <div className="bg-blue-900/5 py-12">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 border-l-8 border-blue-600 pl-4 uppercase tracking-tight">Desafío Tricolor</h2>
            <p className="text-gray-500 mb-8 ml-6">¿Qué tanto sabes sobre Venezuela? Pon a prueba tu mente con nuestro quiz generado por IA.</p>
          </div>
          <Quiz />
        </div>
        
        <div className="bg-slate-100 py-12">
          <ImageWorkshop />
        </div>
      </main>

      {/* Modals */}
      {selectedState && (
        <StateDetail 
          state={selectedState} 
          onClose={() => setSelectedState(null)} 
        />
      )}

      {/* Footer */}
      <footer className="bg-blue-900 text-blue-200 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🇻🇪</span>
              <h3 className="text-2xl font-bold text-white">Explora Venezuela</h3>
            </div>
            <p className="text-sm text-blue-400">Proyecto Educativo para Niños de 6to Grado.</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm mb-2 font-medium">Tecnología impulsada por Gemini 3, 2.5 y Search Grounding.</p>
            <p className="text-xs text-blue-500 font-bold uppercase tracking-wider">
              Creado por Prof. Carlos Mendez - Colegio Moral y Luces 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
