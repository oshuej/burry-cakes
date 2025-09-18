# Работа с Docker

Документ описывает, как собрать и запустить production-образ приложения Burry Cakes, а также как настроить публикацию контейнера в приватный реестр (например, Harbor).

## Переменные окружения
Контейнер читает значения из переменных окружения. Их можно передать напрямую (`docker run -e VAR=value`) или через файл `.env`. По умолчанию образ ищет файл по пути `/etc/burry-cakes/.env`, путь можно переопределить переменной `ENV_FILE`.

| Переменная | Назначение | Значение по умолчанию |
| --- | --- | --- |
| `APP_API_BASE_URL` | URL базовой конечной точки API, которую опрашивает пользовательский интерфейс | `https://www.burrycakes.ru/api/v1/mini-app` |
| `APP_ADMIN_API_BASE_URL` | URL конечной точки административного API | `https://www.burrycakes.ru/api/v1/mini-app/admin/panel` |
| `APP_BASE_URL` | Базовый префикс роутера (используется, если приложение публикуется не в корне домена) | `/` |
| `NGINX_SERVER_NAME` | Значение директивы `server_name` в nginx | `_` |
| `NGINX_LISTEN_PORT` | Порт, на котором nginx принимает входящие соединения внутри контейнера | `80` |
| `ENV_FILE` | Путь до файла с переменными окружения, который загружается при запуске контейнера | `/etc/burry-cakes/.env` |

Пример `.env` для production:
```env
APP_API_BASE_URL=https://api.example.com/mini-app
APP_ADMIN_API_BASE_URL=https://api.example.com/mini-app/admin/panel
APP_BASE_URL=/mini-app
NGINX_SERVER_NAME=mini-app.example.com
```

## Сборка образа
### Локально
```bash
docker build -t burry-cakes:local .
```

### Запуск контейнера
```bash
docker run -d \
  --name burry-cakes \
  --env-file ./deploy.env \
  -p 8080:80 \
  burry-cakes:local
```

После запуска приложение будет доступно по адресу http://localhost:8080. Файл `deploy.env` должен содержать переменные окружения из таблицы выше.

## Docker Compose
В репозитории предусмотрены два файла:
- `docker-compose.yml` — запуск готового образа из реестра
- `docker-compose.local.yml` — сборка из исходников и запуск локальной версии

Перед запуском скопируйте `.env.example` в `.env` (или `.env.local` для локального файла) и при необходимости скорректируйте значения.

Пример запуска локальной версии с одновременным чтением `.env.local`:
```bash
docker compose -f docker-compose.local.yml --env-file .env.local up --build
```

## Публикация в приватный реестр
GitLab CI использует переменные, которые можно настроить для публикации образа в Harbor или другой приватный реестр:
- `DOCKER_REGISTRY` — URL реестра (например, `harbor.example.com`)
- `DOCKER_IMAGE` — итоговый путь образа (`harbor.example.com/library/burry-cakes`)
- `DOCKER_USERNAME` и `DOCKER_PASSWORD` — учётные данные для входа

Если переменные не заданы, конвейер использует значения по умолчанию из GitLab (`CI_REGISTRY`, `CI_REGISTRY_IMAGE`, `CI_REGISTRY_USER`, `CI_REGISTRY_PASSWORD`).

## Обновление образа вручную
Для публикации из локальной машины выполните:
```bash
docker build -t harbor.example.com/library/burry-cakes:latest .
docker login harbor.example.com
docker push harbor.example.com/library/burry-cakes:latest
```

После загрузки обновите службу, использующую образ (например, выполните `docker compose pull` и `docker compose up -d`).
