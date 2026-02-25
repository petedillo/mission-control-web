FROM oven/bun:1-alpine AS deps
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

FROM oven/bun:1-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for environment
ARG VITE_API_URL=https://mc-dev.toastedbytes.com
ARG VITE_CF_CLIENT_ID
ARG VITE_CF_CLIENT_SECRET

# Set environment variables for build
ENV NODE_ENV production
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_CF_CLIENT_ID=${VITE_CF_CLIENT_ID}
ENV VITE_CF_CLIENT_SECRET=${VITE_CF_CLIENT_SECRET}

# Build the application
RUN bun run build

# Production image - Nginx serving static files
FROM nginx:alpine

# Copy Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
