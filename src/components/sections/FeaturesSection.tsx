// ============================================================================
// FILE: src/components/sections/FeaturesSection.tsx
// Features section component
// ============================================================================

import { GitFork } from 'lucide-react';
import FeatureCard from '@/components/ui/FeatureCard';

export default function FeaturesSection() {
    return (
        <section className="border-t border-[#30363d] bg-[#161b22] py-20">
            <div className="max-w-7xl mx-auto px-4">
                <h3 className="text-2xl font-semibold text-center mb-12 text-white">
                    Everything you need for your profile
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                    <FeatureCard
                        icon="⚡️"
                        title="Lightning Fast"
                        description="Built on the edge. SVGs are generated in milliseconds and cached for performance."
                    />
                    <FeatureCard
                        icon="🎨"
                        title="Fully Customizable"
                        description="Tweaking colors, layouts, and stats is as easy as editing a JSON config file."
                    />
                    <FeatureCard
                        icon="🔒"
                        title="Privacy Focused"
                        description="We don't track you. No cookies, no analytics, just pure open-source code."
                    />
                    <FeatureCard
                        icon="wf"
                        customIcon={<GitFork className="w-6 h-6 text-[#8b949e]" />}
                        title="Real-Time Data"
                        description="Direct integration with GitHub GraphQL API ensures your stats are always fresh."
                    />
                    <FeatureCard
                        icon="Aa"
                        customIcon={<span className="text-xl font-bold text-[#8b949e]">Aa</span>}
                        title="Accessible"
                        description="Semantic SVGs with proper contrast ratios and screen reader support."
                    />
                    <FeatureCard
                        icon="❤️"
                        title="Community Driven"
                        description="Open for contributions. Request features or fix bugs directly on GitHub."
                    />
                </div>
            </div>
        </section>
    );
}
