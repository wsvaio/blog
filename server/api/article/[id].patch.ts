export default defineEventHandler(async event => {
  const body = await readBody(event);
  const id = +getRouterParam(event, "id")!;
  return db.article.update({
    data: {
      title: body.title,
      content: body.content,
      tags: {
        connectOrCreate: body?.tags.map(
          (item: { id: number; name: string }) => ({
            create: { name: item.name },
            where: { name: item.name },
          })
        ),
      },
      type: {
        connectOrCreate: {
          create: {
            name: body?.type?.name,
          },
          where: {
            name: body?.type?.name,
          },
        },

      },
    },
    where: { id },
  });
});
