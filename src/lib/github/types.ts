// ============================================================================
// FILE: src/lib/github/types.ts
// TypeScript types for GitHub data
// ============================================================================

export interface GitHubUser {
  name: string;
  login: string;
  avatarUrl: string;
  bio?: string;
  createdAt: string;
}

export interface Language {
  name: string;
  color: string;
  percentage: number;
  size: number;
}

export interface Repository {
  name: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage?: {
    name: string;
    color: string;
  };
  languages: {
    edges: Array<{
      size: number;
      node: {
        name: string;
        color: string;
      };
    }>;
  };
}

export interface ContributionDay {
  contributionCount: number;
  date: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionsCollection {
  totalCommitContributions: number;
  restrictedContributionsCount: number;
  totalIssueContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
  totalRepositoryContributions: number;
  contributionCalendar: {
    totalContributions: number;
    weeks: ContributionWeek[];
  };
}

export interface GitHubStats {
  user: GitHubUser;
  totalCommits: number;
  totalRepos: number;
  totalPRs: number;
  totalIssues: number;
  totalStars: number;
  totalGists: number;
  followers: number;
  following: number;
  languages: Language[];
  contributionStreak: number;
  totalContributions: number;
}

export interface GitHubAPIResponse {
  user: {
    name: string;
    login: string;
    avatarUrl: string;
    bio?: string;
    createdAt: string;
    followers: { totalCount: number };
    following: { totalCount: number };
    repositories: {
      totalCount: number;
      nodes: Repository[];
    };
    contributionsCollection: ContributionsCollection;
    pullRequests: { totalCount: number };
    issues: { totalCount: number };
    starredRepositories: { totalCount: number };
    gists: { totalCount: number };
  };
}