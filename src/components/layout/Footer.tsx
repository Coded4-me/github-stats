// ============================================================================
// FILE: src/components/layout/Footer.tsx
// Footer component with GitHub styling
// ============================================================================

import { Github } from 'lucide-react';

interface FooterLinkProps {
    href: string;
    children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
    return (
        <a href={href} className="hover:text-[#58a6ff] hover:underline transition-colors">
            {children}
        </a>
    );
}

export default function Footer() {
    return (
        <footer className="border-t border-[#30363d] bg-[#0d1117] mt-0">
            <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between text-sm text-[#8b949e]">
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <Github className="w-5 h-5 text-[#8b949e] hover:text-white transition-colors" />
                    <span>©2026 GitHub Stats Generator</span>
                </div>

                <div className="flex gap-6">
                    <FooterLink href="#">Privacy</FooterLink>
                    <FooterLink href="#">Terms</FooterLink>
                    <FooterLink href="#">API</FooterLink>
                    <FooterLink href="https://github.com/yourusername/github-stats-generator">Source</FooterLink>
                </div>
            </div>
        </footer>
    );
}
