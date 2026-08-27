import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroRadio } from './components/HeroRadio';
import { MysterySection } from './components/MysterySection';
import { ShannonTheory } from './components/ShannonTheory';
import { ShannonGame } from './components/ShannonGame';
import { ChannelMarker } from './components/ChannelMarker';
import { Drone2025Section } from './components/Drone2025Section';
import { ReferencesSection } from './components/ReferencesSection';
import { Footer } from './components/Footer';
import { uvbRadio } from './lib/audioSynth';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequency, setFrequency] = useState(4625.0);

  useEffect(() => {
    uvbRadio.subscribeState((playing) => {
      setIsPlaying(playing);
      setFrequency(uvbRadio.getFrequency());
    });
  }, []);

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen transition-colors duration-200 font-sans ${
        isDark ? 'bg-black text-white' : 'bg-[#fafafa] text-zinc-900'
      } ${crtEnabled ? 'crt-overlay' : ''}`}
    >
      {/* Header */}
      <Header
        theme={theme}
        setTheme={setTheme}
        crtEnabled={crtEnabled}
        setCrtEnabled={setCrtEnabled}
        isPlaying={isPlaying}
        frequency={frequency}
      />

      {/* Main Educational Sections */}
      <main className="space-y-4">
        <HeroRadio theme={theme} />
        <MysterySection theme={theme} />
        <ShannonTheory theme={theme} />
        <ShannonGame theme={theme} />
        <ChannelMarker theme={theme} />
        <Drone2025Section theme={theme} />
        <ReferencesSection theme={theme} />
      </main>

      {/* Footer */}
      <Footer theme={theme} />
    </div>
  );
}
