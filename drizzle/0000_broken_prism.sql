CREATE TABLE `ad_category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`mark` text,
	`status` integer DEFAULT 1,
	`is_deleted` integer DEFAULT 1,
	`created_at` text DEFAULT '',
	`updated_at` text DEFAULT '',
	`deleted_at` text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `admin` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text,
	`password` text,
	`salt` text,
	`age` integer,
	`email` text,
	`status` integer DEFAULT 1,
	`is_deleted` integer DEFAULT 1,
	`created_at` text DEFAULT '',
	`updated_at` text DEFAULT '',
	`deleted_at` text DEFAULT ''
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admin_email_unique` ON `admin` (`email`);--> statement-breakpoint
CREATE TABLE `ad` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`mark` text,
	`category_id` integer,
	`status` integer DEFAULT 1,
	`is_deleted` integer DEFAULT 1,
	`created_at` text DEFAULT '',
	`updated_at` text DEFAULT '',
	`deleted_at` text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `article_category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`parent_id` integer DEFAULT 0,
	`status` integer DEFAULT 1,
	`is_deleted` integer DEFAULT 1,
	`created_at` text DEFAULT '',
	`updated_at` text DEFAULT '',
	`deleted_at` text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `article` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`parent_id` integer DEFAULT 0,
	`title` text,
	`keywords` text,
	`description` text,
	`content` text,
	`category_id` integer,
	`status` integer DEFAULT 1,
	`is_deleted` integer DEFAULT 1,
	`created_at` text DEFAULT '',
	`updated_at` text DEFAULT '',
	`deleted_at` text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `comment` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`content` text,
	`status` integer DEFAULT 1,
	`is_deleted` integer DEFAULT 1,
	`created_at` text DEFAULT '',
	`updated_at` text DEFAULT '',
	`deleted_at` text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `product_category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`parent_id` integer DEFAULT 0,
	`status` integer DEFAULT 1,
	`is_deleted` integer DEFAULT 1,
	`created_at` text DEFAULT '',
	`updated_at` text DEFAULT '',
	`deleted_at` text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text,
	`keywords` text,
	`description` text,
	`title_image` text,
	`content` text,
	`category_id` integer,
	`status` integer DEFAULT 1,
	`is_deleted` integer DEFAULT 1,
	`created_at` text DEFAULT '',
	`updated_at` text DEFAULT '',
	`deleted_at` text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_name` text,
	`password` text,
	`salt` text,
	`age` integer,
	`email` text,
	`status` integer DEFAULT 1,
	`is_deleted` integer DEFAULT 1,
	`created_at` text DEFAULT '',
	`updated_at` text DEFAULT '',
	`deleted_at` text DEFAULT ''
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);