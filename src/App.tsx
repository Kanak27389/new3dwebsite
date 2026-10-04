/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HeroVideo } from './components/HeroVideo';
import { Features } from './components/Features';
import { Core3DExperience } from './components/Core3DExperience';
import { TechnologyFlow } from './components/TechnologyFlow';
import { UseCases } from './components/UseCases';
import { Metrics } from './components/Metrics';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#04060A] text-slate-100 flex flex-col selection:bg-cyan-500/25 selection:text-cyan-200">
      {/* Sticky Top Navigation */}
      <Navbar />

      <main className="flex-grow">
        {/* 1. Hero Section with Interactive 3D visual */}
        <Hero />

        {/* 2. Cinematic AI Media Section */}
        <HeroVideo />

        {/* 3. Six Foundational Capabilities */}
        <Features />

        {/* 4. Dedicated Futuristic 3D AI Core Experience */}
        <Core3DExperience />

        {/* 5. Technology Pipeline Flow (USER → AI PLATFORM → AUTOMATION → DATA → INSIGHTS) */}
        <TechnologyFlow />

        {/* 6. Realistic Enterprise Use Cases */}
        <UseCases />

        {/* 7. Key Performance Metrics */}
        <Metrics />

        {/* 8. Contact & Supabase Integration */}
        <ContactSection />
      </main>

      {/* 9. Comprehensive Footer */}
      <Footer />
    </div>
  );
}
