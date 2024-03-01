FROM node as builder

WORKDIR /app​
COPY . .

RUN npm install
RUN npm run build

FROM node:alpine

WORKDIR /app​

COPY --from=builder /app/.output /app/.output

CMD ["sh", "-c", "npx prisma migrate deploy && node /app/.output/server/index.mjs"]

EXPOSE 7100


