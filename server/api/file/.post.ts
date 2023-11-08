export default defineEventHandler(async (event) => {
  const body = await readFormData(event);
  const file = body.get("file") as File;

  return await db.file.create({
    data: {
      name: file.name,
      data: Buffer.from(await file.arrayBuffer()),
      type: file.type,
      lastModified: file.lastModified,
      size: file.size,
    },
  });
});
