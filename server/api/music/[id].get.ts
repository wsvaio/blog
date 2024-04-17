export default defineEventHandler(async event => {
  const id = +getRouterParam(event, "id")!;
  return db.music.findUnique({
    where: { id },
  });
});
