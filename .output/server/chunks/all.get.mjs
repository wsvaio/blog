import { d as defineEventHandler } from './nitro/node-server.mjs';
import { d as db } from './index.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@prisma/client';

const all_get = defineEventHandler(async () => {
  return db.comment.findMany();
});

export { all_get as default };
//# sourceMappingURL=all.get.mjs.map
