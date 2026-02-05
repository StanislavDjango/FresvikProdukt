# Fresvik (Django + React + Postgres)

Minimal setup for a Django API, a Vite + React frontend, and Postgres via Docker Compose.

## Docker quick start

1) Build and start services:

```
docker compose up --build
```

2) Run migrations:

```
docker compose exec backend python manage.py migrate
```

3) (Optional) Load demo data:

```
docker compose exec backend python manage.py loaddata products/fixtures/initial_data.json
```

4) Create an admin user:

```
docker compose exec backend python manage.py createsuperuser
```

## Frontend

```
cd frontend
npm install
npm run dev
```

Environment variable for API:

```
VITE_API_URL=http://localhost:8000/api/v1/
```

## API schema (OpenAPI)

Schema JSON:

```
http://localhost:8000/api/schema/
```

Swagger UI:

```
http://localhost:8000/api/docs/
```
