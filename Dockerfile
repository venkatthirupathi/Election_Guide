# ── Stage 1: build (nothing to compile — pure static) ────────────────────────
FROM nginx:1.27-alpine

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy app files
COPY index.html        /usr/share/nginx/html/
COPY css/              /usr/share/nginx/html/css/
COPY js/               /usr/share/nginx/html/js/

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run injects PORT env var (default 8080); nginx reads it at startup
ENV PORT=8080
EXPOSE 8080

# Replace $PORT in nginx config at container start, then run nginx
CMD ["/bin/sh", "-c", \
  "sed -i 's/__PORT__/'\"$PORT\"'/g' /etc/nginx/conf.d/default.conf && \
   nginx -g 'daemon off;'"]
