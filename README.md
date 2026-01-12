<!-- ============================================================================ -->
<!-- FILE: README.md -->
<!-- Project documentation -->
<!-- ============================================================================ -->

# GitHub Stats, Coded 4 Me

Beautiful, customizable GitHub statistics cards for your README.md. Free, open-source, and easy to use.

![GitHub Stats](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## Features

- **6 Beautiful Themes** - Dark, Light, Dracula, Monokai, Nord, Gruvbox
- **Customizable Stats** - Choose what to display
- **Lightning Fast** - Edge functions + aggressive caching
- **Privacy First** - No data collection, no tracking
- **Accessible** - Semantic HTML, proper contrast ratios

## Quick Start

### Using the Web Interface

1. Go to [https://github-stats.coded4.me](https://github-stats.coded4.me)
2. Enter your GitHub username
3. Customize your card
4. Copy the Markdown code
5. Paste in your README.md

### Direct URL

```markdown
![GitHub Stats](https://github-stats.coded4.me/api/stats?user=YOUR_USERNAME&theme=dark&stats=commits,repos,langs)
```

## Installation (Self-Hosting)

### Prerequisites

- Node.js 18.17.0 or later
- GitHub Personal Access Token ([Create one](https://github.com/settings/tokens/new))
  - Required scopes: `public_repo`, `read:user`

### Steps

```bash
# Clone your fork
git clone https://github.com/yourusername/github-stats.git
cd github-stats

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env and add your GITHUB_TOKEN

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/github-stats)

1. Click the button above
2. Add `GITHUB_TOKEN` environment variable
3. Deploy!

## 📖 API Documentation

### Endpoint

```
GET /api/stats
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `user` | string | **required** | GitHub username |
| `stats` | string | `commits,repos,langs` | Comma-separated stats to show |
| `theme` | string | `dark` | Theme name |
| `bg_color` | string | - | Custom background color (hex) |
| `text_color` | string | - | Custom text color (hex) |
| `icon_color` | string | - | Custom icon color (hex) |
| `title_color` | string | - | Custom title color (hex) |
| `border_radius` | number | `10` | Border radius (0-20) |
| `hide_border` | boolean | `false` | Hide card border |
| `layout` | string | `default` | Layout style |
| `langs_count` | number | `5` | Number of languages (1-10) |
| `cache` | number | `1800` | Cache duration in seconds |

### Available Stats

- `commits` - Total commits
- `repos` - Public repositories
- `prs` - Pull requests
- `issues` - Issues
- `stars` - Stars received
- `followers` - Followers count
- `langs` - Top languages

### Themes

- `dark` - GitHub dark theme
- `light` - GitHub light theme
- `dracula` - Dracula theme
- `monokai` - Monokai theme
- `nord` - Nord theme
- `gruvbox` - Gruvbox theme

## 🎨 Examples

### Default Dark Theme
```markdown
![GitHub Stats](https://github-stats.coded4.me/api/stats?user=octocat&theme=dark)
```

### Custom Colors
```markdown
![GitHub Stats](https://github-stats.coded4.me/api/stats?user=octocat&theme=dark&bg_color=1a1b27&title_color=58a6ff)
```

### Compact Layout
```markdown
![GitHub Stats](https://github-stats.coded4.me/api/stats?user=octocat&layout=compact&stats=commits,repos,stars)
```

## 🏗️ Project Structure

```
github-stats/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── stats/route.ts      # Main API endpoint
│   │   │   └── preview/route.ts    # Preview endpoint
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Home page
│   ├── components/
│   │   ├── StatsConfigurator.tsx   # Main configurator
│   │   ├── StatsPreview.tsx        # Live preview
│   │   └── CodeSnippet.tsx         # Code generator
│   ├── lib/
│   │   ├── github/
│   │   │   ├── client.ts           # GraphQL client
│   │   │   ├── queries.ts          # GraphQL queries
│   │   │   └── types.ts            # TypeScript types
│   │   ├── svg/
│   │   │   ├── generator.ts        # SVG generation
│   │   │   └── themes.ts           # Theme definitions
│   │   ├── cache/
│   │   │   └── index.ts            # Cache system
│   │   └── utils/
│   │       ├── rate-limiter.ts     # Rate limiting
│   │       └── validators.ts       # Input validation
│   └── styles/
│       └── globals.css             # Global styles
├── public/                         # Static assets
├── .env.example                    # Environment template
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── tailwind.config.ts              # Tailwind config
└── README.md                       # This file
```

## 🔧 Development

### Running Tests
```bash
npm run test
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) first.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/) and [Octicons](https://octicons.github.com/)

## 📧 Contact

- GitHub: [@Coded4-me](https://github.com/Coded4-me)
- Email: contact@coded4.me

---

**Made with ❤️ by the open-source community**