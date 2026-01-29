# Fresvik Produkt (Django + React + Postgres)

This repo sets up a Django API with Jazzmin admin, a Vite + React frontend, and PostgreSQL via Docker Compose.

## Quick start (Docker)

1) Start services:

```
docker compose up --build
```

2) Run migrations and load the initial data:

```
docker compose exec backend python manage.py migrate
```

```
docker compose exec backend python manage.py loaddata products/fixtures/initial_data.json
```

3) Create an admin user:

```
docker compose exec backend python manage.py createsuperuser
```

4) Open the apps:

- Frontend: http://localhost:5173
- API: http://localhost:8000/api/products/fresvik-pir-panel/
- Admin: http://localhost:8000/admin/

## Frontend background image

The hero section expects a local background image at:

```
frontend/public/hero-bg.jpg
```

Drop the provided photo there to use it as the hero background.

## Local (non-Docker)

Backend:

```
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata products/fixtures/initial_data.json
python manage.py createsuperuser
python manage.py runserver
```

Frontend:

```
cd frontend
npm install
npm run dev
```
