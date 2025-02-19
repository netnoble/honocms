// src/admin/api_logic/uploadFileApiLogic.ts
import {eq, sql} from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import {sendErrorResponse, sendSuccessResponse} from "@/utils/responseUtil";
import {Context} from "hono";

import AwsS3Util from '@/admin/utils/awsS3Util';
import {getNanoid, getYearMonthDay} from "@/utils/commonUtil";
import {fileSchema} from "@/db/schema/fileSchema";
//上传文件
export async function uploadFileItem(c:Context) {
    try {
        // 解析 multipart/form-data 请求体
        const fileBody = await c.req.parseBody()
        const file = fileBody['file'];
        console.log('file:', file)
        if (!file) {
            return await sendErrorResponse(400, 'No file provided');
        }
        const { ACCOUNT_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY,R2_BUCKET_NAME,APP_STATIC_URL } = c.env;
        const fileName = file instanceof File ? file?.name : '';
        const fileExtension = file instanceof File ? file?.name.split('.').pop() : '';
        const fileSize = file instanceof File ? file?.size : 0;
        const bucketName = R2_BUCKET_NAME;
        const objectKey = `files/${getYearMonthDay()}/${getNanoid()}.${fileExtension}`;
        // 读取文件内容
        //@ts-ignore
        const body = await file.arrayBuffer(); // 将文件内容转换为 ArrayBuffer
        // if (!body) {
        //     return await sendErrorResponse(400, '文件读取失败');
        // }
        // 初始化 S3 工具类
        const s3Util = new AwsS3Util(ACCOUNT_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY);
        const response = await s3Util.putObject(bucketName, objectKey, body);
        console.log('上传结果:', response);
        if(response.$metadata.httpStatusCode !== 200){
            return await sendErrorResponse(400, '文件上传失败');
        }
        const db = drizzle(c.env.DB); 
        const result = await db.insert(fileSchema).values({
            path: objectKey,
            file_name: fileName,
            file_extension: fileExtension,
            file_size: fileSize,
            status: 1,
            is_deleted: 1,
            created_at:  sql`datetime('now')`,
            updated_at:  sql`datetime('now')`
        }).returning();
        return await sendSuccessResponse({
            url: `${APP_STATIC_URL}/${objectKey}`,
            path: `${objectKey}`,
        });
    } catch (error) {
        // 捕获任何查询执行期间发生的错误
        console.error('Error executing query:', error);
        return await sendErrorResponse(500, '服务器内部错误，请稍后再试。');
    }
}

