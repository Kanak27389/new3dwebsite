import React from 'react';
import { ArrowUpRight, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#04060A] text-slate-400 py-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand info */}
          <div className="lg:col-span-4">
            <a href="#" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white mb-4">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center text-black font-extrabold text-xs">
                N
              </span>
              <span className="font-display tracking-wider">
                NEXORA <span className="text-cyan-400 font-medium">AI</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              Intelligence that moves at the speed of ideas. Empowering modern engineering teams to automate workflows, analyze high-velocity data, and deploy autonomous digital experiences.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/10 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/10 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div className="lg:col-span-2 sm:col-span-1">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-200 mb-4 font-semibold">
              Product
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#features"
                  onClick={(e) => handleSmoothScroll(e, '#features')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Platform Overview
                </a>
              </li>
              <li>
                <a
                  href="#core-3d"
                  onClick={(e) => handleSmoothScroll(e, '#core-3d')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Neural Core 3D
                </a>
              </li>
              <li>
                <a
                  href="#technology"
                  onClick={(e) => handleSmoothScroll(e, '#technology')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Autonomous Engine
                </a>
              </li>
              <li>
                <a
                  href="#use-cases"
                  onClick={(e) => handleSmoothScroll(e, '#use-cases')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Use Cases
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, '#contact')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Enterprise Deploy
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="lg:col-span-3 sm:col-span-1">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-200 mb-4 font-semibold">
              Solutions
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#use-cases"
                  onClick={(e) => handleSmoothScroll(e, '#use-cases')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  AI Customer Support
                </a>
              </li>
              <li>
                <a
                  href="#use-cases"
                  onClick={(e) => handleSmoothScroll(e, '#use-cases')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Automated DevOps
                </a>
              </li>
              <li>
                <a
                  href="#use-cases"
                  onClick={(e) => handleSmoothScroll(e, '#use-cases')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Intelligent Data Analysis
                </a>
              </li>
              <li>
                <a
                  href="#use-cases"
                  onClick={(e) => handleSmoothScroll(e, '#use-cases')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Content Operations
                </a>
              </li>
            </ul>
          </div>

          {/* Resources & Database */}
          <div className="lg:col-span-3 sm:col-span-1">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-200 mb-4 font-semibold">
              Resources & Data
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, '#contact')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <span>Supabase Schema</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-cyan-500" />
                </a>
              </li>
              <li>
                <a
                  href="#technology"
                  onClick={(e) => handleSmoothScroll(e, '#technology')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  API Specifications
                </a>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">
                  SOC2 Compliance Report
                </span>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">
                  System Status: 99.9% Uptime
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {currentYear} NEXORA AI Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <span aria-hidden={true}>·</span>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <span aria-hidden={true}>·</span>
            <a href="#" className="hover:text-slate-400 transition-colors">Security Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
