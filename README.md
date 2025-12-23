<div align="center">
  <h1>nexio — Proof-Based Talent Platform</h1>
  <p>Show evidence, not claims. Build a proof profile, search roles, and share your public portfolio.</p>
</div>

## What’s inside
- React 19 + Vite + TypeScript
- React Router (hash routing for static hosting)
- TanStack Query for data fetching/caching
- Axios client with `withCredentials` for cookie auth

## Features (UX overview)
- Landing page: marketing entry with CTA to sign up/login.
- Auth: signup/login (email field labeled “Gmail”, payload uses `gmail`) and simulated Google login.
- Dashboard (protected): stats, applications, challenges, proof highlights, recommended steps, share link.
- Profile Editor (protected): update country/street/bio, manage skills (name/level), and experience.
- Public Profile: public-facing portfolio at `/#/u/:username` with avatar, stats, proof highlights.
- Search: public job search with filters and match badges.

## Routes
- Public: `/`, `/login`, `/signup`, `/u/:username`, `/search`
- Protected (via `ProtectedRoute` + `AuthContext`): `/dashboard`, `/profile/edit`

## Environment
Create `.env.local` (or `.env`) with:
```
VITE_API_BASE_URL=https://nexios-omega.vercel.app   # backend base URL (must include protocol)
VITE_GOOGLE_CLIENT_ID=your-google-client-id         # optional, for real Google auth
```
Restart dev server after changing envs.

## Run locally
1) Install deps: `npm install`  
2) Start dev server: `npm run dev`  
3) Open the URL Vite prints (hash routing, default localhost:5173/3000).  
4) Build for production: `npm run build` (outputs to `dist`), preview: `npm run preview`.

## API contract (frontend expects)
- Auth:  
  - `POST /api/auth/signup { username, gmail, password }`  
  - `POST /api/auth/login { gmail, password }`  
  - `POST /api/auth/google { token }`  
  - `POST /api/auth/logout`
- User:  
  - `GET /api/users/me`  
  - `PUT /api/users/me { country, street, bio }`
- Skills:  
  - `POST /api/users/me/skills { name, level }`  
  - `PATCH /api/users/me/skills/:skillId { name?, level? }`  
  - `DELETE /api/users/me/skills-delete/:skillId`
- Experience:  
  - `POST /api/users/me/experience { title, company, startDate, endDate?, isCurrent?, description? }`  
  - `PUT /api/users/me/experience/:experienceId { ...fields }`  
  - `DELETE /api/users/me/experience/:experienceId`
- Analytics: `GET /api/users/me/analytics`
- Public:  
  - `GET /api/public/users/:username`  
  - `GET /api/public/search?query&skill&country&page&limit`

Backend requirements for auth:
- Set session cookies with `SameSite=None; Secure; HttpOnly; Path=/`.
- CORS: `Access-Control-Allow-Credentials: true` and `Access-Control-Allow-Origin: https://nexios-uno.vercel.app` (or your deployed frontend origin).

## Code map
- `App.tsx` — route wiring + lazy loaded pages + ProtectedRoute.
- `context/AuthContext.tsx` — auth state, `/api/users/me` bootstrap, logout/Google helpers.
- `lib/axios.ts` — axios instance with credentials + 401 handler.
- `pages/*` — landing, auth, dashboard, profile editor, public profile, search.
- `components/*` — layout shell, stat cards.
- `types/index.ts` — TypeScript shapes for user/skill/experience.
