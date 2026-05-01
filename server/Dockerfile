# Production Dockerfile for RELIX Backend
FROM node:20-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
# Cloud Run sets the PORT environment variable to 8080 by default.
ENV PORT 8080
EXPOSE 8080

CMD [ "npm", "start" ]
