import {Context} from "hono";
import {getAdminCookie} from "@/admin/utils/cookieUtil";
import {decodeToken, verifyToken} from "@/utils/tokenUtil";

//验证cookie的有效性
export const authAdminMiddleware = async (c: Context) => {
    let cookie = await getAdminCookie(c)
    console.log('测试中间件-cookie', cookie)
    if(!cookie){
        return c.redirect('/admin/login')
    }
    //解析cookie
    const token = verifyToken(cookie)
    if(!token){
        console.log('测试中间件-redirect', 22)
        return c.redirect('/admin/login')
    }

};