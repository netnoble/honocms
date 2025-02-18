// src/admin/logic/systemLogic.ts
import {and, desc, eq} from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import {Context} from "hono";
import {systemSchema} from "@/db/schema/systemSchema";

//详情
export async function listItem(c:Context) {
    const id: number = parseInt(<string>c.req.query('id')) as unknown as number;
    const db = drizzle(c.env.DB); 
    let list = await db.select()
        .from(systemSchema)
        .where(
            and(
                eq(systemSchema.is_deleted, 1)
            )
        )
        .orderBy(desc(systemSchema.sort))
        .all();

    list = list.map(item => {
        if(item.type === 'radio' && typeof item.options === 'string'){
            item.options = JSON.parse(item.options);
        }
        return item
    });
    return list
}



