ALTER TABLE `product` RENAME COLUMN "title_image" TO "file_path";--> statement-breakpoint
ALTER TABLE `ad` ADD `file_path` text;--> statement-breakpoint
ALTER TABLE `article` ADD `file_path` text;