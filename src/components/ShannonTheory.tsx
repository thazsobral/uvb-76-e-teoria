import React, { useState } from 'react';
import { Lightbulb, Info, CheckCircle2, HelpCircle } from 'lucide-react';

interface ShannonTheoryProps {
  theme: 'dark' | 'light';
}

export const ShannonTheory: React.FC<ShannonTheoryProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'analogia' | 'formula'>('analogia');

  return (
    <section id="teoria-informacao" className={`py-16 px-4 max-w-6xl mx-auto border-t transition-colors ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <div
          className={`inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full border text-xs font-mono ${
            isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-700'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>A CIÊNCIA EXPLICADA</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Claude Shannon & A Teoria da Informação
        </h2>
        <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
          Em 1948, Claude Shannon definiu cientificamente o que é "informação": <strong>é a redução da incerteza (ou o grau de surpresa)</strong>.
        </p>
      </div>

      {/* Core Principle Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Card 1: 100% Previsível */}
        <div className={`p-6 rounded-2xl border transition-all ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">Cenário A</span>
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-700'}`}>
              0 BITS DE INFORMAÇÃO
            </span>
          </div>

          <h3 className="text-base font-bold mb-2">Sinal 100% Previsível (UVB-76)</h3>
          <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Se você sabe exatamente qual será o próximo som (outro zumbido idêntico aos últimos 50 anos), sua surpresa ao ouvi-lo é <strong>ZERO</strong>.
          </p>

          <div className={`p-3 rounded-lg border font-mono text-xs ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-800'}`}>
            <strong>Analogia:</strong> Um colega que diz "Bom dia" todo dia exatamente no mesmo horário. Você não ganha nenhuma novidade.
          </div>
        </div>

        {/* Card 2: Imprevisível */}
        <div className={`p-6 rounded-2xl border transition-all ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">Cenário B</span>
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${isDark ? 'bg-white text-black border-white' : 'bg-black text-white border-black'}`}>
              ALTA INFORMAÇÃO (BITS)
            </span>
          </div>

          <h3 className="text-base font-bold mb-2">Mensagem Inesperada (Voz / Código)</h3>
          <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Quando o zumbido para e uma voz lê um código cifrado imprevisível, a incerteza é alta e o evento transmite <strong>muita informação</strong>.
          </p>

          <div className={`p-3 rounded-lg border font-mono text-xs ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-800'}`}>
            <strong>Analogia:</strong> Alguém te liga inesperadamente e diz "Você ganhou na loteria!". Surpresa máxima = Informação máxima.
          </div>
        </div>
      </div>

      {/* Didactic Tabs: Concept vs Formula */}
      <div className={`rounded-2xl border p-6 sm:p-8 ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
        <div className="flex items-center space-x-3 mb-6">
          <button
            onClick={() => setActiveTab('analogia')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
              activeTab === 'analogia'
                ? isDark
                  ? 'bg-white text-black border-white'
                  : 'bg-black text-white border-black'
                : isDark
                ? 'bg-zinc-900 border-zinc-700 text-zinc-400'
                : 'bg-zinc-100 border-zinc-300 text-zinc-600'
            }`}
          >
            1. Como Funciona na Prática
          </button>
          <button
            onClick={() => setActiveTab('formula')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
              activeTab === 'formula'
                ? isDark
                  ? 'bg-white text-black border-white'
                  : 'bg-black text-white border-black'
                : isDark
                ? 'bg-zinc-900 border-zinc-700 text-zinc-400'
                : 'bg-zinc-100 border-zinc-300 text-zinc-600'
            }`}
          >
            2. A Fórmula Matemática de Shannon
          </button>
        </div>

        {activeTab === 'analogia' ? (
          <div className="space-y-4">
            <h4 className="text-sm font-bold font-mono">Por Que o Zumbido Não Carrega Mensagem Oculta?</h4>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Muitas teorias da conspiração dizem que o zumbido esconde ordens secretas em cada pulso. Mas na matemática de Shannon:
            </p>
            <ul className={`space-y-2 text-xs sm:text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                <span><strong>Previsibilidade total:</strong> Cada bipe é cópia exata do anterior. O ouvinte já sabe o que vem.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                <span><strong>A verdadeira mensagem é a mudança:</strong> A única informação ocorre quando o zumbido <em>para</em> ou <em>muda</em> para voz humana.</span>
              </li>
            </ul>
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="text-sm font-bold font-mono">Entropia de Shannon: H(X) = -Σ P(x) · log₂ P(x)</h4>
            <div className={`p-4 rounded-xl border font-mono text-xs sm:text-sm ${isDark ? 'bg-black border-zinc-800' : 'bg-white border-zinc-300'}`}>
              <p className="font-bold mb-1">Para o Zumbido Contínuo:</p>
              <p className="text-zinc-500">Probabilidade de ouvir o Buzz: P(buzz) = 1.0 (100%)</p>
              <p className="mt-1">
                H(X) = - (1.0 · log₂(1.0)) = - (1.0 · 0) = <strong className="underline">0.00 bits</strong>
              </p>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Em termos simples: se a probabilidade de um evento é 100%, log₂(1) = 0. Não há incerteza a ser resolvida, logo a entropia é nula.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
