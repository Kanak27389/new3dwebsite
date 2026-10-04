import React from 'react';
import { ArrowRight, Sparkles, Terminal, Cpu, ShieldCheck } from 'lucide-react';
import { Core3DCanvas } from './Core3DCanvas';

interface HeroProps {
  onStartBuilding?: () => void;
  onExplorePlatform?: () => void;
}

export function Hero({ onStartBuilding, onExplorePlatform }: HeroProps) {
  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 flex items-center overflow-hidden">
      {/* Background ambient radial gradients & digital grid */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-600/10 via-indigo-600/15 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full" />
        
        {/* Subtle geometric grid mask */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Tagline kicker (unboxed, clean typography) */}
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-cyan-400 mb-4 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>Next-Generation Autonomous Intelligence</span>
              <span aria-hidden={true} className="text-slate-600">·</span>
              <span className="text-slate-400">v4 Engine Ready</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.08] mb-6">
              Build What's Next <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                With AI.
              </span>
            </h1>

            {/* Tagline & Supporting Copy */}
            <p className="text-lg sm:text-xl font-medium text-slate-200 mb-3 max-w-xl">
              "Intelligence that moves at the speed of ideas."
            </p>
            <p className="text-base text-slate-400 leading-relaxed mb-8 max-w-xl">
              Turn complex ideas into intelligent products, automated workflows and scalable digital experiences with NEXORA’s autonomous neural orchestration engine.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={() => {
                  onStartBuilding?.();
                  scrollTo('#contact');
                }}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 hover:from-cyan-300 hover:to-white rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:shadow-[0_0_40px_rgba(6,182,212,0.55)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <span>Start Building</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={() => {
                  onExplorePlatform?.();
                  scrollTo('#features');
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-slate-200 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-cyan-500/40 rounded-xl backdrop-blur-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <span>Explore Platform</span>
              </button>
            </div>

            {/* Micro specs / Trust Markers */}
            <div className="pt-6 border-t border-white/[0.08] w-full grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xs text-slate-400">Response Latency</div>
                <div className="text-base font-semibold text-slate-100 font-mono tabular-nums">&lt; 12ms Edge</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Model Routing</div>
                <div className="text-base font-semibold text-slate-100 font-mono tabular-nums">Dynamic Hybrid</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Security SLA</div>
                <div className="text-base font-semibold text-slate-100 font-mono tabular-nums">SOC2 Type II</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Visual Experience */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[420px] sm:min-h-[480px]">
            {/* Soft backdrop glow behind core */}
            <div className="absolute w-72 h-72 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none" />

            {/* R3F 3D Canvas */}
            <div className="w-full h-[440px] sm:h-[500px] relative z-10 cursor-grab active:cursor-grabbing">
              <Core3DCanvas rotationMultiplier={0.9} intensityBoost={1.1} />
            </div>

            {/* Interactive hint floating badge */}
            <div className="absolute bottom-2 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-400 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Interactive 3D Core · Drag or Hover</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
