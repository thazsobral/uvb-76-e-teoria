import React from 'react';
import { Radio, Clock, Mic, MapPin, Globe } from 'lucide-react';

interface MysterySectionProps {
  theme: 'dark' | 'light';
}

export const MysterySection: React.FC<MysterySectionProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section id="misterio" className={`py-16 px-4 max-w-6xl mx-auto border-t transition-colors ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <div
          className={`inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full border text-xs font-mono ${
            isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-700'
          }`}
        >
          <Radio className="w-3 h-3" />
          <span>FATOS PRINCIPAIS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          O Que É a UVB-76 ("The Buzzer")?
        </h2>
        <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
          Uma estação de rádio russa de ondas curtas que transmite ininterruptamente desde a época da Guerra Fria.
        </p>
      </div>

      {/* 4 Direct Fact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        <div className={`p-5 rounded-xl border transition-all ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <div className="w-8 h-8 rounded-lg border flex items-center justify-center mb-3">
            <Radio className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold font-mono mb-1">4625 kHz AM</h3>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Frequência de ondas curtas que reflete na ionosfera da Terra e viaja milhares de quilômetros sem precisar de satélites.
          </p>
        </div>

        <div className={`p-5 rounded-xl border transition-all ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <div className="w-8 h-8 rounded-lg border flex items-center justify-center mb-3">
            <Clock className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold font-mono mb-1">50 Anos no Ar</h3>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Ativa desde ~1970. O zumbido toca cerca de 25 vezes por minuto, 24 horas por dia, 365 dias por ano.
          </p>
        </div>

        <div className={`p-5 rounded-xl border transition-all ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <div className="w-8 h-8 rounded-lg border flex items-center justify-center mb-3">
            <Mic className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold font-mono mb-1">Vozes Ocasionais</h3>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Raramente, o zumbido é interrompido por operadores lendo sequências de nomes e números em russo para o exército.
          </p>
        </div>

        <div className={`p-5 rounded-xl border transition-all ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <div className="w-8 h-8 rounded-lg border flex items-center justify-center mb-3">
            <MapPin className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold font-mono mb-1">Base Militar</h3>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Começou perto de Moscou (Povarovo) e hoje utiliza múltiplos transmissores na região noroeste russa.
          </p>
        </div>
      </div>

      {/* Simplified Timeline */}
      <div className={`rounded-2xl border p-6 sm:p-8 ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
        <h3 className="text-base font-bold font-mono mb-6 flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span>Cronologia Resumida</span>
        </h3>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border shrink-0 ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-300'}`}>
              Anos 70
            </span>
            <div>
              <h4 className="text-sm font-bold">Início das Transmissões</h4>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Começou com bipes curtos e depois adotou o zumbido grave contínuo de 25 pulsos por minuto.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border shrink-0 ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-300'}`}>
              1997
            </span>
            <div>
              <h4 className="text-sm font-bold">Primeira Mensagem de Voz Gravada</h4>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                O zumbido parou e uma voz pronunciou: <code className="font-mono text-[11px]">"Ya UVB-76, Ya UVB-76... 180 08 BROMAL..."</code>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border shrink-0 ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-300'}`}>
              2010
            </span>
            <div>
              <h4 className="text-sm font-bold">Relocação de Transmissores</h4>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                A estação antiga em Povarovo foi abandonada e a transmissão transferida para novos transmissores modernos.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border shrink-0 ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-300'}`}>
              2025
            </span>
            <div>
              <h4 className="text-sm font-bold">Queda Temporária (Drone na Rede Elétrica)</h4>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                A estação ficou silenciosa por horas após um ataque à rede elétrica. Nenhum míssil foi disparado, desmistificando mitos apocalípticos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
