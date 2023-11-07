import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import process from "node:process";
import nodemailer from "nodemailer";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const db = new PrismaClient({ adapter });

export const transporter = nodemailer.createTransport({
  service: "qq",
  secure: true,
  auth: {
    user: "wsvaio@qq.com",

    pass: process.env.EMAIL_PASS,
  },
});

export function arrayToTree<T extends object, C extends string = "children">(
  array: T[],
  id?: string | number | symbol | null,
  options = {} as { idKey?: string; pidKey?: string; childrenKey?: C }
): T[] | undefined {
  const { idKey = "id", pidKey = "pid", childrenKey = "children" } = options;
  type Trees = (T & { [K in C]: Trees })[];
  const trees: Trees = [];
  for (const item of array) {
    // @ts-expect-error pass
    if (item[pidKey] == id)
      // @ts-expect-error pass
      trees.push({ ...item, [childrenKey]: arrayToTree(array, item[idKey], { idKey, pidKey, childrenKey }) });
  }
  return trees;
}
