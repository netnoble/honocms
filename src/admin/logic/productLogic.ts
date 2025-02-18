// src/admin/logic/productLogic.ts
import {and, eq} from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import {Context} from "hono";
import {productSchema} from "@/db/schema/productSchema";

//详情
export async function detailItem(c:Context) {
    const id: number = parseInt(<string>c.req.query('id')) as unknown as number;
    const db = drizzle(c.env.DB); 
    return await db.select()
        .from(productSchema)
        .where(
            and(
                eq(productSchema.id, id),
                eq(productSchema.is_deleted, 1)
            )
        )
        .get();
}



