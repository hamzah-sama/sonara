# Sonara

AI-powered text-to-speech platform inspired by modern voice generation tools like ElevenLabs.

Built with a modern full-stack TypeScript architecture using Next.js, tRPC, Prisma, PostgreSQL, and Chatterbox-based voice generation workflows.

---

## Features

- AI-powered text-to-speech generation
- Voice generation workflow management
- Audio upload and storage system
- Secure authentication and user management
- Subscription-ready SaaS architecture
- Audio playback and waveform visualization
- Responsive modern dashboard UI
- Type-safe API architecture with tRPC + Zod

---

## Tech Stack

### Frontend
- React 19
- Next.js 16
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Wavesurfer.js

### Backend
- Node.js
- tRPC
- Prisma ORM
- PostgreSQL

### Infrastructure & Services
- AWS S3
- Clerk Authentication
- Polar Billing
- Chatterbox TTS

---

## Architecture Highlights

- End-to-end type safety with tRPC and Zod
- Modular API architecture
- Server/client separation using Next.js App Router
- Audio processing and metadata workflows
- Scalable cloud-based file storage using AWS S3
- Production-style SaaS authentication and billing flows

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/hamzah-sama/sonara.git
cd sonara
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=


R2_ACCOUNT_ID=    
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=

DATABASE_URL=


HF_TOKEN=
CHATTER_BOX_API_KEY=
CHATTER_BOX_API_URL=
CHATTERBOX_ALLOWED_ORIGINS=


POLAR_ACCESS_TOKEN=
POLAR_SERVER=
POLAR_PRODUCT_ID=

APP_URL=


```

### Run the development server

```bash
npm run dev
```

---

## Project Goals

Sonara was built to explore modern AI audio workflows, scalable SaaS architecture, and production-grade TypeScript development patterns.

The project focuses on:
- AI product engineering
- audio generation systems
- scalable frontend architecture
- type-safe APIs
- modern developer experience

---

## Status

Actively developed and continuously improved.

---

## License

MIT