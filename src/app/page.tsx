// ============================================================================
// FILE: src/app/page.tsx
// Main page component - GitHub Theme (Primer Dark)
// ============================================================================

import { Header, Footer, HeroSection, FeaturesSection, StatsConfigurator } from '@/components';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-[#1f6feb] selection:text-white">
      <Header />
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <div className="border border-[#30363d] rounded-md bg-[#0d1117] shadow-xl shadow-black/50 overflow-hidden">
          <StatsConfigurator />
        </div>
      </div>
      <FeaturesSection />
      <Footer />
    </main>
  );
}