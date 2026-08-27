# MarkForge — Backend + Python in one image
# Build context MUST be repo root (where backend/ and python/ are siblings)
# For Render/Fly/Koyeb set Dockerfile path = ./Dockerfile

FROM node:20-slim

# Python + pip (Debian slim has no python by default)
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip python3-venv \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# --- 1) Backend deps (cached layer) ---
COPY backend/package.json backend/package-lock.json* ./backend/
RUN cd backend && npm ci

# --- 2) Python deps (cached layer) ---
COPY python/requirements.txt ./python/requirements.txt
COPY python ./python
# --break-system-packages needed on Debian; --no-cache-dir keeps image small
RUN pip3 install --break-system-packages --no-cache-dir -r python/requirements.txt

# --- 3) Backend source + build ---
COPY backend ./backend
RUN cd backend && npm run build

# Ensure upload dirs exist (ephemeral but needed at runtime)
RUN mkdir -p /app/backend/uploads/temp /app/backend/uploads/assets

WORKDIR /app/backend

ENV NODE_ENV=production
# These defaults match markdown.service.ts fallbacks — override in Render/Fly env
ENV PYTHON_PATH=/usr/bin/python3
ENV ASSETS_DIR=/app/backend/uploads/assets
ENV PORT=5000

EXPOSE 5000

CMD ["node", "dist/server.js"]
