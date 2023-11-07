-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "comment_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "user_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "user_status" AS ENUM('active', 'blocked');--> statement-breakpoint
CREATE TYPE "event_type" AS ENUM('article_view', 'article_like', 'article_unlike', 'article_share', 'comment_like', 'comment_unlike');--> statement-breakpoint
CREATE TABLE "article" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"content" text DEFAULT '' NOT NULL,
	"type_id" integer NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "article_stats" (
	"article_id" integer PRIMARY KEY,
	"view_count" integer DEFAULT 0 NOT NULL,
	"like_count" integer DEFAULT 0 NOT NULL,
	"share_count" integer DEFAULT 0 NOT NULL,
	"comment_count" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "article_to_tag" (
	"article_id" integer,
	"tag_id" integer,
	CONSTRAINT "article_to_tag_pkey" PRIMARY KEY("article_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "comment" (
	"id" serial PRIMARY KEY,
	"article_id" integer NOT NULL,
	"parent_id" integer,
	"reply_to_id" integer,
	"nickname" text NOT NULL,
	"email" text,
	"website" text,
	"avatar" text,
	"content" text NOT NULL,
	"ip_hash" text,
	"user_agent" text,
	"status" "comment_status" DEFAULT 'pending'::"comment_status" NOT NULL,
	"like_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "event" (
	"id" serial PRIMARY KEY,
	"type" "event_type" NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "file" (
	"id" serial PRIMARY KEY,
	"path" text NOT NULL,
	"filename" text NOT NULL,
	"mime_type" text NOT NULL,
	"extension" text,
	"size" integer NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "tag" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "type" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"description" text DEFAULT '',
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"icon" text DEFAULT '',
	"order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL CONSTRAINT "user_email_key" UNIQUE,
	"avatar" text DEFAULT '' NOT NULL,
	"site" text DEFAULT '' NOT NULL,
	"accept_emails" boolean DEFAULT false NOT NULL,
	"role" "user_role" DEFAULT 'user'::"user_role" NOT NULL,
	"status" "user_status" DEFAULT 'active'::"user_status" NOT NULL,
	"password_hash" text,
	"last_login_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "article_to_tag" ADD CONSTRAINT "article_to_tag_article_id_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article"("id");--> statement-breakpoint
ALTER TABLE "article_to_tag" ADD CONSTRAINT "article_to_tag_tag_id_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id");--> statement-breakpoint
ALTER TABLE "article_stats" ADD CONSTRAINT "article_stats_article_id_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article"("id");--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_article_id_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article"("id");
*/