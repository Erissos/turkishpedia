# Turkishpedia

Production-ready platform for Turkish culture, history, and travel routes.

## Structure

- backend/: Django Monolith (Templates + DRF API)
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
2) Start docker services: `docker compose up --build`
3) Access the site at http://localhost:8000
4) Access Admin at http://localhost:8000/admin/

## Production notes

- Configure proper secrets and allowed hosts
- Use a managed PostgreSQL and Redis
- Set DEBUG to False
- Configure static and media storage
- Enable monitoring and error tracking
