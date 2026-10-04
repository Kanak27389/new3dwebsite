import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles } from 'lucide-react';

interface HeroVideoProps {
  videoSrc?: string;
  posterSrc?: string;
}

export function HeroVideo({
  videoSrc = '/assets/ai-hero-video.mp4',
  posterSrc,
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mediaError, setMediaError] = useState(false);

  // Play / Pause toggle
  const togglePlay = () => {
    if (mediaError) {
      setIsPlaying(!isPlaying);
      return;
    }
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  // Fallback animated high-tech neural visualizer if MP4 file is not physically found on host
  useEffect(() => {
    if (!mediaError) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const render = () => {
      if (isPlaying) step += 0.02;
      ctx.fillStyle = '#060911';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw multi-layer harmonic neural waves
      const waves = [
        { color: 'rgba(6, 182, 212, 0.45)', freq: 0.012, amp: 55, speed: 1.2 },
        { color: 'rgba(99, 102, 241, 0.40)', freq: 0.018, amp: 40, speed: -0.9 },
        { color: 'rgba(168, 85, 247, 0.35)', freq: 0.008, amp: 70, speed: 0.7 },
      ];

      waves.forEach((w) => {
        ctx.beginPath();
        ctx.strokeStyle = w.color;
        ctx.lineWidth = 2.5;
        const cy = canvas.height / 2;

        for (let x = 0; x < canvas.width; x += 4) {
          const y =
            cy +
            Math.sin(x * w.freq + step * w.speed) * w.amp +
            Math.cos(x * 0.005 + step * 0.5) * (w.amp * 0.3);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // Orbiting neural nodes
      const nodeCount = 14;
      for (let i = 0; i < nodeCount; i++) {
        const nx = (canvas.width * (i + 1)) / (nodeCount + 1);
        const ny = canvas.height / 2 + Math.sin(nx * 0.012 + step * 1.2) * 55;
        ctx.beginPath();
        ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#38BDF8';
        ctx.shadowColor = '#06B6D4';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [mediaError, isPlaying]);

  return (
    <section className="relative py-12 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">Cinematic Architecture</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
            Real-Time Neural Orchestration in Action
          </h2>
        </div>
        <p className="text-sm text-slate-400 max-w-md">
          Watch NEXORA coordinate multi-agent reasoning, vector telemetry, and automated cloud synthesis in sub-second cycles.
        </p>
      </div>

      {/* Cinematic Media Container */}
      <div className="relative group overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#080C16] shadow-[0_20px_50px_rgba(0,0,0,0.6)] aspect-video sm:aspect-[21/9] max-h-[580px] w-full">
        {/* Actual Video or Fallback Canvas */}
        {!mediaError ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            muted
            loop
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onError={() => {
              // Gracefully switch to the interactive canvas neural visualizer
              setMediaError(true);
            }}
            className="w-full h-full object-cover"
          />
        ) : (
          <canvas
            ref={canvasRef}
            width={1280}
            height={550}
            className="w-full h-full object-cover"
          />
        )}

        {/* Ambient Gradient Overlay Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

        {/* Top telemetry bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-300 pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>NEXORA LIVE SYNTHESIS</span>
            <span className="text-slate-500">·</span>
            <span className="text-cyan-400">FPS: 60</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-slate-400">
            <span>SOURCE: {videoSrc.split('/').pop()}</span>
          </div>
        </div>

        {/* Centered Large Play Button (when paused) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <button
              onClick={togglePlay}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-400/90 hover:bg-cyan-300 text-slate-950 flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-105 transition-all duration-200"
              aria-label="Play Video"
            >
              <Play className="w-8 h-8 fill-current" />
            </button>
          </div>
        )}

        {/* Bottom Control Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col gap-3 z-20 transition-opacity duration-200">
          {/* Progress bar */}
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all duration-100"
              style={{ width: `${mediaError ? 65 : progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-md transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              {!mediaError && (
                <button
                  onClick={toggleMute}
                  className="p-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-md transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              )}

              <span className="text-xs font-mono text-slate-300 hidden sm:inline">
                {mediaError ? 'SIMULATED WAVEFORM STREAM' : 'AUTOPLAY STREAM ACTIVE'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 hidden md:inline">2160p Ultra HD</span>
              <button
                onClick={() => {
                  if (videoRef.current) {
                    if (videoRef.current.requestFullscreen) {
                      videoRef.current.requestFullscreen();
                    }
                  }
                }}
                className="p-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-md transition-colors"
                aria-label="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
