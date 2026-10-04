import React from 'react';
import {
  Bot,
  LineChart,
  Workflow,
  Zap,
  Cloud,
  Code2,
  ArrowUpRight,
  LucideIcon,
} from 'lucide-react';
import { FeatureItem } from '../types';

export function Features() {
  const features: (FeatureItem & { icon: LucideIcon })[] = [
    {
      id: 'automation',
      icon: Bot,
      title: 'AI Automation',
      description:
        'Deploy resilient autonomous agent pipelines that resolve complex decision trees, parse unstructured inputs, and execute business logic without human intervention.',
      metric: '94% Reduction in manual intervention',
      tags: ['Autonomous Agents', 'Self-Healing Loops', 'Event Triggers'],
    },
    {
      id: 'analytics',
      icon: LineChart,
      title: 'Intelligent Analytics',
      description:
        'Continuous deep synthesis across enterprise data streams. Transform raw high-velocity signals into predictive insights, anomalies, and forward projections.',
      metric: 'Real-time Vector Ingestion',
      tags: ['Multimodal Embeddings', 'Anomaly Detection', 'Cohort Modeling'],
    },
    {
      id: 'orchestration',
      icon: Workflow,
      title: 'Workflow Orchestration',
      description:
        'Visually construct or code distributed DAG workflows. Coordinate microservices, vector memory stores, LLM endpoints, and legacy databases reliably.',
      metric: 'Deterministic execution guarantees',
      tags: ['State Machine DAGs', 'Failover Routing', 'Zero-Loss Queues'],
    },
    {
      id: 'realtime',
      icon: Zap,
      title: 'Real-Time Intelligence',
      description:
        'Sub-15ms edge inference with global distributed routing. Deliver conversational experiences, audio processing, and live video analysis with instant response.',
      metric: '< 15ms global edge latency',
      tags: ['WebSockets', 'gRPC Streams', 'Multi-Region Mesh'],
    },
    {
      id: 'cloud-scale',
      icon: Cloud,
      title: 'Cloud Scale',
      description:
        'Built for petabyte workloads. Automatically scale inference nodes and GPU clusters up and down based on traffic bursts while maintaining strict latency SLAs.',
      metric: 'Auto-scaling from 0 to 50k RPS',
      tags: ['Kubernetes Native', 'Cold-Start Optimized', 'Private VPC'],
    },
    {
      id: 'developer-apis',
      icon: Code2,
      title: 'Developer APIs',
      description:
        'First-class SDKs in TypeScript, Python, and Go. Intuitive REST and GraphQL endpoints backed by typed schemas, end-to-end tracing, and sandbox testing.',
      metric: 'OpenAPI 3.1 & Typed SDKs',
      tags: ['TypeScript SDK', 'Python Lib', 'Zero Config Auth'],
    },
  ];

  return (
    <section id="features" className="relative py-24 px-6 sm:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
          Platform Capabilities
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mt-2 mb-4">
          Architected for Production Intelligence
        </h2>
        <p className="text-base text-slate-400 leading-relaxed">
          Six foundational pillars engineered to support enterprise reliability, extreme speed, and end-to-end autonomous execution.
        </p>
      </div>

      {/* 6 Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.id}
              className="group relative p-7 rounded-2xl bg-[#090D18]/80 backdrop-blur-sm border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(6,182,212,0.12)] flex flex-col justify-between"
            >
              {/* Subtle top glow bar on hover */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Icon & Affordance */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-500/30 group-hover:bg-cyan-950/20 transition-all duration-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-slate-600 group-hover:text-cyan-400 transition-colors duration-200">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white font-display mb-3 group-hover:text-cyan-100 transition-colors">
                  {feat.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {feat.description}
                </p>
              </div>

              {/* Footer: Metric & unboxed metadata tags */}
              <div className="pt-4 border-t border-white/[0.06]">
                <div className="text-xs font-mono text-cyan-400/90 font-medium mb-2.5">
                  {feat.metric}
                </div>
                {/* Clean unboxed tags with typographic separator */}
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                  {feat.tags.map((t, idx) => (
                    <React.Fragment key={t}>
                      <span>{t}</span>
                      {idx < feat.tags.length - 1 && (
                        <span aria-hidden={true} className="text-slate-600">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
