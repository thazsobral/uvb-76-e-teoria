import React from 'react';
import { Radio, Volume2, Moon, Sun, Monitor } from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light';
  setTheme: (val: 'dark' | 'light') => void;
  crtEnabled: boolean;
  setCrtEnabled: (val: boolean) => void;
  isPlaying: boolean;
  frequency: number;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  setTheme,
  crtEnabled,
  setCrtEnabled,
  isPlaying,
  frequency,
}) => {
  const isDark = theme === 'dark';

  return (
    <header
      className={`sticky top-0 z-50 border-b px-4 lg:px-8 py-3.5 transition-colors ${
        isDark
          ? 'bg-black/90 border-zinc-800 text-white backdrop-blur-md'
          : 'bg-white/90 border-zinc-200 text-zinc-900 backdrop-blur-md'
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Frequency Indicator */}
        <div className="flex items-center space-x-3">
          <div
            className={`w-9 h-9 rounded-lg border flex items-center justify-center font-mono text-xs font-bold transition-all ${
              isDark
                ? isPlaying
                  ? 'bg-white text-black border-white'
                  : 'bg-zinc-900 text-white border-zinc-700'
                : isPlaying
                ? 'bg-black text-white border-black'
                : 'bg-zinc-100 text-black border-zinc-300'
            }`}
          >
            <Radio className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm font-bold tracking-tight">UVB-76</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded border font-mono ${
                  isDark
                    ? 'bg-zinc-900 border-zinc-700 text-zinc-300'
                    : 'bg-zinc-100 border-zinc-300 text-zinc-700'
                }`}
              >
                {frequency.toFixed(1)} kHz AM
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 font-mono">The Buzzer & Teoria da Informação</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav
          className={`hidden md:flex items-center space-x-5 text-xs font-mono ${
            isDark ? 'text-zinc-400' : 'text-zinc-600'
          }`}
        >
          <a href="#misterio" className={`hover:underline transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>
            01. O Mistério
          </a>
          <a href="#teoria-informacao" className={`hover:underline transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>
            02. Claude Shannon
          </a>
          <a href="#jogo-shannon" className={`hover:underline transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>
            03. Interativo
          </a>
          <a href="#marcador-canal" className={`hover:underline transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>
            04. Marcador
          </a>
          <a href="#mito-2025" className={`hover:underline transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>
            05. Mito 2025
          </a>
          <a href="#referencias" className={`hover:underline transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>
            06. Referências
          </a>
        </nav>

        {/* Theme & Controls */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            title={isDark ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
            className={`px-3 py-1.5 text-xs font-mono rounded border flex items-center space-x-1.5 transition-all ${
              isDark
                ? 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800'
                : 'bg-zinc-100 border-zinc-300 text-zinc-800 hover:bg-zinc-200'
            }`}
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span>{isDark ? 'Claro' : 'Escuro'}</span>
          </button>

          {/* CRT effect toggle */}
          <button
            onClick={() => setCrtEnabled(!crtEnabled)}
            title="Efeito Monitor CRT"
            className={`px-2.5 py-1.5 text-xs font-mono rounded border flex items-center space-x-1 transition-all ${
              crtEnabled
                ? isDark
                  ? 'bg-white text-black border-white'
                  : 'bg-black text-white border-black'
                : isDark
                ? 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                : 'bg-zinc-50 border-zinc-300 text-zinc-500 hover:text-black'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CRT {crtEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Audio Status pill */}
          <div
            className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded border text-[11px] font-mono ${
              isDark
                ? 'bg-zinc-950 border-zinc-800 text-zinc-400'
                : 'bg-zinc-100 border-zinc-300 text-zinc-600'
            }`}
          >
            <Volume2 className={`w-3 h-3 ${isPlaying ? 'animate-pulse text-white' : ''}`} />
            <span>{isPlaying ? 'TOCANDO' : 'SINTONIZADO'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
