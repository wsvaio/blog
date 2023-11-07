import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "./relations";
const db = drizzle(process.env.DATABASE_URL!, { relations });
export default db;


// // 执行原始 SQL
// const result = await db.execute(sql`
//   SELECT * FROM article WHERE title LIKE ${searchTerm}
// `);
// db.execute
