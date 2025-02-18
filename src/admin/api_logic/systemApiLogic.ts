// src/admin/api_logic/systemApiLogic.ts
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import {sendErrorResponse, sendSuccessResponse} from "@/utils/responseUtil";
import {Context} from "hono";
import {systemSchema} from "@/db/schema/systemSchema";


//详情
export async function detailItem(c:Context) {
    try {
        const id: number = parseInt(c.req.param('id')) as unknown as number;
        const db = drizzle(c.env.DB); 
        const result = await db.select().from(systemSchema).where(eq(systemSchema.id, id)).get();
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
        const rawData: { key: string, value: string }[] = await c.req.json();

        // 验证 rawData 是否为数组
        if (!Array.isArray(rawData)) {
            return await sendErrorResponse(400, '请求体必须是一个数组');
        }

        const updatedRecords: { key: string, value: string }[] = [];

        for (const item of rawData) {
            // 验证每个对象是否包含 key 和 value 属性，并且它们是字符串
            if (typeof item.key !== 'string' || typeof item.value !== 'string') {
                console.warn(`Invalid item format: ${JSON.stringify(item)}`);
                continue;
            }

            // 查找是否存在对应key的记录
            const existingRecord = await db.select()
                .from(systemSchema)
                .where(eq(systemSchema.key, item.key))
                .get();

            if (existingRecord) {
                // 如果记录存在，更新它的value字段
                await db.update(systemSchema)
                    .set({ value: item.value, updated_at: new Date().toISOString() })
                    .where(eq(systemSchema.key, item.key));

                // 记录已更新的项
                updatedRecords.push(item);
            } else {
                // 如果记录不存在，不做任何操作
                console.log(`No record found for key: ${item.key}`);
            }
        }

        return await sendSuccessResponse(updatedRecords);
    } catch (error) {
        // 捕获任何查询执行期间发生的错误
        console.error('Error executing query:', error);
        return await sendErrorResponse(500, '服务器内部错误，请稍后再试。');
    }
}


