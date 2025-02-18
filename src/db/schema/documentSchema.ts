// import { D1Database } from '@cloudflare/workers-types';
import {int, sqliteTable, text} from "drizzle-orm/sqlite-core";

export const articleSchema = sqliteTable(
    'article',
    {
        id: int().primaryKey({autoIncrement: true}),
        parent_id: int().default(0),//父级id
        title: text(),//标题
        keywords: text(),//关键词
        description: text(),//描述
            file_path: text(),
        content: text(),//富文本内容
        category_id: int(),//分类id
        status: int().default(1),//状态:1:正常，2:禁用
        is_deleted: int().default(1),//是否删除 1:正常，2:删除
        created_at: text().default(''),//创建时间
        updated_at: text().default(''),//更新时间
        deleted_at: text().default(''),//删除时间
    }
);