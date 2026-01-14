// ============================================================================
// FILE: src/lib/svg/generator.ts (MODERNIZED & FIXED)
// ============================================================================

import { GitHubStats } from '../github/client';
import { themes, Theme } from './themes';
import { generateIconSymbol, IconName } from './icons';

export interface SVGParams {
  theme: string;
  bg_color?: string;
  text_color?: string;
  icon_color?: string;
  title_color?: string;
  border_radius: number;
  hide_border: boolean;
  layout: string;
  stats: string;
  hide_username?: boolean;
}

interface StatConfig {
  id: string;
  label: string;
  icon: IconName;
  value: number;
}

export function generateStatsSVG(data: GitHubStats, params: SVGParams): string {
  const theme = getTheme(params);

  const statsStr = params.stats || "commits,repos,prs,issues,stars";
  const statsToShow = statsStr.split(',').filter(Boolean);
  const showLanguages = statsToShow.includes('langs');

  const statConfigs: StatConfig[] = [
    { id: 'commits', label: 'Commits', icon: 'commits', value: data.totalCommits },
    { id: 'repos', label: 'Repositories', icon: 'repos', value: data.totalRepos },
    { id: 'prs', label: 'Pull Requests', icon: 'prs', value: data.totalPRs },
    { id: 'issues', label: 'Issues', icon: 'issues', value: data.totalIssues },
    { id: 'stars', label: 'Stars', icon: 'stars', value: data.totalStars },
    { id: 'followers', label: 'Followers', icon: 'followers', value: data.followers },
  ];

  const displayStats = statConfigs.filter(stat => statsToShow.includes(stat.id));

  const layout = params.layout || 'default';

  if (layout === 'compact') {
    return generateCompactLayout(data, params, theme, displayStats, showLanguages);
  } else if (layout === 'horizontal') {
    return generateHorizontalLayout(data, params, theme, displayStats, showLanguages);
  }

  return generateDefaultLayout(data, params, theme, displayStats, showLanguages);
}

function generateDefaultLayout(
  data: GitHubStats,
  params: SVGParams,
  theme: Theme,
  displayStats: StatConfig[],
  showLanguages: boolean
): string {
  const CARD_PADDING = 20;
  const HEADER_HEIGHT = params.hide_username ? 70 : 90;
  const STAT_ROW_HEIGHT = 65;
  const LANG_SECTION_HEIGHT = 200;

  const height = calculateHeight(displayStats.length, showLanguages, HEADER_HEIGHT, STAT_ROW_HEIGHT, LANG_SECTION_HEIGHT);
  const borderStyle = params.hide_border ? '' : `stroke="${theme.border}" stroke-width="1" stroke-opacity="0.5"`;

  const svg = `
<svg width="480" height="${height}" viewBox="0 0 480 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .container { 
        font-family: 'Mona Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; 
      }
      
      .title { font-size: 20px; font-weight: 700; fill: ${theme.title}; }
      .subtitle { font-size: 14px; font-weight: 400; fill: ${theme.text}; opacity: 0.8; }
      
      .stat-card-bg { fill: ${theme.statBg}; opacity: 0.5; }
      .stat-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; fill: ${theme.text}; opacity: 0.7; }
      .stat-value { font-size: 18px; font-weight: 700; fill: ${theme.title}; }
      
      .lang-label { font-size: 12px; font-weight: 600; fill: ${theme.text}; }
      .lang-percent { font-size: 12px; font-weight: 400; fill: ${theme.text}; opacity: 0.7; }
      
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      .animate-fade { animation: fadeIn 0.5s ease-out forwards; }
    </style>
    ${getIconDefs(displayStats, theme)}
  </defs>

  <rect width="480" height="${height}" fill="${theme.bg}" rx="${params.border_radius}" ${borderStyle}/>

  <g class="container animate-fade">
    <g transform="translate(${CARD_PADDING}, 35)">
      <text x="0" y="0" class="title" dominant-baseline="hanging">
        ${escapeXml(data.user.name || data.user.login)}
      </text>
      ${!params.hide_username ? `<text x="0" y="28" class="subtitle" dominant-baseline="hanging">
        @${escapeXml(data.user.login)}
      </text>` : ''}
    </g>

    ${renderStatsGrid(displayStats, theme, HEADER_HEIGHT)}

    ${showLanguages ? renderLanguages(data.languages, theme, displayStats.length, HEADER_HEIGHT, STAT_ROW_HEIGHT) : ''}
  </g>
</svg>
  `.trim();

  return svg;
}

