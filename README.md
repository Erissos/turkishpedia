# Turkishpedia

Production-ready, API-first platform for Turkish culture, history, and travel routes.

## Structure

- backend/: Django + DRF API
- frontend/: Next.js App Router + TypeScript + Tailwind
- docker-compose.yml: local orchestration

## Backend apps

- accounts: users, roles, profiles
- articles: knowledge base with revisions and moderation
- tourism: cities and places
- routes: itineraries and multi-stop routes
- comments: comments and ratings
- core: bookmarks and contributions

## Local setup

1) Copy .env.example to .env and adjust values
2) Start docker services
3) Run database migrations
4) Create admin user
5) Start backend and frontend

## Production notes

- Configure proper secrets and allowed hosts
- Use a managed PostgreSQL and Redis
- Set DEBUG to False
- Configure static and media storage
- Enable monitoring and error tracking
