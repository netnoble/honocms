// src/services/indexService.ts

import { drizzle } from 'drizzle-orm/d1';
import {navSchema} from "@/db/schema/navSchema";
import {and, eq} from "drizzle-orm";
import {listToTree} from "@/utils/commonUtil";
import {Context} from "hono";
export async function getNavList(c:Context) {
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