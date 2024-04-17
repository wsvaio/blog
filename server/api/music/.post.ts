export default defineEventHandler(async event => {
  const body = await readBody(event);
  return db.music.create({
    data: body,
  });
});
