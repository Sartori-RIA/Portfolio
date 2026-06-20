# cookiecode.com.br — Portfolio

Personal portfolio of **Lucas Sartori**, Senior Backend Engineer.  
Live at [cookiecode.com.br](https://cookiecode.com.br).

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Vercel (deploy + Analytics + Speed Insights)

## Commands

```bash
yarn dev      # local dev server
yarn build    # production build
yarn lint     # ESLint
yarn start    # serve production build
```

## Project structure

```
app/
  components/
    sections/     # page sections (Experience, Skills, etc.)
    ui/           # reusable UI primitives
  how-i-work/     # /how-i-work page
  blog/           # /blog and /blog/[slug]
  layout.tsx      # root layout, metadata, nav
  page.tsx        # homepage
content/          # editable content (experience, skills, articles, etc.)
  articles/       # blog posts as Markdown files
lib/              # content loaders (articles)
public/           # static assets (images, favicons)
```

## Conventions

- **Content lives in `content/`** — update experience, projects, skills there, not in components.
- **Sections are presentational** — they import from `content/` and render UI.
- **Minimal diffs** — no new dependencies without approval.
- **Static site** — no backend, no API routes, no database.
- **English content** — professional tone, outcome-oriented bullets.
- **External links** — always `target="_blank"` + `rel="noopener noreferrer"`.
- **Images** — use `next/image` via the `Avatar` component.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Main portfolio |
| `/blog` | Article listing |
| `/blog/[slug]` | Individual article |
| `/how-i-work` | Working principles |

## Deploy

Deployed on Vercel from `main`. Domain: `cookiecode.com.br`.

## Updating content

See [docs/CONTENT.md](docs/CONTENT.md) for step-by-step guides.
