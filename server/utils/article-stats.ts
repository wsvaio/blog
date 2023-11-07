import { sql } from "drizzle-orm";
import { createError, getRequestIP, getRouterParam } from "h3";
import db from "~~/server/db";
import { articleStats } from "~~/server/db/schema";
import { assertArticleExists } from "~~/server/utils/comment";

type ArticleEventType = "view" | "like" | "unlike" | "share";
type RequestEvent = Parameters<typeof getRequestIP>[0];

export function getArticleId(event: RequestEvent) {
  const articleId = Number(getRouterParam(event, "id"));

  if (!Number.isInteger(articleId) || articleId < 1) {
    throw createError({ statusCode: 400, message: "文章 ID 不正确" });
  }

  return articleId;
}


export async function getArticleStats(articleId: number) {
  const stats = await db.query.articleStats.findFirst({
    where: { articleId },
  });

  return (
    stats || {
      articleId,
      viewCount: 0,
      likeCount: 0,
      shareCount: 0,
      commentCount: 0,
      updated_at: null,
    }
  );
}

export async function recordArticleEvent(params: {
  articleId: number;
  event: RequestEvent;
  eventType: ArticleEventType;
  visitorId?: string;
}) {
  const { articleId, eventType } = params;

  await assertArticleExists(articleId);

  if (eventType === "view") {
    await incrementViewCount(articleId);
  } else if (eventType === "like") {
    await incrementLikeCount(articleId);
  } else if (eventType === "unlike") {
    await decrementLikeCount(articleId);
  } else {
    await incrementShareCount(articleId);
  }

  return await getArticleStats(articleId);
}

async function incrementViewCount(articleId: number) {
  await db
    .insert(articleStats)
    .values({ articleId, viewCount: 1, updated_at: new Date() })
    .onConflictDoUpdate({
      target: articleStats.articleId,
      set: {
        viewCount: sql`${articleStats.viewCount} + 1`,
        updated_at: new Date(),
      },
    });
}

async function incrementLikeCount(articleId: number) {
  await db
    .insert(articleStats)
    .values({ articleId, likeCount: 1, updated_at: new Date() })
    .onConflictDoUpdate({
      target: articleStats.articleId,
      set: {
        likeCount: sql`${articleStats.likeCount} + 1`,
        updated_at: new Date(),
      },
    });
}

async function decrementLikeCount(articleId: number) {
  await db
    .insert(articleStats)
    .values({ articleId, updated_at: new Date() })
    .onConflictDoUpdate({
      target: articleStats.articleId,
      set: {
        likeCount: sql`GREATEST(${articleStats.likeCount} - 1, 0)`,
        updated_at: new Date(),
      },
    });
}

async function incrementShareCount(articleId: number) {
  await db
    .insert(articleStats)
    .values({ articleId, shareCount: 1, updated_at: new Date() })
    .onConflictDoUpdate({
      target: articleStats.articleId,
      set: {
        shareCount: sql`${articleStats.shareCount} + 1`,
        updated_at: new Date(),
      },
    });
}
