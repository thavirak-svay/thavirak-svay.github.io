# thavirak-svay.github.io

My personal site: https://thavirak-svay.github.io

Next.js 16 (static export), React 19, Tailwind CSS 4. Deployed to GitHub Pages by `.github/workflows/nextjs.yml` on push to `main`.

## Development

Node 21+.

```bash
npm install
npm run dev
```

## Notes

- Copy for both the site and the resume is in `src/components/portfolio/content.ts`.
- "Download CV" just calls `window.print()`. The print stylesheet hides the site and shows `Resume.tsx` as a single A4 page, so Save as PDF gives the resume.
- The background animation is a canvas in `LogoField.tsx`. Logo paths come from [Simple Icons](https://simpleicons.org/) at build time; change the list in `src/app/page.tsx`.
