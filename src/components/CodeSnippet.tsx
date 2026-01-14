// ============================================================================
// FILE: src/components/CodeSnippet.tsx
// Markdown code snippet with copy functionality (Fixed Width)
// ============================================================================

'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeSnippetProps {
  username: string;
  config: any;
}

export default function CodeSnippet({ username, config }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://github-stats.yourdomain.dev';
  const statsParam = config.stats.join(',');

  const baseParams = `user=${username}&theme=${config.theme}&stats=${statsParam}`;

  const optionalParams = [
    config.layout !== 'default' ? `layout=${config.layout}` : '',
    !config.showUsername ? 'hide_username=true' : '',
    config.customization?.borderRadius !== 10 ? `border_radius=${config.customization?.borderRadius}` : '',
    config.customization?.hideBorder ? 'hide_border=true' : '',
    config.customColors?.bg ? `bg_color=${config.customColors.bg.replace('#', '')}` : '',
    config.customColors?.text ? `text_color=${config.customColors.text.replace('#', '')}` : '',
    config.customColors?.title ? `title_color=${config.customColors.title.replace('#', '')}` : '',
    config.customColors?.icon ? `icon_color=${config.customColors.icon.replace('#', '')}` : '',
  ].filter(Boolean).join('&');

  const fullUrl = optionalParams
    ? `${baseUrl}/api/stats?${baseParams}&${optionalParams}`
    : `${baseUrl}/api/stats?${baseParams}`;

  const markdown = `![GitHub Stats](${fullUrl})`;
  const htmlEmbed = `<img src="${fullUrl}" alt="GitHub Stats" />`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 w-full">
      <div className="w-full">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-300">Markdown (Recommended)</h3>
          <button
            onClick={() => copyToClipboard(markdown)}
            className="flex items-center gap-2 bg-[#21262d] hover:bg-[#30363d] border border-[rgba(240,246,252,0.1)] px-3 py-1.5 rounded-lg text-sm transition text-[#c9d1d9]"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <pre className="bg-[#0d1117] p-4 rounded-lg text-xs text-[#8b949e] border border-[#30363d] w-full whitespace-pre-wrap break-all font-mono">
          {markdown}
        </pre>
        <p className="mt-2 text-xs text-gray-500">
          Paste this in your README.md file
        </p>
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-300">HTML Embed</h3>
          <button
            onClick={() => copyToClipboard(htmlEmbed)}
            className="flex items-center gap-2 bg-[#21262d] hover:bg-[#30363d] border border-[rgba(240,246,252,0.1)] px-3 py-1.5 rounded-lg text-sm transition text-[#c9d1d9]"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
        </div>
        <pre className="bg-[#0d1117] p-4 rounded-lg text-xs text-[#8b949e] border border-[#30363d] w-full whitespace-pre-wrap break-all font-mono">
          {htmlEmbed}
        </pre>
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-300">Direct URL</h3>
          <button
            onClick={() => copyToClipboard(fullUrl)}
            className="flex items-center gap-2 bg-[#21262d] hover:bg-[#30363d] border border-[rgba(240,246,252,0.1)] px-3 py-1.5 rounded-lg text-sm transition text-[#c9d1d9]"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
        </div>
        <pre className="bg-[#0d1117] p-4 rounded-lg text-xs text-[#8b949e] border border-[#30363d] w-full whitespace-pre-wrap break-all font-mono">
          {fullUrl}
        </pre>
      </div>

      <div className="bg-[#58a6ff]/10 border border-[#58a6ff]/20 rounded-lg p-4 w-full">
        <h4 className="text-sm font-semibold text-[#58a6ff] mb-2">Usage Tips</h4>
        <ul className="text-xs text-[#8b949e] space-y-1.5">
          <li>• Add to your GitHub profile README.md</li>
          <li>• Works in any markdown file (docs, blog posts, etc.)</li>
          <li>• Stats auto-update every 30 minutes</li>
        </ul>
      </div>
    </div>
  );
}