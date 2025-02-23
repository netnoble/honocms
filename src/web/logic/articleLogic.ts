// src/web/logic/navLogic.ts

import { drizzle } from 'drizzle-orm/d1';
import {articleSchema} from "@/db/schema/articleSchema";
import {and, eq} from "drizzle-orm";
import {listToTree} from "@/utils/commonUtil";
import {Context} from "hono";
export async function getList(c:Context) {
    const db = drizzle(c.env.DB);
    const list = await db.select()
        .from(articleSchema)
        .where(
            and(
                eq(articleSchema.is_deleted, 1),
                eq(articleSchema.status, 1),
            )
        )
        .all();

    return listToTree(list)
}
export async function getDetail(c:Context) {
    const db = drizzle(c.env.DB);
    const list = await db.select()
        .from(articleSchema)
        .where(
            and(
                eq(articleSchema.is_deleted, 1),
                eq(articleSchema.status, 1),
            )
        )
        .all();

    return listToTree(list)
}