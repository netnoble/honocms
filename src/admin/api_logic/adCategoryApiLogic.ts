// src/admin/api_logic/adCategoryApiLogic.ts
import {and, eq, sql} from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import {sendErrorResponse, sendSuccessResponse} from "@/utils/responseUtil";
import {Context} from "hono";
import {adCategorySchema} from "@/db/schema/adCategorySchema";
//列表
export async function listItem(c:Context) {
    try {
        const db = drizzle(c.env.DB); 
        const result = await db.select()
            .from(adCategorySchema)
            .where(
                and(
                    eq(adCategorySchema.is_deleted, 1)
                )
            )
            .all();
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
        console.log('dddd',params)
        const result = await db.insert(adCategorySchema).values({
            name: params.name,
            mark: params.mark,
            remark: params.remark,
            sort: params.sort,
            status: params.status,
            created_at:  sql`datetime('now')`,
            updated_at:  sql`datetime('now')`
        }).returning();
        return await sendSuccessResponse(result);
    } catch (error) {
        // 捕获任何查询执行期间发生的错误
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
            .from(adCategorySchema)
            .where(
                and(
                    eq(adCategorySchema.id, id),
                    eq(adCategorySchema.is_deleted, 1)
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
        // 查询特定用户名的管理员用户，并比较密码（假设密码存储为明文，实际应用中应使用哈希）
        const result = await db.update(adCategorySchema)
            .set({
                name: params.name,
                mark: params.mark,
                remark: params.remark,
                sort: params.sort,
                status: params.status,
                updated_at:  sql`datetime('now')`
            })
            .where(eq(adCategorySchema.id, params.id));
        if(result){
            return await sendSuccessResponse(result);
        }
        return await sendErrorResponse(400,'操作失败');
    } catch (error) {
        console.error('Error executing query:', error);
        return await sendErrorResponse(500, '服务器内部错误，请稍后再试。');
    }
}

//删除
export async function deleteItem(c:Context) {
    try {
        const db = drizzle(c.env.DB); 
        const params = await c.req.json();
        const result = await db.update(adCategorySchema)
            .set({
                is_deleted : 2,
                deleted_at:  sql`datetime('now')`
            })
            .where(eq(adCategorySchema.id, params.id));
        if (result){
            return await sendSuccessResponse(result);
        }
        return await sendErrorResponse(400,'删除失败');
    } catch (error) {
        console.error('Error executing query:', error);
        return await sendErrorResponse(500, '服务器内部错误，请稍后再试。');
    }
}


