// ============================================================================
// FILE: src/components/StatsConfigurator.tsx
// Main configurator component with state management
// ============================================================================

'use client';

import { useState } from 'react';
import StatsPreview from './StatsPreview';
import CodeSnippet from './CodeSnippet';
import { Github, Settings, Palette, Code, Eye } from 'lucide-react';
import { MarkGithubIcon, RepoIcon, GitPullRequestIcon, IssueOpenedIcon, StarIcon, PeopleIcon } from '@primer/octicons-react';

const THEMES = ['dark', 'light', 'dracula', 'monokai', 'nord', 'gruvbox'];

const STATS_OPTIONS = [
  { id: 'commits', label: 'Total Commits', icon: <MarkGithubIcon /> },
  { id: 'repos', label: 'Repositories', icon: <RepoIcon /> },
  { id: 'prs', label: 'Pull Requests', icon: <GitPullRequestIcon /> },
  { id: 'issues', label: 'Issues', icon: <IssueOpenedIcon /> },
  { id: 'stars', label: 'Stars Received', icon: <StarIcon /> },
  { id: 'followers', label: 'Followers', icon: <PeopleIcon /> },
];

const LAYOUTS = [
  { id: 'default', label: 'Default' },
  { id: 'compact', label: 'Compact' },
  { id: 'horizontal', label: 'Horizontal' },
];

