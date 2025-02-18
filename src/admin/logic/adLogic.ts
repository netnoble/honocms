// src/admin/logic/adLogic.ts
import {and, eq} from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import {Context} from "hono";
import {adSchema} from "@/db/schema/adSchema";

//详情
export async function detailItem(c:Context) {
    const id: number = parseInt(<string>c.req.query('id')) as unknown as number;
    const db = drizzle(c.env.DB); 
    const detail = await db.select()
        .from(adSchema)
        .where(
            and(
                eq(adSchema.id, id),
                eq(adSchema.is_deleted, 1)
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



