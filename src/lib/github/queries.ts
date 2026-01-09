// ============================================================================
// FILE: src/lib/github/queries.ts
// GraphQL queries for GitHub API
// ============================================================================

export const USER_STATS_QUERY = `
  query GetUserStats($username: String!, $from: DateTime!) {
    user(login: $username) {
      name
      login
      avatarUrl
      bio
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
          name
          stargazerCount
          forkCount
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
        totalPullRequestReviewContributions
        totalRepositoryContributions
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
      
      pullRequests(first: 1) {
        totalCount
      }
      
      issues(first: 1) {
        totalCount
      }
      
      starredRepositories {
        totalCount
      }
      
      gists {
        totalCount
      }
    }
  }
`;