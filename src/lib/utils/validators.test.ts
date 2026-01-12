import { describe, it, expect } from 'vitest';
import { validateStatsParams } from './validators';

describe('validateStatsParams', () => {
    describe('valid inputs', () => {
        it('should accept valid complete params', () => {
            const result = validateStatsParams({
                user: 'octocat',
                stats: 'commits,repos,prs',
                theme: 'dark',
                bg_color: '0d1117',
                text_color: 'c9d1d9',
                icon_color: '79c0ff',
                title_color: '58a6ff',
                border_radius: 10,
                hide_border: false,
                layout: 'default',
                langs_count: 5,
                cache_seconds: 1800,
            });
            expect(result.success).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('should accept valid username with hyphens', () => {
            const result = validateStatsParams({
                user: 'my-github-user',
                stats: 'commits',
                border_radius: 0,
                hide_border: true,
                layout: 'compact',
                langs_count: 1,
                cache_seconds: 0,
            });
            expect(result.success).toBe(true);
        });

        it('should accept null color values', () => {
            const result = validateStatsParams({
                user: 'test',
                stats: 'repos',
                bg_color: null,
                text_color: null,
                border_radius: 5,
                hide_border: false,
                layout: 'grid',
                langs_count: 3,
                cache_seconds: 3600,
            });
            expect(result.success).toBe(true);
        });
    });

    describe('invalid inputs', () => {
        it('should reject empty username', () => {
            const result = validateStatsParams({
                user: '',
                stats: 'commits',
                border_radius: 10,
                hide_border: false,
                layout: 'default',
                langs_count: 5,
                cache_seconds: 1800,
            });
            expect(result.success).toBe(false);
            expect(result.error).toBeDefined();
        });

        it('should reject username with invalid characters', () => {
            const result = validateStatsParams({
                user: 'user@name',
                stats: 'commits',
                border_radius: 10,
                hide_border: false,
                layout: 'default',
                langs_count: 5,
                cache_seconds: 1800,
            });
            expect(result.success).toBe(false);
        });

        it('should reject invalid hex color', () => {
            const result = validateStatsParams({
                user: 'test',
                stats: 'commits',
                bg_color: 'GGGGGG',
                border_radius: 10,
                hide_border: false,
                layout: 'default',
                langs_count: 5,
                cache_seconds: 1800,
            });
            expect(result.success).toBe(false);
        });

        it('should reject border_radius out of range', () => {
            const result = validateStatsParams({
                user: 'test',
                stats: 'commits',
                border_radius: 25,
                hide_border: false,
                layout: 'default',
                langs_count: 5,
                cache_seconds: 1800,
            });
            expect(result.success).toBe(false);
        });

        it('should reject invalid theme', () => {
            const result = validateStatsParams({
                user: 'test',
                stats: 'commits',
                theme: 'invalid-theme',
                border_radius: 10,
                hide_border: false,
                layout: 'default',
                langs_count: 5,
                cache_seconds: 1800,
            });
            expect(result.success).toBe(false);
        });

        it('should reject langs_count out of range', () => {
            const result = validateStatsParams({
                user: 'test',
                stats: 'commits',
                border_radius: 10,
                hide_border: false,
                layout: 'default',
                langs_count: 15,
                cache_seconds: 1800,
            });
            expect(result.success).toBe(false);
        });
    });
});
