# React + Flask Hello World

This project is a simple Hello World application with a React frontend and a Flask backend, containerized with Docker and orchestrated with Docker Compose.

## Structure

- **backend**: Flask application serving a JSON API.
- **frontend**: React application (Vite) serving the UI and fetching data from the backend.
- **docker-compose.yml**: Orchestration for running both services.

## Running Locally

To run the application locally using Docker Compose:

```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:8081
- Backend: http://localhost:5000

## Deploying to Coolify

1. Create a new project in Coolify.
2. Add a new resource -> **Docker Compose**.
3. Select the repository containing this code.
4. Coolify will detect the `docker-compose.yml` file.
5. Deploy!

The frontend is configured to proxy requests to `/api` to the backend service within the Docker network.
