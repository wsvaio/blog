export default defineEventHandler(async event => {
  const id = +getRouterParam(event, "id")!;
  return db.file.delete({
    where: { id },
  });
});
