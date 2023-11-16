name=blog

docker rm -fv $name

docker run \
  -d \
  -v /app/service/blog:/app \
  -e PORT=7100 \
  -e DATABASE_URL=$database_url \
  -p 7100:7100 \
  --name $name \
  node node /app/.output/server/index.mjs

