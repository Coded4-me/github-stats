// ============================================================================
// FILE: src/components/StatsPreview.tsx
// Live preview component with loading states
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, Download } from 'lucide-react';
import { generateStatsSVG } from '@/lib/svg/generator';

interface PreviewProps {
  username: string;
  config: any;
}

export default function StatsPreview({ username, config }: PreviewProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [svgUrl, setSvgUrl] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [lastFetchedUsername, setLastFetchedUsername] = useState<string | null>(null);
  const [lastFetchedData, setLastFetchedData] = useState<any>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const fetchPreview = async () => {
      if (!username.trim()) return;

      if (username !== lastFetchedUsername) {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch('/api/preview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: username, config }),
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to fetch preview');
          }

          const data = await response.json();
          setLastFetchedData(data);
          setLastFetchedUsername(username);
          setSvgUrl(data.svgUrl);
          setUserData(data.data);
          setError(null);
        } catch (err: any) {
          console.error('Preview error:', err);
          setError(err.message || 'Failed to load preview');
          setSvgUrl(null);
        } finally {
          setLoading(false);
        }
      } else if (lastFetchedData) {
        const githubData = {
          user: {
            name: lastFetchedData.data.name || username,
            login: username,
            avatarUrl: '',
            createdAt: ''
          },
          totalCommits: lastFetchedData.data.commits,
          totalRepos: lastFetchedData.data.repos,
          totalPRs: lastFetchedData.data.prs,
          totalIssues: lastFetchedData.data.issues,
          totalStars: lastFetchedData.data.stars,
          followers: lastFetchedData.data.followers,
          following: 0,
          languages: lastFetchedData.data.languages || [],
          contributionStreak: 0
        };

        const svgParams = {
          theme: config.theme || 'dark',
          bg_color: config.customColors?.bg,
          text_color: config.customColors?.text,
          icon_color: config.customColors?.icon,
          title_color: config.customColors?.title,
          border_radius: config.customization?.borderRadius ?? 10,
          hide_border: config.customization?.hideBorder ?? false,
          layout: config.layout || 'default',
          stats: config.stats?.join(',') || 'commits,repos,langs',
        };

        const svgContent = generateStatsSVG(githubData, svgParams);
        const base64 = btoa(unescape(encodeURIComponent(svgContent)));
        const svgDataUrl = `data:image/svg+xml;base64,${base64}`;
        setSvgUrl(svgDataUrl);
      }
    };

    timeoutId = setTimeout(fetchPreview, 500);
    return () => clearTimeout(timeoutId);
  }, [username, JSON.stringify(config)]);

  const downloadSVG = () => {
    if (!svgUrl) return;
    const link = document.createElement('a');
    link.href = svgUrl;
    link.download = `github-stats-${username}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-300">Live Preview</h3>
        {svgUrl && (
          <button
            onClick={downloadSVG}
            className="flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043] px-3 py-1.5 rounded-lg text-sm transition text-white border border-[rgba(240,246,252,0.1)]"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        )}
      </div>

      <div className="bg-[#0d1117] rounded-lg p-4 min-h-[400px] flex items-center justify-center border border-[#30363d] w-full">
        {loading && (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#58a6ff]" />
            <p className="text-sm text-gray-400">Loading stats...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-3 text-red-400 text-center">
            <AlertCircle className="w-8 h-8" />
            <p className="text-sm">{error}</p>
            <p className="text-xs text-gray-500">Check username and try again</p>
          </div>
        )}

        {!loading && !error && svgUrl && (
          <div className="w-full flex flex-col items-center">
            <img 
              src={svgUrl} 
              alt="GitHub Stats" 
              className="w-full h-auto max-w-full rounded shadow-sm" 
            />
          </div>
        )}

        {!loading && !error && !svgUrl && (
          <p className="text-gray-500 text-sm">Enter a username to see preview</p>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Stats update automatically every 30 minutes
      </div>
    </div>
  );
}