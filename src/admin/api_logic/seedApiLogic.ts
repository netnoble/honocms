// src/admin/api_logic/seedApiLogic.ts
import { adminSchema } from "@/db/schema/adminSchema";
import { eq,count } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import {sendErrorResponse, sendSuccessResponse} from "@/utils/responseUtil";
import { handleError } from '@/utils/errorHandlerUtil';
import {getNanoid, getPassword} from "@/utils/commonUtil";
import {systemSchema} from "@/db/schema/systemSchema";
import {systemSeedJson} from "@/admin/json/systemJson";
import {Context} from "hono";


export async function adminFindOrCreateLogic(c:Context) {
    try {
        //查询数据库
        const db = drizzle(c.env.DB);
        const result = await db.select().from(adminSchema).where(eq(adminSchema.username, 'admin')).get();
        console.log('1-测试中间件-result', result)
        if(!result){
            let salt = await getNanoid();
            let passwd = await getPassword('123456', salt);
            const insert = await db.insert(adminSchema).values({
                username: "admin",
                password: passwd,
                salt: salt,
                status: 1,
                is_deleted: 1,
            }).returning();
            return await sendSuccessResponse(insert);
        }
        return await sendSuccessResponse(result);
    } catch (error) {
        handleError(error)
    }
}

export async function systemFindOrCreateLogic(c:Context) {
    try {
        //查询数据库
        const db = drizzle(c.env.DB);
        const systemCountResult = await db.select({ value: count(systemSchema.id) }).from(systemSchema);

        // 修改这里，先检查数组长度
        const systemCount: number = Array.isArray(systemCountResult) && systemCountResult.length > 0 ? systemCountResult[0].value : 0;
        console.log('systemSeedJson', systemSeedJson())
        if(systemCount > 0){
            return await sendErrorResponse(400,'已经存在数据');
        }
        const insert = await db.insert(systemSchema).values(systemSeedJson()).returning();
        if(insert){
            return await sendSuccessResponse(insert);
        }
        return await sendErrorResponse();

    } catch (error) {
        handleError(error)
    }
}






