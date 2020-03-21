# STAGE 1
FROM node:12.2.0-alpine as build-deps
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# install dependencies
COPY package.json yarn.lock ./
RUN yarn

# copy source and build
COPY . ./
RUN yarn build

# start app
CMD ["npm", "start"]

# -------------------

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]