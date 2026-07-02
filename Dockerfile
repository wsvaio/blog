
# FROM node:lts AS build

# WORKDIR /app
# COPY . .

# RUN corepack enable && corepack prepare pnpm@latest --activate
# RUN pnpm install
# RUN pnpm build


# FROM node:lts AS prod
# WORKDIR /app

# COPY --from=build /app/.output .
# EXPOSE 7100
# CMD ["node", "server/index.mjs"]




FROM oven/bun:1.3-alpine AS build

WORKDIR /app
COPY . .

RUN bun install
RUN bun run build


FROM oven/bun:1.3-alpine AS prod
WORKDIR /app

COPY --from=build /app/.output .
EXPOSE 7100
CMD ["bun", "run", "server/index.mjs"]




