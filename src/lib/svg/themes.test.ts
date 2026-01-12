import { describe, it, expect } from 'vitest';
import { themes, Theme } from './themes';

describe('themes', () => {
    const requiredProperties: (keyof Theme)[] = [
        'bg',
        'text',
        'title',
        'icon',
        'border',
        'statBg',
    ];

    const themeNames = ['dark', 'light', 'dracula', 'monokai', 'nord', 'gruvbox'];

    describe('theme availability', () => {
        it.each(themeNames)('should have %s theme defined', (themeName: string) => {
            expect(themes[themeName]).toBeDefined();
        });
    });

    describe('theme structure', () => {
        it.each(themeNames)(
            '%s theme should have all required properties',
            (themeName: string) => {
                const theme = themes[themeName];
                requiredProperties.forEach((prop) => {
                    expect(theme[prop]).toBeDefined();
                    expect(typeof theme[prop]).toBe('string');
                });
            }
        );
    });

    describe('color format validation', () => {
        const hexColorRegex = /^#[0-9a-fA-F]{6}$/;

        it.each(themeNames)(
            '%s theme colors should be valid hex format',
            (themeName: string) => {
                const theme = themes[themeName];
                requiredProperties.forEach((prop) => {
                    expect(theme[prop]).toMatch(hexColorRegex);
                });
            }
        );
    });

    describe('specific theme values', () => {
        it('dark theme should have dark background', () => {
            expect(themes.dark.bg).toBe('#0d1117');
        });

        it('light theme should have light background', () => {
            expect(themes.light.bg).toBe('#ffffff');
        });

        it('dracula theme should have correct purple accent', () => {
            expect(themes.dracula.icon).toBe('#bd93f9');
        });
    });
});
