# Full-Stack Next.js Application

A modern full-stack web application built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

- ⚡ Next.js 15 with App Router
- ⚛️ React 19
- 🎨 Tailwind CSS + shadcn/ui components
- 📱 Fully responsive design
- 🎭 GSAP animations with ScrollTrigger
- 🔥 TypeScript for type safety
- 🎯 API routes for backend functionality
- 📦 40+ pre-built UI components

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Copy the environment variables:

```bash
cp .env.local.example .env.local
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── contact/       # Contact form endpoint
│   │   ├── programs/      # Programs data endpoint
│   │   └── health/        # Health check endpoint
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── sections/          # Page sections
│   ├── ui/               # shadcn/ui components
│   └── Navigation.tsx     # Navigation component
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── public/               # Static assets
    └── images/           # Image files
```

## API Routes

### GET /api/programs
Fetch available programs with optional filtering.

Query parameters:
- `q` - Search query
- `country` - Filter by country

### POST /api/contact
Submit contact form data.

Body:
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

### GET /api/health
Health check endpoint.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Framework:** Next.js 15
- **UI Library:** React 19
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui, Radix UI
- **Animations:** GSAP
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **TypeScript:** Type-safe development

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

### Other Platforms

This app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render
- Self-hosted with Docker

## Environment Variables

Create a `.env.local` file based on `.env.local.example` and configure:

- Database connection strings
- API keys
- Authentication secrets
- Email service credentials

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
