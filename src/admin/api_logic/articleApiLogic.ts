// src/admin/api_logic/articleApiLogic.ts
import {and, desc, eq, sql} from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import {sendErrorResponse, sendSuccessResponse} from "@/utils/responseUtil";
import {Context} from "hono";
import {articleSchema} from "@/db/schema/articleSchema";
//列表
export async function listItem(c:Context) {
    try {
        const db = drizzle(c.env.DB); 
        const result = await db.select()
            .from(articleSchema)
            .where(
                and(
                    eq(articleSchema.is_deleted, 1)
                )
            )
            .orderBy(desc(articleSchema.id)).all();
        return await sendSuccessResponse(result);
    } catch (error) {
        // 捕获任何查询执行期间发生的错误
        console.error('Error executing query:', error);
        return await sendErrorResponse(500, '服务器内部错误，请稍后再试。');
    }
}

//创建
export async function createItem(c:Context) {
    try {
        const db = drizzle(c.env.DB); 
        const params = await c.req.json();
        const result = await db.insert(articleSchema).values({
            title: params.title,
            category_id: params.category_id,
            file_path: params.file_path,
            keywords: params.keywords,
            description: params.description,
            content: params.content,
            status: params.status,
            created_at:  sql`datetime('now')`,
            updated_at:  sql`datetime('now')`
        }).returning();
        if(result){
            return await sendSuccessResponse(result);
        }
        return await sendErrorResponse(400,'添加失败');
    } catch (error) {
        console.error('Error executing query:', error);
        return await sendErrorResponse(500, '服务器内部错误，请稍后再试。');
    }
}

//详情
export async function detailItem(c:Context) {
    try {
        const id: number = parseInt(c.req.param('id')) as unknown as number;
        const db = drizzle(c.env.DB); 
        const result = await db.select()
            .from(articleSchema)
            .where(
                and(
                    eq(articleSchema.id, id),
                    eq(articleSchema.is_deleted, 1)
                )
            )
            .get();
        return await sendSuccessResponse(result);
    } catch (error) {
        console.error('Error executing query:', error);
        return await sendErrorResponse(500, '服务器内部错误，请稍后再试。');
    }
}

//更新
export async function updateItem(c:Context) {
    try {
        const db = drizzle(c.env.DB); 
        const params = await c.req.json();
        const result = await db.update(articleSchema)
            .set({
                title: params.title,
                category_id: params.category_id,
                file_path: params.file_path,
                keywords: params.keywords,
                description: params.description,
                content: params.content,
                status: params.status,
                updated_at:  sql`datetime('now')`
            })
            .where(eq(articleSchema.id, params.id));
        if(result){
            return await sendSuccessResponse(result);
        }
        return await sendErrorResponse(400,'操作失败');
    } catch (error) {
        // 捕获任何查询执行期间发生的错误
        console.error('Error executing query:', error);
        return await sendErrorResponse(500, '服务器内部错误，请稍后再试。');
    }
}

//删除
export async function deleteItem(c:Context) {
    try {
        const db = drizzle(c.env.DB); 
        const params = await c.req.json();
        const result = await db.update(articleSchema)
            .set({
                is_deleted : 2,
                deleted_at:  sql`datetime('now')`
            })
            .where(eq(articleSchema.id, params.id));
        if (result){
            return await sendSuccessResponse(result);
        }
        return await sendErrorResponse(400,'删除失败');
    } catch (error) {
        console.error('Error executing query:', error);
        return await sendErrorResponse(500, '服务器内部错误，请稍后再试。');
    }
}


