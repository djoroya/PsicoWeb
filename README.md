# PsicoWeb - Clínica de Psicología

Aplicación completa para una clínica de psicología con frontend en React + Vite y backend en Flask con MongoDB. Incluye web pública, panel de administración protegido con JWT y soporte para sistema de reservas externo.

## Estructura
- **backend**: API Flask con blueprints públicos y de administración, conexión centralizada a MongoDB usando `pymongo`.
- **frontend**: React + Vite con `react-router-dom`, Context API para autenticación y panel de gestión.
- **docker-compose.yml**: Servicios para MongoDB, backend y frontend (Nginx como SPA con proxy a `/api`).

## Colecciones MongoDB
- `settings`
- `psychologists`
- `services`
- `treatments`
- `blog_posts`
- `bookings` (solo referencia de reservas externas)
- `users` (autenticación básica)

## Puesta en marcha
1. Clonar el repositorio y asegurarse de tener Docker y Docker Compose instalados.
2. Configurar variables opcionales en `.env`:
   - `ADMIN_PASSWORD` (contraseña del panel, por defecto `admin123`).
   - `MONGO_DB` y `MONGO_URI` si se requiere personalizar la base de datos.
3. Levantar los servicios:
   ```bash
   docker-compose up --build
   ```
4. Acceder a:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000/api

## Autenticación
- Login de administrador: usuario `admin` y la contraseña definida en `ADMIN_PASSWORD`.
- Tokens JWT guardados en `localStorage` y usados en el panel para proteger rutas `/admin/*`.

## Reservas externas
- Configurar desde el panel Admin > Settings el `booking_url` (por ejemplo SimplyBook o Calendly) y un `booking_api_key` opcional.
- La página pública `/reservar` muestra botón e iframe hacia la URL configurada.
- Webhook disponible en `POST /api/webhooks/bookings` para almacenar referencias de reservas externas.

## Scripts útiles
- Backend local (sin Docker):
  ```bash
  cd backend
  python app.py
  ```
- Frontend local:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
