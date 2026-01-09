// ============================================================================
// FILE: src/lib/svg/icons.ts
// Icon management system (VERSION CORRIGÉE)
// ============================================================================

import octicons from '@primer/octicons';

export interface IconConfig {
  path: string;
  viewBox: string;
  width: number;
  height: number;
}

const iconNames = {
  commits: 'git-commit',
  repos: 'repo',
  prs: 'git-pull-request',
  issues: 'issue-opened',
  stars: 'star',
  followers: 'people',
} as const;

export type IconName = keyof typeof iconNames;

export function getIconSVG(iconName: IconName, size: 16 | 24 = 24): IconConfig {
  const octiconName = iconNames[iconName];
  const icon = octicons[octiconName];

  const fallback: IconConfig = {
    path: '<path d="M12,2 A10,10 0 1,0 22,12 A10,10 0 1,0 12,2" />',
    viewBox: '0 0 24 24',
    width: 24,
    height: 24,
  };

  if (!icon || !icon.heights) {
    return fallback;
  }

  const iconHeight = icon.heights[size] || icon.heights[16];
  if (!iconHeight) {
    return fallback;
  }

  const heightFromOptions = iconHeight.options?.height || size;

  return {
    path: iconHeight.path,
    viewBox: iconHeight.options?.viewBox || `0 0 ${iconHeight.width} ${heightFromOptions}`,
    width: iconHeight.options?.width || iconHeight.width,
    height: heightFromOptions,
  };
}

export function generateIconSymbol(id: string, iconName: IconName, color: string): string {
  const iconSVG = getIconSVG(iconName, 24);

  return `
    <symbol id="icon-${id}" viewBox="${iconSVG.viewBox}">
      <g fill="${color}" stroke="none">
        ${iconSVG.path}
      </g>
    </symbol>
  `;
}