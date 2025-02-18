//admin表
// import { D1Database } from '@cloudflare/workers-types';
import {int, sqliteTable, text} from "drizzle-orm/sqlite-core";

export const adminSchema = sqliteTable(
    'admin',
    {
        id: int().primaryKey({autoIncrement: true}),
        username: text(),
        password: text(),
        salt: text(),
        remark: text(),
        status: int().default(1),//状态:1:正常，2:禁用
        is_deleted: int().default(1),//是否删除 1:正常，2:删除
        created_at: text().default(''),//创建时间
        updated_at: text().default(''),//更新时间
        deleted_at: text().default(''),//删除时间
    }
    );