#!/bin/sh
set -euo pipefail

ENV_FILE_PATH="${ENV_FILE:-/etc/burry-cakes/.env}"
if [ -f "$ENV_FILE_PATH" ]; then
  echo "Загружаю переменные окружения из $ENV_FILE_PATH"
  # shellcheck disable=SC1090
  set -a
  . "$ENV_FILE_PATH"
  set +a
fi

: "${APP_API_BASE_URL:=https://www.burrycakes.ru/api/v1/mini-app}"
: "${APP_ADMIN_API_BASE_URL:=https://www.burrycakes.ru/api/v1/mini-app/admin/panel}"
: "${APP_BASE_URL:=/}"
: "${NGINX_SERVER_NAME:=_}"
: "${NGINX_LISTEN_PORT:=80}"

# Генерация runtime-конфига для фронтенда
cat <<RUNTIME_CONFIG > /usr/share/nginx/html/runtime-config.js
window.__APP_CONFIG__ = {
  apiBaseUrl: "${APP_API_BASE_URL}",
  adminApiBaseUrl: "${APP_ADMIN_API_BASE_URL}",
  appBaseUrl: "${APP_BASE_URL}"
};
RUNTIME_CONFIG

# Генерация конфигурации nginx из шаблона
if [ -f /etc/nginx/templates/default.conf.template ]; then
  mkdir -p /etc/nginx/conf.d
  envsubst '${NGINX_SERVER_NAME} ${NGINX_LISTEN_PORT}' \
    < /etc/nginx/templates/default.conf.template \
    > /etc/nginx/conf.d/default.conf
fi

exec "$@"
