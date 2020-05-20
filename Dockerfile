# =====================
# Stage 1 - build react app using node and yarn
FROM node:12.2.0-alpine as builder
WORKDIR /app

# install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# copy source and build
COPY . ./
RUN npm run build

# =====================
# Stage 2 - webserver with nginx
FROM nginx:1.12-alpine
ARG REACT_APP_BACKEND_URL
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]