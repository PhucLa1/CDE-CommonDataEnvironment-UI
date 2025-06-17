This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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





# 🌐 Frontend UI for Common Data Environment (CDE)

This is the frontend for the **Common Data Environment (CDE)** system, built with **Next.js 14** and **Tailwind CSS**. It provides a modern and responsive interface to interact with the backend microservices via gRPC/gRPC-Web or REST through YARP API Gateway.

---

## 🚀 Tech Stack

| Feature       | Technology              |
|---------------|--------------------------|
| Framework     | Next.js 14 (App Router) |
| Styling       | Tailwind CSS            |
| State Mgmt    | Zustand / SWR           |
| Communication | REST / gRPC-Web         |
| Deployment    | Docker / Vercel Ready   |

---

## 📁 Folder Structure

```
/cde-frontend
  /app            # App directory (Next.js routing)
  /components     # Shared UI components
  /lib            # API clients, utilities
  /styles         # Tailwind + global styles
  /public         # Static files
  /env.local      # Environment variables
  tailwind.config.ts
  next.config.js
  README.md
```

---

## ⚙️ Getting Started

### 1. Prerequisites

- Node.js (v18 or later)
- pnpm / npm / yarn
- Backend services running (YARP Gateway, Auth, etc.)

---

### 2. Clone the Repository

```bash
git clone https://github.com/your-org/cde-frontend.git
cd cde-frontend
```

---

### 3. Install Dependencies

```bash
pnpm install
# or
npm install
```

---

### 4. Configure Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

You can point this to your YARP Gateway or another REST endpoint.

---

### 5. Run the Dev Server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✨ Features

- 🔐 Auth with JWT (Login, Register, Role-based UI)
- 📁 File Upload + Project Browser UI
- 💬 Notification UI integrated via Event Service
- ⚙️ Configurable API endpoint (REST/gRPC-web)
- 💅 Built with Tailwind CSS + custom design system

---

## 🧪 Example: API Call

Using `fetch` or `SWR` to call project list:

```ts
const res = await fetch(\`\${process.env.NEXT_PUBLIC_API_BASE_URL}/projects\`);
const data = await res.json();
```

---

## 🧰 Tools and Libraries

- **Next.js 14** (App Router, SSR/ISR support)
- **Tailwind CSS** (Utility-first CSS)
- **Heroicons** (Beautiful SVG icons)
- **SWR** or `react-query` (Data fetching)
- **Zustand** (Lightweight global state)
- **clsx**, **@headlessui/react**, **framer-motion** (UI experience)

---

## 🧱 Deployment

To deploy on Vercel:

```bash
vercel --prod
```

Or using Docker:

```Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["npm", "start"]
```

---

## 🧑‍💻 Contribution

Feel free to fork the repo and make PRs! Make sure to follow the Tailwind style conventions.

---

## 📄 License

MIT License © 2025 Your Name / Organization

