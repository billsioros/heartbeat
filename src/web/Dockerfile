FROM node:20-alpine AS builder
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:stable-alpine

RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    location / { \
    root /usr/share/nginx/html; \
    try_files $uri $uri/ /index.html; \
    index index.html index.htm; \
    } \
    }' > /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
