export default defineEventHandler(async () => {
	return db.type.findMany();
});
