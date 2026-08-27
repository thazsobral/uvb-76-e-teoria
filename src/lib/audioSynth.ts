/**
 * Web Audio API Synthesizer for UVB-76 (The Buzzer) Radio Simulation
 */

class UVBRadioSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private frequency: number = 4625.0; // kHz
  private volume: number = 0.7;
  private mode: 'buzzer' | 'voice' | 'silence' = 'buzzer';
  
  private mainGainNode: GainNode | null = null;
  private staticGainNode: GainNode | null = null;
  private signalGainNode: GainNode | null = null;
  private analyserNode: AnalyserNode | null = null;
  
  private buzzInterval: number | null = null;
  private staticSource: AudioBufferSourceNode | null = null;
  private activeOscillators: OscillatorNode[] = [];
  
  private onAnalysersReadyCallbacks: Array<(analyser: AnalyserNode) => void> = [];
  private onStateChangeCallbacks: Array<(isPlaying: boolean, activeMode: string) => void> = [];

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyserNode;
  }

  public setFrequency(freq: number) {
    this.frequency = Math.round(freq * 10) / 10;
    this.updateGainsForFrequency();
  }

  public getFrequency(): number {
    return this.frequency;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.mainGainNode && this.ctx) {
      this.mainGainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public setMode(mode: 'buzzer' | 'voice' | 'silence') {
    this.mode = mode;
    if (this.isPlaying) {
      this.restartAudio();
    }
  }

  public subscribeAnalysers(cb: (analyser: AnalyserNode) => void) {
    this.onAnalysersReadyCallbacks.push(cb);
    if (this.analyserNode) {
      cb(this.analyserNode);
    }
  }

  public subscribeState(cb: (isPlaying: boolean, activeMode: string) => void) {
    this.onStateChangeCallbacks.push(cb);
  }

  private notifyState() {
    this.onStateChangeCallbacks.forEach(cb => cb(this.isPlaying, this.mode));
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  public start() {
    this.initCtx();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.setupAudioGraph();
    this.updateGainsForFrequency();

    if (this.mode === 'buzzer') {
      this.startBuzzerLoop();
    } else if (this.mode === 'voice') {
      this.startVoiceLoop();
    } else {
      // silence mode (2025 post-drone event)
      // Only static noise audible
    }

    this.notifyState();
  }

  public stop() {
    this.isPlaying = false;
    if (this.buzzInterval) {
      clearInterval(this.buzzInterval);
      this.buzzInterval = null;
    }
    this.stopActiveOscillators();
    if (this.staticSource) {
      try { this.staticSource.stop(); } catch {}
      this.staticSource = null;
    }
    this.notifyState();
  }

  private restartAudio() {
    this.stop();
    this.start();
  }

  private setupAudioGraph() {
    if (!this.ctx) return;

    // Master Gain
    this.mainGainNode = this.ctx.createGain();
    this.mainGainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);

    // Analyser for visualizers
    this.analyserNode = this.ctx.createAnalyser();
    this.analyserNode.fftSize = 512;
    this.analyserNode.smoothingTimeConstant = 0.8;

    // Static Noise Gain & Filter
    this.staticGainNode = this.ctx.createGain();
    
    // Signal (Buzzer/Voice) Gain
    this.signalGainNode = this.ctx.createGain();

    // Connect graph
    this.staticGainNode.connect(this.analyserNode);
    this.signalGainNode.connect(this.analyserNode);
    this.analyserNode.connect(this.mainGainNode);
    this.mainGainNode.connect(this.ctx.destination);

    // Create continuous shortwave static/atmospheric noise
    this.startStaticNoise();

    // Notify visualizers
    this.onAnalysersReadyCallbacks.forEach(cb => cb(this.analyserNode!));
  }

  private updateGainsForFrequency() {
    if (!this.ctx || !this.staticGainNode || !this.signalGainNode) return;

    // Perfect frequency is 4625.0 kHz
    const diff = Math.abs(this.frequency - 4625.0);
    
    // Tuning curve: close to 4625 = strong signal, low relative static.
    // Far from 4625 = weak signal, pure static.
    let signalStrength = 1.0 - Math.min(1.0, diff / 3.0); // 0 outside ±3 kHz
    signalStrength = Math.pow(signalStrength, 2); // sharper tuning peak

    let staticVol = 0.2 + (1.0 - signalStrength) * 0.4;
    let signalVol = signalStrength * 0.7;

    const now = this.ctx.currentTime;
    this.staticGainNode.gain.setTargetAtTime(staticVol, now, 0.05);
    this.signalGainNode.gain.setTargetAtTime(signalVol, now, 0.05);
  }

  private startStaticNoise() {
    if (!this.ctx || !this.staticGainNode) return;

    // Create 3 seconds of white/pink noise buffer
    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Lowpass filter simulation for atmospheric radio hum
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }

    this.staticSource = this.ctx.createBufferSource();
    this.staticSource.buffer = buffer;
    this.staticSource.loop = true;

    // Shortwave Bandpass filter
    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1200, this.ctx.currentTime);
    bandpass.Q.setValueAtTime(1.2, this.ctx.currentTime);

    this.staticSource.connect(bandpass);
    bandpass.connect(this.staticGainNode);
    this.staticSource.start();
  }

  private startBuzzerLoop() {
    // UVB-76 buzzes 25 times per minute = 1 buzz every 2.4 seconds.
    // Pulse duration: ~1.2 seconds, pause: ~1.2 seconds.
    const triggerSingleBuzz = () => {
      if (!this.isPlaying || this.mode !== 'buzzer' || !this.ctx || !this.signalGainNode) return;

      const now = this.ctx.currentTime;
      const duration = 1.15; // seconds

      // UVB-76 signature buzz is ~460Hz tone with metallic harmonics
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(460, now);

      osc2.type = 'square';
      osc2.frequency.setValueAtTime(920, now); // 2nd harmonic

      // Envelope: fast attack, steady buzz, sharp release
      oscGain.gain.setValueAtTime(0, now);
      oscGain.gain.linearRampToValueAtTime(0.8, now + 0.03);
      oscGain.gain.setValueAtTime(0.8, now + duration - 0.03);
      oscGain.gain.linearRampToValueAtTime(0, now + duration);

      // Lowpass filter to make it sound muffled like Soviet military AM transmitter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, now);

      osc1.connect(oscGain);
      osc2.connect(oscGain);
      oscGain.connect(filter);
      filter.connect(this.signalGainNode);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);

      this.activeOscillators.push(osc1, osc2);

      // Clean up array after stop
      setTimeout(() => {
        this.activeOscillators = this.activeOscillators.filter(o => o !== osc1 && o !== osc2);
      }, duration * 1000 + 100);
    };

    // First buzz immediate
    triggerSingleBuzz();
    
    // Repeat every 2.4s (25 buzzes/min)
    this.buzzInterval = window.setInterval(triggerSingleBuzz, 2400);
  }

  private startVoiceLoop() {
    // Simulates occasional human voice transmission interrupting the buzz
    const phrase = "ANVF 41 82 90 MONON 94 38";
    
    // Play phonetic voice synthesis if available, or synthesized voice tones
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.rate = 0.8;
      utterance.pitch = 0.7;
      utterance.lang = 'ru-RU';
      window.speechSynthesis.speak(utterance);
    }

    // Synthesize short radio bleeps & pulses
    if (this.ctx && this.signalGainNode) {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.5);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.5);

      osc.connect(gain);
      gain.connect(this.signalGainNode);
      osc.start(now);
      osc.stop(now + 0.5);
    }

    // Repeat voice code every 6 seconds
    this.buzzInterval = window.setInterval(() => {
      if (!this.isPlaying || this.mode !== 'voice') return;
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("NZTI 18 308 MONON 94 38");
        utterance.rate = 0.75;
        utterance.pitch = 0.65;
        utterance.lang = 'ru-RU';
        window.speechSynthesis.speak(utterance);
      }
    }, 6000);
  }

  private stopActiveOscillators() {
    this.activeOscillators.forEach(osc => {
      try { osc.stop(); } catch {}
    });
    this.activeOscillators = [];
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const uvbRadio = new UVBRadioSynth();
