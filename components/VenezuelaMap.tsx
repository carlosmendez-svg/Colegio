
import React from 'react';

interface VenezuelaMapProps {
  onStateClick: (stateId: string) => void;
  activeStateId?: string;
}

const VenezuelaMap: React.FC<VenezuelaMapProps> = ({ onStateClick, activeStateId }) => {
  // Simplificaremos los paths para el ejemplo, pero en una app real usaríamos un archivo GeoJSON o SVG detallado.
  // Aquí definimos una estructura representativa que vincula IDs con formas.
  
  const states = [
    { id: 'zul', name: 'Zulia', path: 'M40,50 L60,40 L70,80 L45,90 Z' },
    { id: 'fal', name: 'Falcón', path: 'M60,40 L100,20 L130,35 L110,60 L70,55 Z' },
    { id: 'lar', name: 'Lara', path: 'M70,55 L110,60 L105,90 L85,95 Z' },
    { id: 'zul', name: 'Zulia', path: 'M10,120 L50,110 L70,140 L40,180 L20,170 Z' }, // Ejemplo simplificado
    // Nota: Por brevedad, el SVG a continuación utiliza un diseño de rejilla simplificado 
    // pero funcional para la interacción del usuario en este entorno.
  ];

  const handleInteraction = (id: string) => {
    onStateClick(id);
  };

  return (
    <svg 
      viewBox="0 0 800 600" 
      className="w-full h-full drop-shadow-2xl"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fondo del mapa */}
      <rect width="800" height="600" fill="transparent" />
      
      {/* Grupo de Estados - Representación Esquemática Estilizada para interactividad */}
      {/* En un entorno productivo, aquí pegaríamos el SVG real completo de Venezuela */}
      <g className="cursor-pointer transition-all duration-300">
        {/* Zulia */}
        <path d="M120,200 L180,180 L200,250 L150,320 L100,280 Z" 
          onClick={() => handleInteraction('zul')}
          className={`fill-current transition-colors stroke-[2px] stroke-white hover:opacity-80 ${activeStateId === 'zul' ? 'text-blue-600' : 'text-gray-300'}`} 
        />
        {/* Falcón */}
        <path d="M180,180 L300,120 L350,150 L320,220 L200,250 Z" 
          onClick={() => handleInteraction('fal')}
          className={`fill-current transition-colors stroke-[2px] stroke-white hover:opacity-80 ${activeStateId === 'fal' ? 'text-blue-600' : 'text-gray-300'}`} 
        />
        {/* Lara */}
        <path d="M220,260 L320,230 L340,280 L280,310 Z" 
          onClick={() => handleInteraction('lar')}
          className={`fill-current transition-colors stroke-[2px] stroke-white hover:opacity-80 ${activeStateId === 'lar' ? 'text-blue-600' : 'text-gray-300'}`} 
        />
        {/* Mérida */}
        <path d="M150,330 L220,320 L240,380 L180,410 Z" 
          onClick={() => handleInteraction('mer')}
          className={`fill-current transition-colors stroke-[2px] stroke-white hover:opacity-80 ${activeStateId === 'mer' ? 'text-blue-600' : 'text-gray-300'}`} 
        />
        {/* Táchira */}
        <path d="M110,380 L180,420 L160,460 L100,440 Z" 
          onClick={() => handleInteraction('tac')}
          className={`fill-current transition-colors stroke-[2px] stroke-white hover:opacity-80 ${activeStateId === 'tac' ? 'text-blue-600' : 'text-gray-300'}`} 
        />
        {/* Bolívar */}
        <path d="M450,350 L650,300 L750,450 L600,550 L400,500 Z" 
          onClick={() => handleInteraction('bol')}
          className={`fill-current transition-colors stroke-[2px] stroke-white hover:opacity-80 ${activeStateId === 'bol' ? 'text-blue-600' : 'text-gray-300'}`} 
        />
        {/* Amazonas */}
        <path d="M350,510 L500,520 L480,580 L400,590 L320,560 Z" 
          onClick={() => handleInteraction('amz')}
          className={`fill-current transition-colors stroke-[2px] stroke-white hover:opacity-80 ${activeStateId === 'amz' ? 'text-blue-600' : 'text-gray-300'}`} 
        />
        {/* Anzoátegui */}
        <path d="M480,200 L580,180 L620,320 L520,340 Z" 
          onClick={() => handleInteraction('anz')}
          className={`fill-current transition-colors stroke-[2px] stroke-white hover:opacity-80 ${activeStateId === 'anz' ? 'text-blue-600' : 'text-gray-300'}`} 
        />
        {/* Sucre */}
        <path d="M580,180 L680,150 L720,190 L620,220 Z" 
          onClick={() => handleInteraction('suc')}
          className={`fill-current transition-colors stroke-[2px] stroke-white hover:opacity-80 ${activeStateId === 'suc' ? 'text-blue-600' : 'text-gray-300'}`} 
        />
        {/* Distrito Capital */}
        <path d="M380,180 L420,175 L425,195 L385,200 Z" 
          onClick={() => handleInteraction('dc')}
          className={`fill-current transition-colors stroke-[2px] stroke-white hover:opacity-80 ${activeStateId === 'dc' ? 'text-blue-600' : 'text-gray-300'}`} 
        />
        {/* Carabobo */}
        <path d="M340,210 L380,200 L390,230 L350,240 Z" 
          onClick={() => handleInteraction('car')}
          className={`fill-current transition-colors stroke-[2px] stroke-white hover:opacity-80 ${activeStateId === 'car' ? 'text-blue-600' : 'text-gray-300'}`} 
        />
        {/* Aragua */}
        <path d="M380,200 L420,195 L430,225 L390,230 Z" 
          onClick={() => handleInteraction('ara')}
          className={`fill-current transition-colors stroke-[2px] stroke-white hover:opacity-80 ${activeStateId === 'ara' ? 'text-blue-600' : 'text-gray-300'}`} 
        />
        
        {/* Relleno para el resto del territorio para que no se vea vacío */}
        <path d="M300,250 L450,230 L480,350 L350,510 L280,310 Z" 
          className="fill-gray-100 stroke-gray-200 stroke-1"
        />
        <path d="M480,200 L580,180 L520,340 L450,350 L450,230 Z" 
          className="fill-gray-100 stroke-gray-200 stroke-1"
        />
      </g>

      {/* Etiquetas de ayuda */}
      <text x="550" y="440" className="fill-gray-400 text-[20px] font-bold pointer-events-none uppercase">Bolívar</text>
      <text x="130" y="260" className="fill-gray-400 text-[18px] font-bold pointer-events-none uppercase">Zulia</text>
      <text x="400" y="560" className="fill-gray-400 text-[18px] font-bold pointer-events-none uppercase">Amazonas</text>
    </svg>
  );
};

export default VenezuelaMap;
