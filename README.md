# Ryer Guitars

Website for David Ryer — custom acoustic and classical guitar luthier based in Madoc, Ontario.

**Live site:** https://angusryer.github.io/ryerguitars/

---

## Architecture

This is a static site built with [Astro](https://astro.build). Astro compiles everything to plain HTML/CSS/JS at build time — zero JavaScript framework ships to the browser by default.

```
ryerguitars/
├── src/
│   ├── components/       # Reusable Astro components
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Gallery.astro
│   │   ├── CustomBuilds.astro
│   │   ├── Contact.astro       # EmailJS contact form
│   │   ├── OrnamentDivider.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Base.astro          # HTML shell, <head>, fonts
│   ├── pages/
│   │   └── index.astro         # Single page — composes all components
│   └── styles/
│       └── global.css          # CSS custom properties, resets, shared utilities
├── images/                     # All site photography (committed, web-optimised)
│   ├── bw-ebony-lg/            # B&W large format shots (1600px wide)
│   ├── bw-ebony-sm/            # B&W small format shots (800px wide)
│   ├── ryer-lg/                # Colour large format shots (1600px wide)
│   └── ryer-sm/                # Colour small format shots (800px wide)
├── .github/
│   └── workflows/
│       └── static.yml          # CI/CD: build → deploy to GitHub Pages
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Each section of the site is its own `.astro` component with co-located scoped CSS. Global design tokens (colours, fonts, spacing) live in `src/styles/global.css`.

---

## Local development

**Prerequisites:** Node.js 22+

```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm run dev
# → http://localhost:4321/ryerguitars/
```

---

## Building locally

```bash
npm run build
# Output is written to dist/

# Preview the production build locally
npm run preview
# → http://localhost:4321/ryerguitars/
```

---

## Deployment

Deployment is fully automated via GitHub Actions. Every push to `main`:

1. Checks out the repo
2. Installs Node 22 and runs `npm ci`
3. Runs `npm run build` (Astro outputs to `dist/`)
4. Uploads `dist/` as a GitHub Pages artifact
5. Deploys to GitHub Pages

No manual steps needed — just push to `main`.

To deploy manually, trigger the workflow from the **Actions** tab → **Build and deploy to GitHub Pages** → **Run workflow**.

---

## Contact form (EmailJS)

The contact form uses [EmailJS](https://emailjs.com) to send email client-side without a backend. The credentials are hardcoded in `src/components/Contact.astro`:

```js
var PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
var SERVICE_ID  = 'YOUR_SERVICE_ID';
var TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
```

To activate the form:

1. Create a free account at https://emailjs.com
2. Add an email service (Gmail or SMTP)
3. Create a template using these variables: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`
4. Copy your **Public Key** (Account → API Keys), **Service ID**, and **Template ID**
5. Replace the three placeholder values in `Contact.astro` and push

---

## Photography

All photos were shot by [Pics & Tweaks Photography](https://www.picsandtweaks.com) and are used with permission. Images are stored in the `images/` directory, resized to web dimensions (max 1600px wide) using ImageMagick before committing.
