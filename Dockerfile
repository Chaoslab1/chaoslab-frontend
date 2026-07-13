# Multi-stage build for Docusaurus documentation portal
# Stage 1: Build the documentation
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies for better npm performance
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package*.json ./

# Install dependencies with frozen lockfile
RUN npm ci --only=production --ignore-scripts && \
    npm cache clean --force

# Copy source files
COPY . .

# Build the static site
RUN npm run build

# Remove development files
RUN rm -rf node_modules src

# Stage 2: Production runtime with nginx
FROM nginx:1.27-alpine

# Add labels for metadata
LABEL maintainer="Chaoslab Team" \
      description="Chaoslab API Documentation Portal" \
      version="1.0.0"

# Install curl for health checks
RUN apk add --no-cache curl

# Create nginx user with specific UID/GID for security
RUN addgroup -g 101 -S nginx && \
    adduser -S -D -H -u 101 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx || true

# Copy built files from builder stage
COPY --from=builder --chown=nginx:nginx /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

# Remove default nginx config
RUN rm -f /etc/nginx/conf.d/default.conf.bak

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Create nginx cache and log directories with proper permissions
RUN mkdir -p /var/cache/nginx/client_temp && \
    mkdir -p /var/log/nginx && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Switch to non-root user
USER nginx

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
