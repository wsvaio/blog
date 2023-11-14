import { d as defineEventHandler, b as readFormData } from './nitro/node-server.mjs';
import { d as db } from './index.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@prisma/client';

const _post = defineEventHandler(async (event) => {
  const body = await readFormData(event);
  const files = body.getAll("file");
  const result = [];
  for (const file of files) {
    result.push(
      await db.file.create({
        data: {
          name: file.name,
          data: Buffer.from(await file.arrayBuffer()),
          type: file.type,
          lastModified: String(file.lastModified),
          size: String(file.size)
        },
        select: {
          data: false,
          id: true,
          createAt: true,
          lastModified: true,
          name: true,
          size: true,
          type: true,
          updateAt: true
        }
      })
    );
  }
  return (result == null ? void 0 : result.length) == 1 ? result[0] : result;
});

export { _post as default };
//# sourceMappingURL=.post3.mjs.map
