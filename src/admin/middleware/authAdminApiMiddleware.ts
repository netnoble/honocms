import {Context} from "hono";
import {decodeToken,verifyToken} from "@/utils/tokenUtil";
import {sendErrorResponse} from "@/utils/responseUtil";
import {getAdminCookie} from "@/admin/utils/cookieUtil";

/**
 * JWT验证中间件
 * @param c - Hono Context
 * @param next
 * @returns 如果token有效，继续处理请求；否则返回401 Unauthorized
 */
export const authAdminApiMiddleware = async (c: Context, next: () => Promise<Response>) => {
    // export const authAdminApiMiddleware = async (c: Context, next: () => any) => {
    // return sendErrorResponse(401, 'Unauthorized')
    console.log('测试中间件-token', "123213123213");
    console.log('测试中间件-cookie', await getAdminCookie(c));
    // const authHeader = c.req.header('Authorization');
    const token = await getAdminCookie(c);
    // console.log('测试中间件-authHeader', authHeader);
    if (!token) {
        // return c.text('Unauthorized', 401);
        return sendErrorResponse(401, 'Unauthorized2232')
    }

    // const token = authHeader.split(' ')[1];
    console.log('测试中间件-token', token);

    const decode = decodeToken(token);
    if (!decode) {
        return sendErrorResponse(401, '权限验证失败了')
    }
    console.log('测试中间件-payload', decode);
    //验证token
    console.log('测试中间件-verifyToken(token)',verifyToken(token));

    if (!verifyToken(token)) {
        console.log('测试中间件-token验证失败');
        return sendErrorResponse(401, '权限验证失败')
    }

    // 将解码后的payload附加到context中
    c.set('user', decode.payload);
    c.set('userId', decode.payload.id);
    // 使用设置的 user 信息
    const user = c.get('user');
    const userId = c.get('userId');
    console.log('0-测试中间件-user', user);
    console.log('0-测试中间件-userId', userId);
    return next();
};