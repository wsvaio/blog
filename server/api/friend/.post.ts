export default defineEventHandler(async event => {
  const body = await readBody(event);
  return db.friend.create({
    data: body,
  });
});
