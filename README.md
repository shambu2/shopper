# E-Commerce Platform

> A modern, scalable e-commerce platform built with Next.js and PostgreSQL, featuring Google OAuth authentication with NextAuth.js and fully Dockerized for easy deployment.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Docker](https://img.shields.io/badge/docker-ready-brightgreen.svg)

![Alt text](./public/landingpage.png)
![Alt text](./public/collection.png)
![Alt text](./public/footer.png)



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


2. **Run migrations**

```bash
npx prisma migrate dev --name init
```

3. **Generate Prisma Client**

```bash
npx prisma generate
```

4. **Seed database (optional)**

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



**Built with using Next.js, PostgreSQL, NextAuth.js, Docker, and GCP Cloud Storage**