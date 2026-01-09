// ============================================================================
// FILE: src/app/api/preview/route.ts
// Preview API endpoint with Caching (Fixed)
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { fetchGitHubStats } from '@/lib/github/client';
import { generateStatsSVG } from '@/lib/svg/generator';
import { rateLimiter } from '@/lib/utils/rate-limiter';
import { getCachedData, setCachedData } from '@/lib/cache';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    const rateLimitResult = await rateLimiter.check(clientIP);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { user, config } = body;

    if (!user || typeof user !== 'string') {
      return NextResponse.json(
        { error: 'Invalid username' },
        { status: 400 }
      );
    }

    // 2. Cache Strategy
    // On ne cache que les DONNÉES brutes (le JSON de GitHub).
    // Le SVG, lui, est regénéré à chaque fois car il dépend du thème (rapide et gratuit).
    const includeLanguages = config.stats?.includes('langs') ?? true;
    const cacheKey = `preview-data:${user}:${includeLanguages}`;
    
    let githubData: any = null;

    // TENTATIVE DE LECTURE DU CACHE
    const cachedJson = await getCachedData(cacheKey);

    if (cachedJson) {
      // HIT: On a trouvé les données, on évite l'appel API GitHub
      githubData = JSON.parse(cachedJson);
    } else {
      // MISS: On doit appeler GitHub (c'est là que le log "Fetching..." apparaîtra 1 seule fois)
      githubData = await fetchGitHubStats(user, {
        includeLanguages: includeLanguages,
        languageCount: config.customization?.langsCount ?? 5
      });

      if (!githubData) {
        return NextResponse.json(
          { error: `User "${user}" not found` },
          { status: 404 }
        );
      }

      // On sauvegarde pour la prochaine fois (TTL 30 min)
      await setCachedData(cacheKey, JSON.stringify(githubData), 1800);
    }

    // 3. Generate SVG
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
    
    // Convert SVG to base64 data URL (Edge compatible method)
    // Buffer n'est pas recommandé en Edge, on utilise btoa standard
    const base64 = btoa(unescape(encodeURIComponent(svgContent)));
    const svgDataUrl = `data:image/svg+xml;base64,${base64}`;

    // Generate markdown snippet for display
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://github-stats.yourdomain.dev';
    const statsParam = config.stats?.join(',') || 'commits,repos,langs';
    
    // Construction propre de l'URL pour le snippet
    const queryParams = new URLSearchParams({
      user: user,
      theme: config.theme || 'dark',
      stats: statsParam
    });
    
    if (config.customization?.hideBorder) queryParams.append('hide_border', 'true');
    if (config.customization?.borderRadius !== 10) queryParams.append('border_radius', String(config.customization.borderRadius));

    const markdownUrl = `${baseUrl}/api/stats?${queryParams.toString()}`;
    const markdown = `![GitHub Stats](${markdownUrl})`;

    return NextResponse.json({
      success: true,
      svgUrl: svgDataUrl,
      markdown,
      data: {
        commits: githubData.totalCommits,
        repos: githubData.totalRepos,
        prs: githubData.totalPRs,
        issues: githubData.totalIssues,
        stars: githubData.totalStars,
        followers: githubData.followers,
        languages: githubData.languages
      }
    });

  } catch (error) {
    console.error('Preview API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}