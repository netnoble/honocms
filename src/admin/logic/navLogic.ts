// src/admin/logic/navLogic.ts
import {and, eq} from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import {Context} from "hono";
import {navSchema} from "@/db/schema/navSchema";
import {listToTree} from "@/utils/commonUtil";

//所有列表
export async function listItem(c:Context) {
    const db = drizzle(c.env.DB); 
    const list = await db.select()
        .from(navSchema)
        .where(
            and(
                eq(navSchema.is_deleted, 1),
            )
        )
        .all();
    return listToTree(list)
}

//列表
export async function getParentList(c:Context) {
    const db = drizzle(c.env.DB); 
    return await db.select()
        .from(navSchema)
        .where(
            and(
                eq(navSchema.is_deleted, 1),
                eq(navSchema.parent_id, 0),
            )
        )
        .all();
}
export async function detailItem(c:Context) {
    const id: number = parseInt(<string>c.req.query('id')) as unknown as number;
    const db = drizzle(c.env.DB); 
    const detail = await db.select()
        .from(navSchema)
        .where(
            and(
                eq(navSchema.id, id),
                eq(navSchema.is_deleted, 1)
            )
        )
        .get();
    const { APP_STATIC_URL } = c.env;
    // 只为 file_url 添加域名前缀
    // 动态生成 file_url 属性而不修改原有的 detail 对象
    const result = {
        ...detail,
        // file_url: APP_STATIC_URL + detail?.file_path
    };
    return result;
}





