<!-- ============================================================================ -->
<!-- FILE: CONTRIBUTING.md -->
<!-- Contribution guidelines -->
<!-- ============================================================================ -->

# Contributing to GitHub Stats Generator

First off, thank you for considering contributing to GitHub Stats Generator! 🎉

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- A clear and descriptive title
- Steps to reproduce the behavior
- Expected behavior
- Screenshots if applicable
- Your environment (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a clear and descriptive title
- Provide a detailed description of the suggested enhancement
- Explain why this enhancement would be useful
- Include mockups or examples if applicable

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code, add tests
3. Ensure the test suite passes
4. Make sure your code lints
5. Update documentation if needed

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/github-stats-generator.git

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Run development server
npm run dev
```

## Coding Style

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

## Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters
- Reference issues and pull requests after the first line

## Testing

```bash
# Run tests
npm run test

# Type check
npm run type-check

# Lint
npm run lint
```

## License

By contributing, you agree that your contributions will be licensed under the MIT License.