import React, { useEffect, useRef, useState } from 'react';
import { Play, Square, Radio, Volume2, ArrowRight } from 'lucide-react';
import { uvbRadio } from '../lib/audioSynth';

interface HeroRadioProps {
  theme: 'dark' | 'light';
}

export const HeroRadio: React.FC<HeroRadioProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequency, setFrequency] = useState(4625.0);
  const [volume, setVolume] = useState(0.7);
  const [mode, setMode] = useState<'buzzer' | 'voice' | 'silence'>('buzzer');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    uvbRadio.subscribeState((playing, activeMode) => {
      setIsPlaying(playing);
      setMode(activeMode as 'buzzer' | 'voice' | 'silence');
    });
  }, []);

  const handleTogglePlay = () => {
    const active = uvbRadio.toggle();
    setIsPlaying(active);
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setFrequency(val);
    uvbRadio.setFrequency(val);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    uvbRadio.setVolume(val);
  };

  const handleModeChange = (newMode: 'buzzer' | 'voice' | 'silence') => {
    setMode(newMode);
    uvbRadio.setMode(newMode);
  };

  // Oscilloscope Canvas Visualizer
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.05;

      const width = canvas.width;
      const height = canvas.height;

      // Background
      ctx.fillStyle = isDark ? '#09090b' : '#f4f4f5';
      ctx.fillRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = isDark ? '#27272a' : '#e4e4e7';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const analyser = uvbRadio.getAnalyser();

      if (isPlaying && analyser) {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);

        // Draw Oscilloscope waveform
        ctx.lineWidth = 2;
        ctx.strokeStyle = isDark ? '#ffffff' : '#09090b';
        ctx.beginPath();

        const sliceWidth = (width * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx.lineTo(width, height / 2);
        ctx.stroke();
      } else {
        // Idle waveform
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = isDark ? '#3f3f46' : '#a1a1aa';
        ctx.beginPath();
        const midY = height / 2;

        for (let x = 0; x < width; x += 2) {
          const noise = Math.sin(x * 0.05 + time) * 3 + (Math.random() * 2 - 1);
          const y = midY + noise;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying, mode, isDark]);

  const isPerfectTuned = Math.abs(frequency - 4625.0) < 0.2;

  return (
    <section className="py-12 lg:py-20 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Direct, Didactic Summary */}
        <div className="lg:col-span-6 space-y-6">
          <div
            className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-mono ${
              isDark
                ? 'bg-zinc-900 border-zinc-700 text-zinc-300'
                : 'bg-zinc-100 border-zinc-300 text-zinc-800'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>ESTAÇÃO MILITAR & TEORIA DA INFORMAÇÃO</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            O Som que Toca há 50 Anos Sem Dizer Nada
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
            Desde os anos 1970, a misteriosa rádio russa <strong>UVB-76 (4625 kHz)</strong> repete o mesmo zumbido 24 horas por dia.
          </p>

          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Pela <strong>Teoria da Informação de Claude Shannon</strong>, um sinal 100% previsível tem <strong>0 bits de informação</strong>. Entenda de forma simples por que ela zumbia sem parar e qual era sua utilidade real.
          </p>

          {/* Quick Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleTogglePlay}
              className={`px-6 py-3 rounded-lg font-mono text-xs font-bold flex items-center space-x-2 transition-all shadow-sm ${
                isPlaying
                  ? isDark
                    ? 'bg-white text-black hover:bg-zinc-200'
                    : 'bg-black text-white hover:bg-zinc-800'
                  : isDark
                  ? 'bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800'
                  : 'bg-zinc-100 border border-zinc-300 text-black hover:bg-zinc-200'
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>DESLIGAR ÁUDIO</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>OUVIR O ZUMBIDO (BUZZER)</span>
                </>
              )}
            </button>

            <a
              href="#teoria-informacao"
              className={`px-5 py-3 rounded-lg font-mono text-xs font-medium border transition-all flex items-center space-x-1.5 ${
                isDark
                  ? 'bg-black border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600'
                  : 'bg-white border-zinc-300 text-zinc-700 hover:text-black hover:border-zinc-500'
              }`}
            >
              <span>Ver Explicação Didática</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Key Facts Pills */}
          <div className="grid grid-cols-3 gap-3 pt-3">
            <div className={`p-3 rounded-lg border text-center ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
              <span className="block text-[11px] text-zinc-500 font-mono">Frequência</span>
              <span className="text-xs sm:text-sm font-bold font-mono">4625.0 kHz</span>
            </div>
            <div className={`p-3 rounded-lg border text-center ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
              <span className="block text-[11px] text-zinc-500 font-mono">Repetição</span>
              <span className="text-xs sm:text-sm font-bold font-mono">~25 buzz/min</span>
            </div>
            <div className={`p-3 rounded-lg border text-center ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
              <span className="block text-[11px] text-zinc-500 font-mono">Entropia</span>
              <span className="text-xs sm:text-sm font-bold font-mono">0 bits</span>
            </div>
          </div>
        </div>

        {/* Right Column: Radio Synthesizer (Monochrome & Didactic) */}
        <div className="lg:col-span-6">
          <div
            className={`rounded-2xl border p-5 sm:p-6 transition-colors ${
              isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300 shadow-sm'
            }`}
          >
            {/* Header of Radio */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/40">
              <span className="text-xs font-mono font-bold tracking-wider">
                Simulador de Receptor de Rádio
              </span>
              <span
                className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${
                  isPerfectTuned
                    ? isDark
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-zinc-200 border-zinc-400 text-black'
                    : 'text-zinc-500 border-transparent'
                }`}
              >
                {isPerfectTuned ? 'Sinal 100% Sintonizado' : 'Fora de Frequência'}
              </span>
            </div>

            {/* Oscilloscope Canvas */}
            <div
              className={`relative rounded-lg overflow-hidden border mb-4 ${
                isDark ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-300 bg-zinc-100'
              }`}
            >
              <canvas
                ref={canvasRef}
                width={480}
                height={150}
                className="w-full h-36 object-cover"
              />
              <div className="absolute inset-0 crt-overlay pointer-events-none"></div>

              <div
                className={`absolute top-2 left-2 px-2 py-0.5 rounded border text-[10px] font-mono ${
                  isDark
                    ? 'bg-black/80 border-zinc-700 text-zinc-300'
                    : 'bg-white/80 border-zinc-300 text-zinc-800'
                }`}
              >
                FORMA DE ONDA (OSCILOSCÓPIO)
              </div>
              <div
                className={`absolute bottom-2 right-2 px-2 py-0.5 rounded border text-[10px] font-mono ${
                  isDark
                    ? 'bg-black/80 border-zinc-700 text-zinc-400'
                    : 'bg-white/80 border-zinc-300 text-zinc-600'
                }`}
              >
                {frequency.toFixed(1)} kHz
              </div>
            </div>

            {/* Tuning Slider */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-1">
                  <span className="text-zinc-500">Sintonia de Frequência (kHz):</span>
                  <span className="font-bold">{frequency.toFixed(1)} kHz</span>
                </div>
                <input
                  type="range"
                  min="4620.0"
                  max="4630.0"
                  step="0.1"
                  value={frequency}
                  onChange={handleFrequencyChange}
                  className="w-full h-1.5 bg-zinc-700 rounded appearance-none cursor-pointer accent-zinc-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                  <span>4620.0 kHz</span>
                  <span className="font-bold underline">4625.0 kHz (UVB-76)</span>
                  <span>4630.0 kHz</span>
                </div>
              </div>

              {/* Volume & Play Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleTogglePlay}
                  className={`w-full py-2.5 px-3 rounded-lg font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                    isPlaying
                      ? isDark
                        ? 'bg-white text-black hover:bg-zinc-200'
                        : 'bg-black text-white hover:bg-zinc-800'
                      : isDark
                      ? 'bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800'
                      : 'bg-zinc-100 border border-zinc-300 text-black hover:bg-zinc-200'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>PARAR SOM</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>LIGAR SOM</span>
                    </>
                  )}
                </button>

                <div
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border ${
                    isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-300'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-zinc-700 rounded appearance-none cursor-pointer accent-zinc-400"
                  />
                  <span className="text-[11px] font-mono text-zinc-500 w-7">{Math.round(volume * 100)}%</span>
                </div>
              </div>

              {/* Simulation Mode Buttons */}
              <div className="pt-2 border-t border-zinc-800/40">
                <label className="block text-[11px] font-mono text-zinc-500 mb-1.5">
                  SIMULAR CENÁRIOS HISTÓRICOS:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleModeChange('buzzer')}
                    className={`py-2 px-1 rounded text-[11px] font-mono border text-center transition-all ${
                      mode === 'buzzer'
                        ? isDark
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-black text-white border-black font-bold'
                        : isDark
                        ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:text-black'
                    }`}
                  >
                    1. Zumbido Padrão
                  </button>

                  <button
                    onClick={() => handleModeChange('voice')}
                    className={`py-2 px-1 rounded text-[11px] font-mono border text-center transition-all ${
                      mode === 'voice'
                        ? isDark
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-black text-white border-black font-bold'
                        : isDark
                        ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:text-black'
                    }`}
                  >
                    2. Voz Humana
                  </button>

                  <button
                    onClick={() => handleModeChange('silence')}
                    className={`py-2 px-1 rounded text-[11px] font-mono border text-center transition-all ${
                      mode === 'silence'
                        ? isDark
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-black text-white border-black font-bold'
                        : isDark
                        ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:text-black'
                    }`}
                  >
                    3. Silêncio (2025)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
