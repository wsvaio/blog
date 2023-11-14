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
  const body = await readBody(event);
  const id = +getRouterParam(event, "id");
  return db.tag.update({
    data: body,
    where: { id }
  });
});

export { _id__put as default };
//# sourceMappingURL=_id_.put3.mjs.map
