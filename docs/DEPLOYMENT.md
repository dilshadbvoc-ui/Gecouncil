# Deployment Guide

## Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Deploy with Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link your project

### Deploy with Git Integration

1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure environment variables
6. Click "Deploy"

### Environment Variables

Add these in your Vercel project settings:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- Any other API keys

---

## Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build your project:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod
```

Or use Git integration similar to Vercel.

---

## Railway

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login:
```bash
railway login
```

3. Initialize and deploy:
```bash
railway init
railway up
```

---

## Docker Deployment

### Create Dockerfile

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and run:

```bash
docker build -t my-nextjs-app .
docker run -p 3000:3000 my-nextjs-app
```

---

## AWS Amplify

1. Push code to Git repository
2. Go to AWS Amplify Console
3. Click "New app" → "Host web app"
4. Connect your repository
5. Configure build settings (auto-detected for Next.js)
6. Add environment variables
7. Deploy

---

## Self-Hosted (VPS)

### Using PM2

1. Install Node.js and PM2 on your server:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

2. Clone and build your project:
```bash
git clone <your-repo>
cd <your-project>
npm install
npm run build
```

3. Start with PM2:
```bash
pm2 start npm --name "my-app" -- start
pm2 save
pm2 startup
```

4. Configure Nginx as reverse proxy:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Environment Variables Checklist

Before deploying, ensure you have:

- [ ] `DATABASE_URL` - Database connection string
- [ ] `NEXTAUTH_URL` - Your production URL
- [ ] `NEXTAUTH_SECRET` - Random secret for auth
- [ ] `EMAIL_SERVER_HOST` - Email service host
- [ ] `EMAIL_FROM` - Sender email address
- [ ] Any third-party API keys

---

## Post-Deployment

1. Test all API endpoints
2. Verify environment variables are set
3. Check database connections
4. Test contact form functionality
5. Monitor error logs
6. Set up analytics (optional)
7. Configure custom domain (if needed)

---

## Continuous Deployment

Most platforms support automatic deployments on git push:

1. Connect your Git repository
2. Configure build settings
3. Set environment variables
4. Enable automatic deployments
5. Push to main/master branch to deploy

---

## Performance Optimization

Before deploying:

1. Enable image optimization
2. Configure caching headers
3. Use CDN for static assets
4. Enable compression
5. Monitor Core Web Vitals
6. Set up error tracking (Sentry, etc.)
