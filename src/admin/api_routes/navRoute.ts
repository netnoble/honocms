// src/admin/api_routes/navRoute.ts
import { Hono } from 'hono';
import {listItem, createItem,detailItem,updateItem,deleteItem} from '@/admin/api_logic/navApiLogic';

const app = new Hono();

// 定义环境类型
// interface Env {
//     DB: any; // 你可以根据实际情况定义更具体的类型
// }
//列表
app.get('/list', async (c) => {
    const result = await listItem(c);
    return c.json(result);
});
//创建
app.post('/create', async (c) => {
    const result = await createItem(c);
    return c.json(result);
});
//详情
app.get('/detail', async (c) => {
    const result = await detailItem(c);
    return c.json(result);
});
//更新
app.post('/update', async (c) => {
    const result = await updateItem(c);
    return c.json(result);
});
//删除
app.post('/delete', async (c) => {
    const result = await deleteItem(c);
    return c.json(result);
});

export default app;