export default defineEventHandler(async event => {
  const id = +getRouterParam(event, "id")!;
  return db.tag.findUnique({
    where: { id },
  });
});
