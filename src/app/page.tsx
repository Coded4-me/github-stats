// ============================================================================
// FILE: src/app/page.tsx
// Main page component - GitHub Theme (Primer Dark)
// ============================================================================

import { Header, Footer, HeroSection, FeaturesSection, StatsConfigurator } from '@/components';

export default function Home() {
  return (
    // GitHub Default Dark Background: #0d1117, Text: #c9d1d9
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-[#1f6feb] selection:text-white">

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Configurator Wrapper */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        {/* Ajout d'une bordure style "canvas" autour de l'outil */}
        <div className="border border-[#30363d] rounded-md bg-[#0d1117] shadow-xl shadow-black/50 overflow-hidden">
          <StatsConfigurator />
        </div>
      </div>

      {/* Features Section */}
      <FeaturesSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}