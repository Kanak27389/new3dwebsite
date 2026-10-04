import React, { useEffect, useState, useRef } from 'react';
import { ShieldCheck, Cpu, GitFork, Clock, LucideIcon } from 'lucide-react';

interface MetricItem {
  value: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
  label: string;
  sublabel: string;
  icon: LucideIcon;
}

export function Metrics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [progress, setProgress] = useState(0);

  const metrics: MetricItem[] = [
    {
      value: 99.9,
      suffix: '%',
      decimals: 1,
      label: 'Platform Availability',
      sublabel: 'Enterprise multi-region SLA',
      icon: ShieldCheck,
    },
    {
      value: 10,
      suffix: 'M+',
      label: 'AI Operations',
      sublabel: 'Processed daily with zero loss',
      icon: Cpu,
    },
    {
      value: 40,
      suffix: '+',
      label: 'Integrations',
      sublabel: 'Pre-built enterprise connectors',
      icon: GitFork,
    },
    {
      value: 24,
      suffix: '/7',
      label: 'Automation',
      sublabel: 'Continuous autonomous cycles',
      icon: Clock,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1600; // ms
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const currentProgress = Math.min(elapsed / duration, 1);
            // Ease-out expo curve
            const eased =
              currentProgress === 1
                ? 1
                : 1 - Math.pow(2, -10 * currentProgress);

            setProgress(eased);

            if (currentProgress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section className="relative py-20 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Background container with subtle border */}
      <div
        ref={containerRef}
        className="relative rounded-3xl bg-[#090E1A]/80 border border-white/10 p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-md"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            const displayVal = metric.decimals
              ? (metric.value * progress).toFixed(metric.decimals)
              : Math.floor(metric.value * progress);

            return (
              <div
                key={metric.label}
                className={`flex flex-col items-start ${idx > 0 ? 'sm:pl-8 pt-6 sm:pt-0' : ''}`}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 mb-4">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Animated value with tabular figures */}
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight tabular-nums mb-1">
                  {metric.prefix}
                  {displayVal}
                  <span className="text-cyan-400 font-semibold text-3xl sm:text-4xl ml-0.5">
                    {metric.suffix}
                  </span>
                </div>

                {/* Metric Title */}
                <div className="text-base font-semibold text-slate-100 font-display mb-1">
                  {metric.label}
                </div>

                {/* Subtext */}
                <div className="text-xs text-slate-400 leading-relaxed">
                  {metric.sublabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
