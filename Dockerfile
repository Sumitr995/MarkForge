# MarkForge — Backend + Python in one image
# Build context MUST be repo root (where backend/ and python/ are siblings)
# For Render/Fly/Koyeb set Dockerfile path = ./Dockerfile
# Base is python:3.12 because requirements.txt pins numpy==2.5.0 which needs Python >=3.12
# (node:20-slim ships Python 3.11 on Debian Bookworm -> pip fails)

FROM python:3.12-slim

# Install Node 20 (for backend tsc + runtime)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl ca-certificates gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/* \
    && node --version && npm --version && python3 --version

WORKDIR /app

# --- 1) Backend deps (cached layer) ---
COPY backend/package.json backend/package-lock.json* ./backend/
RUN cd backend && npm ci

# --- 2) Python deps (cached layer) ---
COPY python/requirements.txt ./python/requirements.txt
COPY python ./python
RUN pip3 install --break-system-packages --no-cache-dir -r python/requirements.txt

# --- 3) Backend source + build ---
COPY backend ./backend
RUN cd backend && npm run build

# Ensure upload dirs exist (ephemeral but needed at runtime)
RUN mkdir -p /app/backend/uploads/temp /app/backend/uploads/assets

WORKDIR /app/backend

ENV NODE_ENV=production
# python:3.12-slim has python at /usr/local/bin/python
ENV PYTHON_PATH=/usr/local/bin/python
ENV ASSETS_DIR=/app/backend/uploads/assets
ENV PORT=5000

EXPOSE 5000

CMD ["node", "dist/server.js"]
