FROM oven/bun:alpine as builder

WORKDIR /app
COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}


RUN bun install
RUN bun run build
RUN bunx prisma migrate deploy

FROM node:alpine as prod
WORKDIR /app

COPY --from=builder /app/.output .
EXPOSE 7100

CMD ["node", "server/index.mjs"]


