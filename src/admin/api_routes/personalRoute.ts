// src/admin/api_routes/personalRoute.ts
import { Hono } from 'hono';
import {createItem, deleteItem, detailItem, listItem, updateItem} from "@/admin/api_logic/personalApiLogic";

const app = new Hono();

// 定义环境类型
// interface Env {
//     DB: any; // 你可以根据实际情况定义更具体的类型
// }
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

export default app;