# ZIMEIRA TECH Website

Public portfolio snapshot untuk website company profile **ZIMEIRA TECH**.

Live website:

[https://zimeira.duazreklame.my.id](https://zimeira.duazreklame.my.id)

![ZIMEIRA TECH Preview](https://zimeira.duazreklame.my.id/opengraph-image)

## Tentang Project

ZIMEIRA TECH Website adalah company profile responsif untuk layanan komputer, desain, dan pembuatan website di Kota Pagaralam dan sekitarnya. Project ini dibuat sebagai portfolio pribadi untuk menunjukkan implementasi landing page bisnis, SEO dasar, halaman legal, integrasi kontak, dan CMS admin sederhana.

## Fitur Utama

- Landing page company profile responsif.
- Section hero, tentang perusahaan, layanan, portfolio, keunggulan, FAQ, info layanan, dan kontak.
- Tombol kontak cepat ke WhatsApp, email, Instagram, dan TikTok.
- CMS admin pribadi untuk pengelolaan konten.
- Upload logo dan gambar portfolio.
- Halaman legal: kebijakan privasi, syarat layanan, dan disclaimer.
- SEO dasar: metadata, canonical URL, sitemap, robots, dan Open Graph image.
- Integrasi Vercel Analytics, Speed Insights, dan Vercel Blob.

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

## Development

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Buka:

```txt
http://localhost:3000
```

## Environment

Contoh variable tersedia di `.env.example`.

```env
NEXT_PUBLIC_SITE_URL=https://zimeira.duazreklame.my.id
CMS_ADMIN_USERNAME=admin
CMS_ADMIN_PASSCODE=ganti-dengan-password-admin-yang-kuat
CMS_AUTH_SECRET=ganti-dengan-secret-random-panjang-minimal-32-karakter
BLOB_READ_WRITE_TOKEN=vercel_blob_read_write_token_dari_dashboard
```

Jangan commit `.env.local` atau credential asli.

## Catatan

Repository ini adalah versi portfolio public. Versi development/production penuh disimpan di repository private.

Copyright (c) 2026 Akbar Zidane. All rights reserved.
