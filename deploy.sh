#!/bin/bash

# Скрипт деплоя Frontend (Next.js) на сервер
set -e

echo "🚀 Начинаем деплой Frontend (Next.js)..."

# Проверяем наличие .env файла (если нужен)
if [ ! -f .env.local ] && [ ! -f .env ]; then
    echo "⚠️  Файл .env не найден, но это может быть нормально для фронтенда"
fi

# Останавливаем старые контейнеры
echo "🛑 Останавливаем старые контейнеры..."
docker-compose down

# Очищаем неиспользуемые образы перед сборкой
echo "🧹 Очищаем неиспользуемые Docker образы..."
docker system prune -f

# Собираем и запускаем новые контейнеры
echo "🔨 Собираем и запускаем контейнеры..."
DOCKER_BUILDKIT=1 docker-compose build --no-cache --parallel
docker-compose up -d

# Проверяем статус
echo "✅ Проверяем статус сервисов..."
docker-compose ps

echo "🎉 Деплой завершен!"
echo "📊 Frontend доступен по адресу: http://localhost:3000"
