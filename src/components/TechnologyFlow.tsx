import React, { useState } from 'react';
import {
  User,
  Cpu,
  Workflow,
  Database,
  Lightbulb,
  ArrowRight,
  Shield,
  Layers,
  Network,
  CloudCog,
  CheckCircle2,
  LucideIcon,
} from 'lucide-react';
import { TechNode } from '../types';

export function TechnologyFlow() {
  const flowNodes: (TechNode & { icon: LucideIcon })[] = [
    {
      id: 'user',
      label: 'USER',
      sublabel: 'Client Interface',
      icon: User,
      description:
        'Requests originate from web portals, mobile apps, Slack bots, and enterprise webhooks.',
      specs: ['TLS 1.3 Strict', 'JWT / mTLS Auth', 'Edge Georouting'],
      latency: '1-3ms',
    },
    {
      id: 'platform',
      label: 'AI PLATFORM',
      sublabel: 'Neural Routing Core',
      icon: Cpu,
      description:
        'Context evaluation engine decides prompt distillation, model tier selection, and agent decomposition.',
      specs: ['Adaptive Semantic Router', 'Context Windows up to 2M', 'Zero-Data Retention'],
      latency: '12ms',
    },
    {
      id: 'automation',
      label: 'AUTOMATION',
      sublabel: 'Distributed DAG Engine',
      icon: Workflow,
      description:
        'Autonomous workers execute deterministic multi-step pipelines with automated rollback and recovery.',
      specs: ['Async Worker Pool', 'Stateful Deduplication', 'Distributed Locks'],
      latency: '18ms',
    },
    {
      id: 'data',
      label: 'DATA',
      sublabel: 'Vector & Relational Hybrid',
      icon: Database,
      description:
        'Continuous synchronization with PostgreSQL, vector embeddings, object storage, and real-time streams.',
      specs: ['PostgreSQL & pgvector', 'ACID Transaction Logs', '100k QPS Ingestion'],
      latency: '5ms',
    },
    {
      id: 'insights',
      label: 'INSIGHTS',
      sublabel: 'Deterministic Delivery',
      icon: Lightbulb,
      description:
        'Synthesized actions dispatched back to the caller with structured schemas, audit trails, and feedback signals.',
      specs: ['Streaming SSE / WebSockets', 'Automated Audit Hash', 'Model Confidence Scoring'],
      latency: '4ms',
    },
  ];

  const [selectedNodeIndex, setSelectedNodeIndex] = useState(1);
  const activeNode = flowNodes[selectedNodeIndex];

  // Six Technology Pillars
  const techPillars = [
    { name: 'AI', desc: 'Hybrid LLM orchestration & specialized fine-tuned parameter weights.' },
    { name: 'Cloud', desc: 'Multi-region serverless infrastructure with auto-scaling inference.' },
    { name: 'APIs', desc: 'Ultra-low latency OpenAPI 3.1, gRPC, and bidirectional WebSocket streams.' },
    { name: 'Automation', desc: 'Deterministic state-machine DAGs with automated anomaly failovers.' },
    { name: 'Data', desc: 'Real-time vector embeddings and scalable PostgreSQL persistence.' },
    { name: 'Infrastructure', desc: 'Zero-trust enterprise VPC isolation with SOC2 Type II compliance.' },
  ];

  return (
    <section id="technology" className="relative py-24 px-6 sm:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/5 blur-[130px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
          End-to-End Pipeline
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mt-2 mb-4">
          Autonomous Data &amp; Execution Topology
        </h2>
        <p className="text-base text-slate-400">
          How raw intent flows from user action through our neural platform into verifiable insights in sub-second cycles.
        </p>
      </div>

      {/* Animated Pipeline Flow Container */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#080C17]/90 border border-white/10 backdrop-blur-md mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Step Indicator row */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-2 relative mb-8">
          {flowNodes.map((node, idx) => {
            const Icon = node.icon;
            const isSelected = selectedNodeIndex === idx;

            return (
              <div key={node.id} className="relative flex flex-col items-center">
                <button
                  onClick={() => setSelectedNodeIndex(idx)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 border flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/50'
                      : 'bg-[#0B1020]/60 border-white/[0.08] hover:border-white/20 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400/80">{node.latency}</span>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-white font-mono tracking-wider">
                      {node.label}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">{node.sublabel}</div>
                  </div>
                </button>

                {/* Arrow connector for desktop */}
                {idx < flowNodes.length - 1 && (
                  <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-cyan-500/40">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Node Spec Inspector */}
        <div className="p-6 rounded-2xl bg-[#0B1020]/90 border border-white/[0.08] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <span>STAGE {selectedNodeIndex + 1} OF 5</span>
              <span>·</span>
              <span className="text-white font-semibold">{activeNode.label} SPECS</span>
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
              {activeNode.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {activeNode.specs.map((spec) => (
                <div
                  key={spec}
                  className="flex items-center gap-1.5 text-xs text-slate-300 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-lg"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 p-4 rounded-xl bg-slate-950/70 border border-white/[0.06] flex flex-col gap-2 font-mono text-xs">
            <div className="text-slate-400">STAGE TELEMETRY</div>
            <div className="flex justify-between border-b border-white/[0.06] pb-1.5">
              <span className="text-slate-500">Latency Target</span>
              <span className="text-emerald-400 font-semibold">{activeNode.latency}</span>
            </div>
            <div className="flex justify-between border-b border-white/[0.06] pb-1.5">
              <span className="text-slate-500">Integrity Hash</span>
              <span className="text-slate-300">SHA-256 Verified</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Failover Mode</span>
              <span className="text-cyan-400">Zero-Loss Retry</span>
            </div>
          </div>
        </div>
      </div>

      {/* Six Foundational Technology Pillars */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {techPillars.map((pillar) => (
          <div
            key={pillar.name}
            className="p-4 rounded-xl bg-[#080C17]/60 border border-white/[0.06] hover:border-cyan-500/30 transition-colors"
          >
            <div className="text-sm font-bold text-white font-mono text-cyan-400 mb-1.5">
              {pillar.name}
            </div>
            <p className="text-xs text-slate-400 leading-normal">{pillar.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
