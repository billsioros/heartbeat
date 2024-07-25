# Step 1: Build the application
FROM node:20-alpine AS builder
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Step 2: Set up the production environment
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
