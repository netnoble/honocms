// src/admin/logic/adCategoryLogic.ts
import {and, eq} from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import {Context} from "hono";
import {adCategorySchema} from "@/db/schema/adCategorySchema";

//列表
export async function listItem(c:Context) {
    const db = drizzle(c.env.DB); 
    return await db.select()
        .from(adCategorySchema)
        .where(
            and(
                eq(adCategorySchema.is_deleted, 1)
            )
        )
        .all();
}

//详情
export async function detailItem(c:Context) {
    const id: number = parseInt(<string>c.req.query('id')) as unknown as number;
    const db = drizzle(c.env.DB); 
    return await db.select()
        .from(adCategorySchema)
        .where(
            and(
                eq(adCategorySchema.id, id),
                eq(adCategorySchema.is_deleted, 1)
            )
        )
        .get();
}



