export default defineEventHandler(async () => {
	return db.user.findMany();
});
