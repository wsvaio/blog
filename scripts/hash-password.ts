import { hashPassword } from "../server/utils/password";
const password = process.argv[2] || "";
const hash = hashPassword(password);
console.log(`密码：${password}`);
console.log(`哈希值：${hash}`);
console.log("");
console.log("请将此哈希值插入到user表的passwordHash字段中");
console.log("示例SQL：");
console.log(`INSERT INTO user (name, email, passwordHash, role) VALUES ('管理员', 'admin@example.com', '${hash}', 'admin');`);
