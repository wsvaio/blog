import { d as defineEventHandler, r as readBody, a as getRouterParam } from './nitro/node-server.mjs';
import { d as db } from './index.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@prisma/client';

const _id__put = defineEventHandler(async (event) => {
  var _a, _b;
  const body = await readBody(event);
  const id = +getRouterParam(event, "id");
  return db.article.update({
    data: {
      title: body.title,
      content: body.content,
      tags: {
        connectOrCreate: body == null ? void 0 : body.tags.map(
          (item) => ({
            create: { name: item.name },
            where: { name: item.name }
          })
        )
      },
      type: {
        connectOrCreate: {
          create: {
            name: (_a = body == null ? void 0 : body.type) == null ? void 0 : _a.name
          },
          where: {
            name: (_b = body == null ? void 0 : body.type) == null ? void 0 : _b.name
          }
        }
      }
    },
    where: { id }
  });
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
