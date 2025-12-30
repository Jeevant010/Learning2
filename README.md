# BlackBookEDU Backend (Fresh Scaffold)

Stack:
- Node.js + Express
- MongoDB + Mongoose
- JWT auth (users and admins via passport-jwt)
- Basic paid content + purchase records

Quick start:
1. Copy files into a new repo.
2. Create a `.env` file from `.env.example`.
3. Install deps: `npm install`
4. Start dev server: `npm run dev` (or `npm start`)

Env:
- `PORT` app port
- `MONGO_URL` connection string
- `JWT_SECRET` JWT sign/verify secret

API:
- `POST /auth/register` { phone, name, password }
- `POST /auth/login` { phone, password }
- `POST /admin/login` { email, password }
- `GET /content/:id` (Bearer token required) — returns content if purchased or free
- `POST /content/:id/purchase` (Bearer token required) — marks purchase as paid

Project layout:
- `src/index.js` server bootstrap and route mounts
- `src/models/*` Mongoose models
- `src/routes/*` Express routes
- `src/utils/tokens.js` JWT helpers