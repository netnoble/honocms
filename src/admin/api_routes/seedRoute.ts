// src/admin/api_routes/seedRoute.ts
import {Context, Hono} from 'hono';
import {adminFindOrCreateLogic, systemFindOrCreateLogic} from '@/admin/api_logic/seedApiLogic';


const app = new Hono();

// 定义环境类型
interface Env {
    DB: any; // 你可以根据实际情况定义更具体的类型
}

app.post('/admin', async (c) => {
    // 从请求体中获取参数
    // const params = await c.req.json();

    // return c.json([]);
    // 调用 login 函数进行验证
    const result = await adminFindOrCreateLogic(c);
    return c.json(result);
});


app.post('/system', async (c) => {
    // 从请求体中获取参数
    // const params = await c.req.json();

    // return c.json([]);
    // 调用 login 函数进行验证
    const result = await systemFindOrCreateLogic(c);
    return c.json(result);
});



export default app;