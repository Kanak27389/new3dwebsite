import React, { useState } from 'react';
import {
  Headphones,
  GitBranch,
  BarChart3,
  FileText,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  X,
  LucideIcon,
} from 'lucide-react';
import { UseCaseItem } from '../types';

type UseCaseDetail = UseCaseItem & { icon: LucideIcon; color: string };

export function UseCases() {
  const [selectedCase, setSelectedCase] = useState<UseCaseDetail | null>(null);

  const useCases: UseCaseDetail[] = [
    {
      id: 'customer-support',
      title: 'AI Customer Support',
      tagline: 'Autonomous omnichannel triage and resolution',
      description:
        'Resolves tier-1 and tier-2 tickets autonomously with context-aware knowledge retrieval, conversational sentiment adaptation, and seamless human escalation.',
      impactMetric: '82%',
      impactLabel: 'First-contact autonomous resolution within 45s',
      tags: ['Multi-Turn Reasoning', 'Zendesk / Salesforce Sync', 'RAG Retrieval'],
      capabilities: [
        'Real-time retrieval across 50,000+ support documentation articles',
        'Automated refund and cancellation actions within verified spending limits',
        'Automatic multilingual translation across 42 languages',
        'Zero-latency handoff to human agents with full conversation summarization',
      ],
      icon: Headphones,
      color: 'from-cyan-500/20 to-blue-500/10',
    },
    {
      id: 'automated-devops',
      title: 'Automated DevOps',
      tagline: 'Self-healing deployments and telemetry triage',
      description:
        'Monitors production metrics, detects memory leaks or deployment anomalies before customers notice, and triggers canary rollbacks with detailed root-cause summaries.',
      impactMetric: '-74%',
      impactLabel: 'Mean Time to Recovery (MTTR) on critical incidents',
      tags: ['Kubernetes Operators', 'Datadog / Prometheus Ingest', 'Automated Rollbacks'],
      capabilities: [
        'Autonomous log anomaly detection across microservice clusters',
        'Automated reproduction scripts and stack trace synthesis',
        'Self-executing canary rollbacks upon metric degradation',
        'Automated PR generation with targeted regression fixes',
      ],
      icon: GitBranch,
      color: 'from-emerald-500/20 to-cyan-500/10',
    },
    {
      id: 'data-analysis',
      title: 'Intelligent Data Analysis',
      tagline: 'Ad-hoc multi-warehouse synthesis in plain language',
      description:
        'Translates executive prompts into optimized SQL and Python queries, analyzes multi-terabyte datasets across Snowflake and BigQuery, and visualizes trends automatically.',
      impactMetric: '15x',
      impactLabel: 'Faster time-to-insight for executive BI teams',
      tags: ['PostgreSQL & BigQuery', 'Semantic Layer Modeling', 'Automated Charting'],
      capabilities: [
        'Direct connection to BigQuery, Snowflake, ClickHouse, and PostgreSQL',
        'Automatic data profiling and schema drift detection',
        'Interactive narrative reports with real-time confidence scores',
        'Strict RBAC compliance preventing unauthorized data exfiltration',
      ],
      icon: BarChart3,
      color: 'from-indigo-500/20 to-purple-500/10',
    },
    {
      id: 'content-operations',
      title: 'AI Content Operations',
      tagline: 'Multimodal brand generation at global scale',
      description:
        'Generates on-brand copy, localized marketing graphics, technical documentation, and compliance-checked product descriptions in seconds.',
      impactMetric: '800+',
      impactLabel: 'Campaign assets localized and verified per week',
      tags: ['Brand Voice Guardrails', 'Multimodal Generation', 'Automated QA Checks'],
      capabilities: [
        'Deterministic brand voice compliance scoring before asset publication',
        'Automated generation of social, email, ad, and landing page variants',
        'Automated translation and cultural nuance verification',
        'Native export into Figma, CMS, and headless commerce stores',
      ],
      icon: FileText,
      color: 'from-purple-500/20 to-pink-500/10',
    },
  ];

  return (
    <section id="use-cases" className="relative py-24 px-6 sm:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
            Enterprise Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mt-1">
            Proven Outcomes Across Core Verticals
          </h2>
        </div>
        <p className="text-sm text-slate-400 max-w-md">
          See how industry leaders deploy NEXORA to automate high-stakes operational workflows with enterprise guarantees.
        </p>
      </div>

      {/* 4 Use Case Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {useCases.map((uc) => {
          const Icon = uc.icon;
          return (
            <div
              key={uc.id}
              className="group relative p-8 rounded-3xl bg-[#090D18]/90 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1"
            >
              {/* Subtle gradient backdrop */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${uc.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              />

              <div className="relative z-10">
                {/* Header: Icon & Tags */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform duration-200">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="text-right">
                    <span className="text-2xl font-bold font-mono text-cyan-300 tabular-nums">
                      {uc.impactMetric}
                    </span>
                    <div className="text-[11px] text-slate-400 max-w-[140px] truncate">
                      {uc.impactLabel}
                    </div>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-2xl font-bold text-white font-display mb-1 group-hover:text-cyan-100 transition-colors">
                  {uc.title}
                </h3>
                <div className="text-xs text-cyan-400/90 font-mono mb-4">{uc.tagline}</div>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {uc.description}
                </p>

                {/* Technology tags: unboxed with typographic separators */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 mb-6">
                  {uc.tags.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      <span>{tag}</span>
                      {idx < uc.tags.length - 1 && (
                        <span aria-hidden={true} className="text-slate-600">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Action CTA */}
              <div className="relative z-10 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  onClick={() => setSelectedCase(uc)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-cyan-400 transition-colors group-hover:translate-x-0.5 duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded"
                >
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
                <span className="text-[11px] font-mono text-slate-400">Enterprise Verified</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Dialog for Architecture Deep Dive */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#090D18] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <selectedCase.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xl font-bold font-display text-white">{selectedCase.title}</h4>
                <div className="text-xs font-mono text-cyan-400">{selectedCase.tagline}</div>
              </div>
            </div>

            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              {selectedCase.description}
            </p>

            <div className="mb-6">
              <div className="text-xs font-mono uppercase text-slate-400 mb-3 tracking-wider">
                Production Architecture Capabilities
              </div>
              <div className="space-y-2.5">
                {selectedCase.capabilities.map((cap) => (
                  <div key={cap} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs font-mono text-slate-400">
                Impact: <span className="text-cyan-300 font-semibold">{selectedCase.impactMetric}</span> ({selectedCase.impactLabel})
              </div>
              <button
                onClick={() => {
                  setSelectedCase(null);
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
              >
                Request Deployment Specs
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
