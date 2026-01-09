// ============================================================================
// FILE: src/lib/svg/icons.ts
// Icon management system (VERSION CORRIGÉE)
// ============================================================================

import octicons from '@primer/octicons';

export interface IconConfig {
  path: string; // Raw SVG markup returned by Octicons (may contain multiple paths)
  viewBox: string;
  width: number;
  height: number;
}

// Mapping des stats vers les icônes Octicons
const iconNames = {
  commits: 'git-commit',
  repos: 'repo',
  prs: 'git-pull-request',
  issues: 'issue-opened',
  stars: 'star',
  followers: 'people',
} as const;

export type IconName = keyof typeof iconNames;

// Fonction pour obtenir le SVG path d'une icône
export function getIconSVG(iconName: IconName, size: 16 | 24 = 24): IconConfig {
  const octiconName = iconNames[iconName];
  const icon = octicons[octiconName];

  // Fallback : simple cercle si l'icône n'existe pas
  const fallback: IconConfig = {
    path: '<path d="M12,2 A10,10 0 1,0 22,12 A10,10 0 1,0 12,2" />',
    viewBox: '0 0 24 24',
    width: 24,
    height: 24,
  };

  if (!icon || !icon.heights) {
    return fallback;
  }

  // Octicons expose les tailles dans `heights` (16 ou 24 le plus souvent)
  const iconHeight = icon.heights[size] || icon.heights[16];
  if (!iconHeight) {
    return fallback;
  }

  const heightFromOptions = iconHeight.options?.height || size;

  return {
    // `path` contient déjà le/les éléments <path ...> complets fournis par Octicons
    path: iconHeight.path,
    viewBox: iconHeight.options?.viewBox || `0 0 ${iconHeight.width} ${heightFromOptions}`,
    width: iconHeight.options?.width || iconHeight.width,
    height: heightFromOptions,
  };
}

// Fonction pour générer le symbole SVG d'une icône
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