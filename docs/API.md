# API Documentation

## Overview

This Next.js application includes several API routes for backend functionality.

## Endpoints

### Programs API

#### GET /api/programs

Fetch available programs with optional filtering.

**Query Parameters:**
- `q` (optional): Search query to filter programs by name or university
- `country` (optional): Filter programs by country

**Response:**
```json
{
  "programs": [
    {
      "id": 1,
      "name": "Computer Science",
      "university": "MIT",
      "country": "USA",
      "duration": "4 years",
      "tuition": "$53,790/year"
    }
  ]
}
```

**Example:**
```bash
curl http://localhost:3000/api/programs?q=computer&country=USA
```

---

### Contact API

#### POST /api/contact

Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I would like more information..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Error Response:**
```json
{
  "error": "Missing required fields"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","message":"Hello"}'
```

---

### Health Check API

#### GET /api/health

Check the health status of the application.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

**Example:**
```bash
curl http://localhost:3000/api/health
```

---

## Adding New Endpoints

To add a new API endpoint:

1. Create a new folder in `app/api/`
2. Add a `route.ts` file
3. Export HTTP method handlers (GET, POST, PUT, DELETE, etc.)

Example:

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Hello' });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ received: body });
}
```

## Error Handling

All API routes should include proper error handling:

```typescript
try {
  // Your logic here
  return NextResponse.json({ data }, { status: 200 });
} catch (error) {
  console.error('API error:', error);
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

## Authentication

To add authentication to your API routes:

1. Install NextAuth.js: `npm install next-auth`
2. Configure in `app/api/auth/[...nextauth]/route.ts`
3. Protect routes using middleware or session checks

Example protected route:

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // Protected logic here
}
```

## Database Integration

To connect to a database:

1. Choose your database (PostgreSQL, MongoDB, MySQL, etc.)
2. Install the appropriate client library
3. Configure connection in `lib/db.ts`
4. Use in your API routes

Example with Prisma:

```typescript
import { prisma } from '@/lib/db';

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json({ users });
}
```

## Rate Limiting

Consider adding rate limiting for production:

```bash
npm install @upstash/ratelimit @upstash/redis
```

Example implementation:

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function POST(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }
  
  // Handle request
}
```
