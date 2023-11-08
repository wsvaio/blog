export default defineEventHandler(async () => {
	return db.article.findMany();
});
