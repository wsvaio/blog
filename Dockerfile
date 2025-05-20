FROM node:22-alpine AS builder

WORKDIR /app
COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN apk add --no-cache \
  openssl

RUN npm install
# RUN npx prisma migrate deploy
RUN npx prisma generate
RUN npm run build


FROM node:22-alpine AS prod
WORKDIR /app

COPY --from=builder /app/.output .
EXPOSE 7100

CMD ["node", "server/index.mjs"]




