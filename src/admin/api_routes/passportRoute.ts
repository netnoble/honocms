// src/admin/api_routes/passportRoute.ts
import { Hono } from 'hono';
import {login, logout} from '@/admin/api_logic/passportApiLogic';
import {authAdminApiMiddleware} from "@/admin/middleware/authAdminApiMiddleware";

const app = new Hono();

// @ts-ignore
// app.use('/logout', authAdminApiMiddleware)
// 定义环境类型
// interface Env {
//     DB: any; // 你可以根据实际情况定义更具体的类型
// }
//登录接口
app.post('/login', async (c) => {
    const params = await c.req.json();
    const result = await login(c, params);
    return c.json(result);
});
//退出登录接口
app.post('/logout', async (c) => {
    const result = await logout(c);
    return c.json(result);
});

export default app;