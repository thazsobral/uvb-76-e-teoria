import React from 'react';
import { ShieldAlert, ZapOff, CheckCircle } from 'lucide-react';

interface Drone2025SectionProps {
  theme: 'dark' | 'light';
}

export const Drone2025Section: React.FC<Drone2025SectionProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section id="mito-2025" className={`py-16 px-4 max-w-6xl mx-auto border-t transition-colors ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <div
          className={`inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full border text-xs font-mono ${
            isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-700'
          }`}
        >
          <ZapOff className="w-3.5 h-3.5" />
          <span>FATO HISTÓRICO RECENTE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          O Evento de 2025: O Fim do Mito da "Mão Morta"
        </h2>
        <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
          Por décadas, teorias populares diziam que se o zumbido parasse, um sistema nuclear automático dispararia contra o Ocidente. Em 2025, o teste definitivo aconteceu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: O Mito */}
        <div className={`p-6 rounded-2xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <div className="flex items-center space-x-2 font-mono text-xs font-bold text-zinc-500 mb-3">
            <ShieldAlert className="w-4 h-4" />
            <span>O MITO POPULAR (TEORIA DA CONSPIRAÇÃO)</span>
          </div>
          <h3 className="text-base font-bold mb-2">Disparador Nuclear ("Dead Hand")</h3>
          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Acreditava-se que o zumbido era um sinal vital: se o transmissor fosse destruído por um ataque nuclear, o silêncio ativaria mísseis balísticos intercontinentais de retaliação imediata.
          </p>
        </div>

        {/* Right: O Fato Real de 2025 */}
        <div className={`p-6 rounded-2xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <div className="flex items-center space-x-2 font-mono text-xs font-bold text-zinc-500 mb-3">
            <CheckCircle className="w-4 h-4" />
            <span>A REALIDADE COMPROVADA EM 2025</span>
          </div>
          <h3 className="text-base font-bold mb-2">Queda de Energia por Drone & Silêncio</h3>
          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Em 2025, um ataque com drone cortou o fornecimento elétrico da subestação que alimenta a UVB-76. A estação ficou em <strong>silêncio total por horas</strong>. Absolutamente nada aconteceu — comprovando que é apenas um rádio militar convencional.
          </p>
        </div>
      </div>
    </section>
  );
};
