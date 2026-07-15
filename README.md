# AI Search Engine (React + TypeScript + Tailwind CSS v4)

An advanced, real-time AI-powered search engine frontend client. This SPA is built using **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS v4** featuring a modular, feature-based architecture and custom reusable UI components.

---

## 🚀 Key Features

* **Real-time Answer Streaming**: Integrates EventSource/fetch readers to parse FastAPI **Server-Sent Events (SSE)** token-by-token with user abort capabilities.
* **Scalable Multi-Conversation Threads**: Persistent local storage thread logging with inline title renaming and sidebar list deletion.
* **Protected Session Guarding**: Secure JWT authentication containing route defensive wrapper guards, login/signup forms, and Axios interceptors for automated header injections and session expiries (HTTP 401 logouts).
* **Rich Citation Indexing**: Interactive search result source cards displaying website favicons (via Google Favicon API) and hostname badges with load-fail Globe icon fallbacks.
* **Interactive Follow-up Suggestions**: Suggested query chips rendering at the end of response streams, driven by backend data or triggered by smart frontend keyword fallback matching.
* **Flexible File Exporters**: Direct browser-side Blob builders allowing conversations to download as Markdown (`.md`), Plain Text (`.txt`), or JSON (`.json`) files.
* **Premium Design System**: Fully responsive double-panel sliding layouts styled with glassmorphism overlays and an obsidian dark mode theme.

---

## 🛠️ Tech Stack

* **UI Framework**: React 19 (Functional Components, Hooks, Context API)
* **Build System**: Vite 8 & TypeScript 6
* **Styles**: Tailwind CSS v4 (Vanilla custom design tokens)
* **Navigation**: React Router DOM v7 (Path parameter dynamic synchronization)
* **Parsing Utilities**: React Markdown, Remark GFM, Rehype Raw (for safe HTML markup), Lucide React (Icons)
* **Syntax Highlighting**: React Syntax Highlighter (Prism themed code blocks with copy-to-clipboard buttons)

---

## ⚙️ Project Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root folder (see [.env.example](.env.example) for baseline keys):
```env
# URL endpoint where the FastAPI server is running
VITE_API_URL=http://127.0.0.1:8000
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 🌐 Production Deployment Guide

### Vercel / Netlify
1. Connect this repository to your Vercel/Netlify account.
2. Set the build command to `npm run build` and output directory to `dist`.
3. Add the production API endpoint address as the environment variable: `VITE_API_URL=https://your-fastapi-backend.herokuapp.com`.

### GitHub Pages (Subfolder Base Hosting)
If hosting inside a GitHub Pages subfolder (e.g. `https://<username>.github.io/<repo-name>/`), you must update `vite.config.ts` to include the base path:
```typescript
export default defineConfig({
  base: "/<repo-name>/",
  // ... other configs
});
```
