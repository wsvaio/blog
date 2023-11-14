name=blog
docker rm -fv $name

docker run -d \
  -v /app/service/blog:/app \
  -e PORT=7100
  -p 7100:7100 \
  --name $name \
  oven/bun bun /app/.output/server/index.mjs