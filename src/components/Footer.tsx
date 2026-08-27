import React from 'react';

interface FooterProps {
  theme: 'dark' | 'light';
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <footer className={`py-12 px-4 border-t text-center transition-colors ${isDark ? 'border-zinc-800 bg-black text-zinc-400' : 'border-zinc-200 bg-white text-zinc-600'}`}>
      <div className="max-w-6xl mx-auto space-y-3">
        <p className="text-xs font-mono">
          UVB-76 (4625 kHz) • Estudo Didático de Teoria da Informação & Entropia de Shannon
        </p>
        <p className="text-xs font-medium">
          Desenvolvido por ThazSobral para fins de Educação Tecnológica Prática e Interativa. © 2026 — Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};
