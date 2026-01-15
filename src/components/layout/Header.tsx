// ============================================================================
// FILE: src/components/layout/Header.tsx
// Header component with GitHub styling
// ============================================================================

import { Github, Star } from 'lucide-react';

import { fetchRepoStars } from '@/lib/github/client';

export default async function Header() {
  const stars = await fetchRepoStars('Coded4-me', 'github-stats');
  const starCount = stars !== null ? (stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars) : '0';

  return (
    <header className="border-b border-[#30363d] bg-[#161b22] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Github className="w-8 h-8 text-white" />
          <h1 className="text-lg font-semibold text-white tracking-tight">GitHub Stats Generator</h1>
        </div>

        <a
          href="https://github.com/Coded4-me/github-stats"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 bg-[#21262d] hover:bg-[#30363d] border border-[rgba(240,246,252,0.1)] hover:border-[#8b949e] px-3 py-1.5 rounded-md transition-all duration-200 text-sm font-medium text-[#c9d1d9]"
        >
          <Star className="w-4 h-4 text-[#8b949e] group-hover:text-[#e3b341] transition-colors" />
          <span>Star</span>
          <span className="bg-[#30363d] px-1.5 py-0.5 rounded-full text-xs text-[#8b949e] group-hover:text-white transition-colors">
            {starCount}
          </span>
        </a>
      </div>
    </header>
  );
}
