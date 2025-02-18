// import { D1Database } from '@cloudflare/workers-types';
import {int, sqliteTable, text} from "drizzle-orm/sqlite-core";

export const systemSchema = sqliteTable(
    'system',
    {
        id: int().primaryKey({autoIncrement: true}),
        title: text(),//标题
        key: text().unique(),//唯一key
        type: text(),//类型 input,image,radio,textarea
        options: text(), //radio 是,否,其他等
        value: text(),//值
        sort: int(),//排序，查询时使用，值越大越靠前
        status: int().default(1),//状态:1:正常，2:禁用
        is_deleted: int().default(1),//是否删除 1:正常，2:删除
        created_at: text().default(''),//创建时间
        updated_at: text().default(''),//更新时间
        deleted_at: text().default(''),//删除时间
    }
    );