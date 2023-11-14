import { d as defineEventHandler, r as readBody } from './nitro/node-server.mjs';
import { d as db } from './index.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@prisma/client';

const _post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  return db.type.create({
    data: body
  });
});

export { _post as default };
//# sourceMappingURL=.post5.mjs.map
