# Full-Stack Next.js Application

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Runtime:** Node.js 20
- **UI Library:** React 19
- **Styling:** Tailwind CSS v3.4.19
- **Type Safety:** TypeScript 5.9
- **Animations:** GSAP with ScrollTrigger
- **Components:** shadcn/ui (40+ components)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # Backend API routes
│   │   ├── contact/       # Contact form endpoint
│   │   ├── programs/      # Programs data endpoint
│   │   └── health/        # Health check endpoint
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page (client component)
│   └── globals.css        # Global styles & Tailwind
├── components/            # React components
│   ├── sections/          # Page sections (Hero, Features, etc.)
│   ├── ui/               # shadcn/ui components (53 files)
│   └── Navigation.tsx     # Main navigation
├── hooks/                 # Custom React hooks
│   └── use-mobile.ts     # Mobile detection hook
├── lib/                   # Utility functions
│   ├── utils.ts          # Tailwind merge utilities
│   ├── api.ts            # API client functions
│   └── db.ts             # Database configuration
├── types/                 # TypeScript type definitions
│   └── index.ts          # Common types
├── public/               # Static assets
│   └── images/           # Image files
├── docs/                 # Documentation
│   ├── API.md            # API documentation
│   └── DEPLOYMENT.md     # Deployment guide
└── middleware.ts         # Next.js middleware (security headers)
```

## Available Components (53)

accordion, alert-dialog, alert, aspect-ratio, avatar, badge, breadcrumb,
button-group, button, calendar, card, carousel, chart, checkbox, collapsible,
command, context-menu, dialog, drawer, dropdown-menu, empty, field, form,
hover-card, input-group, input-otp, input, item, kbd, label, menubar,
navigation-menu, pagination, popover, progress, radio-group, resizable,
scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner,
spinner, switch, table, tabs, textarea, toggle-group, toggle, tooltip

## Usage

Import components:
```tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
```

## API Routes

- `GET /api/programs` - Fetch programs with filtering
- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check endpoint

## Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Features

- ✅ Full-stack with API routes
- ✅ Server-side rendering (SSR)
- ✅ Client-side interactivity
- ✅ Type-safe with TypeScript
- ✅ Responsive design
- ✅ GSAP scroll animations
- ✅ Form handling with validation
- ✅ Toast notifications
- ✅ Security headers via middleware
- ✅ Ready for database integration

## Next Steps

1. Install dependencies: `npm install`
2. Copy `.env.local.example` to `.env.local`
3. Run development server: `npm run dev`
4. Add database (Prisma, MongoDB, etc.)
5. Configure authentication (NextAuth.js)
6. Deploy to Vercel or your preferred platform

## Documentation

- API Documentation: `docs/API.md`
- Deployment Guide: `docs/DEPLOYMENT.md`
- Main README: `README.md`
