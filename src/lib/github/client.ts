// ============================================================================
// FILE: src/lib/github/client.ts
// GitHub GraphQL API client
// ============================================================================

import { graphql } from '@octokit/graphql';

const githubClient = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

export interface GitHubStats {
  user: {
    name: string;
    login: string;
    avatarUrl: string;
    createdAt: string;
  };
  totalCommits: number;
  totalRepos: number;
  totalPRs: number;
  totalIssues: number;
  totalStars: number;
  followers: number;
  following: number;
  languages: Array<{
    name: string;
    color: string;
    percentage: number;
    size: number;
  }>;
  contributionStreak: number;
}

export async function fetchGitHubStats(
  username: string,
  options: { includeLanguages?: boolean; languageCount?: number } = {}
): Promise<GitHubStats | null> {
  const { includeLanguages = true, languageCount = 5 } = options;

  try {
    console.log(`Fetching GitHub stats for user: ${username}`);

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const query = `
      query GetUserStats($username: String!, $from: DateTime!) {
        user(login: $username) {
          name
          login
          avatarUrl
          createdAt
          followers {
            totalCount
          }
          following {
            totalCount
          }
          repositories(
            first: 100
            ownerAffiliations: OWNER
            privacy: PUBLIC
            orderBy: {field: UPDATED_AT, direction: DESC}
          ) {
            totalCount
            nodes {
              stargazerCount
              primaryLanguage {
                name
                color
              }
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    name
                    color
                  }
                }
              }
            }
          }
          contributionsCollection(from: $from) {
            totalCommitContributions
            restrictedContributionsCount
            totalIssueContributions
            totalPullRequestContributions
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
          pullRequests {
            totalCount
          }
          issues {
            totalCount
          }
        }
      }
    `;

    const response: any = await githubClient(query, {
      username,
      from: oneYearAgo.toISOString(),
    });

    const user = response.user;
    if (!user) return null;

    const totalStars = user.repositories.nodes.reduce(
      (sum: number, repo: any) => sum + repo.stargazerCount,
      0
    );
    const languageStats = new Map<string, { size: number; color: string }>();

    if (includeLanguages) {
      user.repositories.nodes.forEach((repo: any) => {
        repo.languages.edges.forEach((edge: any) => {
          const { name, color } = edge.node;
          const existing = languageStats.get(name) || { size: 0, color };
          languageStats.set(name, {
            size: existing.size + edge.size,
            color: color || '#858585'
          });
        });
      });
    }

    const totalSize = Array.from(languageStats.values()).reduce(
      (sum, lang) => sum + lang.size,
      0
    );

    const languages = Array.from(languageStats.entries())
      .map(([name, data]) => ({
        name,
        color: data.color,
        size: data.size,
        percentage: (data.size / totalSize) * 100
      }))
      .sort((a, b) => b.size - a.size)
      .slice(0, languageCount);

    const contributionStreak = calculateStreak(
      user.contributionsCollection.contributionCalendar.weeks
    );

    return {
      user: {
        name: user.name || user.login,
        login: user.login,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt
      },
      totalCommits: user.contributionsCollection.totalCommitContributions +
        user.contributionsCollection.restrictedContributionsCount,
      totalRepos: user.repositories.totalCount,
      totalPRs: user.pullRequests.totalCount,
      totalIssues: user.issues.totalCount,
      totalStars,
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      languages,
      contributionStreak
    };

  } catch (error: any) {
    console.error('GitHub API Error:', error);


    if (error.message?.includes('NOT_FOUND')) {
      return null;
    }

    throw error;
  }
}

export async function fetchRepoStars(owner: string, repo: string): Promise<number | null> {
  try {
    const query = `
      query GetRepoStars($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          stargazerCount
        }
      }
    `;

    const response: any = await githubClient(query, {
      owner,
      repo,
    });

    return response.repository?.stargazerCount ?? 0;
  } catch (error) {
    console.warn(`Failed to fetch stars for ${owner}/${repo}:`, error);
    return null;
  }
}

function calculateStreak(weeks: any[]): number {
  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const allDays = weeks.flatMap(week => week.contributionDays).reverse();

  for (const day of allDays) {
    const dayDate = new Date(day.date);

    if (dayDate > today) continue;

    if (day.contributionCount > 0) {
      currentStreak++;
    } else if (currentStreak > 0) {
      break;
    }
  }

  return currentStreak;
}