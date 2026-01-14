// ============================================================================
// FILE: src/app/api/stats/route.ts
// Main API endpoint for generating GitHub stats SVG
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { fetchGitHubStats } from '@/lib/github/client';
import { generateStatsSVG } from '@/lib/svg/generator';
import { getCachedData, setCachedData } from '@/lib/cache';
import { validateStatsParams } from '@/lib/utils/validators';
import { rateLimiter } from '@/lib/utils/rate-limiter';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    const searchParams = request.nextUrl.searchParams;
    const params = {
      user: searchParams.get('user') || '',
      stats: searchParams.get('stats') || 'commits,repos,langs',
      theme: searchParams.get('theme') || 'dark',
      bg_color: searchParams.get('bg_color') ?? undefined,
      text_color: searchParams.get('text_color') ?? undefined,
      icon_color: searchParams.get('icon_color') ?? undefined,
      title_color: searchParams.get('title_color') ?? undefined,
      border_radius: parseInt(searchParams.get('border_radius') || '10'),
      hide_border: searchParams.get('hide_border') === 'true',
      hide_username: searchParams.get('hide_username') === 'true',
      layout: searchParams.get('layout') || 'default',
      langs_count: parseInt(searchParams.get('langs_count') || '5'),
      cache_seconds: parseInt(searchParams.get('cache') || '1800'),
    };

    const validation = validateStatsParams(params);
    if (!validation.success) {
      return new NextResponse(
        generateErrorSVG('Invalid parameters: ' + validation.error),
        {
          status: 400,
          headers: { 'Content-Type': 'image/svg+xml' }
        }
      );
    }

    const clientIP = request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const rateLimitResult = await rateLimiter.check(clientIP);
    if (!rateLimitResult.allowed) {
      return new NextResponse(
        generateErrorSVG(`Rate limit exceeded. Try again in ${Math.ceil(rateLimitResult.resetIn / 1000)}s`),
        {
          status: 429,
          headers: {
            'Content-Type': 'image/svg+xml',
            'X-RateLimit-Limit': '60',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(Date.now() + rateLimitResult.resetIn).toISOString()
          }
        }
      );
    }

    const cacheKey = `stats:${params.user}:${JSON.stringify(params)}`;

    let svgContent = await getCachedData(cacheKey);

    if (!svgContent) {
      const githubData = await fetchGitHubStats(params.user, {
        includeLanguages: params.stats.includes('langs'),
        languageCount: params.langs_count
      });

      if (!githubData) {
        return new NextResponse(
          generateErrorSVG(`User "${params.user}" not found`),
          {
            status: 404,
            headers: { 'Content-Type': 'image/svg+xml' }
          }
        );
      }

      svgContent = generateStatsSVG(githubData, params);

      await setCachedData(cacheKey, svgContent, params.cache_seconds);
    }

    const responseTime = Date.now() - startTime;

    return new NextResponse(svgContent, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': `public, max-age=${params.cache_seconds}, stale-while-revalidate=${params.cache_seconds * 2}`,
        'X-Response-Time': `${responseTime}ms`,
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff'
      }
    });

  } catch (error) {
    console.error('Stats API Error:', error);

    return new NextResponse(
      generateErrorSVG('Internal server error. Please try again.'),
      {
        status: 500,
        headers: { 'Content-Type': 'image/svg+xml' }
      }
    );
  }
}

function generateErrorSVG(message: string): string {
  return `
    <svg width="500" height="120" xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="120" fill="#1a1b27" rx="10"/>
      <rect width="500" height="120" fill="none" stroke="#d73a4a" stroke-width="2" rx="10"/>
      <text x="250" y="60" text-anchor="middle" fill="#d73a4a" font-size="16" font-weight="bold">
        ⚠️ Error
      </text>
      <text x="250" y="85" text-anchor="middle" fill="#e0e0e0" font-size="12">
        ${message}
      </text>
    </svg>
  `.trim();
}