CREATE TABLE `system` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text,
	`key` text,
	`type` text,
	`options` text,
	`value` text,
	`sort` integer,
	`status` integer DEFAULT 1,
	`is_deleted` integer DEFAULT 1,
	`created_at` text DEFAULT '',
	`updated_at` text DEFAULT '',
	`deleted_at` text DEFAULT ''
);
--> statement-breakpoint
CREATE UNIQUE INDEX `system_key_unique` ON `system` (`key`);--> statement-breakpoint
DROP INDEX `admin_email_unique`;--> statement-breakpoint
ALTER TABLE `admin` ADD `remark` text;--> statement-breakpoint
ALTER TABLE `admin` DROP COLUMN `age`;--> statement-breakpoint
ALTER TABLE `admin` DROP COLUMN `email`;--> statement-breakpoint
ALTER TABLE `user` ADD `remark` text;