function generateCompactLayout(
  data: GitHubStats,
  params: SVGParams,
  theme: Theme,
  displayStats: StatConfig[],
  showLanguages: boolean
): string {
  const CARD_PADDING = 16;
  const HEADER_HEIGHT = params.hide_username ? 50 : 65;
  const STAT_HEIGHT = 36;
  const LANG_SECTION_HEIGHT = 150;

  const statsHeight = displayStats.length * STAT_HEIGHT;
  const langsHeight = showLanguages ? LANG_SECTION_HEIGHT : 0;
  const height = HEADER_HEIGHT + statsHeight + langsHeight + CARD_PADDING;

  const borderStyle = params.hide_border ? '' : `stroke="${theme.border}" stroke-width="1" stroke-opacity="0.5"`;

  const svg = `
<svg width="320" height="${height}" viewBox="0 0 320 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .container { 
        font-family: 'Mona Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; 
      }
      
      .title { font-size: 16px; font-weight: 700; fill: ${theme.title}; }
      .subtitle { font-size: 12px; font-weight: 400; fill: ${theme.text}; opacity: 0.8; }
      
      .stat-label { font-size: 12px; font-weight: 500; fill: ${theme.text}; }
      .stat-value { font-size: 14px; font-weight: 700; fill: ${theme.title}; }
      
      .lang-label { font-size: 11px; font-weight: 600; fill: ${theme.text}; }
      .lang-percent { font-size: 11px; font-weight: 400; fill: ${theme.text}; opacity: 0.7; }
      
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      .animate-fade { animation: fadeIn 0.5s ease-out forwards; }
    </style>
    ${getIconDefs(displayStats, theme)}
  </defs>

  <rect width="320" height="${height}" fill="${theme.bg}" rx="${params.border_radius}" ${borderStyle}/>

  <g class="container animate-fade">
    <g transform="translate(${CARD_PADDING}, 20)">
      <text x="0" y="0" class="title" dominant-baseline="hanging">
        ${escapeXml(data.user.name || data.user.login)}
      </text>
      ${!params.hide_username ? `<text x="0" y="22" class="subtitle" dominant-baseline="hanging">
        @${escapeXml(data.user.login)}
      </text>` : ''}
    </g>

    ${displayStats.map((stat, index) => {
    const y = HEADER_HEIGHT + index * STAT_HEIGHT;
    return `
      <g transform="translate(${CARD_PADDING}, ${y})">
        <use href="#icon-${stat.icon}" width="16" height="16" y="2"/>
        <text x="24" y="12" class="stat-label" dominant-baseline="middle">${stat.label}</text>
        <text x="288" y="12" class="stat-value" text-anchor="end" dominant-baseline="middle">${formatNumber(stat.value)}</text>
      </g>`;
  }).join('')}

    ${showLanguages ? renderCompactLanguages(data.languages, theme, HEADER_HEIGHT + statsHeight + 10) : ''}
  </g>
</svg>
  `.trim();

  return svg;
}

