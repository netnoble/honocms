CREATE TABLE `nav` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`parent_id` integer DEFAULT 0,
	`sort` integer DEFAULT 0,
	`url` text,
	`link_type` text,
	`remark` text,
	`status` integer DEFAULT 1,
	`is_deleted` integer DEFAULT 1,
	`created_at` text DEFAULT '',
	`updated_at` text DEFAULT '',
	`deleted_at` text DEFAULT ''
);
