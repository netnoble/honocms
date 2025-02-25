// src/admin/api_logic/userApiLogic.ts
import { eq,count,and } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import {sendErrorResponse, sendSuccessResponse} from "@/utils/responseUtil";
import {Context} from "hono";
import {userSchema} from "@/db/schema/userSchema";
//列表
export async function listItem(c:Context) {
    try {
        const page = parseInt(c.req.query('page') ?? '1', 10); // 默认第一页
        const pageSize = parseInt(c.req.query('limit') ?? '10', 10); // 默认每页10条记录
        const offset = (page - 1) * pageSize;
        const db = drizzle(c.env.DB);

        const result = await db.select().from(userSchema)
            .limit(pageSize)
            .offset(offset)
            .all();
        // 查询总条数
        const totalCountResult = await db
            .select({ count: count() })
            .from(userSchema)
            .where(
                and(
                    eq(userSchema.is_deleted, 1)
                )
            )
            .all();

        const totalCount = totalCountResult[0].count;
        return await sendSuccessResponse({
            count:totalCount,
            list:result
        });
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
        const result = await db.select().from(userSchema).get();
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
        const result = await db.select().from(userSchema).where(eq(userSchema.id, id)).get();
        return await sendSuccessResponse(result);
    } catch (error) {
        // 捕获任何查询执行期间发生的错误
        console.error('Error executing query:', error);
        return await sendErrorResponse(500, '服务器内部错误，请稍后再试。');
    }
}

//更新
export async function updateItem(c:Context) {
    try {
        const db = drizzle(c.env.DB);

        // 查询特定用户名的管理员用户，并比较密码（假设密码存储为明文，实际应用中应使用哈希）
        const result = await db.select().from(userSchema).get();
        return await sendSuccessResponse(result);
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
        const result = await db.select().from(userSchema).get();
        return await sendSuccessResponse(result);
    } catch (error) {
        // 捕获任何查询执行期间发生的错误
        console.error('Error executing query:', error);
        return await sendErrorResponse(500, '服务器内部错误，请稍后再试。');
    }
}


