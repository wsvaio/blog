FROM node:alpine as builder

WORKDIR /app
COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}


RUN npm install
RUN npm run build
RUN npx prisma migrate deploy

FROM node:alpine as prod
WORKDIR /app

COPY --from=builder /app/.output .
EXPOSE 7100

CMD ["node", "server/index.mjs"]


