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
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
