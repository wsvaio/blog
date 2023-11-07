export default defineEventHandler(async event => {
  const email = getRouterParam(event, "email")!;
  return db.user.findUnique({
    where: { email },
  });
});
