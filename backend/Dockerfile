# MarkForge Backend Dockerfile
# NOTE: Build context MUST be repo root, not backend/
# Render: set Root Directory = "" (empty) and Dockerfile Path = ./backend/Dockerfile
# Fly/Koyeb/CLI: docker build -f backend/Dockerfile .
# Base is python:3.12 because requirements.txt pins numpy==2.5.0 which needs Python >=3.12

FROM python:3.12-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl ca-certificates gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/* \
    && node --version && npm --version && python3 --version

WORKDIR /app

COPY backend/package.json backend/package-lock.json* ./backend/
RUN cd backend && npm ci

COPY python/requirements.txt ./python/requirements.txt
COPY python ./python
RUN pip3 install --break-system-packages --no-cache-dir -r python/requirements.txt

COPY backend ./backend
RUN cd backend && npm run build

RUN mkdir -p /app/backend/uploads/temp /app/backend/uploads/assets

WORKDIR /app/backend

ENV NODE_ENV=production
ENV PYTHON_PATH=/usr/local/bin/python
ENV ASSETS_DIR=/app/backend/uploads/assets
ENV PORT=5000

EXPOSE 5000

CMD ["node", "dist/server.js"]
