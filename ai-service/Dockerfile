# Production Dockerfile for RELIX AI Service
FROM python:3.11-slim

# Allow statements and errors to be immediately logged to Cloud Logging
ENV PYTHONUNBUFFERED True

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

# Install production dependencies.
RUN pip install --no-cache-dir -r requirements.txt

# Run the web service on container startup.
# Cloud Run sets the PORT environment variable to 8080 by default.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
