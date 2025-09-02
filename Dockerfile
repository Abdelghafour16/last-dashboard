# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# Use npm install since the repository does not include a package-lock.json
RUN npm install --no-audit --no-fund

# Build-time environment variables for Vite (only VITE_* are consumed)
ARG VITE_MQTT_URL
ARG VITE_MQTT_USERNAME
ARG VITE_MQTT_PASSWORD
ARG VITE_MQTT_TOPIC
ENV VITE_MQTT_URL=$VITE_MQTT_URL \
    VITE_MQTT_USERNAME=$VITE_MQTT_USERNAME \
    VITE_MQTT_PASSWORD=$VITE_MQTT_PASSWORD \
    VITE_MQTT_TOPIC=$VITE_MQTT_TOPIC
COPY . .
RUN npm run build

# Runtime stage
FROM nginx:alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK CMD wget -qO- http://localhost/ || exit 1 