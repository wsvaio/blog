export default defineEventHandler(async event => {
  const id = +getRouterParam(event, "id")!;
  return db.tag.delete({
    where: { id },
  });
});
