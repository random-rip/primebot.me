# PrimeBot Website

Landing page for [PrimeBot](https://primebot.me), built with Nuxt 5, Nuxt UI, Nuxt Content and Nuxt Studio. Based on the [Nuxt UI Landing template](https://github.com/nuxt-ui-templates/landing).

## Setup

```bash
pnpm install
pnpm dev
```

## Content

All content lives in `content/` and can be edited in Studio:

- `index.yml` – landing page (hero, features, CTA)
- `navigation.yml` – header, header buttons and footer links
- `**/*.md` – all other pages, rendered by `app/pages/[...slug].vue`

## Nuxt Studio

- **Dev:** run `pnpm dev`, then use the floating Studio button. Edits are written to the local files.
- **Production:** needs an SSR deployment (`nuxt build`) and a GitHub OAuth app. Copy `.env.example` to `.env` and fill it in. Studio is available at `/_studio`.

## Scripts

`pnpm dev` · `pnpm build` · `pnpm preview` · `pnpm lint` · `pnpm typecheck`
