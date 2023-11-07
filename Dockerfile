FROM node:lts AS builder

WORKDIR /app
COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
RUN pnpm build


FROM node:lts AS prod
WORKDIR /app

COPY --from=builder /app/.output .
EXPOSE 7100
CMD ["node", "server/index.mjs"]




