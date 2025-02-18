// src/services/authService.ts
import {and, eq} from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import {Context} from "hono";
import {adSchema} from "@/db/schema/adSchema";

//详情
export async function detailItem(c:Context) {
    const id: number = parseInt(<string>c.req.query('id')) as unknown as number;
    const db = drizzle(c.env.DB); 
    return await db.select()
        .from(adSchema)
        .where(
            and(
                eq(adSchema.id, id),
                eq(adSchema.is_deleted, 1)
            )
        )
        .get();
}



