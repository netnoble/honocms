// src/admin/logic/articleLogic.ts
import {and, eq} from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import {Context} from "hono";
import {articleSchema} from "@/db/schema/articleSchema";

//详情
export async function detailItem(c:Context) {
    const id: number = parseInt(<string>c.req.query('id')) as unknown as number;
    const db = drizzle(c.env.DB); 
    return await db.select()
        .from(articleSchema)
        .where(
            and(
                eq(articleSchema.id, id),
                eq(articleSchema.is_deleted, 1)
            )
        )
        .get();
}



