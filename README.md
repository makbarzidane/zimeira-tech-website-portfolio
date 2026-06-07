# ZIMEIRA TECH Website

A responsive company profile website for **ZIMEIRA TECH**, a local technology service business based in Pagaralam, Indonesia.

## Live Website

[https://zimeira.duazreklame.my.id](https://zimeira.duazreklame.my.id)

## Screenshots

### Website Preview

![ZIMEIRA TECH Website Preview](https://zimeira.duazreklame.my.id/opengraph-image)
## Overview

ZIMEIRA TECH Website is a modern business landing page designed to present computer services, graphic design services, and website development services in a clean and accessible way.

The project focuses on responsive layout, clear service information, fast contact access, basic SEO, legal pages, and a simple private CMS for content management.

## Key Features

- Responsive company profile landing page.
- Hero, about, services, portfolio, benefits, FAQ, service information, and contact sections.
- Quick contact buttons for WhatsApp, email, Instagram, and TikTok.
- Private CMS dashboard for content management.
- Logo and portfolio image uploads.
- Legal pages for privacy policy, terms of service, and disclaimer.
- Basic SEO with metadata, canonical URL, sitemap, robots, and Open Graph image.
- Vercel Analytics, Speed Insights, and Vercel Blob integration.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Vercel Analytics
- Vercel Speed Insights
- Vercel Blob
- ESLint

## Project Structure

```txt
src/
  app/              Pages, API routes, metadata, sitemap, and robots
  components/       Website and admin UI components
  data/             Default content and local CMS data
  lib/              Auth, CMS, storage, branding, and site helpers
public/
  images/           Website visual assets
  uploads/          Local portfolio upload assets
```

## Development

```bash
npm install
npm run dev
```

Local URL:

```txt
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Environment Example

```env
NEXT_PUBLIC_SITE_URL=https://zimeira.duazreklame.my.id
CMS_ADMIN_USERNAME=admin
CMS_ADMIN_PASSCODE=your-admin-passcode
CMS_AUTH_SECRET=your-random-auth-secret
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

## Author

Akbar Zidane

Copyright (c) 2026 Akbar Zidane. All rights reserved.
