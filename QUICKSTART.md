# Quick Start Guide

Get your Next.js app running in 3 minutes.

## Prerequisites

- Node.js 20 or higher
- npm, yarn, or pnpm

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables (optional for basic usage)
cp .env.local.example .env.local

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## What's Included

✅ Full-stack Next.js 15 app with App Router  
✅ React 19 with TypeScript  
✅ Tailwind CSS + 53 shadcn/ui components  
✅ GSAP scroll animations  
✅ 3 working API routes  
✅ Responsive design  
✅ Production-ready structure  

## Project Structure

```
app/          → Pages & API routes
components/   → React components
lib/          → Utilities & helpers
types/        → TypeScript types
public/       → Static assets
```

## Available Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # Code linting
```

## API Endpoints

- `GET /api/programs` - Fetch programs
- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check

## Next Steps

1. **Add a Database**
   - Install Prisma: `npm install prisma @prisma/client`
   - Or MongoDB: `npm install mongodb`
   - Configure in `lib/db.ts`

2. **Add Authentication**
   - Install NextAuth: `npm install next-auth`
   - Configure in `app/api/auth/[...nextauth]/route.ts`

3. **Deploy**
   - Push to GitHub
   - Deploy to Vercel: [vercel.com](https://vercel.com)
   - Or see `docs/DEPLOYMENT.md` for other options

## Common Tasks

### Add a new page
Create `app/about/page.tsx`:
```tsx
export default function About() {
  return <div>About Page</div>
}
```

### Add a new API route
Create `app/api/users/route.ts`:
```tsx
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ users: [] });
}
```

### Add a new component
Create `components/MyComponent.tsx`:
```tsx
export default function MyComponent() {
  return <div>My Component</div>
}
```

## Documentation

- Full README: `README.md`
- API Docs: `docs/API.md`
- Deployment: `docs/DEPLOYMENT.md`
- Project Info: `info.md`

## Need Help?

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

Happy coding! 🚀
