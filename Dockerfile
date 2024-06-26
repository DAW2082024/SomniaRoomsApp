# Base Node Environment.
FROM node:21.7-alpine3.19 as app-base
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
COPY . ./

# Dev environment.
FROM app-base as final-dev
RUN npm install
ENV CHOKIDAR_USEPOLLING=true
CMD ["npm", "run", "dev"]

# Build app for production.
FROM app-base as builder
RUN npm ci && npm run build

# production environment
FROM nginx:stable-alpine as final-prod
COPY --from=builder /app/dist /usr/share/nginx/html
COPY /public /usr/share/nginx/html/public
COPY scripts/env.sh /docker-entrypoint.d/env.sh
EXPOSE 80
RUN chmod +x /docker-entrypoint.d/env.sh
CMD ["nginx", "-g", "daemon off;"]
