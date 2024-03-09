ALTER TABLE "post_post" DROP CONSTRAINT "post_post_author_id_post_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_post" ADD CONSTRAINT "post_post_author_id_post_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "post_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
