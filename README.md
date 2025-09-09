
# General Purpose Bot

>A beautiful, full-stack AI chatbot app built with Next.js, Prisma, Tailwind CSS, OpenAI, and Google Auth.

---

## Features

- Modern, responsive UI with shadcn/ui and Tailwind CSS
- Google authentication (NextAuth.js)
- Chat system with persistent history (Prisma/Postgres)
- Multiple AI model support (OpenAI, Claude, etc.)
- Elegant landing page, chat, and auth flows
- Secure, production-ready setup

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rehanulHaque/general-chat-bot.git
cd general-chat-bot
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add the following (see `.env` for example):

```
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
OPENAI_API_KEY=sk-...
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...
AUTH_SECRET=...
```

### 4. Set up the database

Run Prisma migrations and generate the client:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

You can view/manage your data with Prisma Studio:

```bash
npx prisma studio
```

### 5. Start the development server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## Project Structure

- `app/` — Next.js app directory (pages, layouts, API routes)
- `components/` — UI components (shadcn/ui)
- `prisma/` — Prisma schema and migrations
- `lib/` — Utility libraries (OpenAI, Prisma, etc.)
- `public/` — Static assets

---

## Authentication

- Google OAuth via NextAuth.js
- Credentials stored in `.env` (`AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_SECRET`)

---

## Chat System

- Each user has their own chats and messages (see `prisma/schema.prisma`)
- Messages are stored in the database and loaded per chat
- Supports multiple AI models (configurable in UI)

---

## Deployment

You can deploy this app to [Vercel](https://vercel.com/) or any platform supporting Next.js and PostgreSQL.

---

## License

MIT
