// src/web/logic/systemLogic.ts

import { drizzle } from 'drizzle-orm/d1';
import {systemSchema} from "@/db/schema/systemSchema";
import {and, eq} from "drizzle-orm";
import {Context} from "hono";
export async function getSystemInfo(c:Context, key:string) {
    const db = drizzle(c.env.DB);
    const detail = await db.select()
        .from(systemSchema)
        .where(
            and(
                eq(systemSchema.is_deleted, 1),
                eq(systemSchema.key, key),
            )
        )
        .get();

    return detail?.value;
}