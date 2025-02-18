// src/admin/logic/productCategoryLogic.ts
import {and, eq} from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import {Context} from "hono";
import {productCategorySchema} from "@/db/schema/productCategorySchema";
import {listToTree} from "@/utils/commonUtil";

//列表
export async function getListTree(c:Context) {
    const db = drizzle(c.env.DB); 
    const list = await db.select()
        .from(productCategorySchema)
        .where(
            and(
                eq(productCategorySchema.is_deleted, 1)
            )
        )
        .all();
    return listToTree(list)
}
//列表
export async function getParentList(c:Context) {
    const db = drizzle(c.env.DB); 
    return await db.select()
        .from(productCategorySchema)
        .where(
            and(
                eq(productCategorySchema.is_deleted, 1),
                eq(productCategorySchema.parent_id, 0),
            )
        )
        .all();
}

//详情
export async function detailItem(c:Context) {
    const id: number = parseInt(<string>c.req.query('id')) as unknown as number;
    console.log('sssss-id',id)
    const db = drizzle(c.env.DB); 
    return await db.select()
        .from(productCategorySchema)
        .where(
            and(
                eq(productCategorySchema.id, id),
                eq(productCategorySchema.is_deleted, 1)
            )
        )
        .get();
}



