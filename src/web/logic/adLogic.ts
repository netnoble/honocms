// src/web/logic/adLogic.ts

import { drizzle } from 'drizzle-orm/d1';
import {adCategorySchema} from "@/db/schema/adCategorySchema";
import {adSchema} from "@/db/schema/adSchema";
import {and, eq,desc} from "drizzle-orm";
import {listToTree} from "@/utils/commonUtil";
import {Context} from "hono";
export async function getAdList(c:Context,mark:string) {
    const db = drizzle(c.env.DB);
    // 执行JOIN查询
    const list = await db.select({
        categoryId: adCategorySchema.id,
        categoryName: adCategorySchema.name,
        id: adSchema.id,
        name: adSchema.name,
        url: adSchema.url,
        sort: adSchema.sort,
        file_path: adSchema.file_path,
        link_type: adSchema.link_type,
        remark: adSchema.remark,
        // 添加其他你需要的字段
    }).from(adCategorySchema)
        .leftJoin(adSchema, eq(adCategorySchema.id, adSchema.category_id))
        .where(
            and(
                eq(adSchema.status, 1),
                eq(adSchema.is_deleted, 1),
                eq(adCategorySchema.status, 1),
                eq(adCategorySchema.is_deleted, 1),
                eq(adCategorySchema.mark, mark),
            )
        )
        .orderBy(desc(adSchema.sort)) // 根据需要调整排序
        .all();
    return list
}