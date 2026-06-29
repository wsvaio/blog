import db from "../db";

export default defineTask({
  meta: {
    name: "cleanup",
    description: "清理过期文件",
  },
  async run() {
    console.log("清理过期文件中");
    console.log(
      await db.execute(`
        SELECT f.*
        FROM file f
        WHERE NOT EXISTS (
          SELECT 1 FROM article a
          WHERE a.deleted_at IS NULL
          AND a.content ILIKE '%' || f.path || '%'
        ) AND f.deleted_at IS NULL;
      `),
    );
    const result = await db.execute(`
      UPDATE file f
      SET deleted_at = now()
      WHERE NOT EXISTS (
        SELECT 1 FROM article a
        WHERE a.deleted_at IS NULL
        AND a.content ILIKE '%' || f.path || '%'
      ) AND f.deleted_at IS NULL;
    `);
    console.log("清理完成");
    console.log(result);
    return { result };
  },
});
