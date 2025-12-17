FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Environment variables will be passed at runtime
ENV ADMIN_PASSWORD=${ADMIN_PASSWORD}
ENV JWT_SECRET=${JWT_SECRET}
ENV MONGO_URI=${MONGO_URI}
ENV PORT=5000

CMD ["gunicorn", "--worker-class", "gthread", "--threads", "4", "--bind", "0.0.0.0:5000", "app:app"]
