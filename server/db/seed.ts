import db from "#server/db";
import { article, articleToTag, tag, type } from '#server/db/schema';
import 'dotenv/config';

async function main() {
  console.log('🌱 开始插入种子数据...');

  // 插入分类
  const [type1, type2] = await db
    .insert(type)
    .values([
      { name: '技术', description: '技术相关文章' },
      { name: '生活', description: '生活随笔' },
      { name: '随笔', description: '随想记录' },
    ])
    .returning();
  console.log(`  ✓ 插入 ${3} 个分类`);

  // 插入标签
  const [tag1, tag2, tag3] = await db
    .insert(tag)
    .values([
      { name: 'JavaScript' },
      { name: 'Vue' },
      { name: 'Nuxt' },
      { name: 'CSS' },
    ])
    .returning();
  console.log(`  ✓ 插入 ${4} 个标签`);

  // 插入文章
  const [art1, art2] = await db
    .insert(article)
    .values([
      {
        title: 'Hello World',
        content: '这是我的第一篇文章！',
        typeId: type1!.id,
      },
      {
        title: '今日随笔',
        content: '今天天气真好。',
        typeId: type2!.id,
      },
    ])
    .returning();
  console.log(`  ✓ 插入 ${2} 篇文章`);

  // 关联文章和标签
  await db.insert(articleToTag).values([
    { articleId: art1!.id, tagId: tag1!.id },
    { articleId: art1!.id, tagId: tag2!.id },
    { articleId: art2!.id, tagId: tag3!.id },
  ]);
  console.log(`  ✓ 插入 ${3} 条文章-标签关联`);

  console.log('✅ 种子数据插入完成！');
}

main().catch((err) => {
  console.error('❌ 种子数据插入失败:', err);
  process.exit(1);
});
