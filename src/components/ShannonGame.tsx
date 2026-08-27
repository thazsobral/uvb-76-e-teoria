import React, { useState } from 'react';
import { Play, Sparkles, RefreshCw, Zap, Check, AlertCircle } from 'lucide-react';

interface ShannonGameProps {
  theme: 'dark' | 'light';
}

export const ShannonGame: React.FC<ShannonGameProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [mode, setMode] = useState<'buzzer' | 'coded'>('buzzer');
  const [round, setRound] = useState(1);
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const [actualResult, setActualResult] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleGuess = (guess: string) => {
    let result = '';
    if (mode === 'buzzer') {
      result = 'BUZZ';
    } else {
      const options = ['ALFA 42', 'BRAVO 89', 'TANGO 17', 'DELTA 03'];
      result = options[Math.floor(Math.random() * options.length)];
    }

    setUserGuess(guess);
    setActualResult(result);

    const isCorrect = guess === result;
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    if (mode === 'buzzer') {
      setFeedback(
        'Como o sinal é 100% previsível (sempre BUZZ), você acerta sempre sem esforço. Surpresa = 0. Informação = 0 bits.'
      );
    } else {
      if (isCorrect) {
        setFeedback('Você acertou por pura sorte! A mensagem era imprevisível, logo cada palavra carregava alta informação (bits).');
      } else {
        setFeedback(`Você errou porque o código era imprevisível! Isso é a incerteza de Shannon: havia novidade real a ser decodificada.`);
      }
    }
  };

  const resetChallenge = (newMode: 'buzzer' | 'coded') => {
    setMode(newMode);
    setRound(1);
    setUserGuess(null);
    setActualResult(null);
    setScore({ correct: 0, total: 0 });
    setFeedback(null);
  };

  return (
    <section id="jogo-shannon" className={`py-16 px-4 max-w-6xl mx-auto border-t transition-colors ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
        <div
          className={`inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full border text-xs font-mono ${
            isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-700'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>EXPERIMENTO PRÁTICO</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Teste a Incerteza na Prática
        </h2>
        <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
          Tente adivinhar o próximo símbolo transmitido no rádio. Veja como a previsibilidade anula a informação.
        </p>
      </div>

      <div className={`p-6 sm:p-8 rounded-2xl border max-w-2xl mx-auto ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
        {/* Mode Selector */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <button
            onClick={() => resetChallenge('buzzer')}
            className={`py-2 px-3 rounded-lg text-xs font-mono font-bold border transition-all ${
              mode === 'buzzer'
                ? isDark
                  ? 'bg-white text-black border-white'
                  : 'bg-black text-white border-black'
                : isDark
                ? 'bg-zinc-900 border-zinc-800 text-zinc-400'
                : 'bg-zinc-100 border-zinc-300 text-zinc-600'
            }`}
          >
            Modo 1: O Zumbido UVB-76
          </button>
          <button
            onClick={() => resetChallenge('coded')}
            className={`py-2 px-3 rounded-lg text-xs font-mono font-bold border transition-all ${
              mode === 'coded'
                ? isDark
                  ? 'bg-white text-black border-white'
                  : 'bg-black text-white border-black'
                : isDark
                ? 'bg-zinc-900 border-zinc-800 text-zinc-400'
                : 'bg-zinc-100 border-zinc-300 text-zinc-600'
            }`}
          >
            Modo 2: Mensagem Cifrada
          </button>
        </div>

        {/* Current State Display */}
        <div className={`p-4 rounded-xl border mb-6 text-center font-mono ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
          <p className="text-xs text-zinc-500 mb-1">Qual será o próximo sinal emitido?</p>
          <p className="text-sm font-bold">
            {mode === 'buzzer' ? 'Transmissão Contínua (Sinal Repetitivo)' : 'Transmissão Militar (Código Aleatório)'}
          </p>
        </div>

        {/* Guess Buttons */}
        {mode === 'buzzer' ? (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => handleGuess('BUZZ')}
              className={`py-3 px-4 rounded-lg font-mono text-xs font-bold border transition-all ${
                isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
              }`}
            >
              Adivinhar: "BUZZ"
            </button>
            <button
              onClick={() => handleGuess('SILÊNCIO')}
              className={`py-3 px-4 rounded-lg font-mono text-xs font-bold border transition-all ${
                isDark ? 'bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800' : 'bg-zinc-100 border-zinc-300 text-black hover:bg-zinc-200'
              }`}
            >
              Adivinhar: "SILÊNCIO"
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 mb-6">
            {['ALFA 42', 'BRAVO 89', 'TANGO 17', 'DELTA 03'].map((code) => (
              <button
                key={code}
                onClick={() => handleGuess(code)}
                className={`py-2.5 px-2 rounded-lg font-mono text-xs font-bold border transition-all ${
                  isDark ? 'bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800' : 'bg-zinc-100 border-zinc-300 text-black hover:bg-zinc-200'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        )}

        {/* Feedback Result */}
        {actualResult && (
          <div className={`p-4 rounded-xl border space-y-2 mb-4 font-mono ${isDark ? 'bg-black border-zinc-800' : 'bg-white border-zinc-300'}`}>
            <div className="flex justify-between items-center text-xs">
              <span>Seu palpite: <strong>{userGuess}</strong></span>
              <span>Sinal emitido: <strong>{actualResult}</strong></span>
            </div>
            <p className={`text-xs leading-relaxed font-sans pt-1 border-t ${isDark ? 'border-zinc-800 text-zinc-300' : 'border-zinc-200 text-zinc-700'}`}>
              {feedback}
            </p>
          </div>
        )}

        {/* Score & Reset */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-800/40 text-xs font-mono text-zinc-500">
          <span>Tentativas: {score.total} | Acertos: {score.correct}</span>
          <button
            onClick={() => resetChallenge(mode)}
            className="flex items-center space-x-1 underline hover:text-black dark:hover:text-white"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>
    </section>
  );
};
