name=blog

echo $name
echo $database_url

docker rm -fv $name

docker run \
  -d \
  -v /app/service/blog:/app \
  -e PORT=7100 \
  -e DATABASE_URL=postgresql://postgres:147wsvaio.,,@121.40.126.12:5432/newblog?schema=public \
  -p 7100:7100 \
  --name $name \
  node node /app/.output/server/index.mjs

