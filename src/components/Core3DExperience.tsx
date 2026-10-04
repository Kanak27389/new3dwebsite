import React, { useState } from 'react';
import { Core3DCanvas } from './Core3DCanvas';
import { Sliders, RotateCw, Eye, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export function Core3DExperience() {
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [intensityBoost, setIntensityBoost] = useState(1.2);
  const [activeLayer, setActiveLayer] = useState<'all' | 'core' | 'rings'>('all');

  return (
    <section id="core-3d" className="relative py-24 px-6 sm:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
            Autonomous 3D Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mt-1">
            The NEXORA Neural Core
          </h2>
        </div>
        <p className="text-sm text-slate-400 max-w-lg">
          An interactive real-time spatial projection of our autonomous reasoning engine. Orbiting rings represent asynchronous execution pipelines while the core handles continuous contextual synthesis.
        </p>
      </div>

      {/* Main 3D Canvas Showcase Container */}
      <div className="relative rounded-3xl border border-white/10 bg-[#060912]/90 backdrop-blur-md overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
        {/* Floating Top HUD */}
        <div className="absolute top-5 left-5 right-5 z-20 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-200">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold text-white">CORE PROTOCOL v4</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">STATE: OPTIMAL</span>
          </div>

          {/* Interactive Mode Controls (pointer-events-auto) */}
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={() => setSpeedMultiplier((s) => (s >= 2 ? 0.5 : s + 0.5))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              title="Adjust rotation velocity"
            >
              <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Speed: {speedMultiplier.toFixed(1)}x</span>
            </button>

            <button
              onClick={() => setIntensityBoost((b) => (b >= 2 ? 0.8 : b + 0.4))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              title="Cycle emissive energy intensity"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Energy: {intensityBoost.toFixed(1)}x</span>
            </button>
          </div>
        </div>

        {/* 3D Canvas */}
        <div className="w-full h-[520px] sm:h-[620px] cursor-grab active:cursor-grabbing">
          <Core3DCanvas
            rotationMultiplier={speedMultiplier}
            intensityBoost={intensityBoost}
            interactive={true}
          />
        </div>

        {/* Bottom Inspector Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <div>
              <span className="text-slate-500">Geometry:</span>{' '}
              <span className="font-mono text-slate-200">Dual Geodesic Shell</span>
            </div>
            <div>
              <span className="text-slate-500">Orbital Tracks:</span>{' '}
              <span className="font-mono text-cyan-400">3 Independent Inclinations</span>
            </div>
            <div className="hidden md:inline">
              <span className="text-slate-500">Lighting:</span>{' '}
              <span className="font-mono text-slate-200">3-Point Calibrated Rim</span>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
            <span>Drag mouse to inspect 3D perspective</span>
            <span aria-hidden={true}>·</span>
            <span>Scroll responds dynamically</span>
          </div>
        </div>
      </div>
    </section>
  );
}
