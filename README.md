# E-Commerce Platform

> A modern, scalable e-commerce platform built with Next.js and PostgreSQL, featuring Google OAuth authentication with NextAuth.js and fully Dockerized for easy deployment.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Docker](https://img.shields.io/badge/docker-ready-brightgreen.svg)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Docker Setup](#docker-setup)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [GCP Cloud Storage Setup](#gcp-cloud-storage-setup)
- [Google OAuth Configuration](#google-oauth-configuration)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

This e-commerce platform is a full-stack application that provides a seamless online shopping experience. Built with modern technologies and best practices, it features secure Google OAuth authentication via NextAuth.js, real-time cart management, order processing, and an admin dashboard for product management.

The entire application is containerized using Docker, making deployment straightforward across different environments. Product images are stored in GCP Cloud Storage for scalability and reliability.

---

## ✨ Features

- 🔐 **Google OAuth Authentication** - Secure login with NextAuth.js
- 🛒 **Shopping Cart** - Add, update, and remove items with real-time updates
- 💳 **Secure Checkout** - Complete order processing workflow
- 📦 **Product Management** - Full CRUD operations for products (Admin)
- 👤 **User Profiles** - Manage account details and view order history
- 🔍 **Product Search & Filter** - Advanced search with category filtering
- 📱 **Responsive Design** - Mobile-first, works on all devices
- 🚀 **Server-Side Rendering** - Fast page loads with Next.js SSR
- 🐳 **Fully Dockerized** - Easy deployment with Docker Compose
- 📊 **Admin Dashboard** - Manage products, orders, and users
- ☁️ **GCP Cloud Storage** - Scalable image storage
- 💾 **PostgreSQL Database** - Robust and reliable data storage

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | Next.js 14+, React 18+, Tailwind CSS |
| **Backend** | Next.js API Routes, Node.js |
| **Database** | PostgreSQL 15+ |
| **ORM** | Prisma ORM |
| **Authentication** | NextAuth.js with Google Provider |
| **Containerization** | Docker, Docker Compose |
| **Image Storage** | GCP Cloud Storage |
| **State Management** | React Context API / Zustand |
| **Payment** | Stripe (optional) |

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                           │
│                 (Browser / Mobile / Tablet)                 │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS
                           │
┌──────────────────────────┴──────────────────────────────────┐
│                   DOCKER ENVIRONMENT                        │
│                                                              │
│  ┌────────────────────────────────────────────────┐        │
│  │      NEXT.JS APPLICATION CONTAINER             │        │
│  │  - Frontend (React Components)                 │        │
│  │  - API Routes (Backend Logic)                  │        │
│  │  - NextAuth.js (Google OAuth)                  │        │
│  │  Port: 3000                                     │        │
│  └──────────────────┬─────────────────────────────┘        │
│                     │                                       │
│                     │ SQL Queries                           │
│                     │                                       │
│  ┌──────────────────▼─────────────────────────────┐        │
│  │      POSTGRESQL DATABASE CONTAINER             │        │
│  │  - Users, Products, Orders, Cart               │        │
│  │  - Sessions                                     │        │
│  │  Port: 5432                                     │        │
│  │  Volume: postgres_data                          │        │
│  └────────────────────────────────────────────────┘        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
                           │
                           │ External Services
          ┌────────────────┼────────────────┐
          │                │                │
    ┌─────▼─────┐   ┌──────▼──────┐  ┌─────▼─────┐
    │  Google   │   │ GCP Cloud   │  │  Stripe   │
    │  OAuth    │   │  Storage    │  │  Payment  │
    └───────────┘   └─────────────┘  └───────────┘
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **Docker** 20.10.x or higher
- **Docker Compose** 2.x or higher
- **Git**
- **Google Cloud Platform Account** (for Cloud Storage)
- **Google OAuth Credentials**

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ecommerce-platform.git
cd ecommerce-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Database Configuration
DATABASE_URL="postgresql://ecommerce:password@localhost:5432/ecommerce_db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-generate-with-openssl-rand-base64-32"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GCP Cloud Storage
GCP_PROJECT_ID="your-gcp-project-id"
GCP_BUCKET_NAME="your-bucket-name"
GCP_SERVICE_ACCOUNT_KEY="path/to/service-account-key.json"

# Optional: Payment Integration
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"

# Application Settings
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### 4. Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Copy the output and paste it as `NEXTAUTH_SECRET` in your `.env.local` file.

---

## 🐳 Docker Setup

### Docker Compose Configuration

The application uses Docker Compose to orchestrate two containers:
- **nextjs-app**: The Next.js application
- **postgres-db**: PostgreSQL database

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: nextjs-app
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://ecommerce:password@db:5432/ecommerce_db
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
      - GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
      - GCP_PROJECT_ID=${GCP_PROJECT_ID}
      - GCP_BUCKET_NAME=${GCP_BUCKET_NAME}
    depends_on:
      - db
    networks:
      - ecommerce-network
    volumes:
      - ./gcp-credentials:/app/gcp-credentials:ro

  db:
    image: postgres:15-alpine
    container_name: postgres-db
    environment:
      - POSTGRES_USER=ecommerce
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=ecommerce_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - ecommerce-network

volumes:
  postgres_data:

networks:
  ecommerce-network:
    driver: bridge
```

### Dockerfile

```dockerfile
FROM node:18-alpine AS base

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

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# Copy GCP credentials directory
COPY --from=builder /app/gcp-credentials ./gcp-credentials

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Build and Run with Docker

```bash
# Build the Docker images
docker-compose build

# Start the containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the containers
docker-compose down

# Stop and remove volumes (caution: deletes database data)
docker-compose down -v
```

### Docker Commands Reference

```bash
# Check running containers
docker ps

# Access app container shell
docker exec -it nextjs-app sh

# Access database container
docker exec -it postgres-db psql -U ecommerce -d ecommerce_db

# Restart specific service
docker-compose restart app

# View resource usage
docker stats
```

---

## 🔧 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `NEXTAUTH_URL` | Application base URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Secret for session encryption | Generated with `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | `xxxxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | `GOCSPX-xxxxx` |
| `GCP_PROJECT_ID` | GCP project identifier | `my-ecommerce-project` |
| `GCP_BUCKET_NAME` | Cloud Storage bucket name | `ecommerce-product-images` |
| `GCP_SERVICE_ACCOUNT_KEY` | Path to service account JSON | `./gcp-credentials/key.json` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `STRIPE_SECRET_KEY` | Stripe API secret key | - |
| `STRIPE_PUBLISHABLE_KEY` | Stripe public key | - |
| `NEXT_PUBLIC_APP_URL` | Public app URL | `http://localhost:3000` |

---

## 💾 Database Setup

### Using Prisma ORM

1. **Initialize Prisma** (if not already done)

```bash
npx prisma init
```

2. **Define your schema in `prisma/schema.prisma`**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]
  orders        Order[]
  cart          Cart?
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Product {
  id          String      @id @default(cuid())
  name        String
  description String
  price       Float
  imageUrl    String
  category    String
  stock       Int
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  orderItems  OrderItem[]
  cartItems   CartItem[]
}

model Cart {
  id        String     @id @default(cuid())
  userId    String     @unique
  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  items     CartItem[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}

model CartItem {
  id        String   @id @default(cuid())
  cartId    String
  productId String
  quantity  Int
  cart      Cart     @relation(fields: [cartId], references: [id], onDelete: Cascade)
  product   Product  @relation(fields: [productId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([cartId, productId])
}

model Order {
  id          String      @id @default(cuid())
  userId      String
  user        User        @relation(fields: [userId], references: [id])
  items       OrderItem[]
  total       Float
  status      String      @default("pending")
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model OrderItem {
  id        String   @id @default(cuid())
  orderId   String
  productId String
  quantity  Int
  price     Float
  order     Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product   Product  @relation(fields: [productId], references: [id])
}
```

3. **Run migrations**

```bash
npx prisma migrate dev --name init
```

4. **Generate Prisma Client**

```bash
npx prisma generate
```

5. **Seed database (optional)**

```bash
npx prisma db seed
```

---

## ☁️ GCP Cloud Storage Setup

### 1. Create a GCP Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your Project ID

### 2. Create a Cloud Storage Bucket

```bash
# Using gcloud CLI
gcloud storage buckets create gs://your-bucket-name \
  --project=your-project-id \
  --location=us-central1 \
  --uniform-bucket-level-access

# Set public access (for product images)
gcloud storage buckets add-iam-policy-binding gs://your-bucket-name \
  --member=allUsers \
  --role=roles/storage.objectViewer
```

Or via Console:
1. Navigate to Cloud Storage → Buckets
2. Click "CREATE BUCKET"
3. Choose a unique name
4. Select location
5. Choose storage class (Standard)
6. Set access control (Fine-grained)

### 3. Create Service Account

```bash
# Create service account
gcloud iam service-accounts create ecommerce-storage \
  --display-name="E-commerce Storage Service Account"

# Grant permissions
gcloud projects add-iam-policy-binding your-project-id \
  --member="serviceAccount:ecommerce-storage@your-project-id.iam.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"

# Create and download key
gcloud iam service-accounts keys create ./gcp-credentials/service-account-key.json \
  --iam-account=ecommerce-storage@your-project-id.iam.gserviceaccount.com
```

### 4. Install GCP Storage SDK

```bash
npm install @google-cloud/storage
```

### 5. Image Upload Utility

Create `lib/gcp-storage.js`:

```javascript
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_SERVICE_ACCOUNT_KEY,
});

const bucket = storage.bucket(process.env.GCP_BUCKET_NAME);

export async function uploadImage(file, destination) {
  const blob = bucket.file(destination);
  const blobStream = blob.createWriteStream({
    resumable: false,
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', (err) => reject(err));
    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });
    blobStream.end(file.buffer);
  });
}

export async function deleteImage(fileName) {
  await bucket.file(fileName).delete();
}
```

### 6. API Route for Image Upload

Create `app/api/upload/route.js`:

```javascript
import { NextResponse } from 'next/server';
import { uploadImage } from '@/lib/gcp-storage';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const destination = `products/${Date.now()}-${file.name}`;
    const publicUrl = await uploadImage(
      { buffer, mimetype: file.type },
      destination
    );

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
```

---

## 🔐 Google OAuth Configuration

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Click **Create Credentials** → **OAuth 2.0 Client ID**
4. Configure OAuth consent screen (if not done):
   - User Type: External
   - App name: Your E-commerce Platform
   - User support email: your-email@example.com
   - Scopes: email, profile, openid
5. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Name: E-commerce Web Client
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
6. Save Client ID and Client Secret

### 2. Configure NextAuth.js

Create `app/api/auth/[...nextauth]/route.js`:

```javascript
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'database',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

### 3. Create Sign-In Page

Create `app/auth/signin/page.jsx`:

```javascript
'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Sign in to E-commerce
        </h1>
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition"
        >
          <FcGoogle size={24} />
          <span className="font-medium">Continue with Google</span>
        </button>
      </div>
    </div>
  );
}
```

### 4. Protect Routes with Middleware

Create `middleware.js`:

```javascript
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/checkout/:path*'],
};
```

### 5. Use Session in Components

```javascript
'use client';

import { useSession, signOut } from 'next-auth/react';

export default function UserProfile() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;

  if (!session) {
    return <a href="/auth/signin">Sign in</a>;
  }

  return (
    <div>
      <p>Welcome, {session.user.name}</p>
      <img src={session.user.image} alt="Profile" />
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
```

---

## 🌐 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/signin` | Sign in page |
| POST | `/api/auth/signout` | Sign out user |
| GET | `/api/auth/session` | Get current session |
| GET | `/api/auth/callback/google` | Google OAuth callback |

### Products

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Get all products | No |
| GET | `/api/products/:id` | Get product by ID | No |
| POST | `/api/products` | Create new product | Yes (Admin) |
| PUT | `/api/products/:id` | Update product | Yes (Admin) |
| DELETE | `/api/products/:id` | Delete product | Yes (Admin) |

### Cart

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/cart` | Get user cart | Yes |
| POST | `/api/cart/items` | Add item to cart | Yes |
| PUT | `/api/cart/items/:id` | Update cart item quantity | Yes |
| DELETE | `/api/cart/items/:id` | Remove item from cart | Yes |
| DELETE | `/api/cart` | Clear cart | Yes |

### Orders

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/orders` | Get user orders | Yes |
| GET | `/api/orders/:id` | Get order details | Yes |
| POST | `/api/orders` | Create new order | Yes |

### Upload

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/upload` | Upload product image | Yes (Admin) |

---

## 📁 Project Structure

```
ecommerce-platform/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.js
│   │   ├── products/
│   │   │   ├── route.js
│   │   │   └── [id]/
│   │   │       └── route.js
│   │   ├── cart/
│   │   │   └── route.js
│   │   ├── orders/
│   │   │   └── route.js
│   │   └── upload/
│   │       └── route.js
│   ├── auth/
│   │   └── signin/
│   │       └── page.jsx
│   ├── products/
│   │   ├── page.jsx
│   │   └── [id]/
│   │       └── page.jsx
│   ├── cart/
│   │   └── page.jsx
│   ├── checkout/
│   │   └── page.jsx
│   ├── orders/
│   │   └── page.jsx
│   ├── admin/
│   │   ├── page.jsx
│   │   └── products/
│   │       └── page.jsx
│   ├── layout.jsx
│   └── page.jsx
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── CartItem.jsx
│   └── ...
├── lib/
│   ├── prisma.js
│   ├── gcp-storage.js
│   └── utils.js
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── gcp-credentials/
│   └── service-account-key.json
├── public/
│   └── images/
├── .env.local
├── .env.example
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── next.config.js
├── package.json
├── README.md
└── tailwind.config.js
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Support

For questions or support, please contact:
- Email: support@ecommerce.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/ecommerce-platform/issues)

---

**Built with ❤️ using Next.js, PostgreSQL, NextAuth.js, Docker, and GCP Cloud Storage**