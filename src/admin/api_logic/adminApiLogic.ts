// src/admin/api_logic/adminApiLogic.ts
import {and, eq, ne,sql} from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import {sendErrorResponse, sendSuccessResponse} from "@/utils/responseUtil";
import {Context} from "hono";
import {adminSchema} from "@/db/schema/adminSchema";
import {getNanoid, getPassword} from "@/utils/commonUtil";
//列表
export async function listItem(c:Context) {
    try {
        const db = drizzle(c.env.DB); 
        const result = await db.select()
            .from(adminSchema)
            .where(
                and(
                    eq(adminSchema.is_deleted, 1)
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
        const checkUsername = await db.select()
            .from(adminSchema)
            .where(
                and(
                    eq(adminSchema.is_deleted, 1),
                    eq(adminSchema.username, params.username)
                )
            )
            .get();
        if(checkUsername){
            return await sendErrorResponse(400, '用户名已存在');
        }
        let salt = getNanoid();
        let password = await getPassword(params.password, salt);
        const result = await db.insert(adminSchema).values({
            username: params.username,
            password: password,
            salt: salt,
            remark: params.remark,
            status: params.status,
            created_at:  sql`datetime('now')`,
            updated_at:  sql`datetime('now')`
        }).returning();
        if(result){
            return await sendSuccessResponse(result);
        }
        return await sendErrorResponse(400, '创建失败');

    } catch (error) {
        return await sendErrorResponse(500, '服务器内部错误，请稍后再试。');
    }
}

//详情
export async function detailItem(c:Context) {
    try {
        const id: number = parseInt(c.req.param('id')) as unknown as number;
        const db = drizzle(c.env.DB); 
        const result = await db.select()
            .from(adminSchema)
            .where(
                and(
                    eq(adminSchema.id, id),
                    eq(adminSchema.is_deleted, 1)
                )
            ).get();
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
        const params = await c.req.json();
        const checkUsername = await db.select()
            .from(adminSchema)
            .where(
                and(
                    eq(adminSchema.is_deleted, 1),
                    eq(adminSchema.username, params.username),
                    ne(adminSchema.id, params.id),
                )
            )
            .get();
        if(checkUsername){
            return await sendErrorResponse(400, '用户名已存在');
        }
        const userInfo = await db.select()
            .from(adminSchema)
            .where(
                and(
                    eq(adminSchema.id, params.id),
                    eq(adminSchema.is_deleted, 1)
                )
            ).get();
        if(!userInfo){
            return await sendErrorResponse(400, '用户不存在');
        }

        // 初始化 updateFields 对象，使用定义好的类型
        let updateFields = {
            username: params.username,
            remark: params.remark,
            status: params.status,
            updated_at: new Date().toISOString() // 使用 JavaScript Date 对象生成当前时间
        };

        // 确保只有当 params.password 不为 null 或 undefined 时才设置密码
        if (params.password !== null && params.password) {
            const password = await getPassword(params.password, userInfo.salt || "");
            // updateFields = {...updateFields, password};
            Object.assign(updateFields, {password});
        }
        console.log('updateFieldsupdateFieldsupdateFields',updateFields);

            const result = await db.update(adminSchema)
            .set(updateFields)
            .where(eq(adminSchema.id, params.id)) // 假设您需要根据某个ID进行更新
            .returning();

        if(result){
            return await sendSuccessResponse(result);
        }
        return await sendErrorResponse(400, '更新失败');
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
        const result = await db.update(adminSchema)
            .set({
                is_deleted : 2,
                deleted_at:  sql`datetime('now')`
            })
            .where(eq(adminSchema.id, params.id));
        if (result){
            return await sendSuccessResponse(result);
        }
        return await sendErrorResponse(400,'删除失败');
    } catch (error) {
        // 捕获任何查询执行期间发生的错误
        console.error('Error executing query:', error);
        return await sendErrorResponse(500, '服务器内部错误，请稍后再试。');
    }
}


