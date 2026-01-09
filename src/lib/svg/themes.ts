// ============================================================================
// FILE: src/lib/svg/themes.ts
// Predefined color themes
// ============================================================================

export interface Theme {
  bg: string;
  text: string;
  title: string;
  icon: string;
  border: string;
  statBg: string;
}

export const themes: Record<string, Theme> = {
  dark: {
    bg: '#0d1117',
    text: '#c9d1d9',
    title: '#58a6ff',
    icon: '#79c0ff',
    border: '#30363d',
    statBg: '#161b22'
  },
  light: {
    bg: '#ffffff',
    text: '#24292f',
    title: '#0969da',
    icon: '#1f6feb',
    border: '#d0d7de',
    statBg: '#f6f8fa'
  },
  dracula: {
    bg: '#282a36',
    text: '#f8f8f2',
    title: '#ff79c6',
    icon: '#bd93f9',
    border: '#6272a4',
    statBg: '#44475a'
  },
  monokai: {
    bg: '#272822',
    text: '#f8f8f2',
    title: '#66d9ef',
    icon: '#a6e22e',
    border: '#75715e',
    statBg: '#3e3d32'
  },
  nord: {
    bg: '#2e3440',
    text: '#d8dee9',
    title: '#88c0d0',
    icon: '#81a1c1',
    border: '#4c566a',
    statBg: '#3b4252'
  },
  gruvbox: {
    bg: '#282828',
    text: '#ebdbb2',
    title: '#fabd2f',
    icon: '#b8bb26',
    border: '#504945',
    statBg: '#3c3836'
  }
};