function generateHorizontalLayout(
  data: GitHubStats,
  params: SVGParams,
  theme: Theme,
  displayStats: StatConfig[],
  showLanguages: boolean
): string {
  const CARD_PADDING = 20;
  const HEADER_HEIGHT = params.hide_username ? 55 : 70;
  const STATS_HEIGHT = 60;
  const LANG_SECTION_HEIGHT = showLanguages ? 150 : 0;

  const statWidth = Math.min(120, (600 - 2 * CARD_PADDING) / displayStats.length);
  const cardWidth = Math.max(480, displayStats.length * statWidth + 2 * CARD_PADDING);
  const height = HEADER_HEIGHT + STATS_HEIGHT + LANG_SECTION_HEIGHT + CARD_PADDING;

  const borderStyle = params.hide_border ? '' : `stroke="${theme.border}" stroke-width="1" stroke-opacity="0.5"`;

  const svg = `
<svg width="${cardWidth}" height="${height}" viewBox="0 0 ${cardWidth} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .container { 
        font-family: 'Mona Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; 
      }
      
      .title { font-size: 18px; font-weight: 700; fill: ${theme.title}; }
      .subtitle { font-size: 13px; font-weight: 400; fill: ${theme.text}; opacity: 0.8; }
      
      .stat-card-bg { fill: ${theme.statBg}; opacity: 0.5; }
      .stat-label { font-size: 9px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; fill: ${theme.text}; opacity: 0.7; }
      .stat-value { font-size: 20px; font-weight: 700; fill: ${theme.title}; }
      
      .lang-label { font-size: 11px; font-weight: 600; fill: ${theme.text}; }
      .lang-percent { font-size: 11px; font-weight: 400; fill: ${theme.text}; opacity: 0.7; }
      
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      .animate-fade { animation: fadeIn 0.5s ease-out forwards; }
    </style>
    ${getIconDefs(displayStats, theme)}
  </defs>

  <rect width="${cardWidth}" height="${height}" fill="${theme.bg}" rx="${params.border_radius}" ${borderStyle}/>

  <g class="container animate-fade">
    <g transform="translate(${CARD_PADDING}, 25)">
      <text x="0" y="0" class="title" dominant-baseline="hanging">
        ${escapeXml(data.user.name || data.user.login)}
      </text>
      ${!params.hide_username ? `<text x="0" y="24" class="subtitle" dominant-baseline="hanging">
        @${escapeXml(data.user.login)}
      </text>` : ''}
    </g>

    <g transform="translate(${CARD_PADDING}, ${HEADER_HEIGHT})">
      ${displayStats.map((stat, index) => {
    const x = index * statWidth;
    return `
        <g transform="translate(${x}, 0)">
          <text x="${statWidth / 2}" y="0" class="stat-label" text-anchor="middle" dominant-baseline="hanging">${stat.label}</text>
          <text x="${statWidth / 2}" y="20" class="stat-value" text-anchor="middle" dominant-baseline="hanging">${formatNumber(stat.value)}</text>
        </g>`;
  }).join('')}
    </g>

    ${showLanguages ? renderHorizontalLanguages(data.languages, theme, HEADER_HEIGHT + STATS_HEIGHT, cardWidth - 2 * CARD_PADDING) : ''}
  </g>
</svg>
  `.trim();

  return svg;
}

function renderCompactLanguages(languages: any[], theme: Theme, startY: number): string {
  return `
  <g transform="translate(16, ${startY})">
    <text x="0" y="0" class="title" style="font-size: 14px;">Top Languages</text>
    
    ${languages.slice(0, 5).map((lang, index) => {
    const yPos = 25 + (index * 22);
    return `
      <g transform="translate(0, ${yPos})">
        <rect x="0" y="-4" width="${Math.max(6, 1.8 * lang.percentage)}" height="6" rx="3" fill="${lang.color}"/>
        <text x="200" y="0" class="lang-label" text-anchor="end" dominant-baseline="middle">${escapeXml(lang.name)}</text>
        <text x="288" y="0" class="lang-percent" text-anchor="end" dominant-baseline="middle">${lang.percentage.toFixed(1)}%</text>
      </g>`;
  }).join('')}
  </g>`;
}

