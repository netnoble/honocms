// src/admin/logic/adminLogic.ts
import {and, eq} from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import {Context} from "hono";
import {adminSchema} from "@/db/schema/adminSchema";

//详情
export async function detailItem(c:Context) {
    const id: number = parseInt(<string>c.req.query('id')) as unknown as number;
    const db = drizzle(c.env.DB); 
    return await db.select()
        .from(adminSchema)
        .where(
            and(
                eq(adminSchema.id, id),
                eq(adminSchema.is_deleted, 1)
            )
        )
        .get();
}



