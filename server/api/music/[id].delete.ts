export default defineEventHandler(async event => {
  const id = +getRouterParam(event, "id")!;
  return db.music.delete({
    where: { id },
  });
});
