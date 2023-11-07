import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, r => ({
  article: {
    type: r.one.type({
      from: r.article.typeId,
      to: r.type.id,
    }),
    tags: r.many.tag({
      from: r.article.id.through(r.articleToTag.articleId),
      to: r.tag.id.through(r.articleToTag.tagId),
    }),
    stats: r.one.articleStats({
      from: r.article.id,
      to: r.articleStats.articleId,
    }),
    comments: r.many.comment({
      from: r.article.id,
      to: r.comment.articleId,
    }),
  },

  event: {

  },

  articleStats: {
    article: r.one.article({
      from: r.articleStats.articleId,
      to: r.article.id,
      optional: false,
    }),
  },

  articleToTag: {
    article: r.one.article({
      from: r.articleToTag.articleId,
      to: r.article.id,
      optional: false,
    }),
    tag: r.one.tag({
      from: r.articleToTag.tagId,
      to: r.tag.id,
      optional: false,
    }),
  },

  type: {
    articles: r.many.article({
      from: r.type.id,
      to: r.article.typeId,
    }),
  },

  tag: {
    articles: r.many.article({
      from: r.tag.id.through(r.articleToTag.tagId),
      to: r.article.id.through(r.articleToTag.articleId),
    }),
    articleToTags: r.many.articleToTag({
      from: r.tag.id,
      to: r.articleToTag.tagId,
    }),
  },

  comment: {
    article: r.one.article({
      from: r.comment.articleId,
      to: r.article.id,
      optional: false,
    }),
    parent: r.one.comment({
      from: r.comment.parentId,
      to: r.comment.id,
      alias: "parent",
    }),
    replyTo: r.one.comment({
      from: r.comment.replyToId,
      to: r.comment.id,
      alias: "replyTo",
    }),
    comments: r.many.comment({
      from: r.comment.id,
      to: r.comment.parentId,
      alias: "comments",
    }),
    replies: r.many.comment({
      from: r.comment.id,
      to: r.comment.replyToId,
      alias: "replies",
    }),
  },

  user: {

  },

  file: {

  },
}));
