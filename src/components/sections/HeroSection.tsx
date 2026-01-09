// ============================================================================
// FILE: src/components/sections/HeroSection.tsx
// Hero section component
// ============================================================================

import Link from 'next/link';
import { Github, GitFork, Heart } from 'lucide-react';
import HeroStat from '@/components/ui/HeroStat';

export default function HeroSection() {
    return (
        <section className="max-w-5xl mx-auto px-4 py-16 text-center">
            <a
                href="https://github.com/yourusername/github-stats-generator/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-blue-500/30 bg-[#0d1117] hover:bg-[#161b22] hover:border-blue-400/50 transition-all duration-300 shadow-[0_0_10px_rgba(56,139,253,0.15)] hover:shadow-[0_0_15px_rgba(56,139,253,0.25)]"
            >
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#1f6feb] text-white shadow-sm">
                    NEW
                </span>
                <span className="text-xs font-medium text-[#8b949e] group-hover:text-[#c9d1d9] transition-colors">
                    v2.0 Now Available
                </span>
                <svg
                    className="w-3 h-3 text-[#8b949e] group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </a>

            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                GitHub Stats, <br />
                <Link href="https://coded4.me" className="group text-[#7ee787]">coded<span className='inline-block w-4 group-hover:w-0 transition-all duration-300 ease-in-out'></span>4<span className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>.</span>me</Link>
            </h2>

            <p className="text-xl text-[#8b949e] max-w-2xl mx-auto mb-10 leading-relaxed">
                Generate beautiful, customizable SVG statistics cards for your profile.
                The perfect way to showcase your open-source contributions.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
                <HeroStat icon={<Github className="w-5 h-5" />} value="100%" label="Open Source" color="text-white" />
                <HeroStat icon={<GitFork className="w-5 h-5" />} value="1M+" label="Generated" color="text-[#8b949e]" />
                <HeroStat icon={<Heart className="w-5 h-5" />} value="Free" label="Forever" color="text-[#f78166]" />
            </div>
        </section>
    );
}
