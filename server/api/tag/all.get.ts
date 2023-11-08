export default defineEventHandler(async () => {
	return db.tag.findMany();
});