export default function StatsConfigurator() {
  const [username, setUsername] = useState('octocat');
  const [selectedStats, setSelectedStats] = useState(['commits', 'repos', 'prs', 'stars']);
  const [showLanguages, setShowLanguages] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [layout, setLayout] = useState('default');
  const [borderRadius, setBorderRadius] = useState(10);
  const [hideBorder, setHideBorder] = useState(false);
  const [langsCount, setLangsCount] = useState(5);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [bgColor, setBgColor] = useState('');
  const [textColor, setTextColor] = useState('');
  const [titleColor, setTitleColor] = useState('');
  const [iconColor, setIconColor] = useState('');
  const [showUsername, setShowUsername] = useState(true);

  const toggleStat = (statId: string) => {
    setSelectedStats(prev =>
      prev.includes(statId)
        ? prev.filter(id => id !== statId)
        : [...prev, statId]
    );
  };

  const config = {
    stats: showLanguages ? [...selectedStats, 'langs'] : selectedStats,
    theme,
    layout,
    showUsername,
    customization: {
      borderRadius,
      hideBorder,
      langsCount,
    },
    customColors: {
      bg: bgColor || undefined,
      text: textColor || undefined,
      title: titleColor || undefined,
      icon: iconColor || undefined,
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 pb-16">
      <div className="grid lg:grid-cols-[400px,minmax(0,1fr)] gap-8 items-start">

        <div className="space-y-6 w-full">
          <div className="bg-[#161b22] rounded-xl p-6 border border-[#30363d]">
            <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-gray-300">
              <Github className="w-4 h-4" />
              GitHub Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username..."
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-3 text-white focus:border-[#58a6ff] focus:outline-none transition"
            />
            <p className="mt-2 text-xs text-gray-500">
              Try: torvalds, octocat, gaearon, tj
            </p>
          </div>

          <div className="bg-[#161b22] rounded-xl p-6 border border-[#30363d]">
            <h3 className="flex items-center gap-2 text-sm font-semibold mb-4 text-gray-300">
              <Settings className="w-4 h-4" />
              Select Statistics
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {STATS_OPTIONS.map(stat => (
                <button
                  key={stat.id}
                  onClick={() => toggleStat(stat.id)}
                  className={`p-3 rounded-lg border transition text-left ${selectedStats.includes(stat.id)
                    ? 'border-[#58a6ff] bg-[#58a6ff]/10'
                    : 'border-[#30363d] bg-[#0d1117] hover:border-gray-500'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{stat.icon}</span>
                    <span className="text-sm font-medium text-gray-300">{stat.label}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#30363d] space-y-3">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition">Show Top Languages</span>
                <input
                  type="checkbox"
                  checked={showLanguages}
                  onChange={(e) => setShowLanguages(e.target.checked)}
                  className="w-5 h-5 rounded border-[#30363d] bg-[#0d1117] text-[#58a6ff] focus:ring-[#58a6ff]"
                />
              </label>
            </div>
          </div>

          <div className="bg-[#161b22] rounded-xl p-6 border border-[#30363d]">
            <h3 className="flex items-center gap-2 text-sm font-semibold mb-4 text-gray-300">
              <Palette className="w-4 h-4" />
              Choose Theme
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {THEMES.map(themeName => (
                <button
                  key={themeName}
                  onClick={() => setTheme(themeName)}
                  className={`p-3 rounded-lg border transition capitalize ${theme === themeName
                    ? 'border-[#58a6ff] bg-[#58a6ff]/10 text-white'
                    : 'border-[#30363d] bg-[#0d1117] hover:border-gray-500 text-gray-400'
                    }`}
                >
                  <span className="text-sm font-medium">{themeName}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#161b22] rounded-xl p-6 border border-[#30363d]">
            <h3 className="text-sm font-semibold mb-4 text-gray-300">
              Layout
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {LAYOUTS.map(l => (
                <button
                  key={l.id}
                  onClick={() => setLayout(l.id)}
                  className={`p-2 rounded-lg border transition text-sm ${layout === l.id
                    ? 'border-[#58a6ff] bg-[#58a6ff]/10 text-white'
                    : 'border-[#30363d] bg-[#0d1117] hover:border-gray-500 text-gray-400'
                    }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#161b22] rounded-xl p-6 border border-[#30363d]">
            <h3 className="flex items-center gap-2 text-sm font-semibold mb-4 text-gray-300">
              <Palette className="w-4 h-4" />
              Custom Colors
            </h3>
            <p className="text-xs text-gray-500 mb-4">Override theme colors with custom hex values</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Background</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={bgColor || '#0d1117'}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded border border-[#30363d] bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    placeholder="#0d1117"
                    className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-sm text-white focus:border-[#58a6ff] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Text</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={textColor || '#c9d1d9'}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-10 h-10 rounded border border-[#30363d] bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    placeholder="#c9d1d9"
                    className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-sm text-white focus:border-[#58a6ff] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Title</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={titleColor || '#58a6ff'}
                    onChange={(e) => setTitleColor(e.target.value)}
                    className="w-10 h-10 rounded border border-[#30363d] bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={titleColor}
                    onChange={(e) => setTitleColor(e.target.value)}
                    placeholder="#58a6ff"
                    className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-sm text-white focus:border-[#58a6ff] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Icons</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={iconColor || '#79c0ff'}
                    onChange={(e) => setIconColor(e.target.value)}
                    className="w-10 h-10 rounded border border-[#30363d] bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={iconColor}
                    onChange={(e) => setIconColor(e.target.value)}
                    placeholder="#79c0ff"
                    className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-sm text-white focus:border-[#58a6ff] focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => { setBgColor(''); setTextColor(''); setTitleColor(''); setIconColor(''); }}
              className="mt-3 text-xs text-gray-500 hover:text-gray-300 transition"
            >
              Reset to theme defaults
            </button>
          </div>

          <div className="bg-[#161b22] rounded-xl p-6 border border-[#30363d]">
            <h3 className="text-sm font-semibold mb-4 text-gray-300">
              Advanced Options
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 mb-2 block">
                  Border Radius: {borderRadius}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                  className="w-full accent-[#58a6ff]"
                />
              </div>

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition">Hide Border</span>
                <input
                  type="checkbox"
                  checked={hideBorder}
                  onChange={(e) => setHideBorder(e.target.checked)}
                  className="w-5 h-5 rounded border-[#30363d] bg-[#0d1117] text-[#58a6ff] focus:ring-[#58a6ff]"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition">Show Username (@handle)</span>
                <input
                  type="checkbox"
                  checked={showUsername}
                  onChange={(e) => setShowUsername(e.target.checked)}
                  className="w-5 h-5 rounded border-[#30363d] bg-[#0d1117] text-[#58a6ff] focus:ring-[#58a6ff]"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6 w-full min-w-0">
          <div className="flex gap-2 bg-[#161b22] p-2 rounded-lg border border-[#30363d]">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition ${activeTab === 'preview'
                ? 'bg-[#238636] text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-[#21262d]'
                }`}
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition ${activeTab === 'code'
                ? 'bg-[#238636] text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-[#21262d]'
                }`}
            >
              <Code className="w-4 h-4" />
              Markdown
            </button>
          </div>

          <div className="bg-[#161b22] rounded-xl border border-[#30363d] overflow-hidden w-full">
            <div className={activeTab === 'preview' ? 'block' : 'hidden'}>
              <StatsPreview username={username} config={config} />
            </div>
            <div className={activeTab === 'code' ? 'block' : 'hidden'}>
              <CodeSnippet username={username} config={config} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}