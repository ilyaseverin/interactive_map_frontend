This is a [Next.js](https://nextjs.org) project for interactive maps, including the Battle Glory Map of Lipetsk Region.

## Features

### 🎖️ Battle Glory Map

Interactive map displaying monuments, memorials, memorial plaques, and military burials from the Great Patriotic War (WWII) in Lipetsk Region.

**Pages:**

- `/battle-glory` - Main Battle Glory Map with filtering capabilities

**Features:**

- 4 subsections: History, Monuments/Memorials, Memorial Plaques, Military Burials
- Filter by point type
- Statistics by municipality
- Route navigation to each point
- Adaptive design for mobile devices
- Interactive clustering of points

### 🗺️ General Interactive Map

Standard interactive map with clustering and customization options.

## Environment Variables

Create a `.env.local` file in the `frontend/` directory with the following variables:

```env
# Strapi CMS Configuration
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Production Example:**

```env
NEXT_PUBLIC_STRAPI_URL=https://api.yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Variable Descriptions:

- **`NEXT_PUBLIC_STRAPI_URL`** - URL of your Strapi CMS API (used for all data fetching, images, and routes)
- **`NEXT_PUBLIC_SITE_URL`** - Base URL of your website (used for meta tags and SEO)

> **Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Other variables are only available on the server.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

### Environment Variables

Create a `.env.local` file in the frontend directory with the following variables:

```bash
# Strapi CMS URL for Battle Glory Map data
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

**Note:** For production, update `NEXT_PUBLIC_STRAPI_URL` to point to your production Strapi server.

### Strapi Backend

The Battle Glory Map requires a Strapi CMS backend running with the `battle-glory-point` content type. See the `strapi-cms` directory in the project root for setup instructions.

## API Endpoints

### Battle Glory Points

- **GET** `/api/battle-glory-points` - Get all Battle Glory points
- **Query Parameters:**
  - `point_type` - Filter by type: "памятник/мемориал", "мемориальная доска", "воинское захоронение"
  - `municipality` - Filter by municipality
  - `page` - Page number (default: 1)
  - `pageSize` - Items per page (default: 10000)

## Development

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
