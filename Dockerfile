# STAGE 1
FROM node:12.2.0-alpine as build-stage
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# install dependencies
COPY package.json yarn.lock ./
RUN yarn

# copy source and build
COPY . ./
RUN yarn build



# Stage 2 - the production environment
FROM nginx:1.12-alpine
ARG BACKEND_URL
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY --from=build-stage /app/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/docker-starter.sh docker/create_config.sh /
EXPOSE 80
CMD ["docker-starter.sh"]