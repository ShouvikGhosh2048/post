CREATE TABLE IF NOT EXISTS "post_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"author_id" text,
	"title" varchar(256),
	"text" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_post" ADD CONSTRAINT "post_post_author_id_post_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "post_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
