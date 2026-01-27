# Studio Landing Backend

Starter template for an **Express + Sequelize** service with modular folders, Dockerized PostgreSQL, and auto-generated Swagger docs.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation](#installation)
- [NPM Scripts](#npm-scripts)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Swagger Docs](#swagger-docs)

## Tech Stack
| Component | Version / Notes |
|-----------|-----------------|
| Node.js | ≥ 18  |
| Express | 4 |
| Sequelize + pg | v6 + v8 (PostgreSQL dialect) |
| TypeScript | 5 |
| Nodemon + ts-node | Dev server with hot reload |
| Swagger (`swagger-jsdoc` + `swagger-ui-express`) | OpenAPI auto-generation |
| Docker Compose | Local PostgreSQL runtime |

## Project Structure
```
src/
 ├─ docs/                   # swagger-jsdoc bootstrap
 ├─ middlewares/            # Shared middleware (logger, error handler)
 ├─ models/                 # Sequelize initialization
 ├─ utils/                  # Configs & constants (app/db/swagger)
 └─ index.ts                # Entry point (bootstrap + listen)

docker-compose.yaml         # PostgreSQL container with volume ./postgres_data
```

## Requirements
- [Node.js 18+](https://nodejs.org/en/download)
- [npm 9+](https://www.npmjs.com/) (bundled with Node)
- [Docker Desktop / Docker Engine](https://www.docker.com/products/docker-desktop/) for the local DB
- Populated `.env`

## Installation
**Clone the repository** – grabs the backend sources locally.
```bash
git clone https://github.com/CodeByteNet/stack-overflow-backend.git
```
 
 **Enter the project folder** – all commands below assume this as the working directory
```bash
cd stack-overflow-backend
```
**Install dependencies** - pulls Node/Express/Sequelize packages defined in `package.json`
```bash
npm install
```
### Development
 **Start dev server** – runs ts-node, hot reload, and file watching.
   ```bash
   npm run dev
   ```

### Production / Preview
 **Build production bundle** – compiles TypeScript to `dist`.
   ```bash
   npm run build
   ```

## NPM Scripts
| Script | Description |
|--------|-------------|
| `npm run dev:app` | Nodemon + ts-node with hot reload |
| `npm run dev:db` | Start PostgreSQL via `docker compose up -d` |
| `npm run dev` | Runs `dev:db` and then `dev:app` |
| `npm run build` | Compile TypeScript + run `tsc-alias` |
| `npm start` | Alias for `npm run preview` |

> First-time workflow: run `npm run dev:db`, then in another terminal `npm run dev:app`.  
> Health check responds at `http://localhost:3000/health` (configure via `.env`).

## Environment Variables
Loaded through `dotenv` (`src/utils/config/applicationConfig/index.ts`, `src/utils/config/index.ts`).

### Bootstrapping `.env`
 **Copy template env** – duplicates the example configuration into a real `.env` file.
   ```bash
   cp .env.example .env
   ```
 **Edit `.env`** – replace placeholder values with real secrets/credentials.

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Express HTTP port | `3000` |
| `HOST` | Interface to bind Express (for Vite/remote access) | `0.0.0.0` |
| `NODE_ENV` | `development` / `staging` / `production` | `development` |
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_NAME` | Database name | `studio_landing` |
| `DB_USERNAME` | DB user | `postgres` |
| `DB_PASSWORD` | DB password | `postgres` |
| `DB_DIALECT` | Sequelize dialect | `postgres` |
| `DB_LOGGING` | SQL logging (true/false) | `false` |


## Database
- `docker-compose.yaml` spins up `postgres:16` with data stored in `./postgres_data`.  
- The `postgres_data/` directory is listed in `.gitignore`, so database files stay local.
- You can point to any external server by adjusting the `DB_*` variables.

## Swagger Docs
- OpenAPI config lives in `src/utils/config/swagger/index.ts`.  
- The specification is generated automatically via `swagger-jsdoc` (`src/docs/swagger/index.ts`).
- Swagger UI is served at `http://localhost:<PORT>/docs`.
- To document a new endpoint, add an `@openapi` comment above the route (see `src/routes/Health`).

That’s it—after `npm run dev`, the API listens on `http://localhost:3000` and docs are available at `http://localhost:3000/docs`.