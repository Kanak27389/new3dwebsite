import React, { useState } from 'react';
import {
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Database,
  Code,
  Copy,
  Check,
} from 'lucide-react';
import {
  submitContactMessage,
  isSupabaseConfigured,
  POSTGRES_TABLE_SCHEMA_SQL,
  getLocalStoredMessages,
} from '../lib/supabase';
import { ContactMessage } from '../types';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    type: 'success' | 'error';
    text: string;
    record?: ContactMessage;
    isSimulated?: boolean;
  } | null>(null);

  const [showSqlSchema, setShowSqlSchema] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Client-side field validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format (e.g. name@company.com).';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Project message is required.';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Please provide at least 5 characters for your message.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // Prevent duplicate submissions

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    setSubmitResult(null);

    try {
      const res = await submitContactMessage({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
      });

      if (res.success) {
        setSubmitResult({
          type: 'success',
          text: res.message,
          record: res.record,
          isSimulated: res.isSimulated,
        });
        // Reset form after successful submission
        setFormData({ name: '', email: '', company: '', message: '' });
        setErrors({});
      } else {
        setSubmitResult({
          type: 'error',
          text: res.message || 'Failed to submit form. Please check your network and try again.',
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unexpected error occurred.';
      setSubmitResult({
        type: 'error',
        text: `Submission error: ${msg}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copySql = () => {
    navigator.clipboard.writeText(POSTGRES_TABLE_SCHEMA_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <section id="contact" className="relative py-24 px-6 sm:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Background radial highlight */}
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[400px] bg-cyan-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Context & Supabase Information */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mt-1 mb-4">
              Let's Engineer Your AI Vision
            </h2>
            <p className="text-base text-slate-400 leading-relaxed mb-8">
              Whether you need dedicated enterprise deployment, high-throughput autonomous agents, or customized architectural advice, our engineering team is ready to assist.
            </p>

            {/* Direct details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Enterprise SLA: Under 2-hour response window</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>Custom VPC & On-Premises Isolation Available</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Direct Slack Connect Channel for Partners</span>
              </div>
            </div>
          </div>

          {/* Supabase Integration Status Card */}
          <div className="p-5 rounded-2xl bg-[#090D18] border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-semibold text-white">
                  PostgreSQL / Supabase Integration
                </span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  isSupabaseConfigured
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                }`}
              >
                {isSupabaseConfigured ? 'LIVE SUPABASE CONNECTED' : 'VERIFIED DEV STORAGE'}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Target Table: <code className="text-cyan-300 font-mono">contact_messages</code>
              <br />
              Configured via <code className="text-slate-300 font-mono">VITE_SUPABASE_URL</code> and{' '}
              <code className="text-slate-300 font-mono">VITE_SUPABASE_ANON_KEY</code>.
            </p>

            <button
              onClick={() => setShowSqlSchema(!showSqlSchema)}
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
            >
              <Code className="w-3.5 h-3.5" />
              <span>{showSqlSchema ? 'Hide Database Schema SQL' : 'View PostgreSQL Schema SQL'}</span>
            </button>

            {showSqlSchema && (
              <div className="mt-3 relative">
                <pre className="p-3 rounded-lg bg-black/80 text-[11px] font-mono text-slate-300 overflow-x-auto border border-white/10 max-h-48">
                  {POSTGRES_TABLE_SCHEMA_SQL}
                </pre>
                <button
                  onClick={copySql}
                  className="absolute top-2 right-2 p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  title="Copy SQL"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#090D18]/90 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <h3 className="text-xl font-bold font-display text-white mb-2">
              Send a Secure Message
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              All messages are dispatched with end-to-end TLS encryption directly into the PostgreSQL storage tier.
            </p>

            {/* Success Feedback Alert */}
            {submitResult?.type === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex flex-col gap-2">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Submission Successful</span>
                </div>
                <p className="text-xs text-emerald-300/90 leading-relaxed">
                  {submitResult.text}
                </p>
                {submitResult.record && (
                  <div className="mt-1 p-2 rounded bg-black/40 font-mono text-[11px] text-slate-300">
                    ID: {submitResult.record.id} · Created: {submitResult.record.created_at}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setSubmitResult(null)}
                  className="self-start text-[11px] text-emerald-400 underline underline-offset-4 mt-1"
                >
                  Submit another message
                </button>
              </div>
            )}

            {/* Error Feedback Alert */}
            {submitResult?.type === 'error' && (
              <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Submission Failed</div>
                  <div className="text-xs text-rose-300/90 mt-0.5">{submitResult.text}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Full Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="Ada Lovelace"
                  disabled={isLoading}
                  className={`w-full px-4 py-3 rounded-xl bg-[#060910] text-sm text-white placeholder-slate-600 border transition-all focus-visible:outline-none focus-visible:ring-2 ${
                    errors.name
                      ? 'border-rose-500/80 focus-visible:ring-rose-500'
                      : 'border-white/10 hover:border-white/20 focus-visible:ring-cyan-400 focus-visible:border-cyan-400'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email & Company Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Business Email <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="ada@domain.com"
                    disabled={isLoading}
                    className={`w-full px-4 py-3 rounded-xl bg-[#060910] text-sm text-white placeholder-slate-600 border transition-all focus-visible:outline-none focus-visible:ring-2 ${
                      errors.email
                        ? 'border-rose-500/80 focus-visible:ring-rose-500'
                        : 'border-white/10 hover:border-white/20 focus-visible:ring-cyan-400 focus-visible:border-cyan-400'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-company" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Company <span className="text-slate-500 text-[11px]">(Optional)</span>
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Apex Systems"
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-xl bg-[#060910] text-sm text-white placeholder-slate-600 border border-white/10 hover:border-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:border-cyan-400"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Message <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  placeholder="Tell us about your automation workflow, throughput requirements, or integration scope..."
                  disabled={isLoading}
                  className={`w-full px-4 py-3 rounded-xl bg-[#060910] text-sm text-white placeholder-slate-600 border transition-all focus-visible:outline-none focus-visible:ring-2 ${
                    errors.message
                      ? 'border-rose-500/80 focus-visible:ring-rose-500'
                      : 'border-white/10 hover:border-white/20 focus-visible:ring-cyan-400 focus-visible:border-cyan-400'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 hover:from-cyan-300 hover:to-white rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting to Supabase...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
