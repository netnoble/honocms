// import { D1Database } from '@cloudflare/workers-types';
import {int, sqliteTable, text,real} from "drizzle-orm/sqlite-core";

export const adSchema = sqliteTable(
    'ad',
    {
        id: int().primaryKey({autoIncrement: true}),//id自增长
        name: text(),//名称
        url: text(),//链接地址
        category_id: int(),//分类id
        sort: int(),//排序
        file_path: text(),
            field_one: text(),
            field_two: text(),
            field_three: text(),
        link_type: text(),//跳转方式
        remark: text(),//备注
        status: int().default(1),//状态:1:正常，2:禁用
        is_deleted: int().default(1),//是否删除 1:正常，2:删除
        created_at: text().default(''),//创建时间
        updated_at: text().default(''),//更新时间
        deleted_at: text().default(''),//删除时间
    },

    );