FROM node:alpine as builder

WORKDIR /app
COPY . .

# ARG DATABASE_URL
# ENV DATABASE_URL=${DATABASE_URL}
# ENV PORT 7100
# ENV EMAIL_PASS ''

RUN npm install
RUN npm run build
RUN npx prisma migrate deploy

FROM node:alpine as prod
WORKDIR /app

COPY --from=builder /app/.output .output
EXPOSE 7100

CMD ["node", ".output/server/index.mjs"]


