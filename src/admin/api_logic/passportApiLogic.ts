// src/admin/api_logic/passportApiLogic.ts
import { adminSchema } from "@/db/schema/adminSchema";
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { generateToken} from "@/utils/tokenUtil";
import {sendErrorResponse, sendSuccessResponse} from "@/utils/responseUtil";
import {getPassword} from "@/utils/commonUtil";
import {deleteAllCookie, setAdminCookie} from "@/admin/utils/cookieUtil";
import {Context} from "hono";

//提交登录
export async function login(c:Context, params: Record<string, any>) {
    // 从 params 对象中提取用户名和密码
    const { username, password } = await c.req.json();

    // 确保参数存在且不为空
    if (!username || !password) {
        return await sendErrorResponse(400, '用户名和密码是必填项');
    }

    // 使用环境变量中的 D1 数据库创建 Drizzle ORM 实例
    const db = drizzle(c.env.DB); 

    try {
        // 查询特定用户名的管理员用户，并比较密码（假设密码存储为明文，实际应用中应使用哈希）
        const result = await db.select().from(adminSchema).where(eq(adminSchema.username, username)).get();

        if(!result){
            return await sendErrorResponse(400, '用户名或密码错误');
        }
        // @ts-ignore
        let passwd = await getPassword(password,result.salt);

        // 假设密码字段名为 password，在实际应用中请使用安全的方式验证密码
        // const checkPassword = result.find(user => user.password === passwd);
        console.log('login search result',result);
        if (result.password == passwd) {
            // 如果找到匹配的用户，返回成功消息及模拟的 token 和用户信息
            const payload = {
                id: result.id,
                username: result.username,
                role: 'admin',
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 令牌将在60分钟*24后过期
            }
            const token = await generateToken(payload);
            console.log('login success token',token);
            const res = {
                token: token,
                user: {
                    id: result.id,
                    username: result.username,
                },
            }
            await setAdminCookie(c, token)
            return await sendSuccessResponse(res);
        } else {
            return await sendErrorResponse(401, '用户名或密码错误');
        }
    } catch (error) {
        // 捕获任何查询执行期间发生的错误
        console.error('Error executing query:', error);
        return await sendErrorResponse(500, '服务器内部错误，请稍后再试。');
    }
}

//退出登录
export async function logout(c:Context) {

    await deleteAllCookie(c);
    return await sendSuccessResponse();
}




