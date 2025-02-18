// src/admin/api_logic/navApiLogic.ts
import {and, eq, sql} from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import {sendErrorResponse, sendSuccessResponse} from "@/utils/responseUtil";
import {Context} from "hono";
import {navSchema} from "@/db/schema/navSchema";
import {listToTree} from "@/utils/commonUtil";
//列表
export async function listItem(c:Context) {
    try {
        const db = drizzle(c.env.DB); 
        const result = await db.select()
            .from(navSchema)
            .where(
                and(
                    eq(navSchema.is_deleted, 1)
                )
            )
            .all();
        return await sendSuccessResponse(listToTree(result));
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
        const result = await db.insert(navSchema).values({
            name: params.name,
            parent_id: params.parent_id,
            link_type: params.link_type,
            url: params.url,
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
            .from(navSchema)
            .where(
                and(
                    eq(navSchema.id, id),
                    eq(navSchema.is_deleted, 1)
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
        const params = await c.req.json();
        if(params.parent_id == params.id){
            return await sendErrorResponse(400,'上级分类不能是自己');
        }
        const db = drizzle(c.env.DB); 
        const result = await db.update(navSchema)
            .set({
                name: params.name,
                parent_id: params.parent_id,
                link_type: params.link_type,
                url: params.url,
                remark: params.remark,
                sort: params.sort,
                status: params.status,
                updated_at:  sql`datetime('now')`
            })
            .where(eq(navSchema.id, params.id));
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
        const result = await db.update(navSchema)
            .set({
                is_deleted : 2,
                deleted_at:  sql`datetime('now')`
            })
            .where(eq(navSchema.id, params.id));
        if (result){
            return await sendSuccessResponse(result);
        }
        return await sendErrorResponse(400,'删除失败');
    } catch (error) {
        console.error('Error executing query:', error);
        return await sendErrorResponse(500, '服务器内部错误，请稍后再试。');
    }
}

