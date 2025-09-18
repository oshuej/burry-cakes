# syntax=docker/dockerfile:1

FROM node:20-bullseye-slim AS build

ENV NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime

RUN apk add --no-cache bash gettext \
    && mkdir -p /etc/nginx/templates

WORKDIR /

COPY --from=build /app/build /usr/share/nginx/html
COPY docker/entrypoint.sh /entrypoint.sh
COPY docker/nginx/default.conf.template /etc/nginx/templates/default.conf.template

RUN chmod +x /entrypoint.sh

EXPOSE 80
ENV ENV_FILE=/etc/burry-cakes/.env

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]