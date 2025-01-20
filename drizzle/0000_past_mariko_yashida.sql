CREATE TABLE `users` (
	`user_id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`email` text NOT NULL,
	`password` text,
	`name` text,
	`image` text,
	`provider` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);