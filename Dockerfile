# Используем официальный Node.js образ
FROM node:20-alpine AS base

# Устанавливаем зависимости только когда нужно
FROM base AS deps
# Проверяем https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine чтобы понять, почему libc6-compat может быть нужен.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Устанавливаем зависимости на основе предпочитаемого менеджера пакетов
COPY package.json package-lock.json* ./
RUN npm ci

# Пересобираем исходный код только когда нужно
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Следующий комментарий отключает telemetry во время сборки.
# https://nextjs.org/docs/advanced-features/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Аргументы сборки для переменных окружения Next.js
ARG NEXT_PUBLIC_STRAPI_URL
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_STRAPI_URL=${NEXT_PUBLIC_STRAPI_URL}
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_DISABLE_SOURCEMAPS 1

# Очищаем любые старые артефакты сборки перед новой сборкой
RUN rm -rf .next || true

# Выполняем сборку с очисткой кэша Next.js
RUN npm run build && \
    ([ -d .next/cache ] && rm -rf .next/cache || true) && \
    ([ -d .next/standalone ] || (echo "ERROR: .next/standalone not found! Build may have failed." && exit 1)) && \
    npm cache clean --force && \
    npm prune --omit=dev || true

# Образ для продакшена, скопируем все файлы и запустим next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Следующий комментарий отключает telemetry во время выполнения.
# https://nextjs.org/docs/advanced-features/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем public директорию
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Автоматически используем output traces для уменьшения размера образа
# https://nextjs.org/docs/advanced-features/output-file-tracing
# Проверяем существование директорий перед копированием
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js создается автоматически next build
CMD ["node", "server.js"]

