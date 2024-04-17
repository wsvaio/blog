export default defineEventHandler(async event => {
  const body = await readFormData(event);
  const files = body.getAll("file") as File[];

  const result = [] as any[];
  for (const file of files) {
    result.push(
      await db.file.create({
        data: {
          name: file.name,
          // eslint-disable-next-line node/prefer-global/buffer
          data: Buffer.from(await file.arrayBuffer()),
          type: file.type,
          lastModified: String(file.lastModified),
          size: String(file.size),
        },
        select: {
          data: false,
          id: true,
          createAt: true,
          lastModified: true,
          name: true,
          size: true,
          type: true,
          updateAt: true,
        },
      })
    );
  }

  return result?.length == 1 ? result[0] : result;
});

// export default defineEventHandler(async (event) => {
//   const body = await readFormData(event);
//   const files = body.getAll("file") as File[];

//   const result = [] as any[];
//   for (const file of files) {
//     result.push(
//       await db.file.create({
//         data: {
//           name: file.name,
//           data: Buffer.from(await file.arrayBuffer()),
//           type: file.type,
//           lastModified: file.lastModified,
//           size: file.size,
//         },
//       })
//     );
//   }

//   return result?.length == 1 ? result[0] : result;
// });
