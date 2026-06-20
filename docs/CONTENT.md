# Content guide

All editable portfolio content lives in `content/`. Components in `app/components/sections/` only render data — they should not contain hardcoded text.

## Files

| File | What it controls |
|------|------------------|
| `content/profile.ts` | Name, title, bio, avatar, social links, site metadata |
| `content/experience.ts` | Professional experience (newest first) |
| `content/education.ts` | Education entries |
| `content/certifications.ts` | Certifications (Azure AI, etc.) |
| `content/projects.ts` | Side projects |
| `content/recommendations.ts` | LinkedIn recommendations |
| `content/skills.ts` | Skill tags by category |
| `content/how-i-work.ts` | Principles for the /how-i-work page |
| `content/blog.ts` | Blog index title and description |
| `content/features.ts` | Feature flags (`blog.enabledInProduction`) |
| `content/articles/*.md` | Individual blog articles (Markdown) |

## Common tasks

### Add a new job

1. Edit `content/experience.ts`
2. Add a new entry at the **top** of the array (most recent first)
3. Include `role`, `company`, `companyLink`, `period`, `location`, `bullets`
4. Add `achievements` for measurable outcomes when available
5. Run `yarn build` to verify

### Add a certification

1. Edit `content/certifications.ts`
2. Add `name`, `issuer`, `issued`, `description`
3. Set `credentialUrl` to Credly or Microsoft Learn link if available

### Add a side project

1. Edit `content/projects.ts`
2. Add `name`, `href`, `description`, `techs`

### Update header / SEO

1. Edit `content/profile.ts` — `profile.title`, `profile.bio`, `site` object (including `site.footer`)
2. Metadata in `app/layout.tsx` reads from `site`

### Update How I Work

1. Edit `content/how-i-work.ts`
2. Each principle has `title` and `description`

### Enable blog in production

Blog is available in `yarn dev` by default. To launch in production:

1. Edit `content/features.ts`
2. Set `blog.enabledInProduction: true`
3. Run `yarn build` and deploy

### Add a blog article

1. Create a new `.md` file in `content/articles/` (kebab-case slug as filename)
2. Add frontmatter at the top:

```md
---
title: "Article Title"
description: "One-line summary for SEO and listing cards."
date: "2025-06-15"
tags: ["rails", "performance"]
published: true
---

Your markdown content here...
```

3. Set `published: false` to keep a draft out of the site
4. Run `yarn build` — routes are generated statically from filenames

### Update blog index

1. Edit `content/blog.ts` — page title and intro description

## Writing style

- English, professional, concise
- Bullets: what you did + impact when possible
- Achievements: metrics, before/after, team outcomes
- Do not invent numbers — only use verified facts from CV/LinkedIn
