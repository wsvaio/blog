import { d as defineEventHandler, a as getRouterParam } from './nitro/node-server.mjs';
import { d as db } from './index.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@prisma/client';

const _id__delete = defineEventHandler(async (event) => {
  const id = +getRouterParam(event, "id");
  return db.user.delete({
    where: { id }
  });
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete6.mjs.map
