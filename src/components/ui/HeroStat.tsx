// ============================================================================
// FILE: src/components/ui/HeroStat.tsx
// Hero stat counter component
// ============================================================================

import { ReactNode } from 'react';

interface HeroStatProps {
    icon: ReactNode;
    value: string;
    label: string;
    color?: string;
}

export default function HeroStat({ icon, value, label, color }: HeroStatProps) {
    return (
        <div className="flex items-center gap-2 px-4 py-2">
            <div className={`text-[#8b949e] ${color === 'text-white' ? 'text-white' : ''}`}>{icon}</div>
            <div className={`text-xl font-bold ${color || 'text-white'}`}>{value}</div>
            <div className="text-[#8b949e] text-sm">{label}</div>
        </div>
    );
}
