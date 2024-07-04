FROM node:alpine as builder

WORKDIR /app
COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN npm install
RUN npx prisma migrate deploy
RUN npm run build


FROM node:alpine as prod
WORKDIR /app

COPY --from=builder /app/.output .
EXPOSE 7100

CMD ["node", "server/index.mjs"]




