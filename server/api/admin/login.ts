import jwt from "jsonwebtoken";

export default defineEventHandler(async event => {
	const { username, password } = await readBody(event);
	if (!username) return new Error("请输入用户名");
	if (!password) return new Error("请输入密码");

	const admin = await db.admin.findUnique({
		where: {
			username,

		}
	});

	if (!admin) return new Error("用户名不存在");

	if (admin.password !== password) return new Error("密码错误");

	return jwt.sign({ username, password }, "wsvaio");

	// return
});
