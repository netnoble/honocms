CREATE TABLE `file` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`path` text,
	`file_name` text,
	`file_extension` text,
	`file_size` integer,
	`remark` text,
	`status` integer DEFAULT 1,
	`is_deleted` integer DEFAULT 1,
	`created_at` text DEFAULT '',
	`updated_at` text DEFAULT '',
	`deleted_at` text DEFAULT ''
);
