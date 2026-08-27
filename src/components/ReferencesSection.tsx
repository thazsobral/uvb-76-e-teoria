import React from 'react';
import { ExternalLink, Play, Youtube } from 'lucide-react';

interface ReferencesSectionProps {
  theme: 'dark' | 'light';
}

export const ReferencesSection: React.FC<ReferencesSectionProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section id="referencias" className={`py-16 px-4 max-w-6xl mx-auto border-t transition-colors ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
      <div className={`rounded-2xl border p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6 ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
        <div
          className={`inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full border text-xs font-mono ${
            isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-700'
          }`}
        >
          <Youtube className="w-3.5 h-3.5" />
          <span>REFERÊNCIAS & CRÉDITOS</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Inspirado no Canal "A Beleza dos Dados"
        </h2>

        <p className={`text-xs sm:text-sm leading-relaxed max-w-xl mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
          A didática deste projeto baseia-se na explicação brilhante sobre a UVB-76, o zumbido militar e a Teoria da Informação de Claude Shannon apresentada pelo canal <strong>A Beleza dos Dados</strong>.
        </p>

        {/* Video Card with RED button */}
        <div className={`p-6 rounded-xl border max-w-lg mx-auto text-left space-y-4 ${isDark ? 'bg-black border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-300'}`}>
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-mono">Vídeo Original: UVB-76</h3>
              <p className="text-xs text-zinc-500 font-mono">Canal: A Beleza dos Dados</p>
            </div>
          </div>

          <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Assista ao vídeo explicativo que aborda o enigma do zumbido contínuo e os fundamentos matemáticos da informação:
          </p>

          {/* THE ONLY RED ELEMENT AS REQUESTED */}
          <a
            href="https://www.youtube.com/shorts/rwa929fAv_g"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-md active:scale-[0.99]"
          >
            <span>Assistir ao vídeo original</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
