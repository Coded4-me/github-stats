// ============================================================================
// FILE: src/components/ui/FeatureCard.tsx
// Feature card component for features section
// ============================================================================

import { ReactNode } from 'react';

interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
    customIcon?: ReactNode;
}

export default function FeatureCard({ icon, title, description, customIcon }: FeatureCardProps) {
    return (
        <div className="bg-[#0d1117] p-6 rounded-md border border-[#30363d] hover:border-[#8b949e] transition-colors duration-200">
            <div className="bg-[#161b22] w-12 h-12 rounded-md border border-[#30363d] flex items-center justify-center mb-4 text-2xl">
                {customIcon || icon}
            </div>
            <h4 className="text-lg font-semibold mb-2 text-white">{title}</h4>
            <p className="text-[#8b949e] text-sm leading-relaxed">{description}</p>
        </div>
    );
}
