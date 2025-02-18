// src/admin/api_logic/userApiLogic.ts
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import {sendErrorResponse, sendSuccessResponse} from "@/utils/responseUtil";
import {Context} from "hono";
import {userSchema} from "@/db/schema/userSchema";
//列表
export async function listItem(c:Context) {
    // 使用环境变量中的 D1 数据库创建 Drizzle ORM 实例
    const db = drizzle(c.env.DB); 
    try {
        // 查询特定用户名的管理员用户，并比较密码（假设密码存储为明文，实际应用中应使用哈希）
        const result = await db.select().from(userSchema).all();
        return await sendSuccessResponse(result);
    } catch (error) {
        // 捕获任何查询执行期间发生的错误
        console.error('Error executing query:', error);
        return await sendErrorResponse(500, '服务器内部错误，请稍后再试。');
    }
}

//创建
export async function createItem(c:Context) {
    // 使用环境变量中的 D1 数据库创建 Drizzle ORM 实例
    const db = drizzle(c.env.DB); 

    try {
        // 查询特定用户名的管理员用户，并比较密码（假设密码存储为明文，实际应用中应使用哈希）
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
    // 使用环境变量中的 D1 数据库创建 Drizzle ORM 实例
    const db = drizzle(c.env.DB); 

    try {
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
    // 使用环境变量中的 D1 数据库创建 Drizzle ORM 实例
    const db = drizzle(c.env.DB); 

    try {
        // 查询特定用户名的管理员用户，并比较密码（假设密码存储为明文，实际应用中应使用哈希）
        const result = await db.select().from(userSchema).get();
        return await sendSuccessResponse(result);
    } catch (error) {
        // 捕获任何查询执行期间发生的错误
        console.error('Error executing query:', error);
        return await sendErrorResponse(500, '服务器内部错误，请稍后再试。');
    }
}


