<div align="center"> <h1> 🎬 Cinera </h1> <p><strong>A premium cinematic discovery platform for the modern user.</strong></p> </div>

## 🌟 Overview

Cinera is a high-performance, aesthetically driven media discovery engine. It bridges the gap between massive streaming libraries and the user through a curated, immersive interface. Designed with an "innovative front-end" philosophy, Cinera prioritizes visual storytelling, utilizing fluid motion, intelligent asset pre-caching, and a scalable architecture to provide a native-app feel on the web.

The project leverages a Progressive Web App (PWA) architecture, ensuring your watchlist and discovery feed are accessible anywhere, with a heavy emphasis on "binary" loading states to maintain visual integrity.


## Snapshot 📸
![Cinera](https://github.com/user-attachments/assets/8c2ec667-71d4-4801-921e-16fac6bd410d)




## 🛠 Tech Stack
- [React](https://react.dev) – Core UI framework.
- [TanStack Query](https://tanstack.com/query/latest) – Server-state management for seamless data fetching and caching.
- [Supabase](https://supabase.com/) - Backend-as-a-Service for PostgreSQL and Secure Authentication
- [Vite](https://vitejs.dev/) - Next-generation frontend tooling for an ultra-fast development experience.
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for styling and responsive design  
- [GSAP](https://gsap.com/) – Implementation of subtle, purposeful animations to enhance UX without distracting from productivity.  
- [Vite-PWA](https://vite-pwa-org.netlify.app/) – Transforming the web experience into a high-performance installable application.
- [Vercel](https://vercel.com/) – Hosting and deployment platform for seamless CI/CD  

## 🚀 Key Features
- **Cinematic Hero Engine**: An auto-rotating showcase with intelligent parallel pre-loading of backdrop and preview assets to eliminate progressive loading artifacts.
- **Global Search & Infinite Scroll**: Real-time discovery powered by TMDB, featuring debounced queries and smooth pagination via Intersection Observer.
- **PWA Ready**: Installable on desktop and mobile for a native-app feel.
- **Smart Bookmarking**: A secure watchlist system utilizing a composite key architecture to ensure data integrity


## How to run locally 💻

Follow these steps to run Cinera on your local machine.

### Clone this repository

```bash
git clone https://github.com/Pappyjay23/Cinera.git
```

### Navigate to the directory

```bash
cd Cinera
```

### Install Dependencies

```bash
npm install
```

### Environment Setup
Create a ```.env``` file in the root directory and add your credentials:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_TMDB_READ_ACCESS_TOKEN=your_tmdb_token
```

### Run

Run the development server to view the app.

```bash
npm run dev
```

Now, you can navigate to http://localhost:5173/ to view the app.

### Build

```bash
npm run build
```

## Credits ✍

Implementation by [@Pappyjay23](https://github.com/Pappyjay23)
