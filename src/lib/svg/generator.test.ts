import { describe, it, expect } from 'vitest';
import {
    formatNumber,
    escapeXml,
    calculateHeight,
    getTheme,
    SVGParams,
} from './generator';

describe('formatNumber', () => {
    it('should format numbers less than 1000 with commas', () => {
        expect(formatNumber(0)).toBe('0');
        expect(formatNumber(100)).toBe('100');
        expect(formatNumber(999)).toBe('999');
    });

    it('should format thousands with k suffix', () => {
        expect(formatNumber(1000)).toBe('1.0k');
        expect(formatNumber(1500)).toBe('1.5k');
        expect(formatNumber(9999)).toBe('10.0k');
        expect(formatNumber(50000)).toBe('50.0k');
        expect(formatNumber(999999)).toBe('1000.0k');
    });

    it('should format millions with M suffix', () => {
        expect(formatNumber(1000000)).toBe('1.0M');
        expect(formatNumber(1500000)).toBe('1.5M');
        expect(formatNumber(10000000)).toBe('10.0M');
    });
});

describe('escapeXml', () => {
    it('should escape ampersand', () => {
        expect(escapeXml('Tom & Jerry')).toBe('Tom &amp; Jerry');
    });

    it('should escape less than and greater than', () => {
        expect(escapeXml('<script>')).toBe('&lt;script&gt;');
    });

    it('should escape quotes', () => {
        expect(escapeXml('"hello"')).toBe('&quot;hello&quot;');
        expect(escapeXml("'hello'")).toBe('&apos;hello&apos;');
    });

    it('should handle null and undefined', () => {
        expect(escapeXml(null)).toBe('');
        expect(escapeXml(undefined)).toBe('');
    });

    it('should convert non-string values to string', () => {
        expect(escapeXml(123)).toBe('123');
        expect(escapeXml(true)).toBe('true');
    });

    it('should escape multiple special characters', () => {
        expect(escapeXml('<a href="test">&</a>')).toBe(
            '&lt;a href=&quot;test&quot;&gt;&amp;&lt;/a&gt;'
        );
    });
});

describe('calculateHeight', () => {
    const headerH = 90;
    const rowH = 65;
    const langH = 200;

    it('should calculate height for zero stats without languages', () => {
        const height = calculateHeight(0, false, headerH, rowH, langH);
        expect(height).toBe(90 + 0 + 20);
    });

    it('should calculate height for 1 stat without languages', () => {
        const height = calculateHeight(1, false, headerH, rowH, langH);
        expect(height).toBe(90 + 1 * (50 + 15) + 20);
    });

    it('should calculate height for 2 stats (single row) without languages', () => {
        const height = calculateHeight(2, false, headerH, rowH, langH);
        expect(height).toBe(90 + 1 * (50 + 15) + 20);
    });

    it('should calculate height for 3 stats (two rows) without languages', () => {
        const height = calculateHeight(3, false, headerH, rowH, langH);
        expect(height).toBe(90 + 2 * (50 + 15) + 20);
    });

    it('should calculate height with languages section', () => {
        const height = calculateHeight(2, true, headerH, rowH, langH);
        expect(height).toBe(90 + 1 * (50 + 15) + 200);
    });

    it('should calculate height for 6 stats with languages', () => {
        const height = calculateHeight(6, true, headerH, rowH, langH);
        expect(height).toBe(90 + 3 * (50 + 15) + 200);
    });
});

describe('getTheme', () => {
    it('should return dark theme by default', () => {
        const params: SVGParams = {
            theme: 'dark',
            border_radius: 10,
            hide_border: false,
            layout: 'default',
            stats: 'commits',
        };
        const theme = getTheme(params);
        expect(theme.bg).toBe('#0d1117');
        expect(theme.title).toBe('#58a6ff');
    });

    it('should return light theme', () => {
        const params: SVGParams = {
            theme: 'light',
            border_radius: 10,
            hide_border: false,
            layout: 'default',
            stats: 'commits',
        };
        const theme = getTheme(params);
        expect(theme.bg).toBe('#ffffff');
    });

    it('should fall back to dark theme for invalid theme', () => {
        const params: SVGParams = {
            theme: 'invalid-theme',
            border_radius: 10,
            hide_border: false,
            layout: 'default',
            stats: 'commits',
        };
        const theme = getTheme(params);
        expect(theme.bg).toBe('#0d1117');
    });

    it('should override bg_color when provided', () => {
        const params: SVGParams = {
            theme: 'dark',
            bg_color: '#ff0000',
            border_radius: 10,
            hide_border: false,
            layout: 'default',
            stats: 'commits',
        };
        const theme = getTheme(params);
        expect(theme.bg).toBe('#ff0000');
    });

    it('should override all custom colors when provided', () => {
        const params: SVGParams = {
            theme: 'dark',
            bg_color: '#111111',
            text_color: '#222222',
            title_color: '#333333',
            icon_color: '#444444',
            border_radius: 10,
            hide_border: false,
            layout: 'default',
            stats: 'commits',
        };
        const theme = getTheme(params);
        expect(theme.bg).toBe('#111111');
        expect(theme.text).toBe('#222222');
        expect(theme.title).toBe('#333333');
        expect(theme.icon).toBe('#444444');
    });
});
