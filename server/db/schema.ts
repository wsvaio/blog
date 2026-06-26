import {
    boolean,
    integer,
    jsonb,
    pgEnum,
    pgTable,
    primaryKey,
    serial,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

const primaryId = () => serial().primaryKey();
const createdAt = () => timestamp().defaultNow().notNull();
const timestamps = () => ({
  created_at: createdAt(),
  updated_at: timestamp().defaultNow(),
  deleted_at: timestamp(),
});

export const article = pgTable("article", {
  id: primaryId(),
  title: text().notNull(),
  content: text().default("").notNull(),
  typeId: integer("type_id").notNull(),
  ...timestamps(),
});

export const eventType = pgEnum("event_type", [
  "article_view",
  "article_like",
  "article_unlike",
  "article_share",

  "comment_like",
  "comment_unlike",
]);

export const event = pgTable("event", {
  id: primaryId(),
  type: eventType("type").notNull(),
  metadata: jsonb("metadata"),
  created_at: createdAt(),
});

export const articleStats = pgTable("article_stats", {
  articleId: integer("article_id")
    .primaryKey()
    .references(() => article.id),

  viewCount: integer("view_count").default(0).notNull(),
  likeCount: integer("like_count").default(0).notNull(),
  shareCount: integer("share_count").default(0).notNull(),
  commentCount: integer("comment_count").default(0).notNull(),

  updated_at: timestamp(),
});

export const type = pgTable("type", {
  id: primaryId(),
  name: text().notNull(),
  icon: text().default(""),
  description: text().default(""),
  order: integer("order").default(0).notNull(),
  ...timestamps(),
});

export const tag = pgTable("tag", {
  id: primaryId(),
  name: text().notNull(),
  ...timestamps(),
});

export const articleToTag = pgTable(
  "article_to_tag",
  {
    articleId: integer("article_id")
      .notNull()
      .references(() => article.id),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tag.id),
  },
  (t) => [primaryKey({ columns: [t.articleId, t.tagId] })],
);

export const commentStatus = pgEnum("comment_status", ["pending", "approved", "rejected"]);

export const comment = pgTable("comment", {
  id: primaryId(),

  articleId: integer("article_id")
    .notNull()
    .references(() => article.id),

  parentId: integer("parent_id"),
  replyToId: integer("reply_to_id"),

  nickname: text().notNull(),
  email: text(),
  website: text(),
  avatar: text(),

  content: text().notNull(),

  ipHash: text("ip_hash"),
  userAgent: text("user_agent"),

  status: commentStatus("status").default("pending").notNull(),
  likeCount: integer("like_count").default(0).notNull(),

  ...timestamps(),
});

export const userRole = pgEnum("user_role", ["user", "admin"]);

export const userStatus = pgEnum("user_status", ["active", "blocked"]);

export const user = pgTable("user", {
  id: primaryId(),

  name: text().notNull(),
  email: text().notNull().unique(),
  avatar: text().default("").notNull(),
  site: text().default("").notNull(),

  acceptEmails: boolean("accept_emails").default(false).notNull(),

  role: userRole("role").default("user").notNull(),
  status: userStatus("status").default("active").notNull(),

  passwordHash: text("password_hash"),
  lastLoginAt: timestamp("last_login_at"),

  ...timestamps(),
});

export const file = pgTable("file", {
  id: primaryId(),

  path: text().notNull(),
  filename: text().notNull(),
  mimeType: text("mime_type").notNull(),
  extension: text(),
  size: integer().notNull(),

  metadata: jsonb("metadata"),
  ...timestamps(),
});
