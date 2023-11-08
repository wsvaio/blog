export default defineEventHandler(async () => {
	return db.comment.findMany();
});
