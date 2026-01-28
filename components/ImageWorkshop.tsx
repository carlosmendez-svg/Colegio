
import React, { useState, useRef } from 'react';
import { editStateImage } from '../services/gemini';

const ImageWorkshop: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setEditedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;
    setIsProcessing(true);
    try {
      const result = await editStateImage(image, prompt);
      if (result) {
        setEditedImage(result);
      }
    } catch (error) {
      console.error("Error editing image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div id="taller" className="p-8 max-w-7xl mx-auto bg-white rounded-3xl shadow-lg my-12 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Taller de Fotografía Mágica 🍌</h2>
          <p className="text-gray-600 mb-8">
            ¡Personaliza tus fotos de Venezuela! Sube una imagen de un paisaje o un estado y usa la IA para editarla. 
            Prueba: <span className="font-mono bg-yellow-100 px-1">"Añade un filtro retro"</span> o <span className="font-mono bg-yellow-100 px-1">"Pon nubes de colores en el cielo"</span>.
          </p>

          <div className="space-y-6">
            {!image ? (
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-video border-4 border-dashed border-blue-200 rounded-3xl flex flex-col items-center justify-center text-blue-400 hover:bg-blue-50 transition-all group"
              >
                <svg className="w-16 h-16 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="mt-4 font-bold text-lg">Subir una imagen del estado</span>
              </button>
            ) : (
              <div className="relative group">
                <img src={image} alt="Original" className="w-full rounded-2xl shadow-md border-4 border-blue-100" />
                <button 
                  onClick={() => {setImage(null); setEditedImage(null);}}
                  className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            )}
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
              accept="image/*"
            />

            <div className="space-y-4">
              <label className="block font-bold text-gray-700">¿Qué quieres cambiar?</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ej. 'Añade un sol brillante y un arcoíris sobre la montaña'"
                className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[100px]"
              />
              <button 
                onClick={handleEdit}
                disabled={!image || !prompt || isProcessing}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
                  isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Procesando con Magia AI...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    ¡Generar Edición!
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col items-center justify-center bg-gray-50 rounded-3xl p-8 border-2 border-dashed border-gray-200">
          {editedImage ? (
            <div className="animate-in zoom-in duration-500 flex flex-col items-center">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">✨ Resultado Mágico</h3>
              <img src={editedImage} alt="Editada" className="w-full rounded-2xl shadow-2xl border-4 border-white" />
              <a 
                href={editedImage} 
                download="mi-postal-venezuela.png"
                className="mt-6 flex items-center gap-2 text-blue-600 font-bold hover:underline"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Descargar Postal
              </a>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-inner text-gray-300">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <p className="text-gray-400 font-medium">Aquí aparecerá tu obra maestra</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageWorkshop;
