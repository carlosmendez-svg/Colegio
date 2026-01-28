
import React, { useState, useRef, useEffect } from 'react';
import { chatAboutVenezuela } from '../services/gemini';
import { ChatMessage } from '../types';

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '¡Hola! Soy Churuata, tu guía experto en Venezuela. 🦜 ¿Qué quieres aprender hoy sobre nuestro hermoso país?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Pasamos el historial excluyendo el mensaje actual que acabamos de añadir
      const response = await chatAboutVenezuela(input, messages.map(m => ({ role: m.role, text: m.text })));
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: response.text, 
        sources: response.sources 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: '¡Uy! Me distraje un poco viendo el Salto Ángel. 🏔️ ¿Podrías preguntarme de nuevo?' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div id="asistente" className="p-8 max-w-4xl mx-auto my-12">
      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border-t-8 border-blue-600 flex flex-col h-[650px] transform transition-all">
        {/* Chat Header */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-white border-b border-blue-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2 border-white rotate-3">🦜</div>
            <div>
              <h3 className="text-xl font-black text-blue-900 tracking-tight">Conversa con Churuata</h3>
              <p className="text-xs text-blue-500 font-bold flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 
                Guía Virtual Activo
              </p>
            </div>
          </div>
          <div className="hidden sm:block text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">
            IA Educativa
          </div>
        </div>

        {/* Messages Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 scroll-smooth">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[85%] p-5 rounded-3xl shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
              }`}>
                <p className="whitespace-pre-line text-sm md:text-base leading-relaxed font-medium">{msg.text}</p>
                
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100/50">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.826a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      Fuentes para estudiar:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {msg.sources.map((s, i) => (
                        <a 
                          key={i} 
                          href={s.uri} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-[11px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors border border-blue-100 font-bold truncate max-w-[180px]"
                        >
                          {s.title || 'Referencia Web'}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex gap-2 items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                <span className="text-xs font-bold text-gray-400 ml-2">Churuata está pensando...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <div className="flex gap-3 items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="¿Qué quieres saber sobre el petróleo o el Ávila?"
              className="flex-1 bg-gray-50 p-4 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-gray-700 font-medium"
              disabled={isTyping}
            />
            <button 
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center shrink-0 group"
            >
              <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
          <p className="mt-3 text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">
            Aprende sobre geografía, historia y economía venezolana
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
