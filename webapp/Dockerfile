# Step 1: Build the application
FROM node:16.17.1 AS builder
WORKDIR /app
COPY package.json ./
RUN npm i

ENV GENERATE_SOURCEMAP=false

COPY . .

RUN CI=false npm run build:prod

# Step 2: Set up the production environment
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/src/sw-custom.js /usr/share/nginx/html/

EXPOSE 8080

ARG WEBAPP_BUILD_TYPE="docker_frontm"
ENV BUILD_TYPE=$WEBAPP_BUILD_TYPE

CMD ["nginx", "-g", "daemon off;"]


