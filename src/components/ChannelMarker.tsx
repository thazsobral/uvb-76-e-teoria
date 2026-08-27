import React from 'react';
import { Bookmark, Shield, Radio, Activity } from 'lucide-react';

interface ChannelMarkerProps {
  theme: 'dark' | 'light';
}

export const ChannelMarker: React.FC<ChannelMarkerProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section id="marcador-canal" className={`py-16 px-4 max-w-6xl mx-auto border-t transition-colors ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <div
          className={`inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full border text-xs font-mono ${
            isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-700'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>UTILIDADE PRÁTICA</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Para Que Serve? O Marcador de Canal
        </h2>
        <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
          Se o zumbido não diz nada, por que o governo gasta energia e transmissores milionários há 50 anos?
        </p>
      </div>

      {/* 3 Core Functions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className={`p-6 rounded-2xl border transition-all ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <div className="w-8 h-8 rounded-lg border flex items-center justify-center mb-4">
            <Radio className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold mb-2">1. Guardar o Canal (Reserva)</h3>
          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            No espectro eletromagnético, uma frequência vazia é invadida por outros rádios e piratas. O zumbido funciona como uma "toalha colocada na cadeira da praia": avisa que a frequência de 4625 kHz está ocupada.
          </p>
        </div>

        <div className={`p-6 rounded-2xl border transition-all ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <div className="w-8 h-8 rounded-lg border flex items-center justify-center mb-4">
            <Shield className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold mb-2">2. Prontidão Militar</h3>
          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Os operadores militares mantêm o receptor sintonizado 24h ouvindo o bipe. No instante em que o som para e uma voz começa a falar, os quartéis sabem que uma ordem de emergência está sendo transmitida.
          </p>
        </div>

        <div className={`p-6 rounded-2xl border transition-all ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <div className="w-8 h-8 rounded-lg border flex items-center justify-center mb-4">
            <Activity className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold mb-2">3. Sonda da Ionosfera</h3>
          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            A transmissão contínua permite que centros de telecomunicações monitorem a qualidade da propagação de ondas curtas pelas camadas da alta atmosfera em diferentes climas e estações do ano.
          </p>
        </div>
      </div>
    </section>
  );
};
