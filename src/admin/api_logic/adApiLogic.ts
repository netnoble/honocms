// src/admin/api_logic/adApiLogic.ts
import {and, desc, eq, sql} from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import {sendErrorResponse, sendSuccessResponse} from "@/utils/responseUtil";
import {Context} from "hono";
import {adSchema} from "@/db/schema/adSchema";
//列表
export async function listItem(c:Context) {
    try {
        // 从请求体中获取分页参数
        // const body = await c.req.json(); // 解析 JSON 请求体
        // const page = parseInt(body.page) || 1; // 默认第一页
        // const pageSize = parseInt(body.pageSize) || 10; // 默认每页10条记录
        //
        // // 计算 offset
        // const offset = (page - 1) * pageSize;

        const db = drizzle(c.env.DB); 
        const result = await db.select()
            .from(adSchema)
            .where(
                and(
                    eq(adSchema.is_deleted, 1)
                )
            )
            .orderBy(desc(adSchema.id))
            // .limit(pageSize)
            // .offset(offset)
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
        const result = await db.insert(adSchema).values({
            name: params.name,
            category_id: params.category_id,
            file_path: params.file_path,
            url: params.url,
            remark: params.remark,
            sort: params.sort,
            link_type: params.link_type,
            status: params.status,
            field_one: params.field_one,
            field_two: params.field_two,
            field_three: params.field_three,
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
            .from(adSchema)
            .where(
                and(
                    eq(adSchema.id, id),
                    eq(adSchema.is_deleted, 1)
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
        const result = await db.update(adSchema)
            .set({
                name: params.name,
                category_id: params.category_id,
                file_path: params.file_path,
                url: params.url,
                remark: params.remark,
                sort: params.sort,
                link_type: params.link_type,
                status: params.status,
                field_one: params.field_one,
                field_two: params.field_two,
                field_three: params.field_three,
                updated_at:  sql`datetime('now')`
            })
            .where(eq(adSchema.id, params.id));
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
        const result = await db.update(adSchema)
            .set({
                is_deleted : 2,
                deleted_at:  sql`datetime('now')`
            })
            .where(eq(adSchema.id, params.id));
        if (result){
            return await sendSuccessResponse(result);
        }
        return await sendErrorResponse(400,'删除失败');
    } catch (error) {
        console.error('Error executing query:', error);
        return await sendErrorResponse(500, '服务器内部错误，请稍后再试。');
    }
}


