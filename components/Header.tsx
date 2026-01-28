
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="venezuela-gradient text-white p-6 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-full shadow-lg">
            <svg className="w-8 h-8 text-blue-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Explora Venezuela</h1>
        </div>
        <nav className="flex gap-4 md:gap-6 font-semibold text-sm md:text-base">
          <a href="#" className="hover:underline transition-all">Inicio</a>
          <a href="#mapa" className="hover:underline transition-all">Estados</a>
          <a href="#quiz" className="hover:text-yellow-300 transition-all flex items-center gap-1">
            <span className="hidden md:inline">Quiz</span> 🎓
          </a>
          <a href="#asistente" className="hover:text-yellow-300 transition-all">Churuata 🦜</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
