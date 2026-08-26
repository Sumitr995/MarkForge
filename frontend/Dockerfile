# Build stage
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile
COPY . .
ARG VITE_API_URL
ARG VITE_API_PUBLIC_URL
ARG VITE_SITE_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_PUBLIC_URL=$VITE_API_PUBLIC_URL
ENV VITE_SITE_URL=$VITE_SITE_URL
RUN bun run build

# Serve stage — tiny nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
