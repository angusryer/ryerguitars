# Ryer Guitars

Website for David Ryer — custom acoustic and classical guitar luthier based in Madoc, Ontario.

**Live site:** https://www.ryerguitars.com

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
├── public/
│   └── images/                 # All site photography (committed, web-optimised)
│       ├── bw-ebony-lg/        # B&W large format shots (1600px wide)
│       ├── bw-ebony-sm/        # B&W small format shots (800px wide)
│       ├── ryer-lg/            # Colour large format shots (1600px wide)
│       └── ryer-sm/            # Colour small format shots (800px wide)
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

## Contact form (EmailJS + Brevo)

The contact form uses [EmailJS](https://emailjs.com) to send email client-side without a backend. The credentials are hardcoded in `src/components/Contact.astro`:

```js
var PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
var SERVICE_ID  = 'YOUR_SERVICE_ID';
var TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
```

### Initial setup

1. Create a free account at https://emailjs.com
2. Add an email service — use **Custom SMTP** and enter Brevo's SMTP credentials (see below)
3. Create a template using these variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
4. Copy your **Public Key** (Account → API Keys), **Service ID**, and **Template ID**
5. Replace the three placeholder values in `Contact.astro` and push

### Brevo SMTP credentials (for EmailJS service setup)

| Field    | Value                        |
|----------|------------------------------|
| Host     | `smtp-relay.brevo.com`       |
| Port     | `587`                        |
| Username | your Brevo account email     |
| Password | a Brevo SMTP key (Brevo dashboard → SMTP & API → SMTP tab → Generate a new SMTP key) |

### Migrating the sender address to dave@ryerguitars.com

Once the domain is live at `www.ryerguitars.com`, outgoing form emails can be sent _from_ `dave@ryerguitars.com` rather than a generic Brevo address. Steps:

1. **Verify the domain in Brevo**
   - Brevo dashboard → Senders & IP → Domains → Add a domain → enter `ryerguitars.com`
   - Add the DNS records Brevo provides (typically a TXT record for domain verification and a CNAME for DKIM signing) at your DNS provider
   - Click **Verify** once the records have propagated (can take up to 30 min)

2. **Add the sender in Brevo**
   - Senders & IP → Senders → Add a sender
   - Name: `David Ryer`, Email: `dave@ryerguitars.com`

3. **Update the EmailJS service**
   - EmailJS dashboard → Email Services → edit your Brevo service
   - Set the **From email** field to `dave@ryerguitars.com`
   - Save — no code changes required

---

## Custom domain migration (GitHub Pages → www.ryerguitars.com)

### Code changes required

1. Add a `public/CNAME` file containing exactly:
   ```
   www.ryerguitars.com
   ```
2. Update `astro.config.mjs`:
   ```js
   site: 'https://www.ryerguitars.com',
   // remove the base line entirely
   ```
3. Remove the `/ryerguitars` prefix from all image paths in:
   - `src/components/Hero.astro`
   - `src/components/About.astro`
   - `src/components/Gallery.astro`
4. Update the dev/preview URLs in this README if desired

### DNS records (at your domain registrar)

Add these records to point `ryerguitars.com` at GitHub Pages:

**Apex domain (`ryerguitars.com`) — four A records:**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**`www` subdomain — one CNAME record:**
```
www  →  angusryer.github.io
```

### GitHub Pages settings

- Repo → Settings → Pages → Custom domain → enter `www.ryerguitars.com` → Save
- Wait for the DNS check to pass, then enable **Enforce HTTPS**

---

## Photography

All photos were shot by [Pics & Tweaks Photography](https://www.picsandtweaks.com) and are used with permission. Images are stored in `public/images/`, resized to web dimensions (max 1600px wide) using ImageMagick before committing.