function renderHorizontalLanguages(languages: any[], theme: Theme, startY: number, maxWidth: number): string {
  return `
  <g transform="translate(20, ${startY})">
    <text x="0" y="0" class="title" style="font-size: 14px;">Top Languages</text>
    
    <g transform="translate(0, 25)">
      <rect x="0" y="0" width="${maxWidth}" height="8" rx="4" fill="${theme.text}" fill-opacity="0.1"/>
      ${languages.slice(0, 5).reduce((acc, lang, index) => {
    const prevWidth = acc.totalWidth;
    const width = (lang.percentage / 100) * maxWidth;
    acc.totalWidth += width;
    acc.bars += `<rect x="${prevWidth}" y="0" width="${width}" height="8" ${index === 0 ? 'rx="4"' : ''} fill="${lang.color}"/>`;
    return acc;
  }, { bars: '', totalWidth: 0 }).bars}
    </g>
    
    <g transform="translate(0, 45)">
      ${languages.slice(0, 5).map((lang, index) => {
    const x = index * (maxWidth / 5);
    return `
        <g transform="translate(${x}, 0)">
          <rect x="0" y="0" width="8" height="8" rx="2" fill="${lang.color}"/>
          <text x="12" y="4" class="lang-label" dominant-baseline="middle">${escapeXml(lang.name)}</text>
        </g>`;
  }).join('')}
    </g>
  </g>`;
}

function renderStatsGrid(stats: StatConfig[], theme: Theme, startY: number): string {
  return stats.map((stat, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);

    const gap = 15;
    const width = 212;
    const height = 50;

    const x = 20 + col * (width + gap);
    const y = startY + row * (height + gap);

    return `
    <g transform="translate(${x}, ${y})">
      <rect width="${width}" height="${height}" rx="6" class="stat-card-bg"/>
      
      <g transform="translate(12, 15)">
        <use href="#icon-${stat.icon}" width="20" height="20"/>
      </g>
      
      <text x="44" y="19" class="stat-label" dominant-baseline="middle">
        ${stat.label}
      </text>
      
      <text x="${width - 15}" y="35" class="stat-value" text-anchor="end" dominant-baseline="middle">
        ${formatNumber(stat.value)}
      </text>
      
      </g>`;
  }).join('');
}

function renderLanguages(languages: any[], theme: Theme, statsCount: number, headerH: number, rowH: number): string {
  const rows = Math.ceil(statsCount / 2);
  const gap = 15;
  const startY = headerH + (rows * (50 + gap)) + 15;

  return `
  <g transform="translate(20, ${startY})">
    <text x="0" y="0" class="title" style="font-size: 16px;">Top Languages</text>
    
    ${languages.slice(0, 5).map((lang, index) => {
    const yPos = 35 + (index * 28);
    return `
      <g transform="translate(0, ${yPos})">
        <text x="0" y="0" class="lang-label" dominant-baseline="middle">${escapeXml(lang.name)}</text>
        
        <rect x="100" y="-4" width="250" height="8" rx="4" fill="${theme.text}" fill-opacity="0.1"/>
        
        <rect x="100" y="-4" width="${Math.max(8, 2.5 * lang.percentage)}" height="8" rx="4" fill="${lang.color}"/>
        
        <text x="400" y="1" class="lang-percent" text-anchor="end" dominant-baseline="middle">
          ${lang.percentage.toFixed(1)}%
        </text>
      </g>`;
  }).join('')}
  </g>`;
}

export function getTheme(params: SVGParams): Theme {
  const baseTheme = themes[params.theme] || themes.dark;
  return {
    bg: params.bg_color || baseTheme.bg,
    text: params.text_color || baseTheme.text,
    title: params.title_color || baseTheme.title,
    icon: params.icon_color || baseTheme.icon,
    border: baseTheme.border,
    statBg: baseTheme.statBg
  };
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function escapeXml(unsafe: any): string {
  if (unsafe === null || unsafe === undefined) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function calculateHeight(statsCount: number, showLanguages: boolean, headerH: number, rowH: number, langH: number): number {
  const rows = Math.ceil(statsCount / 2);
  const gap = 15;
  let height = headerH + (rows * (50 + gap));

  if (showLanguages) {
    height += langH;
  } else {
    height += 20;
  }

  return height;
}

function getIconDefs(stats: StatConfig[], theme: Theme): string {
  const uniqueIcons = Array.from(new Set(stats.map(s => s.icon)));
  return uniqueIcons.map(iconName =>
    generateIconSymbol(iconName, iconName, theme.icon)
  ).join('');
}